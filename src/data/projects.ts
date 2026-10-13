export type Track = 'gentraclabs' | 'tcs'

/** Which generative cover to draw for a project. See components/ProjectCover.tsx. */
export type CoverKind = 'chart' | 'bilirubin' | 'iris' | 'graph' | 'xray' | 'face' | 'tokens' | 'mask' | 'wave'

export type Project = {
  slug: string
  title: string
  kicker: string
  track: Track
  featured?: boolean
  badge?: string
  summary: string
  body: string[]
  result?: string
  stack: string[]
  cover: CoverKind
  /** Only set where the year is known for certain. */
  year?: string
}

export const projects: Project[] = [
  {
    slug: 'normaengine',
    title: 'NormaEngine',
    kicker: 'Device-independent colour',
    track: 'gentraclabs',
    featured: true,
    badge: 'Physics, not AI',
    summary: 'Clinical colour rectification with no neural network anywhere, only optics and linear algebra.',
    body: [
      'A flash/no-flash RAW pair cancels the ambient light. An exposure-invariant root-polynomial CCM then maps the now-known flash illuminant into CIE XYZ/Lab, and a per-sensor profile registry pools spectrophotometer-calibrated sessions, so any smartphone reports true tissue colour rather than its own interpretation of it.',
      'Where a capture cannot support a trustworthy reading, a consistency gate refuses it instead of guessing.',
    ],
    result:
      'Real-world cross-device error: mean ΔE2000 14.2 → 5.9 across 600 measurements (6 phones × 5 lighting conditions); ΔE2000 < 2 on the controlled path.',
    stack: ['RAW / DNG', 'CIE Lab · ΔE2000', 'Root-Poly CCM', 'Bradford CAT', 'NumPy / SciPy', 'Patient Ref. Card'],
    cover: 'chart',
    year: '2026',
  },
  {
    slug: 'neonatal-jaundice',
    title: 'Neonatal Jaundice Screening',
    kicker: 'Physics-guided learning',
    track: 'gentraclabs',
    badge: 'Patent-track',
    summary: 'Screens newborns for jaundice from a whole-body photograph, with optics in the loss.',
    body: [
      'The novelty is physical rather than architectural: melanin and bilirubin absorb and scatter light differently, and that optical difference is written into the training objective itself, so the model is forced to separate skin tone from bilirubin instead of quietly correlating with it.',
      'A cephalocaudal bilirubin field is fitted per infant, matching the head-to-toe progression clinicians already grade by, with illuminant normalisation and causal disentanglement upstream.',
    ],
    stack: ['PyTorch', 'Physics-Guided Loss', 'Causal Disentanglement', 'Illuminant Normalisation'],
    cover: 'bilirubin',
    year: '2026',
  },
  {
    slug: 'ocular-anemia',
    title: 'Ocular Anemia Detection',
    kicker: 'Haemoglobin from the eye',
    track: 'gentraclabs',
    summary: 'Estimates haemoglobin from conjunctival pallor and flags anemia against WHO cutoffs.',
    body: [
      "Estimates haemoglobin from the pallor of the eye's conjunctiva, then flags anemia against WHO cutoffs stratified by sex and age. Regressing Hgb and thresholding afterwards, rather than classifying directly, is what keeps it stable across cohorts with 72% and 19% anemia prevalence.",
      'SimCLR self-supervised pretraining on unlabelled crops (pallor-preserving augmentations only) hardens the encoder against capture conditions.',
    ],
    result: 'Cross-site AUC 0.90, training in India and testing in Italy.',
    stack: ['PyTorch', 'SegFormer', 'SimCLR SSL', 'Gradient Boosting'],
    cover: 'iris',
    year: '2026',
  },
  {
    slug: 'hybrid-rag-passport-seva',
    title: 'Hybrid RAG · Passport Seva',
    kicker: 'Policy intelligence',
    track: 'tcs',
    featured: true,
    badge: 'Production · Govt. platform',
    summary: 'Enterprise policy Q&A with hybrid retrieval, reranking and guarded, low-latency inference.',
    body: [
      'Contextual semantic chunking, metadata-aware retrieval and Qwen3-Reranker-8B reranking over Qdrant with NV-Embed-v2 embeddings.',
      'Lakera Guard for prompt-injection defence and vLLM PagedAttention for low-latency production serving. Significantly reduced hallucinations in long-context policy queries.',
    ],
    stack: ['GPT-5.4 Pro', 'DeepSeek-V3', 'Qdrant', 'NV-Embed-v2', 'LangGraph', 'vLLM'],
    cover: 'graph',
  },
  {
    slug: 'capcam',
    title: 'CAPCAM',
    kicker: 'Chest X-ray AI',
    track: 'tcs',
    summary: 'Weakly supervised multi-disease localisation across 13 thoracic pathologies.',
    body: [
      'A Confidence-Aware Probabilistic Class Activation Map localises 13 thoracic diseases in chest X-rays without bounding-box annotations.',
      'Published in Elsevier Biomedical Signal Processing & Control, 2024.',
    ],
    result: '94% IoBB and 90% Dice on NIH + CheXpert.',
    stack: ['PyTorch', 'CAM', 'Saliency Maps'],
    cover: 'xray',
    year: '2024',
  },
  {
    slug: 'digiyatra',
    title: 'DigiYatra Biometrics',
    kicker: 'Airport face recognition',
    track: 'tcs',
    summary: 'Facial recognition for seamless airport check-in with biometric tokenisation at scale.',
    body: [
      'Facial recognition for airport check-in with biometric tokenisation and cross-verification against Aadhaar/UIDAI at scale.',
      'Reduced manual verification overhead significantly.',
    ],
    stack: ['OpenCV', 'UIDAI API', 'FastAPI'],
    cover: 'face',
  },
  {
    slug: 'edge-ner',
    title: 'Edge NER Pipeline',
    kicker: 'Patent-track NLP',
    track: 'tcs',
    badge: 'Patent pending',
    summary: 'SpaCy NER on 120K+ logistics documents, quantised for x86 edge: 180ms → 10ms.',
    body: [
      'SpaCy NER trained on 120K+ logistics documents, reaching 89% F1 across 8 entity types.',
      'Quantised and exported for x86 edge hardware: 180ms → 10ms inference, removing the cloud API dependency.',
    ],
    result: '18× latency reduction at 89% F1.',
    stack: ['SpaCy', 'Quantisation', 'x86 Export'],
    cover: 'tokens',
  },
  {
    slug: 'facial-segmentation',
    title: 'Facial Segmentation',
    kicker: 'Patent-track CV',
    track: 'tcs',
    badge: 'Patent pending',
    summary: 'Lightweight encoder-decoder with boundary-aware loss, 91% mIoU across domains.',
    body: [
      'A lightweight encoder-decoder with a custom boundary-aware loss function.',
      '91% mIoU on facial-region benchmarks, generalised across 3 additional segmentation domains beyond the original task.',
    ],
    stack: ['PyTorch', 'Custom Loss', 'Segmentation'],
    cover: 'mask',
  },
  {
    slug: 'sarima-billing',
    title: 'SARIMA Billing Forecaster',
    kicker: 'Time-series anomaly detection',
    track: 'tcs',
    summary: '10+ years of billing data with tiered real-time anomaly alerting.',
    body: [
      'Forecasting on 10+ years of enterprise billing data with real-time anomaly monitoring.',
      'Tiered alerting (10L early warning / 50L critical) for enterprise-scale financial deviation detection.',
    ],
    stack: ['SARIMA', 'Time Series', 'Anomaly Detection'],
    cover: 'wave',
  },
]

export const trackLabel: Record<Track, string> = {
  gentraclabs: 'GentracLabs',
  tcs: 'TCS Innovation Labs',
}
