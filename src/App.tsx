import { Sparkles, Mail } from 'lucide-react'
import CvChatbot from './components/CvChatbot'
import { cvData } from './config/cvData'
import { quickActions } from './config/quickActions'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <section className="max-w-xl mx-auto px-4 py-16 lg:py-32 text-center">
        <div className="space-y-6">
          {/* Avatar - Replace /image.png with your own portrait placed in the public/ folder */}
          <div className="flex justify-center">
            <img
              src="/image.png"
              alt="Arzu portrait"
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-2 border-blue-500/60 shadow-lg"
              loading="eager"
              onError={(e) => {
                // Fallback: hide broken image or show placeholder
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 border border-violet-500/30">
            <Sparkles size={12} className="mr-1.5" />
            New · AI CV Assistant
          </div>

          {/* Headline */}
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-50 leading-tight">
            Hi, I'm Arzu — a full-stack developer.
          </h1>

          {/* Location */}
          <p className="text-sm text-slate-400 mt-2">
            Based in London · Open to remote and hybrid roles
          </p>

          {/* Body Text */}
          <div className="space-y-3 text-slate-300 text-lg leading-relaxed">
            <p>
              If you'd like to get to know me better, you can chat with my CV assistant.
            </p>
            <p>
              Ask about my background, projects, tech stack, or what I'm currently working on, and explore my experience in your own way.
            </p>
          </div>

          {/* Email Button */}
          {(() => {
            const email = cvData.links?.email
            const mailtoHref = email
              ? `mailto:${email}?subject=Hello%20Arzu`
              : undefined

            return mailtoHref ? (
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center mt-4 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-100 hover:bg-slate-800 transition-colors active:scale-95"
              >
                <Mail size={16} className="mr-2" />
                Email me
              </a>
            ) : null
          })()}

          {/* Hint Text */}
          <p className="text-sm text-slate-400 mt-4">
            You can start by opening the chat bubble in the bottom-right corner.
          </p>
        </div>
      </section>

      {/* CV Chatbot Widget */}
      <CvChatbot
        cvData={cvData}
        quickActions={quickActions}
        title="CV Assistant"
        placeholder="Ask me anything..."
        buttonLabel="CV Assistant"
      />
    </div>
  )
}

export default App
