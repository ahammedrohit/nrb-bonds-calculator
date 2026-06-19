import { FormEvent, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CHAT_API_URL } from '../../config'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ThinkingState = 'idle' | 'thinking' | 'generating'

const starterQuestions = [
  'What are the differences between WEDB, USDIB, and USDPB?',
  'What is the profit rate for a 5-year USDIB of $10,000?',
  'Can I encash my WEDB before maturity?',
]

/**
 * Animated three-dot loading indicator. Switches label between
 * "Thinking..." and "Generating..." based on the thinkingState prop.
 */
function ThinkingBubble({ state }: { state: ThinkingState }) {
  const label = state === 'thinking' ? 'Thinking' : state === 'generating' ? 'Generating' : 'Working'
  return (
    <div className="flex justify-start">
      <div className="max-w-[88%] rounded-3xl rounded-bl-md px-4 py-3 bg-neutral-100 dark:bg-[#0f1914] border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex gap-1">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
          <span className="text-xs font-medium tracking-wide">{label}…</span>
        </div>
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  // Show "Thinking" first (model is reasoning), then flip to "Generating" after ~1.2s
  const [thinkingState, setThinkingState] = useState<ThinkingState>('idle')
  const [error, setError] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, open])

  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current)
    }
  }, [])

  async function parseResponse(response: Response) {
    const rawText = await response.text()
    try {
      return rawText ? JSON.parse(rawText) : {}
    } catch {
      if (!response.ok) {
        throw new Error(rawText.slice(0, 180) || 'Server returned an invalid response')
      }
      throw new Error('Server returned an invalid response')
    }
  }

  async function submitQuestion(nextQuestion: string) {
    const trimmed = nextQuestion.trim()
    if (!trimmed || loading) return

    const history = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-6)

    setOpen(true)
    const nextMessages = [...messages, { role: 'user' as const, content: trimmed }]
    setMessages(nextMessages)
    setQuestion('')
    setError('')
    setLoading(true)
    setThinkingState('thinking')

    // After 1.2s with no answer yet, switch label to "Generating..."
    thinkingTimerRef.current = setTimeout(() => {
      setThinkingState('generating')
    }, 1200)

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed, history }),
      })
      const data = await parseResponse(response)
      if (!response.ok) {
        throw new Error(data?.error || data?.details || 'Chat request failed')
      }
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current)
      setThinkingState('idle')
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: data.answer || 'No answer returned.' },
      ])
    } catch (requestError) {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current)
      setThinkingState('idle')
      setError(requestError instanceof Error ? requestError.message : 'Chat request failed')
      setMessages((current) => current.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    void submitQuestion(question)
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[70] bg-neutral-950/45 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[80]">
        <div
          className={`w-[calc(100vw-2rem)] sm:w-[24rem] md:w-[26rem] max-w-[26rem] rounded-[2rem] border border-neutral-200 dark:border-neutral-700 shadow-2xl shadow-neutral-950/25 overflow-hidden transition-all duration-300 origin-bottom-right bg-white dark:bg-neutral-900 ${
            open
              ? 'pointer-events-auto translate-y-0 opacity-100 scale-100 mb-4'
              : 'pointer-events-none translate-y-4 opacity-0 scale-95 h-0 mb-0'
          }`}
        >
          <div className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between gap-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                💰
              </div>
              <div>
                <h2 className="font-display text-lg font-bold leading-tight">Bonds Assistant</h2>
                <p className="text-xs text-white/80">Ask about WEDB, USDIB, or USDPB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="h-[26rem] overflow-y-auto px-4 py-4 space-y-4 bg-neutral-50 dark:bg-neutral-950">
            {messages.length === 0 && !loading && (
              <div className="space-y-4 animate-fade-in">
                <div className="rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 px-4 py-5 text-sm leading-7 text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-900">
                  👋 Hi! I'm your NRB Bonds assistant. Ask me anything about Wage Earner Development Bond, US Dollar Investment Bond, or US Dollar Premium Bond.
                </div>
                <div className="space-y-2">
                  {starterQuestions.map((item) => (
                    <button
                      key={item}
                      onClick={() => void submitQuestion(item)}
                      disabled={loading}
                      className="w-full text-left px-4 py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors disabled:opacity-50"
                    >
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div
                  className={`max-w-[88%] rounded-3xl px-4 py-3 leading-7 text-sm ${
                    message.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-md whitespace-pre-wrap'
                      : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-bl-md border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {message.role === 'user' ? (
                    message.content
                  ) : (
                    <div className="chatbot-markdown">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && <ThinkingBubble state={thinkingState} />}

            <div ref={endRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
          >
            <label htmlFor="bonds-question" className="sr-only">Ask a question</label>
            <div className="flex items-end gap-3">
              <textarea
                id="bonds-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void submitQuestion(question)
                  }
                }}
                rows={2}
                placeholder="Ask about NRB bonds..."
                className="flex-1 resize-none rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400"
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="shrink-0 px-4 py-3 rounded-2xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
          </form>
        </div>

        <button
          type="button"
          onClick={() => setOpen((c) => !c)}
          className="ml-auto flex items-center justify-center w-16 h-16 rounded-full bg-brand-600 text-white shadow-2xl shadow-brand-900/30 hover:bg-brand-700 transition-all hover:scale-105 active:scale-95"
          aria-label={open ? 'Close bonds chat' : 'Open bonds chat'}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5m-9 6 1.6-4.8A8 8 0 1 1 20 12a8 8 0 0 1-8 8H4Z" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}
