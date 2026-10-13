import { useEffect, useRef } from 'react'
import { skillNodes, catMeta, type SkillCat } from '../data/skills'

/**
 * Skills constellation, rebuilt: DPR-sharp canvas, ResizeObserver, pointer + touch,
 * and an optional category focus driven by the legend.
 */
export function Constellation({ focus }: { focus: SkillCat | null }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const focusRef = useRef<SkillCat | null>(focus)
  useEffect(() => {
    focusRef.current = focus
  }, [focus])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w = 0
    let h = 0
    let t = 0
    let raf = 0
    let hover: number | null = null
    let px = -1
    let py = -1
    let inView = true
    let base: { x: number; y: number }[] = []

    /**
     * The seed coordinates were tuned for a wide canvas. Here the column is narrower,
     * so nudge nodes apart until their dot+label boxes stop overlapping.
     */
    const layout = () => {
      const small = w < 560
      const scale = small ? 0.72 : 1
      const padX = small ? 34 : 48
      const padY = 34
      ctx.font = `500 ${small ? 10.5 : 12}px Poppins, sans-serif`
      const box = skillNodes.map((n) => {
        const r = n.size * scale
        return { hw: Math.max(r, ctx.measureText(n.label).width / 2) + 6, top: r + 4, bottom: r + (small ? 17 : 21) }
      })
      const pts = skillNodes.map((n) => ({ x: padX + n.rx * (w - padX * 2), y: padY + n.ry * (h - padY * 2) }))
      for (let it = 0; it < 120; it++) {
        let moved = false
        for (let i = 0; i < pts.length; i++)
          for (let j = i + 1; j < pts.length; j++) {
            const a = pts[i]
            const b = pts[j]
            const ox = box[i].hw + box[j].hw - Math.abs(a.x - b.x)
            const oy = (a.y < b.y ? box[i].bottom + box[j].top : box[j].bottom + box[i].top) - Math.abs(a.y - b.y)
            if (ox > 0 && oy > 0) {
              moved = true
              if (ox < oy) {
                const d = (ox / 2 + 0.5) * (a.x < b.x ? -1 : 1)
                a.x += d
                b.x -= d
              } else {
                const d = (oy / 2 + 0.5) * (a.y < b.y ? -1 : 1)
                a.y += d
                b.y -= d
              }
            }
          }
        for (let i = 0; i < pts.length; i++) {
          pts[i].x = Math.min(w - box[i].hw, Math.max(box[i].hw, pts[i].x))
          pts[i].y = Math.min(h - box[i].bottom, Math.max(box[i].top + 4, pts[i].y))
        }
        if (!moved) break
      }
      base = pts
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      layout()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      if (!reduce) t += 0.008
      const small = w < 560
      const pos = base.map((b, i) => ({
        x: b.x + Math.sin(t + i * 0.8) * 3,
        y: b.y + Math.cos(t + i * 0.6) * 3,
      }))
      const scale = small ? 0.72 : 1

      hover = null
      if (px >= 0) {
        let best = Infinity
        skillNodes.forEach((n, i) => {
          const d = Math.hypot(px - pos[i].x, py - pos[i].y)
          if (d < n.size * scale + 14 && d < best) {
            best = d
            hover = i
          }
        })
      }
      const f = focusRef.current
      const lit = (i: number) => {
        if (hover !== null) return i === hover || skillNodes[hover].links.includes(i) || skillNodes[i].links.includes(hover)
        if (f) return skillNodes[i].cat === f
        return true
      }

      // edges
      skillNodes.forEach((n, i) => {
        n.links.forEach((j) => {
          if (j <= i) return
          const hot = hover !== null ? hover === i || hover === j : f ? n.cat === f && skillNodes[j].cat === f : false
          ctx.beginPath()
          ctx.moveTo(pos[i].x, pos[i].y)
          ctx.lineTo(pos[j].x, pos[j].y)
          ctx.strokeStyle = hot ? 'rgba(244,239,234,.28)' : 'rgba(244,239,234,.05)'
          ctx.lineWidth = hot ? 1.3 : 0.8
          ctx.stroke()
        })
      })

      // nodes
      skillNodes.forEach((n, i) => {
        const { x, y } = pos[i]
        const col = catMeta[n.cat].color
        const on = lit(i)
        const isHover = hover === i
        const r = n.size * scale * (isHover ? 1.3 : 1)
        ctx.globalAlpha = on ? 1 : 0.18

        if (isHover || (f && on && hover === null)) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3)
          g.addColorStop(0, col + '40')
          g.addColorStop(1, 'transparent')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(x, y, r * 3, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = col + (isHover ? '33' : '14')
        ctx.fill()
        ctx.strokeStyle = col + (isHover ? 'ff' : '70')
        ctx.lineWidth = 1.4
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(x, y, isHover ? 4 : 3, 0, Math.PI * 2)
        ctx.fillStyle = isHover ? '#fff' : col
        ctx.fill()

        ctx.font = `${isHover ? 600 : 500} ${small ? 10.5 : isHover ? 13 : 12}px Poppins, sans-serif`
        ctx.textAlign = 'center'
        ctx.fillStyle = `rgba(244,239,234,${isHover ? 1 : on ? 0.7 : 0.5})`
        ctx.fillText(n.label, x, y + r + (small ? 13 : 16))
        if (isHover) {
          ctx.font = '600 10px Inter, sans-serif'
          ctx.fillStyle = col
          ctx.fillText(catMeta[n.cat].name.toUpperCase(), x, y + r + 30)
        }
        ctx.globalAlpha = 1
      })

      if (!reduce && inView) raf = requestAnimationFrame(draw)
    }

    const setPoint = (cx: number, cy: number) => {
      const r = canvas.getBoundingClientRect()
      px = cx - r.left
      py = cy - r.top
      if (reduce) draw()
    }
    const onMove = (e: PointerEvent) => setPoint(e.clientX, e.clientY)
    const onLeave = () => {
      px = py = -1
      if (reduce) draw()
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      const was = inView
      inView = e.isIntersecting
      if (inView && !was && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)

    resize()
    draw()
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerdown', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={`Skills constellation: ${skillNodes.map((n) => n.label).join(', ')}`}
    />
  )
}
