import { Message } from '../../types/chat'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <>
      {messages.map((message) => {
        const isAssistant = message.role === 'assistant'

        return (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-sm'
                  : 'bg-slate-800 text-slate-100 rounded-bl-sm'
              }`}
            >
              {isAssistant ? (
                <div className="space-y-2">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2 leading-relaxed text-sm text-slate-100 last:mb-0">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-slate-50">
                          {children}
                        </strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-2 list-disc list-inside space-y-1 text-sm text-slate-100 last:mb-0">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-2 list-decimal list-inside space-y-1 text-sm text-slate-100 last:mb-0">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="leading-relaxed">{children}</li>
                      ),
                      h1: ({ children }) => (
                        <h1 className="mb-2 text-base font-semibold text-slate-50">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mb-2 text-sm font-semibold text-slate-50">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mb-2 text-sm font-semibold text-slate-50">
                          {children}
                        </h3>
                      ),
                      code: ({ children }) => (
                        <code className="px-1 py-0.5 bg-slate-700 rounded text-xs text-slate-200">
                          {children}
                        </code>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline break-all"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed text-white">
                  {message.content}
                </p>
              )}
            </div>
          </div>
        )
      })}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-2">
            <div className="flex items-center gap-1">
              <span className="text-sm text-slate-300">Typing</span>
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
