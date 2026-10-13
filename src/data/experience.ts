export type Metric = { value: string; label: string }

export type Role = {
  id: string
  org: string
  orgShort: string
  title: string
  start: string
  /** null = ongoing. Both GentracLabs and TCS are concurrent, ongoing posts. */
  end: string | null
  location?: string
  summary?: string
  focus: string[]
  metrics?: Metric[]
  highlights?: { title: string; body: string }[]
  /** Major roles get the full treatment; earlier roles render as compact rows. */
  major: boolean
}

export const roles: Role[] = [
  {
    id: 'gentraclabs',
    org: 'GentracLabs',
    orgShort: 'GL',
    title: 'AI Research Architect & Developer',
    start: 'Jun 2026',
    end: null,
    summary:
      'Architect and builder of the non-invasive clinical imaging stack: screening disease from an ordinary photograph rather than a blood draw. Three end-to-end systems delivered in the first months. The through-line is that the optics live inside the method. Light transport and tissue reflectance shape the objective itself, instead of being left for a network to rediscover from data.',
    focus: ['Colour Science', 'Physics-Guided ML', 'Self-Supervised Segmentation', 'RAW / DNG', 'CIE Lab', 'Clinical AI'],
    metrics: [
      { value: '3', label: 'Systems delivered' },
      { value: '2.4×', label: 'Colour-error cut' },
      { value: '0.90', label: 'Cross-site AUC' },
    ],
    highlights: [
      {
        title: 'Colour science & device physics',
        body: 'NormaEngine uses no neural network anywhere, only optics and linear algebra: ambient subtraction from a flash/no-flash RAW pair, an exposure-invariant root-polynomial CCM into CIE XYZ/Lab, and a per-sensor profile registry. A consistency gate refuses a reading rather than guessing it.',
      },
      {
        title: 'Physics-guided learning',
        body: 'Neonatal jaundice from a whole-body photograph. Melanin and bilirubin scatter light differently, and that difference is written into the training objective, forcing the model to separate skin tone from bilirubin instead of correlating with it.',
      },
      {
        title: 'Ocular screening at scale',
        body: 'Haemoglobin estimated from conjunctival pallor, then thresholded against WHO cutoffs by sex and age. Regress-then-classify holds steady across cohorts at 72% and 19% anemia prevalence, with cross-site AUC 0.90 training in India and testing in Italy.',
      },
    ],
    major: true,
  },
  {
    id: 'tcs',
    org: 'TCS Innovation Labs',
    orgShort: 'TCS',
    title: 'AI Engineer / Researcher',
    start: 'Oct 2022',
    end: null,
    location: 'Kolkata',
    summary:
      'Working across the full AI stack, from publishing novel architectures in peer-reviewed venues to deploying them in production systems used by millions. Focus areas: generative AI pipelines, medical computer vision, biometric identity systems, NLP and edge AI.',
    focus: ['PyTorch', 'LLM Systems', 'RAG', 'Computer Vision', 'Biometrics', 'Edge AI', 'FastAPI', 'React'],
    metrics: [
      { value: '2', label: 'Patents pending' },
      { value: '18×', label: 'Latency reduction' },
      { value: '91%', label: 'Mean IoU' },
    ],
    highlights: [
      {
        title: 'Generative AI & LLMs',
        body: 'An enterprise Hybrid RAG pipeline for Passport Seva policy intelligence on GPT-5.4 Pro / DeepSeek-V3, NV-Embed-v2, Qdrant and Qwen3-Reranker-8B, with Lakera Guard, FSDP2 and vLLM PagedAttention. Plus agentic form automation: RAG → LLM → JSON → React Hook Form.',
      },
      {
        title: 'Biometric systems',
        body: 'Multimodal biometrics (fingerprint, signature, face) in Passport Seva with real-time UIDAI/Aadhaar authentication, and DigiYatra facial recognition for airport check-in with biometric tokenisation at scale.',
      },
      {
        title: 'Patent-track CV & NLP',
        body: 'A lightweight encoder-decoder with boundary-aware loss at 91% mIoU across 3 domains, and a SpaCy NER pipeline on 120K+ logistics documents at 89% F1, quantised from 180ms to 10ms on x86.',
      },
    ],
    major: true,
  },
  {
    id: 'jio',
    org: 'Jio Institute',
    orgShort: 'JIO',
    title: 'Research Intern',
    start: 'Jan 2022',
    end: 'Jul 2022',
    location: 'Navi Mumbai',
    focus: [],
    major: false,
  },
  {
    id: 'seethos',
    org: 'Seethos',
    orgShort: 'SE',
    title: 'Data Analyst Intern',
    start: 'Feb 2021',
    end: 'Jun 2021',
    summary: 'Data analysis and insights.',
    focus: [],
    major: false,
  },
  {
    id: 'srm',
    org: 'SRM Films',
    orgShort: 'SRM',
    title: 'Video Editor & Motion Graphics',
    start: 'Jan 2020',
    end: 'Oct 2020',
    location: 'Mumbai',
    focus: [],
    major: false,
  },
]

export type Education = { id: string; school: string; degree: string; period: string; detail: string }

export const education: Education[] = [
  {
    id: 'gcelt',
    school: 'Govt. College of Engineering & Leather Technology, Kolkata',
    degree: 'B.Tech in Information Technology',
    period: '2018 – 2022',
    detail: 'CGPA 8.5 / 10',
  },
  {
    id: 'hsms',
    school: 'Hem Sheela Model School, Durgapur',
    degree: 'Higher Secondary (Pure Science)',
    period: '2015 – 2017',
    detail: 'CBSE · CGPA 8.0 / 10',
  },
  {
    id: 'avm',
    school: 'Aurobindo Vidyamandir, Durgapur',
    degree: 'Secondary (Class X)',
    period: '2015',
    detail: 'ICSE · 92%',
  },
]

export const currentRoles = roles.filter((r) => r.end === null)
