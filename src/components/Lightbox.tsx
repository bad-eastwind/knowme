import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { photos, photoSrc } from '../data/photos'

export function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (d: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const p = photos[index]

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose, onStep])

  // simple swipe on touch
  const startX = useRef<number | null>(null)

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={p.caption}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return
        const dx = e.clientX - startX.current
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1)
        startX.current = null
      }}
    >
      <div className="lightbox__stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <motion.img
          key={p.file}
          src={photoSrc(p, 'full')}
          alt={p.caption}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          draggable={false}
        />
      </div>
      <div className="lightbox__bar">
        <div>
          <span>
            {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          {p.caption}
        </div>
        <div className="lightbox__ctrls">
          <button className="icon-btn" onClick={() => onStep(-1)} aria-label="Previous photo">
            <ChevronLeft size={20} />
          </button>
          <button className="icon-btn" onClick={() => onStep(1)} aria-label="Next photo">
            <ChevronRight size={20} />
          </button>
          <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
