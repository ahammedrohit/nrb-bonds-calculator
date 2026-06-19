// Chatbot Lambda endpoint
export const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL ||
  'https://kuiysi6alyfrliyn66ucrhblte0hffyb.lambda-url.ap-northeast-1.on.aws/'

// Shared bearer token. Injected at build time via VITE_CHAT_TOKEN env var.
// NOTE: This is obfuscation only — anyone can extract it from the built JS.
// For real protection, put CloudFront in front of the Lambda and inject the
// secret header via Origin Request Policy (the browser never sees it then).
export const CHAT_TOKEN: string = import.meta.env.VITE_CHAT_TOKEN || ''
