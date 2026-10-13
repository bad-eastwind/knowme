import { useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { Nav } from './Nav'
import { navIndex } from './navItems'
import { ProfileCard } from './ProfileCard'
import { Ambient } from './Ambient'
import { Cursor } from './Cursor'
import { Page } from './Motion'
import { profile } from '../data/profile'

const YEAR = new Date().getFullYear()

export function Layout() {
  const { pathname } = useLocation()
  // which way the tab order moved, so phones can slide pages like a native tab bar
  const order = navIndex(pathname)
  const [nav, setNav] = useState({ order, dir: 0 })
  if (nav.order !== order) setNav({ order, dir: Math.sign(order - nav.order) })

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Ambient />
      <Cursor />
      <Nav />
      <div className="shell">
        <div className="shell__aside">
          <ProfileCard compact={pathname !== '/'} />
        </div>
        <main id="main" className="shell__main">
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={nav.dir}
            onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
          >
            <Page key={pathname} dir={nav.dir}>
              <FrozenOutlet />
            </Page>
          </AnimatePresence>
          <footer className="footer">
            <span>
              © {YEAR} {profile.name} · {profile.location}
            </span>
            <span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
          </footer>
        </main>
      </div>
    </>
  )
}

/** Keeps the outgoing route's content on screen while it animates out. */
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}
