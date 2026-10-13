import { useEffect, useSyncExternalStore } from 'react'
import { useSpring } from 'motion/react'
import { profile } from './data/profile'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : `${profile.name} · AI Research Architect`
  }, [title])
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => matchMedia(query).matches,
    () => false,
  )
}

/**
 * Device tilt as two springy offsets in px (x from left/right tilt, y from forward/back).
 * The resting angle is learned and slowly re-centred, so however the phone is held reads as neutral.
 * iOS only exposes the sensors after a permission prompt; a portfolio shouldn't ask, so it stays still there.
 */
export function useTilt(enabled: boolean, range = { x: 14, y: 10 }) {
  const x = useSpring(0, { stiffness: 70, damping: 20 })
  const y = useSpring(0, { stiffness: 70, damping: 20 })

  useEffect(() => {
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: unknown } | undefined
    if (!enabled || !DOE || typeof DOE.requestPermission === 'function') return
    let base: { b: number; g: number } | null = null
    const clamp = (v: number) => Math.max(-1, Math.min(1, v / 18))
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return
      base ??= { b: e.beta, g: e.gamma }
      base.b += (e.beta - base.b) * 0.01
      base.g += (e.gamma - base.g) * 0.01
      x.set(clamp(e.gamma - base.g) * range.x)
      y.set(clamp(e.beta - base.b) * range.y)
    }
    window.addEventListener('deviceorientation', onTilt)
    return () => window.removeEventListener('deviceorientation', onTilt)
  }, [enabled, x, y, range.x, range.y])

  return { x, y }
}
