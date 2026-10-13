import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], [data-cursor], label, select'

/** Dot + lagging ring. Only on fine pointers; the native cursor stays everywhere else. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    root.classList.add('has-cursor')

    const pos = { x: -100, y: -100 }
    const lag = { x: -100, y: -100 }
    let raf = 0
    let visible = false

    const show = (v: boolean) => {
      visible = v
      dot.current?.classList.toggle('is-hidden', !v)
      ring.current?.classList.toggle('is-hidden', !v)
    }
    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        lag.x = pos.x
        lag.y = pos.y
        show(true)
      }
      const t = e.target as Element | null
      const typing = !!t?.closest('input, textarea')
      ring.current?.classList.toggle('is-hover', !!t?.closest(INTERACTIVE) && !typing)
      dot.current?.classList.toggle('is-hidden', typing)
    }
    const onLeave = () => show(false)
    const tick = () => {
      const k = reduce ? 1 : 0.18
      lag.x += (pos.x - lag.x) * k
      lag.y += (pos.y - lag.y) * k
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    show(false)
    raf = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring is-hidden" aria-hidden="true" />
      <div ref={dot} className="cursor-dot is-hidden" aria-hidden="true" />
    </>
  )
}
