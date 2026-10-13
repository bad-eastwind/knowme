export type PubKind = 'journal' | 'conference'

export type Publication = {
  id: string
  kind: PubKind
  title: string
  area: string
  summary: string
  venue: string
  publisher: 'IEEE' | 'Springer' | 'Elsevier'
  year: number
  meta: string
  highlight: string
}

/**
 * Add a paper here and every count on the site updates by itself
 * (hero stats, research heading, recognition, meta description).
 */
export const publications: Publication[] = [
  {
    id: 'capcam-bspc',
    kind: 'journal',
    title: 'CAPCAM: Weakly Supervised Multi-Disease Detection & Localization from Thoracic X-Rays',
    area: 'Medical AI',
    summary:
      'A Confidence-Aware Probabilistic Class Activation Map architecture for multi-disease localisation in chest X-rays without annotated labels, across 13 thoracic diseases on NIH and Stanford CheXpert.',
    venue: 'Biomedical Signal Processing & Control',
    publisher: 'Elsevier',
    year: 2024,
    meta: 'Journal',
    highlight: '94% IoBB · 90% Dice',
  },
  {
    id: 'cx-ultranet-hat',
    kind: 'journal',
    title: 'CX-Ultranet: Multi-Thoracic Disease Detection via EfficientNet Compound Scaling',
    area: 'Medical AI',
    summary:
      'Channel shuffling, skip connections and multiclass cross-entropy for simultaneous classification of 13 thoracic disorders. Outperformed SOTA models by up to 15% with 30% less training time.',
    venue: 'Health and Technology, Vol. 14',
    publisher: 'Springer',
    year: 2024,
    meta: 'Journal',
    highlight: '88% avg. accuracy',
  },
  {
    id: 'srgan-mtap',
    kind: 'journal',
    title: 'SRGAN-Based Number Plate Recognition from Super-Resolved Degraded Images',
    area: 'Computer Vision',
    summary:
      'A modified SRGAN with Residual-in-Residual Dense Blocks for licence-plate super-resolution feeding an OCR pipeline. Character detection on severely degraded images rose from 4–6% to 84–90%.',
    venue: 'Multimedia Tools & Applications, Vol. 82',
    publisher: 'Springer',
    year: 2023,
    meta: 'Journal',
    highlight: '84–90% accuracy',
  },
  {
    id: 'capcam-iri',
    kind: 'conference',
    title: 'Weakly Supervised Confidence Aware Probabilistic CAM for Thorax Anomaly Localization',
    area: 'Medical AI',
    summary:
      'The early framework combining CAN and ADN for weakly supervised anomaly localisation on large-scale CXR benchmarks, later extended into the CAPCAM journal paper.',
    venue: 'IEEE IRI 2023',
    publisher: 'IEEE',
    year: 2023,
    meta: 'pp. 309–314',
    highlight: 'Precursor to CAPCAM',
  },
  {
    id: 'cx-ultranet-isvc',
    kind: 'conference',
    title: 'Detection & Classification of Lung Disease via Deep Learning from X-Ray Images',
    area: 'Medical AI',
    summary:
      'The original CX-Ultranet architecture for 13-class thoracic disease classification at significantly reduced FLOPs; the foundation for the extended journal paper.',
    venue: 'ISVC 2022',
    publisher: 'Springer',
    year: 2022,
    meta: 'LNCS Vol. 13598',
    highlight: '88% accuracy',
  },
  {
    id: 'pandal-comsys',
    kind: 'conference',
    title: 'Does Random Hopping Ensure More Pandal Visits Than Planned Pandal Hopping?',
    area: 'Algorithms',
    summary:
      'Probabilistic graph analysis of random vs. planned visitor traversal across Durga Puja pandals, modelling stochastic and deterministic hopping strategies to compare unique visit counts.',
    venue: 'COMSYS 2022',
    publisher: 'Springer',
    year: 2022,
    meta: 'LNNS · pp. 31–40',
    highlight: 'Graph probability',
  },
  {
    id: 'lockdown-indicon',
    kind: 'conference',
    title: 'How Successful is a Lockdown During a Pandemic?',
    area: 'Epidemiology',
    summary:
      'SIRD epidemiological modelling on COVID-19 data from 37 US states, showing that a hard lockdown followed by a disciplined soft lockdown significantly curbs R₀.',
    venue: 'IEEE INDICON 2020',
    publisher: 'IEEE',
    year: 2020,
    meta: '37 US states',
    highlight: 'SIRD modelling',
  },
]

export type Patent = { id: string; title: string; body: string; status: string; metrics: { value: string; label: string }[] }

export const patents: Patent[] = [
  {
    id: 'seg',
    title: 'Lightweight Encoder-Decoder Segmentation Architecture',
    body: 'Custom boundary-aware loss function, generalised across 3 additional segmentation domains beyond the original task.',
    status: 'Under evaluation · TCS 2026',
    metrics: [
      { value: '91%', label: 'mIoU' },
      { value: '3+', label: 'Domains' },
    ],
  },
  {
    id: 'ner',
    title: 'Edge-Optimised SpaCy NER Pipeline',
    body: 'Trained on 120K+ annotated logistics documents across 8 entity types; quantised and exported to x86 edge hardware.',
    status: 'Under evaluation · TCS 2026',
    metrics: [
      { value: '18×', label: 'Latency cut' },
      { value: '89%', label: 'F1' },
    ],
  },
]

export const honours = [
  {
    id: 'ibm',
    title: 'IBM Wall of Fame 2020',
    body: 'IBM Master the Mainframe · Top 100 global finishers, featured on the official IBM Wall of Fame.',
  },
  {
    id: 'nstse',
    title: 'Two-time Gold Medallist',
    body: 'National Science Talent Search Examination (NSTSE) · Class 7 and Class 9.',
  },
]
