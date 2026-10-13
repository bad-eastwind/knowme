import { useId } from 'react'
import type { CoverKind } from '../data/projects'

/**
 * Generative, hand-drawn SVG covers — one motif per project, all in the site palette.
 * No screenshots needed; each motif hints at the underlying method.
 */
export function ProjectCover({ kind, title }: { kind: CoverKind; title: string }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label={`${title} cover`}>
      {art(kind, uid)}
    </svg>
  )
}

const O = '#F26B3A'
const L = '#D7F75B'
const P = '#F4EFEA'
const D = '#1B1816'
const I = '#171412'

function art(kind: CoverKind, id: string) {
  switch (kind) {
    case 'chart': {
      // ColorChecker-style patch grid
      const sw = ['#7a4a3a', '#c6927c', '#5d7b9d', '#5a6c3c', '#8380b1', '#62bcae', '#e27f2c', '#4a5ba8', '#c45a62', '#5c3c6b', '#9dbc40', '#e6a32e', '#2f3d8f', '#4a944a', '#b03a33', '#ecc42a', '#bb5596', '#1a86a8', '#f3f1ea', '#c9c8c2', '#a09f9a', '#787772', '#53524f', '#2d2d2b']
      return (
        <>
          <rect width="100" height="100" fill={D} />
          {sw.map((c, i) => (
            <rect key={i} x={13 + (i % 6) * 12.6} y={22 + Math.floor(i / 6) * 14.5} width="10.2" height="12" rx="1.6" fill={c} />
          ))}
          <rect x="9" y="18" width="82" height="64" rx="4" fill="none" stroke={O} strokeWidth="1" strokeDasharray="2 2" />
        </>
      )
    }
    case 'bilirubin':
      return (
        <>
          <defs>
            <linearGradient id={`b${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F7C25B" />
              <stop offset="0.55" stopColor="#F59A4A" />
              <stop offset="1" stopColor={O} />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill={`url(#b${id})`} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={`M-5 ${18 + i * 12} Q 25 ${12 + i * 12} 50 ${18 + i * 12} T 105 ${18 + i * 12}`} fill="none" stroke={I} strokeOpacity={0.12 + i * 0.05} strokeWidth="1.1" />
          ))}
          <circle cx="50" cy="26" r="9" fill={P} fillOpacity="0.85" />
          <rect x="38" y="38" width="24" height="40" rx="12" fill={P} fillOpacity="0.55" />
        </>
      )
    case 'iris':
      return (
        <>
          <rect width="100" height="100" fill={P} />
          {[40, 33, 26, 19].map((r, i) => (
            <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={O} strokeOpacity={0.25 + i * 0.18} strokeWidth={i === 0 ? 0.8 : 1.2} />
          ))}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i / 36) * Math.PI * 2
            return <line key={i} x1={50 + Math.cos(a) * 12} y1={50 + Math.sin(a) * 12} x2={50 + Math.cos(a) * 25} y2={50 + Math.sin(a) * 25} stroke="#c24d24" strokeOpacity="0.45" strokeWidth="0.7" />
          })}
          <circle cx="50" cy="50" r="11" fill={I} />
          <circle cx="46" cy="46" r="3" fill={P} />
          <path d="M8 50 Q 50 8 92 50 Q 50 92 8 50Z" fill="none" stroke={I} strokeWidth="1.4" />
        </>
      )
    case 'graph': {
      const n = [
        [22, 28], [50, 18], [78, 30], [32, 55], [62, 50], [84, 66], [20, 80], [50, 82], [72, 86],
      ]
      const e = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 4], [4, 5], [3, 6], [3, 7], [4, 7], [7, 8], [5, 8]]
      return (
        <>
          <rect width="100" height="100" fill={L} />
          {e.map(([a, b], i) => (
            <line key={i} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke={I} strokeOpacity="0.55" strokeWidth="1" />
          ))}
          {n.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 4 ? 6 : 3.4} fill={i === 4 ? O : I} />
          ))}
          <circle cx="62" cy="50" r="11" fill="none" stroke={I} strokeDasharray="2 2" />
        </>
      )
    }
    case 'xray':
      return (
        <>
          <defs>
            <radialGradient id={`x${id}`} cx="0.64" cy="0.46" r="0.28">
              <stop offset="0" stopColor={O} stopOpacity="0.95" />
              <stop offset="0.55" stopColor="#F7C25B" stopOpacity="0.4" />
              <stop offset="1" stopColor={O} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill={I} />
          <line x1="50" y1="12" x2="50" y2="90" stroke={P} strokeOpacity="0.35" strokeWidth="3" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} fill="none" stroke={P} strokeOpacity={0.32 - i * 0.03} strokeWidth="2">
              <path d={`M48 ${24 + i * 10} Q 26 ${20 + i * 10} 18 ${36 + i * 10}`} />
              <path d={`M52 ${24 + i * 10} Q 74 ${20 + i * 10} 82 ${36 + i * 10}`} />
            </g>
          ))}
          <rect width="100" height="100" fill={`url(#x${id})`} />
          <rect x="54" y="34" width="22" height="24" fill="none" stroke={L} strokeWidth="1" />
        </>
      )
    case 'face': {
      const pts: [number, number][] = []
      for (let r = 0; r < 9; r++)
        for (let c = 0; c < 9; c++) {
          const x = 20 + c * 7.5
          const y = 14 + r * 9
          if (((x - 50) / 28) ** 2 + ((y - 50) / 38) ** 2 <= 1) pts.push([x, y])
        }
      return (
        <>
          <rect width="100" height="100" fill={O} />
          <ellipse cx="50" cy="50" rx="30" ry="40" fill="none" stroke={I} strokeOpacity="0.4" strokeWidth="1" />
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.3" fill={I} fillOpacity="0.7" />
          ))}
          <path d="M8 8h12M8 8v12M92 8H80M92 8v12M8 92h12M8 92V80M92 92H80M92 92V80" stroke={I} strokeWidth="2" />
        </>
      )
    }
    case 'tokens': {
      const rows = [
        [14, 22, 10, 18],
        [20, 12, 26],
        [10, 16, 14, 20],
        [24, 18, 12],
        [12, 20, 16, 10],
      ]
      const hl: Record<string, string> = { '0-1': O, '1-2': L, '2-3': O, '3-0': L, '4-2': O }
      return (
        <>
          <rect width="100" height="100" fill={D} />
          {rows.map((r, ri) => {
            let x = 12
            return r.map((w, ci) => {
              const el = <rect key={`${ri}-${ci}`} x={x} y={16 + ri * 15} width={w} height="9" rx="3" fill={hl[`${ri}-${ci}`] ?? '#3d3835'} />
              x += w + 4
              return el
            })
          })}
        </>
      )
    }
    case 'mask':
      return (
        <>
          <defs>
            <clipPath id={`m${id}`}>
              <rect x="50" y="0" width="50" height="100" />
            </clipPath>
          </defs>
          <rect width="100" height="100" fill={P} />
          <path d="M50 14 C 72 14 80 34 78 52 C 76 72 64 86 50 86 C 36 86 24 72 22 52 C 20 34 28 14 50 14Z" fill="none" stroke={I} strokeWidth="1.4" />
          <path d="M50 14 C 72 14 80 34 78 52 C 76 72 64 86 50 86 C 36 86 24 72 22 52 C 20 34 28 14 50 14Z" fill={L} clipPath={`url(#m${id})`} />
          <path d="M50 14 C 72 14 80 34 78 52 C 76 72 64 86 50 86" fill="none" stroke={O} strokeWidth="2.6" />
          <line x1="50" y1="6" x2="50" y2="94" stroke={I} strokeDasharray="2 2" strokeWidth="0.8" />
        </>
      )
    case 'wave':
      return (
        <>
          <rect width="100" height="100" fill={I} />
          {[25, 45, 65, 85].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} stroke={P} strokeOpacity="0.06" />
          ))}
          <path d="M0 62 C 8 54 14 66 22 58 S 34 50 42 60 S 52 66 58 56 S 66 50 72 58" fill="none" stroke={L} strokeWidth="1.8" />
          <path d="M72 58 L 78 24 L 84 60 S 94 52 100 58" fill="none" stroke={O} strokeWidth="1.8" />
          <circle cx="78" cy="24" r="4" fill={O} />
          <circle cx="78" cy="24" r="8" fill="none" stroke={O} strokeOpacity="0.5" />
          <line x1="0" x2="100" y1="36" y2="36" stroke={O} strokeDasharray="3 3" strokeOpacity="0.6" strokeWidth="0.8" />
        </>
      )
  }
}
