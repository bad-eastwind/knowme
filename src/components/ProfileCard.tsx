import { useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Mail, Download, Sparkles, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { GithubIcon, LinkedinIcon, ScholarIcon } from './Icons'
import { useMediaQuery, useTilt } from '../hooks'

const ORBIT = 'M268 0 C 262 70, 205 118, 128 140 S 24 164, 0 172'
const TETHER = 'M205 2 C 150 2, 80 4, 0 28'

/** A small ember that rides an arc, then rests. `reverse` runs it from the path's end to its start. */
function Spark({ path, dur, begin = '0s', reverse = false }: { path: string; dur: string; begin?: string; reverse?: boolean }) {
  return (
    <g className="pcard__spark" opacity="0">
      <circle r="6" className="pcard__spark-halo" />
      <circle r="2.4" className="pcard__spark-core" />
      <animateMotion
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        path={path}
        calcMode="linear"
        keyPoints={reverse ? '1;0;0' : '0;1;1'}
        keyTimes="0;0.55;1"
      />
      <animate
        attributeName="opacity"
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        values="0;1;1;0;0"
        keyTimes="0;0.08;0.47;0.55;1"
      />
    </g>
  )
}

export function ProfileCard({ compact = false }: { compact?: boolean }) {
  const [hasPortrait, setHasPortrait] = useState(true)
  // Phones open Home on a full-bleed cover instead of the boxed card.
  const cover = useMediaQuery('(max-width: 700px)') && !compact
  const reduce = useReducedMotion()
  const live = cover && !reduce
  const { scrollY } = useScroll()
  const drift = useTransform(scrollY, (v) => v * 0.35)
  const fade = useTransform(scrollY, (v) => 1 - Math.min(v / Math.max(window.innerHeight * 0.9, 1), 1) * 0.7)
  const tilt = useTilt(live)

  return (
    <aside className={`pcard${compact ? ' pcard--compact' : ''}${cover ? ' pcard--cover' : ''}`} aria-label="Profile">
      {/* dashed orbit arcs that break out of the card edges */}
      <svg className="pcard__arcs pcard__arcs--top" viewBox="0 0 420 300" preserveAspectRatio="none" aria-hidden="true">
        <path d={ORBIT} />
        <Spark path={ORBIT} dur="7s" />
      </svg>

      <motion.div className="pcard__portrait" style={live ? { y: drift, opacity: fade } : undefined}>
        {hasPortrait ? (
          <picture>
            {cover ? <source srcSet={profile.portraitTall} /> : null}
            <motion.img
              src={profile.portrait}
              alt={profile.name}
              onError={() => setHasPortrait(false)}
              style={live ? { x: tilt.x, y: tilt.y, scale: 1.08 } : undefined}
            />
          </picture>
        ) : (
          <div className="pcard__mono" aria-hidden="true">
            {profile.initials}
          </div>
        )}
      </motion.div>

      <h2 className="pcard__name">{profile.name}</h2>
      <div className="pcard__badge" aria-hidden="true">
        <svg className="pcard__arcs pcard__arcs--badge" viewBox="0 0 230 40" aria-hidden="true">
          <path d={TETHER} />
          <Spark path={TETHER} dur="7s" begin="3.5s" reverse />
        </svg>
        <Sparkles size={16} strokeWidth={2.2} />
      </div>
      <p className="pcard__tag">{profile.tagline}</p>
      <p className="pcard__loc">
        <MapPin size={14} aria-hidden="true" />
        {profile.location}
      </p>
      <div className="pcard__status">
        <i aria-hidden="true" />
        {profile.status}
      </div>

      <nav className="pcard__social" aria-label="Elsewhere">
        <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor>
          <GithubIcon />
        </a>
        <a href={profile.links.scholar} target="_blank" rel="noreferrer" aria-label="Google Scholar" data-cursor>
          <ScholarIcon />
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor>
          <LinkedinIcon />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email" data-cursor>
          <Mail size={18} />
        </a>
      </nav>

      <a className="btn btn--primary pcard__cv" href={profile.cv} target="_blank" rel="noreferrer">
        <Download size={16} /> Download CV
      </a>
    </aside>
  )
}
