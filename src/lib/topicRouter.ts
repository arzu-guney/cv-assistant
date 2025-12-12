export type ChatTopic =
  | 'profile'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'current-work'
  | 'contact'
  | 'highlights'
  | 'community'
  | 'writing'
  | 'testimonials'

/**
 * Detects a topic from free-form user text by matching keywords.
 * Returns undefined if no topic is detected.
 */
export function detectTopicFromText(text: string): ChatTopic | undefined {
  const normalized = text.toLowerCase()

  const topicKeywords: Record<ChatTopic, string[]> = {
    profile: ['who are you', 'who is arzu', 'about you', 'about yourself', 'background'],
    experience: ['experience', 'work history', 'job history', 'career'],
    projects: ['projects', 'portfolio', 'what have you built', 'apps'],
    skills: ['skills', 'tech stack', 'stack', 'technologies', 'what do you use'],
    'current-work': ['working on', 'current work', 'now', 'these days'],
    contact: ['contact', 'reach you', 'email', 'linkedin'],
    highlights: ['award', 'awards', 'hackathon', 'prize', 'winner'],
    community: ['community', 'talks', 'speaking', 'conference', 'meetup'],
    writing: ['writing', 'blog', 'articles', 'medium', 'youtube', 'content'],
    testimonials: ['what others say', 'recommendation', 'feedback', 'references'],
  }

  for (const [topic, keywords] of Object.entries(topicKeywords) as [ChatTopic, string[]][]) {
    if (keywords.some((k) => normalized.includes(k))) {
      return topic
    }
  }

  return undefined
}

