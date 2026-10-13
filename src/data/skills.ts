export type SkillCat = 'Gen AI' | 'Agents' | 'Vector' | 'ML' | 'LLMOps' | 'Backend' | 'DevOps' | 'Frontend' | 'Lang'

export type SkillNode = {
  label: string
  cat: SkillCat
  /** Relative position in the constellation (0–1). */
  rx: number
  ry: number
  size: number
  /** Indices of connected nodes. */
  links: number[]
}

export const catMeta: Record<SkillCat, { name: string; color: string }> = {
  'Gen AI': { name: 'Generative AI & LLMs', color: '#F26B3A' },
  Agents: { name: 'Agent frameworks', color: '#FF9B6B' },
  Vector: { name: 'Vector & retrieval', color: '#F7C25B' },
  ML: { name: 'ML & deep learning', color: '#D7F75B' },
  LLMOps: { name: 'Inference & LLMOps', color: '#9BE38A' },
  Backend: { name: 'Backend & APIs', color: '#7CC8F2' },
  DevOps: { name: 'DevOps & cloud', color: '#B6A6FF' },
  Frontend: { name: 'Frontend', color: '#F59AC4' },
  Lang: { name: 'Languages', color: '#F4EFEA' },
}

export const skillNodes: SkillNode[] = [
  { label: 'RAG', cat: 'Gen AI', rx: 0.42, ry: 0.12, size: 20, links: [1, 2, 5, 6, 8, 9, 10, 12, 35] },
  { label: 'Prompt Eng', cat: 'Gen AI', rx: 0.3, ry: 0.06, size: 16, links: [0, 2, 4, 5] },
  { label: 'Tool Calling', cat: 'Gen AI', rx: 0.53, ry: 0.06, size: 14, links: [0, 1, 5, 7] },
  { label: 'Fine-tuning', cat: 'Gen AI', rx: 0.25, ry: 0.2, size: 15, links: [4, 13, 15] },
  { label: 'LLM Security', cat: 'Gen AI', rx: 0.58, ry: 0.2, size: 14, links: [0, 1, 3] },
  { label: 'LangChain', cat: 'Agents', rx: 0.72, ry: 0.1, size: 17, links: [0, 1, 2, 6, 7, 8, 21] },
  { label: 'LlamaIndex', cat: 'Agents', rx: 0.84, ry: 0.17, size: 14, links: [0, 5, 7, 8, 12] },
  { label: 'LangGraph', cat: 'Agents', rx: 0.79, ry: 0.3, size: 15, links: [2, 5, 6, 24] },
  { label: 'Qdrant', cat: 'Vector', rx: 0.93, ry: 0.4, size: 15, links: [0, 5, 6, 9, 12] },
  { label: 'FAISS', cat: 'Vector', rx: 0.91, ry: 0.52, size: 13, links: [0, 8, 10] },
  { label: 'Pinecone', cat: 'Vector', rx: 0.84, ry: 0.61, size: 13, links: [0, 8, 9, 11] },
  { label: 'Weaviate', cat: 'Vector', rx: 0.93, ry: 0.63, size: 11, links: [8, 10] },
  { label: 'Reranking', cat: 'Vector', rx: 0.76, ry: 0.5, size: 13, links: [0, 6, 8] },
  { label: 'PyTorch', cat: 'ML', rx: 0.7, ry: 0.76, size: 17, links: [3, 14, 15, 17, 18, 20, 35] },
  { label: 'TensorFlow', cat: 'ML', rx: 0.6, ry: 0.88, size: 15, links: [13, 15, 19] },
  { label: 'HuggingFace', cat: 'ML', rx: 0.83, ry: 0.74, size: 15, links: [3, 13, 14, 16, 19] },
  { label: 'SpaCy', cat: 'ML', rx: 0.79, ry: 0.88, size: 12, links: [15, 19] },
  { label: 'OpenCV', cat: 'ML', rx: 0.91, ry: 0.84, size: 13, links: [13, 18] },
  { label: 'Comp. Vision', cat: 'ML', rx: 0.65, ry: 0.65, size: 16, links: [13, 17, 23] },
  { label: 'NER', cat: 'ML', rx: 0.55, ry: 0.76, size: 13, links: [14, 15, 16] },
  { label: 'vLLM', cat: 'LLMOps', rx: 0.46, ry: 0.9, size: 14, links: [13, 21, 22, 23] },
  { label: 'LangSmith', cat: 'LLMOps', rx: 0.36, ry: 0.8, size: 13, links: [5, 20, 22] },
  { label: 'W&B', cat: 'LLMOps', rx: 0.5, ry: 0.76, size: 13, links: [13, 20, 21, 23] },
  { label: 'MLflow', cat: 'LLMOps', rx: 0.41, ry: 0.65, size: 13, links: [18, 20, 22] },
  { label: 'FastAPI', cat: 'Backend', rx: 0.12, ry: 0.4, size: 16, links: [7, 25, 26, 35] },
  { label: 'Node.js', cat: 'Backend', rx: 0.07, ry: 0.53, size: 14, links: [24, 26, 27, 36] },
  { label: 'REST', cat: 'Backend', rx: 0.19, ry: 0.55, size: 12, links: [24, 25, 27] },
  { label: 'WebSockets', cat: 'Backend', rx: 0.12, ry: 0.67, size: 12, links: [25, 26] },
  { label: 'Docker', cat: 'DevOps', rx: 0.18, ry: 0.26, size: 15, links: [29, 30, 31, 38] },
  { label: 'Kubernetes', cat: 'DevOps', rx: 0.08, ry: 0.15, size: 15, links: [28, 30, 31] },
  { label: 'AWS', cat: 'DevOps', rx: 0.23, ry: 0.12, size: 14, links: [28, 29] },
  { label: 'OpenShift', cat: 'DevOps', rx: 0.09, ry: 0.3, size: 12, links: [28, 29] },
  { label: 'React', cat: 'Frontend', rx: 0.22, ry: 0.68, size: 14, links: [33, 34, 36] },
  { label: 'Next.js', cat: 'Frontend', rx: 0.2, ry: 0.8, size: 13, links: [32, 34] },
  { label: 'Tailwind', cat: 'Frontend', rx: 0.33, ry: 0.9, size: 12, links: [32, 33] },
  { label: 'Python', cat: 'Lang', rx: 0.32, ry: 0.44, size: 18, links: [0, 13, 24, 36, 37, 38] },
  { label: 'JavaScript', cat: 'Lang', rx: 0.2, ry: 0.44, size: 14, links: [25, 32, 35] },
  { label: 'C/C++', cat: 'Lang', rx: 0.26, ry: 0.57, size: 13, links: [35] },
  { label: 'Bash', cat: 'Lang', rx: 0.35, ry: 0.57, size: 12, links: [28, 35] },
]

/** Research-facing toolkit — the methods side, shown as rows on the Stack page. */
export const methods = [
  { name: 'Colour science', note: 'CIE XYZ/Lab, ΔE2000, CCMs, chromatic adaptation' },
  { name: 'Physics-guided ML', note: 'Optical priors written into the loss' },
  { name: 'Self-supervised learning', note: 'SimCLR, task-preserving augmentation' },
  { name: 'Weak supervision', note: 'CAM-based localisation without boxes' },
  { name: 'Semantic segmentation', note: 'SegFormer, boundary-aware losses' },
  { name: 'Edge AI', note: 'Quantisation, x86 export' },
]
