import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { trackLabel } from '../data/projects'
import { ProjectCover } from './ProjectCover'
import { Reveal } from './Motion'

export function ProjectRow({ p, i = 0 }: { p: Project; i?: number }) {
  return (
    <Reveal delay={Math.min(i, 6) * 0.05}>
      <Link to={`/projects/${p.slug}`} className="row">
        <div className="row__thumb">
          <ProjectCover kind={p.cover} title={p.title} />
        </div>
        <div>
          <h3 className="row__title">{p.title}</h3>
          <p className="row__sub">{p.summary}</p>
          <div className="row__meta">
            <span>{trackLabel[p.track]}</span>
            {p.badge ? <span className={`chip ${p.track === 'gentraclabs' ? 'chip--orange' : 'chip--lime'}`}>{p.badge}</span> : null}
          </div>
        </div>
        <ArrowUpRight className="row__arrow" size={22} aria-hidden="true" />
      </Link>
    </Reveal>
  )
}
