import type { CvData } from '../types/cv'

export const cvData: CvData = {
  name: 'Arzu',
  title: 'Full-stack Developer',
  summary:
    "I'm a London-based full-stack developer focused on web and mobile, with a background in marketing and SEO. Since 2022 I've been building tools that turn complex ideas into products people actually use from research dashboards and social-impact projects to AI-powered mental health assistants and mobile apps. I enjoy working with JavaScript, TypeScript, React, React Native, and Node.js, and I care a lot about clean, maintainable code, accessibility, and thoughtful user experience.",
  location: 'London, UK',

  experiences: [
    {
      company: 'InnoAl Tech Solution',
      title: 'Full-stack Developer',
      startDate: '2024-04',
      location: 'London, UK (remote)',
      bullets: [
        'Designed and built modern, responsive websites using React.js.',
        'Implemented backend features with Node.js and Express, connecting applications to MongoDB.',
        'Created basic data models and REST API endpoints to support user input and dynamic content.',
        'Contributed to small AI-related experiments by integrating external APIs and prompt-based content generation.',
      ],
    },
    {
      company: 'Mellow Kids',
      title: 'Full-stack Developer (Contract)',
      startDate: '2024-05',
      location: 'Stockholm, Sweden (remote)',
      bullets: [
        'Contributed to a mobile app focused on optimising infant sleep patterns.',
        'Worked across the stack with React Native, TypeScript, CMS and APIs.',
        'Helped with deployment and publishing workflows, including submitting the app to the App Store.',
        'Participated in testing, bug triage, and collecting feedback from early waitlist users.',
      ],
    },
    {
      company: 'COMPAS, University of Oxford',
      title: 'Junior Full-stack Developer (Contract)',
      startDate: '2023-12',
      endDate: '2024-04',
      location: 'Oxford, UK (remote)',
      bullets: [
        'Helped design and implement backend infrastructure with Node.js and MongoDB to support research on discrimination, prejudice, and hate crimes against minority groups.',
        'Built an intuitive React + Material UI dashboard so researchers could visualise and explore complex datasets.',
        'Developed an admin panel for data management and access control, enabling safer, more controlled analysis.',
        'Worked on data pipelines and email scraping to automate data collection and updates.',
      ],
    },
  ],

  projects: [
    {
      name: 'MindGarden – AI-Powered Mental Health Support Agents',
      description:
        'A modular multi-agent AI system for real-time, compassionate mental health support, built during The Agent Development Kit Hackathon.',
      role: 'Full-stack & product co-designer',
      technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Gemini', 'Google Cloud', 'Socket.io'],
      contributions: [
        'Collaborated on the architecture for a multi-agent system handling risk detection, triage, peer matching, and follow-up.',
        'Implemented frontend flows and UI for scenario-based support and resource recommendations.',
        'Focused on safety, escalation, and clear communication around limitations of the system.',
      ],
      link: 'https://github.com/arzucaner',
    },
    {
      name: 'SafeAI Academy',
      description:
        'An interactive web platform that teaches AI safety concepts, risks, and ethical decision-making through scenarios and quizzes.',
      role: 'Frontend developer',
      technologies: ['React'],
      contributions: [
        'Built a React-based UI with real-world scenarios and an AI safety quiz.',
        'Structured content to make abstract topics like bias and risk easier to grasp.',
        'Deployed the project as part of the Women in AI Safety Hackathon.',
      ],
      link: 'https://arzucaner.github.io/safeai-academy/',
    },
    {
      name: 'Accessibility Guide (Open Source)',
      description:
        'An open-source educational resource that helps developers build accessible and inclusive web applications.',
      role: 'Creator & maintainer',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      contributions: [
        'Created a comprehensive accessibility guide with tutorials, practical examples, and checklists.',
        'Covered key topics such as screen reader support, keyboard navigation, colour contrast, and form validation.',
        'Encouraged community contributions and positioned the project as a starting point for accessible web design.',
      ],
      link: 'https://arzucaner.github.io/web-accessibility-guide/',
    },
    {
      name: 'KnittMates – Knitting Calculator & Companion',
      description:
        'A mobile and web experience that helps knitters calculate stitches and rows, track projects, and find calm through crafting.',
      role: 'Product creator & developer',
      technologies: ['React Native', 'Expo'],
      contributions: [
        'Designed and built a knitting companion app that combines practical calculators with a soothing, supportive UX.',
        'Implemented project planning and tracking features tailored to hobbyist knitters.',
        'Published the app to Google Play, handling store assets and release workflows.',
      ],
      link: 'https://play.google.com/store/apps/details?id=com.innoaits.knitmate',
    },
    {
      name: 'DevPrep',
      description:
        'A web app to help developers prepare for technical interviews with categorised questions, concise answers, role-based filters, and mini quizzes.',
      role: 'Full-stack developer',
      technologies: ['React'],
      contributions: [
        'Designed the information architecture for questions and role-based filters.',
        'Built quiz flows with real-time scoring to make practice more engaging.',
        'Focused on making the tool simple to use for juniors up to lead-level candidates.',
      ],
      link: 'https://arzucaner.github.io/devprep/',
    },
    {
      name: 'When Women Understand',
      description:
        'A social-impact website that helps women recognise physical and psychological abuse and find resources to protect themselves.',
      role: 'Frontend developer & UX collaborator',
      technologies: ['React', 'Node.js', 'MongoDB'],
      contributions: [
        'Created a clear, accessible interface around a difficult topic: recognising invisible forms of psychological abuse.',
        'Collaborated on content structure and UX to make the information approachable while still serious.',
        'Won the Outstanding Social Impact Award at WWCode Hackathon Social Good 2023.',
      ],
      link: 'https://when-women-understand.netlify.app/',
    },
    {
      name: 'TravelBrew',
      description:
        'A mobile app that helps travellers discover cosy coffee spots and places to take a break in new cities.',
      role: 'Mobile developer (hackathon project)',
      technologies: ['React Native', 'Expo'],
      contributions: [
        'Built core UI flows to browse and discover coffee places with key amenities.',
        'Collaborated with a team to define the product scope and MVP experience.',
        'Won 3rd place at the WWCode App Deploy Hackathon 2023.',
      ],
      link: 'https://github.com/arzucaner/travel-brew',
    },
    {
      name: 'Technical Writing & Content',
      description:
        'A collection of blog posts and talks focused on JavaScript, React, React Native, developer experience, learning, and career growth.',
      role: 'Author & speaker',
      technologies: ['Medium', 'YouTube', ],
      contributions: [
        'Published articles on topics such as React Native performance, debugging, learning strategies, and frontend tooling.',
        'Created video content and talks for communities like Women Coding Community, Frontend Queens, and GDG London.',
        "Used writing as a way to learn in public and support other developers' growth.",
      ],
      link: 'https://arzucaner.github.io/codearz/',
      github: 'https://arzugny.medium.com/',
    },
  ],

  skills: {
    languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
    frameworks: ['React', 'React Native', 'Node.js', 'Express'],
    databases: ['MongoDB'],
    tools: ['Git', 'Figma', 'Jira', 'Trello', 'Expo'],
    waysOfWorking: [
      'Full-stack development',
      'Hackathon-style rapid prototyping',
      'Accessibility-first mindset',
      'Mentoring and community speaking',
      'Writing docs and technical articles',
    ],
  },

  hobbies: [
    'Playing guitar and writing song lyrics',
    'Experimenting with new mobile app ideas',
    'Reading and writing about developer experience and learning',
  ],

  personality: [
    'Curious and always experimenting with new tools and ideas.',
    'Enjoys turning complex topics into something others can understand.',
    'Community-driven: mentoring, speaking, and contributing to open source.',
    'Product-minded and optimistic; happiest when shipping useful things with a team.',
  ],
  
  current: {
    workingOn: [
      'Integrating AI and multi-agent systems into web and mobile projects.',
      'Maintaining and expanding the Accessibility Guide open-source project.',
      'Exploring new ideas around mental health, safety, and ethical AI tools.',
    ],
    learning: [
      'Advanced AI and machine learning workflows for real products.',
      'Better patterns for React Native performance and architecture.',
      'Designing systems that are both developer-friendly and accessible.',
    ],
    goals: [
      'Join or continue working with a team where I can ship impactful, user-centred products end to end.',
      'Keep combining AI, accessibility, and thoughtful UX to build tools that actually help people.',
      'Mentor more developers and share my journey through talks and writing.',
    ],
  },

  links: {
    // Fill these with your real links
    email: "arzuguneycaner@gmail.com",
    website: 'https://arzucaner.github.io/codearz/',
    linkedin: 'https://www.linkedin.com/in/arzucaner/',
    github: 'https://github.com/arzucaner',
    twitter: "https://x.com/arz_ugny",
    youtube: "https://www.youtube.com/@Codearz",
    medium: "https://arzugny.medium.com/"
  },

  // Testimonials: copy short quotes from your LinkedIn recommendations or other feedback here.
  // Arzu will replace these placeholders with real text later.
  testimonials: [
    {
      quote:
        `I had the privilege of meeting Arzu through the Women Coding Community (WCC), where we both actively participate, and working with her on multiple hackathons this year. Arzu is an exceptional frontend developer and a true team player whose warmth and supportiveness shine both in person and in her professional contributions. Her expertise in frontend technologies, including TypeScript, React, Node.js, Vite etc, was instrumental in building intuitive and visually appealing user interfaces for our AI-driven applications. She took on the lion's share of frontend development, delivering clean, efficient, and polished code that brought our machine learning models to life through seamless user experiences.

What truly sets Arzu apart is her remarkable adaptability and passion for learning. She eagerly embraced new tools like Bolt.new for rapid framework generation, and Cursor for enhanced development workflows, ensuring our team stayed innovative and competitive. While she never sought the spotlight, Arzu naturally emerged as a technical leader, guiding frontend architectural decisions and helping navigate complex integration challenges between our AI backends and user interfaces.

Beyond her technical prowess, Arzu's contributions extended to finalising our hackathon deliverables. She crafted compelling PowerPoint presentations, styled videos with music, and selected cohesive colour themes for both applications and presentations, elevating the professionalism of our submissions with her creative eye and attention to detail. Her collaborative spirit, clear communication, and positive attitude fostered a supportive team environment where everyone could thrive.

Within the WCC, Arzu is a role model, consistently welcoming and supportive during in-person meetups. As a regular blogger and active LinkedIn contributor, she shares insightful posts that inspire and empower others, reflecting her dedication to knowledge-sharing and community building. Her commitment to uplifting others, particularly women in tech, makes her an exemplary figure in the WCC and beyond.

I wholeheartedly recommend Arzu for any Senior Full Stack Developer or Frontend Developer role. She is a talented, hardworking, and genuinely inspiring individual, and I would jump at the chance to work with her again!`,
      name: 'Sonika Janagill',
      role: 'Lead Engineer | Google Cloud Professional Architect | AI/ML with Vertex AI',
      source: 'LinkedIn',
      link: 'https://www.linkedin.com/in/arzucaner/',
    },
    {
      quote:
        `It's been an absolute privilege to work with Arzu Guney Caner at Mellow Kids, where she's contributed as a fractional Full Stack Developer. From day one, Arzu has gone above and beyond—not only bringing her top-tier technical expertise but also embodying the scrappy, adaptable mindset that's essential in early-stage startups.

Arzu's technical contributions have been exceptional. Her front-end work is consistently pixel-perfect, and she's taken the lead in driving our product testing (QA) and managing app submissions to both the Apple App Store and Google Play Store. She learns incredibly fast, proactively finds solutions, and is always willing to jump in wherever needed.

Beyond her technical skills, Arzu has also been an incredible thought partner in our marketing efforts. She's collaborative, respectful, highly engaged, and always listening with intention—supportive of others and never afraid to ask the hard questions that push the work forward.

What I admire most about Arzu is her quiet, natural leadership. She isn't chasing titles, but she has the qualities that naturally place her at the forefront in any team or community: courage, humility, curiosity, and the willingness to be vulnerable and keep learning. Wherever she goes, she raises the bar for those around her. We are lucky to have her on our journey.`,
      name: 'Daiany Nascimento',
      role: 'Founder/CEO',
      source: 'LinkedIn',
      link: 'https://www.linkedin.com/in/arzucaner/',
    },
    {
      quote:
        `I've the pleasure of working alongside Arzu at the Women Coding Community, and her contributions as an evangelist have been truly outstanding.

Arzu is deeply passionate about empowering women to re-enter the tech industry, sharing her personal journey through insightful blog posts and offering her expertise to others. Her hard work and dedication have enabled her to transition from a managerial role in the telecom industry to becoming a Full Stack Engineer in tech.

In addition, I have seen her work tirelessly on her own mobile app, KnittMates, which is set to launch shortly.

She is always eager to offer her support, consistently going the extra mile to ensure that every event runs smoothly and efficiently. Her enthusiasm, coupled with a strong sense of responsibility, makes her an invaluable team member.

Arzu's commitment to excellence and willingness to step in whenever needed truly sets her apart.`,
      name: 'Madhura Chaganty',
      role: 'Engineering Manager | Lead at Women Coding Community',
      source: 'LinkedIn',
      link: 'https://www.linkedin.com/in/arzucaner/',
    },
    {
      quote:
        `I've the pleasure of working alongside Arzu at the Women Coding Community, and her contributions as an evangelist have been truly outstanding.

Arzu is deeply passionate about empowering women to re-enter the tech industry, sharing her personal journey through insightful blog posts and offering her expertise to others. Her hard work and dedication have enabled her to transition from a managerial role in the telecom industry to becoming a Full Stack Engineer in tech.

In addition, I have seen her work tirelessly on her own mobile app, KnittMates, which is set to launch shortly.

She is always eager to offer her support, consistently going the extra mile to ensure that every event runs smoothly and efficiently. Her enthusiasm, coupled with a strong sense of responsibility, makes her an invaluable team member.

Arzu's commitment to excellence and willingness to step in whenever needed truly sets her apart.`,
      name: 'Sonali Goel',
      role: 'Senior Software Development Engineer | Certified AWS Solution Architect | Lead at Women Coding Community',
      source: 'LinkedIn',
      link: 'https://www.linkedin.com/in/arzucaner/',
    },
    {
      quote:
        `I've had the pleasure of working with Arzu, and I can confidently say she is one of the most collaborative, approachable, and genuinely positive people I've worked with. No matter how busy she is, Arzu is always available to support her teammates, share her knowledge, and help move projects forward with care and attention.

Her enthusiasm for technology is infectious—whether it's full-stack development, mobile apps, or AI integration, Arzu approaches every challenge with curiosity and determination. She's also an incredibly thoughtful team player who brings a strong sense of community to any group she's part of.

What really stands out is her positive attitude. Even when things get tough, Arzu remains calm, constructive, and focused on solutions. She's the kind of person who lifts team morale just by being there.

I'm especially inspired by her commitment to inclusive tech and women's empowerment, and how she balances her technical work with impactful initiatives and open-source contributions.

Any team would be lucky to have her!`,
      name: 'Letizia Sorrentino',
      role: 'Frontend Developer',
      source: 'LinkedIn',
      link: 'https://www.linkedin.com/in/arzucaner/',
    },
  ],

  // FAQ: Add patterns and answers for specific questions
  // You can add more entries here to handle common free-form questions
  faq: [
    {
      patterns: ['why did you switch from seo', 'career change'],
      answer:
        'I moved from SEO into software development in 2022 because I wanted to build products directly, not just optimise them. I transferred my analytical and communication skills into engineering and started learning full-stack development.',
    },
    {
      patterns: ['mentoring', 'do you mentor', 'can you mentor me'],
      answer:
        'Yes, I mentor developers through Women Coding Community and other spaces. You can ask me about mentorship via the **Contact & links** quick action.',
    },
  ],
}
