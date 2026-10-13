import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Display, Reveal } from '../components/Motion'
import { Lightbox } from '../components/Lightbox'
import { photos, photoSrc } from '../data/photos'
import { useMediaQuery, usePageTitle } from '../hooks'

export default function Photography() {
  usePageTitle('Photography')
  const [open, setOpen] = useState<number | null>(null)
  const narrow = useMediaQuery('(max-width: 700px)')
  const n = narrow ? 2 : 3

  // distribute round-robin into column stacks so reading order stays left-to-right
  const cols = Array.from({ length: n }, (_, c) => photos.map((p, i) => ({ p, i })).filter(({ i }) => i % n === c))

  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)), [])
  const close = useCallback(() => setOpen(null), [])

  return (
    <>
      <section className="page-head">
        <Display as="h1" top="Through" bottom="The Lens" />
        <Reveal delay={0.15}>
          <p className="lead">A personal collection: travels, skies, small moments and good food.</p>
        </Reveal>
      </section>

      <div className="gallery">
        {cols.map((col, ci) => (
          <div className="gallery__col" key={ci}>
            {col.map(({ p, i }) => (
              <Reveal key={p.file} delay={(i % 6) * 0.05}>
                <button onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`}>
                  <img src={photoSrc(p)} alt={p.caption} loading="lazy" decoding="async" width={675} height={900} />
                  <span className="gallery__cap">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {p.caption}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>{open !== null ? <Lightbox index={open} onClose={close} onStep={step} /> : null}</AnimatePresence>
    </>
  )
}
