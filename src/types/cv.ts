export interface Experience {
  company: string
  title: string
  startDate: string
  endDate?: string
  location: string
  bullets: string[]
  technologies?: string[]
}

export interface Project {
  name: string
  description: string
  role?: string
  technologies: string[]
  contributions?: string[]
  link?: string
  github?: string
}

export interface Skills {
  languages: string[]
  frameworks: string[]
  databases?: string[]
  tools: string[]
  waysOfWorking?: string[]
}

export interface Links {
  email?: string
  github?: string
  linkedin?: string
  website?: string
  portfolio?: string
  twitter?: string
  youtube?: string
  medium?: string
  [key: string]: string | undefined
}

export interface Current {
  workingOn: string[]
  learning: string[]
  goals: string[]
}

export interface CvTestimonial {
  quote: string // the actual text of the recommendation
  name?: string // person's name (optional)
  role?: string // their role or relation, e.g. "Engineering Manager, InnoAl Tech Solution"
  source?: string // e.g. "LinkedIn", "Mentor", "Hackathon teammate"
  link?: string // optional URL to the full recommendation (e.g. LinkedIn profile or recommendation section)
}

export interface CvFaqItem {
  patterns: string[] // lowercase substrings to match
  answer: string // markdown answer
}

export interface CvData {
  name: string
  title: string
  summary: string
  location?: string
  experiences: Experience[]
  projects: Project[]
  skills: Skills
  current: Current
  links: Links
  hobbies?: string[]
  personality?: string[]
  testimonials?: CvTestimonial[]
  faq?: CvFaqItem[]
}
