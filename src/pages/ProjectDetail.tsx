import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Display, Reveal } from '../components/Motion'
import { ProjectCover } from '../components/ProjectCover'
import { projects, trackLabel } from '../data/projects'
import { usePageTitle } from '../hooks'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const idx = projects.findIndex((p) => p.slug === slug)
  const p = projects[idx]
  usePageTitle(p?.title ?? 'Not found')
  if (!p) return <NotFound />

  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  return (
    <article>
      <Link to="/projects" className="back">
        <ArrowLeft size={16} /> All projects
      </Link>

      <div className="detail__hero">
        <div>
          <p className="eyebrow" style={{ marginBottom: 22 }}>
            {String(idx + 1).padStart(2, '0')} · {trackLabel[p.track]}
          </p>
          <Display as="h1" top={p.title} bottom={p.kicker} size="sm" />
        </div>
        <Reveal className="detail__cover" delay={0.1}>
          <ProjectCover kind={p.cover} title={p.title} />
        </Reveal>
      </div>

      <div className="detail__meta">
        <span className="chip">{trackLabel[p.track]}</span>
        {p.year ? <span className="chip">{p.year}</span> : null}
        {p.badge ? <span className={`chip ${p.track === 'gentraclabs' ? 'chip--orange' : 'chip--lime'}`}>{p.badge}</span> : null}
      </div>

      <Reveal className="detail__body" delay={0.15}>
        {p.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Reveal>

      {p.result ? (
        <Reveal className="result">
          <div className="result__l">Result</div>
          <p className="result__t">{p.result}</p>
        </Reveal>
      ) : null}

      <Reveal className="detail__stack">
        <h2 className="eyebrow">Stack & methods</h2>
        <div className="chips">
          {p.stack.map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      <nav className="pager" aria-label="More projects">
        <Link to={`/projects/${prev.slug}`}>
          <small>Previous</small>
          <div>{prev.title}</div>
        </Link>
        <Link to={`/projects/${next.slug}`}>
          <small>Next</small>
          <div>{next.title}</div>
        </Link>
      </nav>
    </article>
  )
}
