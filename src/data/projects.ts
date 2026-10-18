export type Track = 'gentraclabs' | 'tcs' | 'jio'

/** Which generative cover to draw for a project. See components/ProjectCover.tsx. */
export type CoverKind =
  | 'chart'
  | 'bilirubin'
  | 'iris'
  | 'graph'
  | 'xray'
  | 'face'
  | 'tokens'
  | 'mask'
  | 'wave'
  | 'enrol'
  | 'squeeze'
  | 'tap'
  | 'wall'
  | 'booklet'
  | 'clauses'

/**
 * Optional deeper write-up shown under the body on the detail page. Only for projects with
 * genuinely distinct parts; most projects need none. `points` renders as a numbered list.
 */
export type ProjectSection = {
  title: string
  body?: string[]
  points?: { label: string; text: string }[]
}

export type Project = {
  slug: string
  title: string
  kicker: string
  track: Track
  featured?: boolean
  badge?: string
  summary: string
  body: string[]
  sections?: ProjectSection[]
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
      "A colour-rectification engine for non-invasive clinical AI. It turns the camera-native RGB of an eye photograph into CIE XYZ/Lab, so anemia and jaundice models read true tissue colour rather than each phone's own interpretation of it.",
      'Exposure-invariant root-polynomial CCMs are fitted per device from spectrophotometer-calibrated sessions and pooled in a per-sensor profile registry. A phone with no exact profile is matched by sensor fingerprint, and the result is labelled lower-trust.',
    ],
    sections: [
      {
        title: 'Three ways in',
        points: [
          {
            label: 'RAW flash/no-flash pair',
            text: 'The reference path. Exposure-normalised subtraction of the ambient frame, strictly in linear space, leaves the flash as the only light: a known illuminant. The device CCM then maps the capture to absolute Lab.',
          },
          {
            label: 'Ambient RAW + NormaCard',
            text: 'No flash, so a reference card beside the eye measures the light instead. Its patches fit three von Kries gains on top of the device CCM, or a full 3×3 when the phone has no profile.',
          },
          {
            label: 'JPEG + NormaCard',
            text: "The degraded fallback for phones without RAW. The card's neutral ramp recovers the phone's global tone curve and inverts it before the same card correction runs. Clipped, non-monotonic or locally tone-mapped images are refused.",
          },
        ],
      },
      {
        title: 'Refuse, never guess',
        body: [
          'The order of trust is fixed: control the light, else measure it, never estimate it. Every capture is gated on the ambient-to-flash ratio, the corneal catchlight against the white point, scleral chroma (skipped for jaundice, where a yellow sclera is the signal) and clipping judged on the source frames. A NaN fails closed.',
          'A refusal is a structured result with its reasons, not an exception: every sample comes back ok, provisional, relative or refused. An override can relax tolerances, but never accept an unverified card, an expired print batch or an empty region. Calibration is gated the same way, so a blurred chart, bad geometry, clipped patches or high residuals stop a profile from ever being written.',
        ],
      },
      {
        title: 'NormaCard v8',
        body: [
          "A small printed reference card designed at GentracLabs. Ten of its twelve patches sit on the colours the models care about (conjunctival pallor, scleral icterus, nail-bed tones), beside a six-step neutral ramp that is the card's only white point.",
          'The engine finds the card on its own: ArUco fiducials give its pose, a printed QR confirms the revision, and every patch is read by position. A mirrored, bent, duplicated, under-resolved or unverifiable card is refused outright. Truth is measured per print batch with a spectrophotometer and carries an expiry, so an aged card cannot pass for a fresh one.',
        ],
      },
      {
        title: 'Next',
        body: [
          'The Python implementation is the reference and the test oracle. Next come an Android Camera2 RAW capture app, real flash/no-flash pairs and an illuminant-robustness study, then freezing the method for an on-device Rust port.',
        ],
      },
    ],
    result:
      'Real-world cross-device error: mean ΔE2000 14.2 → 5.9 across 600 measurements (6 phones × 5 lighting conditions); ΔE2000 < 2 on the controlled path.',
    stack: [
      'RAW / DNG',
      'CIE Lab · ΔE2000',
      'Root-Poly CCM',
      'Bradford CAT',
      'von Kries',
      'Tone-curve inversion',
      'ArUco + QR',
      'NumPy / SciPy',
      'OpenCV',
      'NormaCard v8',
    ],
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
    slug: 'dgca-policy-matcher',
    title: 'Policy Matcher · DGCA',
    kicker: 'Multi-agent compliance matching on Bedrock',
    track: 'tcs',
    badge: 'Multi-agent · Bedrock',
    summary:
      "Matches third-party vendors' terms against the aviation regulator's policy: full, partial or no match, rolled into one priority-weighted score.",
    body: [
      "Built for DGCA, India's civil aviation regulator. Policy documents live in Amazon S3; LlamaParse turns them into clean, structured text, which is embedded and indexed in an Amazon Bedrock Knowledge Base for retrieval.",
      'When a third-party vendor submits its terms, an orchestrator agent on Claude Sonnet coordinates three specialist agents that check every clause against the policy corpus two ways: lexical matching for exact wording, and semantic, intent-level matching for clauses that say the same thing in different words.',
      'Each clause lands in one of three buckets (fully matched, partially matched, not matched) in an operator UI built for fast review, then is weighted against a priority list into a single match score. The operator makes the final call on one number, with the clause-level evidence right beside it.',
    ],
    result: 'One priority-weighted compliance score per vendor submission, backed by full / partial / no-match evidence for every clause.',
    stack: ['Amazon Bedrock', 'Claude Sonnet', 'Bedrock Knowledge Bases', 'Amazon S3', 'LlamaParse', 'Multi-agent orchestration', 'Lexical + semantic matching'],
    cover: 'clauses',
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
    slug: 'passport-seva-enrolment',
    title: 'Enrolment Stack · Passport Seva',
    kicker: 'Paperless capture at the counter',
    track: 'tcs',
    badge: '6–7 min → 30 s',
    summary: 'The full IoT capture setup behind every application: face, signature, fingerprints and documents, all digital.',
    body: [
      'Architected and delivered the complete IoT environment at the application counter: camera capture with automated ICAO 9303 / ISO/IEC 19794-5 face-image compliance checks, digital signature capture, digital fingerprint capture and a document scanner.',
      'It took paper out of every step. Thumb impressions used to be inked on paper and scanned afterwards, and supporting documents were photocopied; now each one is captured digitally, straight into the application, cutting a huge volume of printing and paper waste.',
    ],
    result: 'Per-applicant capture time cut from 6–7 minutes to about 30 seconds.',
    stack: ['IoT devices', 'ICAO 9303', 'ISO/IEC 19794-5', 'Fingerprint scanner', 'Signature pad', 'Document scanner'],
    cover: 'enrol',
  },
  {
    slug: 'passport-seva-compression',
    title: 'Compression Suite · Passport Seva',
    kicker: 'Three purpose-built codecs',
    track: 'tcs',
    badge: 'Up to 10× smaller',
    summary: 'Three compression algorithms for photos, scanned PDFs and fingerprints, shrinking each 7–10×.',
    body: [
      'Wrote three compression algorithms, one for each kind of data the platform stores: applicant images, scanned PDF documents, and biometric fingerprints converted to WSQ, the FBI-standard wavelet codec for fingerprint images.',
      'Smaller payloads everywhere: an enormous amount of server storage saved, and far faster syncing between the primary data centre and the disaster-recovery site.',
    ],
    result: 'Images ≈8× smaller, scanned PDFs ≈7×, fingerprints (WSQ) ≈10×.',
    stack: ['Image compression', 'PDF compression', 'WSQ (FBI standard)', 'DC–DR sync'],
    cover: 'squeeze',
  },
  {
    slug: 'passport-seva-payments',
    title: 'Digital Payments · Passport Seva',
    kicker: 'Cashless at the counter',
    track: 'tcs',
    summary: 'A payment machine wired into the application flow: debit and credit cards, QR, NFC and UPI.',
    body: [
      'Architected and implemented a payment machine integrated with the Passport Seva application, so applicants can pay digitally by debit card, credit card, QR code, NFC tap or UPI.',
      'Fast, fully digital payments with no cash changing hands, built to shut out fraud and keep every transaction secure.',
    ],
    stack: ['Payment terminal', 'Debit & credit cards', 'UPI QR', 'NFC'],
    cover: 'tap',
  },
  {
    slug: 'passport-print-qc',
    title: 'Print & Verify · Passport Seva',
    kicker: 'ICAO 9303 personalisation & verification',
    track: 'tcs',
    badge: 'Manual QC → automated',
    summary: 'Drove the personalisation printers and automated QC: the eMRTD chip verified against MRZ, barcode, LSI token and ghost image.',
    body: [
      'Personalisation: owned everything at the physical level of the passport printers, from the inputs each printer needs and the data-page formatting to hardware error handling, and passed clean job and device status up to the operator application.',
      'Quality check: replaced a manual inspection that had been open to fraud with automated ICAO 9303 verification. A passport reader pulls the eMRTD chip data and matches it against everything printed on the data page: the MRZ, the barcode data, the LSI token and the ghost image. Passive authentication then confirms the chip\'s keys and hash values, and each passport is ruled a pass, a fail or a flag for human review.',
      'Scope: the device and verification layer was mine; the application screens that show these results were built by another team.',
    ],
    stack: ['ICAO 9303', 'eMRTD chip', 'Passive authentication', 'MRZ', 'Barcode match', 'LSI token', 'Ghost image', 'Personalisation printers'],
    cover: 'booklet',
  },
  {
    slug: 'firewall-access-console',
    title: 'Firewall Access Console',
    kicker: 'LDAP access control, without the shell',
    track: 'tcs',
    summary: 'A MERN app that turned a day of risky firewall CLI work into a few clicks for the network team.',
    body: [
      "Passport Seva's infrastructure firewall is tied to every user's LDAP account. Revoking access or acting on a user meant running Bash scripts and proprietary commands by hand on the Linux VM hosting the firewall, where one changed command could ripple across the whole system.",
      'Built a MERN application tightly integrated with the firewall APIs, behind a friendly UI: people sign in with their own LDAP credentials and, depending on their privileges, take the available actions on other LDAP accounts.',
    ],
    result: 'Work that took experienced engineers a whole day became something a newcomer to the network team could do.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'LDAP', 'Firewall APIs'],
    cover: 'wall',
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
  {
    slug: 'capcam',
    title: 'CAPCAM',
    kicker: 'Chest X-ray AI',
    track: 'jio',
    summary: 'Weakly supervised multi-disease localisation across 13 thoracic pathologies.',
    body: [
      'A Confidence-Aware Probabilistic Class Activation Map localises 13 thoracic diseases in chest X-rays without bounding-box annotations.',
      'Built at Jio Institute. The early framework appeared at IEEE IRI 2023 and the full method in Elsevier Biomedical Signal Processing & Control, 2024.',
    ],
    result: '94% IoBB and 90% Dice on NIH + CheXpert.',
    stack: ['PyTorch', 'CAM', 'Saliency Maps'],
    cover: 'xray',
    year: '2022',
  },
]

export const trackLabel: Record<Track, string> = {
  gentraclabs: 'GentracLabs',
  tcs: 'TCS Innovation Labs',
  jio: 'Jio Institute',
}
