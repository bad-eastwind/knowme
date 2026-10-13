import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { navItems } from './navItems'
import { useMediaQuery } from '../hooks'

export function Nav() {
  const reduce = useReducedMotion()
  const bottomBar = useMediaQuery('(max-width: 960px)')
  const touch = useMediaQuery('(pointer: coarse)')
  const tucked = useTuckOnScroll(bottomBar)

  return (
    <nav className={`nav${tucked ? ' nav--tucked' : ''}`} aria-label="Primary">
      {navItems.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className="nav__item"
          aria-label={label}
          // a light tick under the thumb (Android; iOS Safari has no vibration API)
          onClick={() => touch && navigator.userActivation?.isActive && navigator.vibrate?.(8)}
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <motion.span
                  layoutId="nav-pill"
                  className="nav__pill"
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 40 }}
                />
              ) : null}
              <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
              <span className="nav__tip" aria-hidden="true">
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

/** Bottom bar steps aside while reading down the page, and comes back on any scroll up or near the end. */
function useTuckOnScroll(enabled: boolean) {
  const [tucked, setTucked] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - last) < 8) return
      const nearEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 120
      setTucked(y > last && y > 120 && !nearEnd)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  return enabled && tucked
}
