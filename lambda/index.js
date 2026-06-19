import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// awslambda is injected as a global in the Lambda runtime when InvokeMode=RESPONSE_STREAM
const awslambda = globalThis.awslambda

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BONDS_CONTEXT = fs.readFileSync(path.join(__dirname, 'bonds-context.md'), 'utf8')
const ZAI_MODEL = process.env.ZAI_MODEL || 'glm-5.2'
const ZAI_API_URL = `${process.env.ZAI_BASE_URL || 'https://api.z.ai/api/coding/paas/v4'}/chat/completions`
const ZAI_THINKING_TYPE = process.env.ZAI_THINKING_TYPE || 'enabled'
const ZAI_MAX_TOKENS = Number(process.env.ZAI_MAX_TOKENS || 1500)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const CHAT_TOKEN = process.env.CHAT_TOKEN || ''

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 20
const rateLimitMap = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }
  entry.count += 1
  return {
    allowed: entry.count <= RATE_LIMIT_MAX,
    remaining: Math.max(0, RATE_LIMIT_MAX - entry.count),
  }
}

function getClientIp(event) {
  const headers = event?.headers || {}
  return (
    headers['X-Forwarded-For']?.split(',')[0]?.trim() ||
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    event?.requestContext?.http?.sourceIp ||
    'unknown'
  )
}

function isAllowedOrigin(event) {
  if (ALLOWED_ORIGINS.includes('*')) return true
  const headers = event?.headers || {}
  const origin = headers.origin || headers.Origin || ''
  const referer = headers.referer || headers.Referer || ''
  if (origin && ALLOWED_ORIGINS.includes(origin)) return true
  if (referer && ALLOWED_ORIGINS.some((o) => referer.startsWith(o))) return true
  return false
}

function isTokenValid(event) {
  if (!CHAT_TOKEN) return true
  const headers = event?.headers || {}
  const auth = headers.authorization || headers.Authorization || ''
  const provided = auth.replace(/^Bearer\s+/i, '').trim()
  if (provided.length !== CHAT_TOKEN.length) return false
  let diff = 0
  for (let i = 0; i < CHAT_TOKEN.length; i++) {
    diff |= provided.charCodeAt(i) ^ CHAT_TOKEN.charCodeAt(i)
  }
  return diff === 0
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return []
  return history
    .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
    .slice(-6)
    .map((item) => ({ role: item.role, content: item.content.slice(0, 4000) }))
}

const SYSTEM_PROMPT = [
  'You are the assistant for one specific topic: Bangladesh NRB (Non-Resident Bangladeshi) Diaspora Bonds.',
  'You help users understand and compare three bond types: Wage Earner Development Bond (WEDB), US Dollar Investment Bond (USDIB), and US Dollar Premium Bond (USDPB).',
  '',
  'SCOPE: If a question is clearly unrelated to NRB bonds, briefly say you can only help with WEDB/USDIB/USDPB and suggest relevant topics.',
  'Answer only from the provided bonds context. If the answer is not clearly in the context, say so.',
  'Be concise, accurate, and specific with rates, tenor, tax treatment, encashment rules, eligibility, denominations, and regulatory details.',
  'For numerical calculations, show the math clearly.',
  'When comparing bonds, present a clear breakdown: principal, profit rate, tenor, currency, tax treatment, and encashment differences.',
  'Do not mention the provided context, source list, or documentation wording.',
  'Do not start with phrases like "Based on the context" or "According to the documentation".',
  'You may use markdown formatting (bold, tables, bullet lists) where it improves clarity.',
  'When users ask about amounts, always clarify whether they are talking about BDT (WEDB) or USD (USDIB/USDPB).',
  'Remind users that this tool provides informational estimates only and is not financial advice.',
  '',
  'BONDS CONTEXT:',
  BONDS_CONTEXT,
].join('\n')

function writeSse(responseStream, obj) {
  responseStream.write(`data: ${JSON.stringify(obj)}\n\n`)
}

function endWithError(responseStream, statusCode, message) {
  const wrapped = awslambda.HttpResponseStream.from(responseStream, {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
  wrapped.end(JSON.stringify({ error: message }))
}

async function streamHandler(event, responseStream) {
  const method = event?.requestContext?.http?.method || event?.httpMethod || 'GET'

  if (method === 'OPTIONS') {
    const r = awslambda.HttpResponseStream.from(responseStream, {
      statusCode: 204,
      headers: { 'Content-Type': 'text/plain' },
    })
    r.end()
    return
  }

  if (method !== 'POST') return endWithError(responseStream, 405, 'Method not allowed')
  if (!isAllowedOrigin(event)) return endWithError(responseStream, 403, 'Forbidden: origin not allowed')
  if (!isTokenValid(event)) return endWithError(responseStream, 401, 'Unauthorized: invalid or missing token')

  const clientIp = getClientIp(event)
  const rate = checkRateLimit(clientIp)
  if (!rate.allowed) return endWithError(responseStream, 429, 'Too many requests')

  if (!process.env.ZAI_API_KEY) return endWithError(responseStream, 500, 'Missing model API configuration')

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return endWithError(responseStream, 400, 'Invalid JSON body')
  }

  const question = typeof payload.question === 'string' ? payload.question.trim() : ''
  if (!question) return endWithError(responseStream, 400, 'Question is required')
  if (question.length > 2000) return endWithError(responseStream, 400, 'Question is too long')

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...sanitizeHistory(payload.history),
    { role: 'user', content: question },
  ]

  // Call ZAI with stream=true
  let zaiResponse
  try {
    zaiResponse = await fetch(ZAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ZAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: ZAI_MODEL,
        stream: true,
        messages,
        temperature: 0.2,
        max_tokens: ZAI_MAX_TOKENS,
        ...(ZAI_THINKING_TYPE && ZAI_THINKING_TYPE !== 'disabled'
          ? { thinking: { type: ZAI_THINKING_TYPE } }
          : {}),
      }),
    })
  } catch (err) {
    return endWithError(responseStream, 502, `Upstream fetch failed: ${err instanceof Error ? err.message : 'unknown'}`)
  }

  if (!zaiResponse.ok || !zaiResponse.body) {
    const errText = await zaiResponse.text().catch(() => '')
    return endWithError(responseStream, 502, `Upstream HTTP ${zaiResponse.status}: ${errText.slice(0, 400)}`)
  }

  // Wrap as SSE stream
  responseStream = awslambda.HttpResponseStream.from(responseStream, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
    },
  })

  const reader = zaiResponse.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let sawThinking = false
  let sawContent = false

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      const events = buffer.split('\n')
      buffer = events.pop() || ''

      for (const line of events) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) continue

        const data = trimmed.slice(5).trim()
        if (!data || data === '[DONE]') continue

        let json
        try {
          json = JSON.parse(data)
        } catch {
          continue
        }

        const delta = json?.choices?.[0]?.delta
        if (!delta) continue

        // Filter thinking tokens — never sent to client
        if (delta.reasoning_content) {
          if (!sawThinking) {
            sawThinking = true
            writeSse(responseStream, { type: 'thinking' })
          }
          continue
        }

        // Stream content tokens
        if (delta.content) {
          if (!sawContent) {
            sawContent = true
            writeSse(responseStream, { type: 'start' })
          }
          writeSse(responseStream, { type: 'token', content: delta.content })
        }
      }
    }

    writeSse(responseStream, { type: 'done' })
  } catch (err) {
    writeSse(responseStream, {
      type: 'error',
      message: `Stream interrupted: ${err instanceof Error ? err.message : 'unknown'}`,
    })
  } finally {
    responseStream.end()
  }
}

export const handler = awslambda.streamifyResponse(streamHandler)
