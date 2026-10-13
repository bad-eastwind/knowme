import { Display, Reveal } from '../components/Motion'
import { roles, education } from '../data/experience'
import { stats } from '../data/stats'
import { usePageTitle } from '../hooks'

const tone: Record<string, string> = { gentraclabs: 'mono-tile--orange', tcs: 'mono-tile--lime' }

export default function Experience() {
  usePageTitle('Experience')
  const major = roles.filter((r) => r.major)
  const earlier = roles.filter((r) => !r.major)

  return (
    <>
      <section className="page-head">
        <Display as="h1" top={`${stats.years}+ Years of`} bottom="Experience" />
        <Reveal delay={0.15}>
          <p className="lead">
            Two posts held in parallel: clinical-imaging research at GentracLabs and applied AI at TCS Innovation Labs.
          </p>
        </Reveal>
      </section>

      <div>
        {major.map((r) => (
          <Reveal as="article" className="role" key={r.id}>
            <header className="role__head">
              <div className={`mono-tile ${tone[r.id] ?? ''}`}>{r.orgShort}</div>
              <div>
                <h2 className="role__org">{r.org}</h2>
                <p className="role__title">{r.title}</p>
              </div>
              <div className="role__when">
                <span>
                  {r.start} – {r.end ?? 'Present'}
                  {r.location ? ` · ${r.location}` : ''}
                </span>
                {r.end === null ? <span className="live">Concurrent</span> : null}
              </div>
            </header>
            {r.summary ? <p className="role__summary">{r.summary}</p> : null}
            {r.metrics ? (
              <div className="metrics">
                {r.metrics.map((m) => (
                  <div className="metric" key={m.label}>
                    <div className="metric__v">{m.value}</div>
                    <div className="metric__l">{m.label}</div>
                  </div>
                ))}
              </div>
            ) : null}
            {r.highlights ? (
              <div className="highlights">
                {r.highlights.map((h, i) => (
                  <div className="hl" key={h.title}>
                    <div className="hl__n">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <h3 className="hl__t">{h.title}</h3>
                      <p className="hl__b">{h.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="chips">
              {r.focus.map((f) => (
                <span className="chip" key={f}>
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <section className="section">
        <div className="section__head">
          <Display top="Earlier" bottom="Roles" size="sm" />
        </div>
        {earlier.map((r) => (
          <Reveal className="timeline-row" key={r.id}>
            <div className="timeline-row__when">
              {r.start} – {r.end}
            </div>
            <div>
              <h3 className="timeline-row__t">{r.org}</h3>
              <p className="timeline-row__s">
                {r.title}
                {r.location ? ` · ${r.location}` : ''}
                {r.summary ? ` · ${r.summary}` : ''}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="section">
        <div className="section__head">
          <Display top="Academic" bottom="Background" size="sm" />
        </div>
        {education.map((e) => (
          <Reveal className="timeline-row" key={e.id}>
            <div className="timeline-row__when">{e.period}</div>
            <div>
              <h3 className="timeline-row__t">{e.degree}</h3>
              <p className="timeline-row__s">
                {e.school} · {e.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  )
}
