import { CvData } from '../types/cv'

/**
 * Generates the system prompt for the LLM based on CV data.
 * Edit this function to customize the assistant's tone and behavior.
 */
export function createSystemPrompt(cvData: CvData): string {
  const { name, title, summary, experiences, projects, skills, current, links, hobbies, personality, testimonials } = cvData

  // Format experiences
  const experiencesText = experiences
    .map((exp) => {
      const period = exp.endDate ? `${exp.startDate} - ${exp.endDate}` : `${exp.startDate} - Present`
      return `
- ${exp.title} at ${exp.company} (${period})
  Location: ${exp.location}
  ${exp.bullets.map((b) => `  • ${b}`).join('\n')}
  ${exp.technologies ? `Technologies: ${exp.technologies.join(', ')}` : ''}`
    })
    .join('\n')

  // Format projects
  const projectsText = projects
    .map(
      (proj) => `
- ${proj.name}
  ${proj.description}
  ${proj.role ? `Role: ${proj.role}` : ''}
  Technologies: ${proj.technologies.join(', ')}
  ${proj.contributions && proj.contributions.length > 0 ? `Contributions:\n${proj.contributions.map((c) => `  • ${c}`).join('\n')}` : ''}
  ${proj.link ? `Link: ${proj.link}` : ''}
  ${proj.github ? `GitHub: ${proj.github}` : ''}`
    )
    .join('\n')

  // Format skills
  const skillsText = `
Languages: ${skills.languages.join(', ')}
Frameworks: ${skills.frameworks.join(', ')}
${skills.databases ? `Databases: ${skills.databases.join(', ')}` : ''}
Tools: ${skills.tools.join(', ')}
${skills.waysOfWorking ? `Ways of Working: ${skills.waysOfWorking.join(', ')}` : ''}`

  // Format links
  const linksText = Object.entries(links)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    .join('\n')

  // Format current work
  const currentText = `
Working on:
${current.workingOn.map((w) => `  • ${w}`).join('\n')}

Learning:
${current.learning.map((l) => `  • ${l}`).join('\n')}

Goals:
${current.goals.map((g) => `  • ${g}`).join('\n')}`

  // Format hobbies and personality
  const personalText = hobbies && hobbies.length > 0
    ? `\nHobbies:\n${hobbies.map((h) => `  • ${h}`).join('\n')}`
    : ''
  const personalityText = personality && personality.length > 0
    ? `\nPersonality:\n${personality.map((p) => `  • ${p}`).join('\n')}`
    : ''

  // Format testimonials
  const testimonialsText = testimonials && testimonials.length > 0
    ? testimonials
        .map((test) => {
          const attribution = test.name
            ? `${test.name}${test.role ? `, ${test.role}` : ''}${test.source ? ` (${test.source})` : ''}`
            : test.source || 'Anonymous'
          return `"${test.quote}" - ${attribution}${test.link ? `\n  Link: ${test.link}` : ''}`
        })
        .join('\n\n')
    : ''

  return `You are ${name}, a ${title}. You are speaking in first person as ${name}.

Your role is to help visitors learn about ${name}'s professional background, experience, projects, and skills. Be friendly but professional, concise and clear. Speak naturally as if you are ${name} yourself.

IMPORTANT RULES:
1. Always speak in FIRST PERSON ("I have worked on...", "I am currently...", "My experience includes...")
2. Use a friendly but professional tone
3. Be concise and clear - avoid overly long responses
4. ONLY use the information provided below about ${name}. Do NOT make up facts, companies, projects, or experiences
5. If asked about something not in the CV data, politely explain that you don't have that information
6. When discussing projects or experiences, mention relevant technologies when appropriate
7. If asked about contact information, provide the links below
8. When the user asks about feedback, recommendations, or what others say about ${name}, you may use the testimonials section from the CV data. You can refer to them as quotes, e.g. "One of my colleagues said...". If there are no testimonials provided, say you don't have any quotes available instead of making them up

CV DATA:

Name: ${name}
Title: ${title}

Summary:
${summary}

Experience:
${experiencesText}

Projects:
${projectsText}

Skills:
${skillsText}

Current:
${currentText}${personalText}${personalityText}

${testimonialsText ? `Testimonials & Recommendations:\n${testimonialsText}\n\n` : ''}Contact & Links:
${linksText}

Remember: You are ${name} speaking about yourself. Be authentic, helpful, and professional.`
}
