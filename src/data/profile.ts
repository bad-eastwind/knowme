/**
 * Profile — the single source of truth for identity, links and headline copy.
 * Counts shown on the site (publications, patents, years) are derived from the
 * other data files, never typed by hand. See src/data/stats.ts.
 */
export const profile = {
  name: 'Anwesh Kabiraj',
  firstName: 'Anwesh',
  lastName: 'Kabiraj',
  initials: 'AK',
  /** Drop a square-ish photo at public/portrait.jpg and it replaces the monogram. */
  portrait: '/portrait.jpg',
  /** Full-height crop for the phone cover on Home; only phones download it. */
  portraitTall: '/portrait-tall.jpg',
  headlineTop: 'AI Research',
  headlineBottom: 'Architect',
  tagline: 'Building explainable AI for clinical imaging and production LLM systems.',
  intro:
    'Applied researcher and engineer translating novel architectures from papers into systems that actually ship. I work on medical image analysis, physics-guided vision and production LLM systems, and I care about AI that is explainable, efficient and useful, not just benchmark-optimised.',
  location: 'Vile Parle East, Mumbai, India',
  email: 'anweshkabiraj@icloud.com',
  phone: '+91 89670 87246',
  status: 'Open to research collaborations',
  /** Year AI work started — drives the "years in AI" stat. */
  careerStart: new Date('2022-01-01'),
  cv: '/files/Anwesh_Kabiraj_Resume18May.pdf',
  links: {
    github: 'https://github.com/bad-eastwind',
    scholar: 'https://scholar.google.com/citations?hl=en&user=53iw2xoAAAAJ',
    linkedin: 'https://www.linkedin.com/in/anweshkabiraj/',
  },
} as const

export const focusAreas = [
  {
    id: 'clinical',
    title: 'Clinical imaging, physics-guided ML',
    blurb: 'Colour science and optics written into the objective, so a phone camera becomes a measuring instrument.',
    tone: 'orange' as const,
    to: '/projects?track=gentraclabs',
  },
  {
    id: 'llm',
    title: 'LLM systems, RAG & agentic AI',
    blurb: 'Hybrid retrieval, guarded inference and agentic automation in production for government platforms.',
    tone: 'lime' as const,
    to: '/projects?track=tcs',
  },
]
