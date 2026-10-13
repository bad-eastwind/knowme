import { useEffect, useRef } from 'react'

/**
 * Calm background: two drifting glows (CSS), film grain (CSS) and a sparse
 * field of warm dust motes that lean gently away from the pointer.
 */
export function Ambient() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }

    type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number; hue: number }
    let motes: Mote[] = []

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(70, (w * h) / 26000))
      motes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.18 - 0.03,
        a: Math.random() * 0.35 + 0.08,
        hue: Math.random() < 0.8 ? 20 : 72,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const m of motes) {
        if (!reduce) {
          const dx = m.x - mouse.x
          const dy = m.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 140 * 140) {
            const f = (1 - Math.sqrt(d2) / 140) * 0.6
            m.x += (dx / 140) * f
            m.y += (dy / 140) * f
          }
          m.x += m.vx
          m.y += m.vy
          if (m.y < -10) {
            m.y = h + 10
            m.x = Math.random() * w
          }
          if (m.x < -10) m.x = w + 10
          if (m.x > w + 10) m.x = -10
        }
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = m.hue === 20 ? `rgba(255,160,120,${m.a})` : `rgba(215,247,91,${m.a * 0.8})`
        ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) draw()
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__glow ambient__glow--a" />
      <div className="ambient__glow ambient__glow--b" />
      <canvas ref={ref} />
      <div className="ambient__grain" />
    </div>
  )
}
