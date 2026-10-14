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
    case 'enrol':
      // fingerprint whorl under a scan line: capture at the counter, not on paper
      return (
        <>
          <rect width="100" height="100" fill={L} />
          {[6, 11, 16, 21, 26, 31, 36].map((r, i) => (
            <ellipse
              key={r}
              cx="50"
              cy="54"
              rx={r * 0.82}
              ry={r}
              fill="none"
              stroke={I}
              strokeOpacity={0.75 - i * 0.07}
              strokeWidth="1.3"
              strokeDasharray={`${18 + i * 9} ${3 + (i % 3) * 2}`}
              strokeDashoffset={i * 7}
            />
          ))}
          <line x1="10" x2="90" y1="46" y2="46" stroke={O} strokeWidth="1.6" />
          <rect x="10" y="46" width="80" height="10" fill={O} fillOpacity="0.18" />
        </>
      )
    case 'squeeze':
      // a loose grid packed into a dense block: same content, a fraction of the bytes
      return (
        <>
          <rect width="100" height="100" fill={D} />
          {Array.from({ length: 25 }).map((_, i) => (
            <rect key={i} x={10 + (i % 5) * 9} y={28 + Math.floor(i / 5) * 9} width="6" height="6" rx="1" fill={P} fillOpacity={0.14 + (i % 4) * 0.06} />
          ))}
          <path d="M58 50 H 70 M66 45 L 71 50 L 66 55" fill="none" stroke={L} strokeWidth="1.6" />
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={76 + (i % 3) * 4} y={44 + Math.floor(i / 3) * 4} width="3.4" height="3.4" fill={O} />
          ))}
        </>
      )
    case 'tap':
      // a card meeting contactless waves
      return (
        <>
          <rect width="100" height="100" fill={I} />
          <rect x="14" y="30" width="48" height="32" rx="4" fill={O} transform="rotate(-8 38 46)" />
          <rect x="21" y="40" width="10" height="8" rx="1.5" fill={L} transform="rotate(-8 38 46)" />
          {[10, 17, 24].map((r, i) => (
            <path key={r} d={`M${68 + r * 0.2} ${50 - r} A ${r} ${r} 0 0 1 ${68 + r * 0.2} ${50 + r}`} fill="none" stroke={P} strokeOpacity={0.8 - i * 0.22} strokeWidth="2" strokeLinecap="round" />
          ))}
        </>
      )
    case 'wall': {
      // a firewall with one gate in it: access granted from a UI, not a shell
      const bricks: [number, number][] = []
      for (let r = 0; r < 7; r++) for (let c = -1; c < 6; c++) bricks.push([c * 18 + (r % 2) * 9 + 6, 16 + r * 10])
      return (
        <>
          <rect width="100" height="100" fill={P} />
          {bricks.map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="16" height="8" rx="1" fill="none" stroke={I} strokeOpacity="0.35" strokeWidth="0.9" />
          ))}
          <rect x="40" y="36" width="20" height="40" rx="10" fill={L} stroke={I} strokeWidth="1.2" />
          <circle cx="50" cy="52" r="4" fill={O} />
          <rect x="48.6" y="54" width="2.8" height="9" rx="1" fill={O} />
        </>
      )
    }
    case 'booklet':
      // a data page: photo, chip, machine-readable lines, and the verdict
      return (
        <>
          <rect width="100" height="100" fill={D} />
          <rect x="16" y="20" width="68" height="56" rx="4" fill={P} />
          <rect x="22" y="27" width="16" height="20" rx="2" fill={O} fillOpacity="0.85" />
          {[28, 34, 40].map((y, i) => (
            <rect key={y} x="43" y={y} width={30 - i * 6} height="3" rx="1.5" fill={I} fillOpacity="0.35" />
          ))}
          <rect x="62" y="40" width="12" height="9" rx="1.5" fill="none" stroke="#c9a23a" strokeWidth="1.4" />
          <path d="M65 40v9M68 40v9M71 40v9M62 44.5h12" stroke="#c9a23a" strokeWidth="0.8" />
          {[58, 65].map((y) => (
            <text key={y} x="22" y={y} fontSize="5" fontFamily="monospace" fill={I} fillOpacity="0.55" letterSpacing="0.4">
              {'P<IND<<<<<<<<<<<<<'}
            </text>
          ))}
          <circle cx="80" cy="76" r="10" fill={L} />
          <path d="M75.5 76.5 l3 3 l6 -7" fill="none" stroke={I} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )
    case 'clauses': {
      // vendor clauses (left) matched to policy clauses (right): full, partial, none
      const ys = [30, 42, 54, 66]
      return (
        <>
          <rect width="100" height="100" fill={I} />
          <rect x="10" y="20" width="28" height="58" rx="3" fill={P} fillOpacity="0.1" stroke={P} strokeOpacity="0.25" />
          <rect x="62" y="20" width="28" height="58" rx="3" fill={P} fillOpacity="0.1" stroke={P} strokeOpacity="0.25" />
          {ys.map((y) => (
            <g key={y}>
              <rect x="15" y={y - 2} width="18" height="4" rx="2" fill={P} fillOpacity="0.55" />
              <rect x="67" y={y - 2} width="18" height="4" rx="2" fill={P} fillOpacity="0.55" />
            </g>
          ))}
          <path d="M34 30 C 48 30 52 30 66 30" fill="none" stroke={L} strokeWidth="1.6" />
          <path d="M34 42 C 48 42 52 54 66 54" fill="none" stroke={L} strokeWidth="1.6" />
          <path d="M34 54 C 48 54 52 42 66 42" fill="none" stroke={O} strokeWidth="1.6" strokeDasharray="3 2" />
          <path d="M44 63 l6 6 M50 63 l-6 6" stroke={O} strokeWidth="1.6" strokeLinecap="round" />
          <rect x="34" y="82" width="32" height="8" rx="4" fill={L} />
          <rect x="34" y="82" width="23" height="8" rx="4" fill={O} />
        </>
      )
    }
  }
}
