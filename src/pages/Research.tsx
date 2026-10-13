import { ArrowUpRight } from 'lucide-react'
import { Display, Reveal } from '../components/Motion'
import { publications, patents, honours, type PubKind } from '../data/research'
import { profile } from '../data/profile'
import { stats } from '../data/stats'
import { usePageTitle } from '../hooks'

const groups: { kind: PubKind; label: string }[] = [
  { kind: 'journal', label: 'Journal articles' },
  { kind: 'conference', label: 'Conference proceedings' },
]

export default function Research() {
  usePageTitle('Research')
  return (
    <>
      <section className="page-head">
        <Display as="h1" top="Research" bottom="& Patents" />
        <Reveal delay={0.15}>
          <p className="lead">
            {stats.publications} peer-reviewed publications across {stats.publishers.join(', ')} ({stats.pubRange}), and{' '}
            {stats.patents} works under patent evaluation.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a className="text-link" href={profile.links.scholar} target="_blank" rel="noreferrer">
            Google Scholar profile <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </section>

      {groups.map((g) => {
        const list = publications.filter((p) => p.kind === g.kind)
        return (
          <section className="pubs-group" key={g.kind}>
            <div className="pubs-group__label">
              <h2 className="eyebrow">{g.label}</h2>
              <span>{list.length}</span>
            </div>
            {list.map((p) => (
              <Reveal as="article" className="pub" key={p.id}>
                <div className="pub__year">{p.year}</div>
                <div>
                  <h3 className="pub__title">{p.title}</h3>
                  <p className="pub__venue">
                    {p.publisher} · {p.venue} <span>· {p.meta}</span>
                  </p>
                  <p className="pub__sum">{p.summary}</p>
                  <div className="chips">
                    <span className="chip chip--orange">{p.area}</span>
                    <span className="chip chip--lime">{p.highlight}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </section>
        )
      })}

      <section className="section">
        <div className="section__head">
          <Display top="Patents" bottom="Pending" size="sm" />
        </div>
        <div className="patents">
          {patents.map((p, i) => (
            <Reveal className="patent" key={p.id} delay={i * 0.08}>
              <div className="patent__status">{p.status}</div>
              <h3 className="patent__t">{p.title}</h3>
              <p className="patent__b">{p.body}</p>
              <div className="patent__m">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <b>{m.value}</b>
                    <small>{m.label}</small>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <Display top="Honours" size="sm" />
        </div>
        {honours.map((h) => (
          <Reveal className="timeline-row" key={h.id}>
            <div className="timeline-row__when">Award</div>
            <div>
              <h3 className="timeline-row__t">{h.title}</h3>
              <p className="timeline-row__s">{h.body}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  )
}
