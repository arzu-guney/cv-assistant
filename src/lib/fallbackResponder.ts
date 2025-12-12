import { CvData } from '../types/cv'
import { detectTopicFromText } from './topicRouter'

interface FallbackOptions {
  topic?: string
  lastUserMessage?: string
}

/**
 * Helper function that generates a response for a specific topic.
 * This is used both for explicit topics (from quick actions) and detected topics (from free-form text).
 */
function getDemoResponseForTopic(cvData: CvData, topic: string): string {
  switch (topic.toLowerCase()) {
      case 'profile':
      case 'who is arzu':
        return `I'm ${cvData.name}, a ${cvData.title}. ${cvData.summary}\n\nFeel free to ask me about my experience, projects, or skills!`

      case 'experience':
        const expText = cvData.experiences
          .map((exp) => {
            const period = exp.endDate ? `${exp.startDate} - ${exp.endDate}` : `${exp.startDate} - Present`
            const techs = exp.technologies ? ` (${exp.technologies.join(', ')})` : ''
            const bullets = exp.bullets.map((b) => `  • ${b}`).join('\n')
            return `**${exp.title}** at ${exp.company} (${period})${techs}\nLocation: ${exp.location}\n${bullets}`
          })
          .join('\n\n')
        return `Here's my professional experience:\n\n${expText}`

      case 'projects':
        const projText = cvData.projects
          .map((proj) => {
            const links = []
            if (proj.link) links.push(`🔗 ${proj.link}`)
            if (proj.github) links.push(`💻 ${proj.github}`)
            const linkText = links.length > 0 ? `\n${links.join(' | ')}` : ''
            const roleText = proj.role ? `\nRole: ${proj.role}` : ''
            const contributionsText = proj.contributions && proj.contributions.length > 0
              ? `\nContributions:\n${proj.contributions.map((c) => `  • ${c}`).join('\n')}`
              : ''
            return `**${proj.name}**\n${proj.description}${roleText}\nTech: ${proj.technologies.join(', ')}${contributionsText}${linkText}`
          })
          .join('\n\n')
        return `Here are some of my projects:\n\n${projText}`

      case 'skills':
      case 'tech stack':
        const languages = cvData.skills.languages.map(lang => `- ${lang}`).join('\n')
        const frontendMobile = cvData.skills.frameworks
          .filter(f => f === 'React' || f === 'React Native')
          .map(f => `- ${f}`)
          .join('\n')
        const backend = cvData.skills.frameworks
          .filter(f => f === 'Node.js' || f === 'Express')
          .map(f => `- ${f}`)
          .join('\n')
        const databases = cvData.skills.databases 
          ? cvData.skills.databases.map(db => `- ${db}`).join('\n')
          : ''
        const tools = [...cvData.skills.tools,]
          .map(tool => `- ${tool}`)
          .join('\n')
        const waysOfWorking = cvData.skills.waysOfWorking
          ? cvData.skills.waysOfWorking.map(way => `- ${way}`).join('\n')
          : ''
        
        return `Here's my tech stack and skills:

**🧠 Languages**
${languages}

**⚛️ Frontend & mobile**
${frontendMobile}

**🛠 Backend**
${backend}

**🗄 Databases**
${databases}

**🧩 Tools & platforms**
${tools}

**🤝 Ways of working**
${waysOfWorking}`

      case 'current':
      case 'current-work':
      case "what i'm working on now":
        const currentText = [
          `**🚀 Working on:**\n${cvData.current.workingOn.map((w) => `- ${w}`).join('\n')}`,
          `\n\n**📚 Learning:**\n${cvData.current.learning.map((l) => `- ${l}`).join('\n')}`,
          `\n\n**🎯 Goals:**\n${cvData.current.goals.map((g) => `- ${g}`).join('\n')}`,
        ]
          .join('\n')
        return `Here's what I'm currently working on:\n\n${currentText}`

      case 'contact':
      case 'links':
        const { email, website, linkedin, github, twitter, youtube, medium } = cvData.links ?? {}
        
        const lines: string[] = []
        
        if (email) {
          lines.push(`- 📧 **Email:** [${email}](mailto:${email})`)
        }
        if (website) {
          lines.push(`- 🌐 **Website:** [Portfolio & projects](${website})`)
        }
        if (linkedin) {
          lines.push(`- 💼 **LinkedIn:** [linkedin.com/in/arzucaner](${linkedin})`)
        }
        if (github) {
          lines.push(`- 👩‍💻 **GitHub:** [github.com/arzucaner](${github})`)
        }
        if (twitter) {
          lines.push(`- 🐦 **Twitter / X:** [@arz_ugny](${twitter})`)
        }
        if (youtube) {
          lines.push(`- 📺 **YouTube (CodeArz):** [YouTube channel](${youtube})`)
        }
        if (medium) {
          lines.push(`- ✍️ **Medium:** [blog on Medium](${medium})`)
        }
        
        const content = lines.length 
          ? `Here's how you can reach me:\n\n${lines.join('\n')}`
          : "Here's how you can reach me:\n\n- No contact links are configured yet."
        
        return content

      case 'highlights':
        return `Here are some highlights from my hackathons and awards:

**🏆 Awards & recognitions**
- AI Visionary Award (Frontend Queens, 2025) for my contributions and vision in AI and tech.
- Outstanding Social Impact Award – WWCode Hackathon Social Good 2023 for the "When Women Understand" project, which helps women recognise abuse.
- 3rd place – WWCode App Deploy Hackathon 2023 with *TravelBrew*, a mobile app that helps travellers find great coffee and cosy spots.

**💡 Hackathons & challenges**
- **MindGarden** – an AI-powered multi-agent mental health support tool built during The Agent Development Kit Hackathon with Google Cloud.
- **SafeAI Academy** – an interactive AI Safety learning platform created for the Women in AI Safety Hackathon.
- **Women Who Code's Days of Code** – completed a 100-day code challenge, building many mini-projects and levelling up my frontend skills.`

      case 'community':
        return `Here's a bit about my talks and community work:

**✨ Communities & mentoring**
- Evangelist and mentor at *Women Coding Community*, supporting women in tech through education, mentorship, and career support.
- Active in communities Lonca.

**🎙 Speaking**
Some of the talks and panels I've been part of include:
- *Why Do JavaScript Developers Use React JS?* (2022)
- *Push Your Imagination with CSS Animation* (2023)
- *Breaking Barriers* at Halfstack Conference (2024)
- Panels on empowering women in tech for Women Coding Community and Frontend Queens.
- *Tech Talks: My Journey to Software Engineering* (Codecademy, 2025) and *The Fun Side of Being a Woman Developer* (GDG London).

I really enjoy sharing my journey, demystifying tech, and helping more women feel at home in this field.`

      case 'writing':
        return `I love learning in public through writing and content:

**✍️ Writing**
- I regularly publish technical and career-focused articles, including topics like:
  - React Native performance and animations
  - Debugging and problem-solving strategies
  - Developer experience, learning, and staying motivated as a junior
- You'll find posts such as *"Optimizing React Native Performance"*, *"Cracking Software Puzzles: Debugging Guide"*, and *"Why I Still Choose Expo for React Native in 2025"*.

**📺 Content & channels**
- I create content under the CodeArz brand, including tutorials on frontend and mobile development.
- I also share reflections on my journey as a developer and on building a sustainable learning routine.

If you'd like links to specific posts or channels, you can ask me about my website or social links.`

      case 'testimonials':
        const testimonials = cvData.testimonials ?? []
        
        if (!testimonials.length) {
          return `I don't have any quotes added here yet, but people I work with usually highlight my curiosity, community work, and focus on building useful, accessible products.`
        }

        const topTestimonials = testimonials.slice(0, 3)
        
        const testimonialsBody = topTestimonials
          .map((t) => {
            const who = [t.name, t.role].filter(Boolean).join(' — ')
            return `> "${t.quote}"${who ? `\n\n_${who}_` : ''}`
          })
          .join('\n\n')

        return `Here are a few things people have said about working with me:\n\n${testimonialsBody}\n\nYou can find more recommendations on my LinkedIn profile if you'd like.`

      default:
        // Unknown topic, return profile
        return `I'm ${cvData.name}, a ${cvData.title}. ${cvData.summary}\n\nTry asking about my experience, projects, or skills using the quick action buttons!`
  }
}

/**
 * Local fallback responder that generates responses from CV data without using any external API.
 * Used when USE_LLM is false or when no API key is available (demo mode).
 * 
 * @param cvData - CV data to generate responses from
 * @param options - Options including topic and last user message
 * @returns A response string based on the CV data
 */
export function fallbackRespond(cvData: CvData, options: FallbackOptions = {}): string {
  const { topic, lastUserMessage = '' } = options

  // If topic is explicitly provided (from quick actions), use it directly
  if (topic) {
    return getDemoResponseForTopic(cvData, topic)
  }

  // For free-form questions (no explicit topic), try FAQ first, then topic router
  const normalizedText = lastUserMessage.toLowerCase()

  // 1. Check FAQ first
  const faq = cvData.faq ?? []
  for (const item of faq) {
    if (item.patterns.some((p) => normalizedText.includes(p))) {
      return item.answer
    }
  }

  // 2. Try to detect topic from keywords
  const detectedTopic = detectTopicFromText(lastUserMessage)
  if (detectedTopic) {
    return getDemoResponseForTopic(cvData, detectedTopic)
  }

  // 3. Fallback: demo mode message
  return "Right now I'm running in demo mode, so I may not understand every free-form question.\n\n" +
    "You'll get the best answers by using the quick action buttons below like **Experience**, **Projects**, or **Tech stack & skills**."
}

