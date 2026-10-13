import { useState } from 'react'
import { Display, Reveal } from '../components/Motion'
import { Constellation } from '../components/Constellation'
import { skillNodes, catMeta, methods, type SkillCat } from '../data/skills'
import { useMediaQuery, usePageTitle } from '../hooks'

const cats = Object.keys(catMeta) as SkillCat[]

export default function Stack() {
  usePageTitle('Stack')
  const [focus, setFocus] = useState<SkillCat | null>(null)
  const coarse = useMediaQuery('(pointer: coarse)')

  return (
    <>
      <section className="page-head">
        <Display as="h1" top="Tools &" bottom="Stack" />
        <Reveal delay={0.15}>
          <p className="lead">
            The {skillNodes.length} tools I reach for, and how they connect. Hover or tap a node to see its neighbours; pick a
            category to light it up.
          </p>
        </Reveal>
      </section>

      <Reveal>
        <div className="constellation">
          <Constellation focus={focus} />
          <span className="constellation__hint">{coarse ? 'Tap a node to explore' : 'Hover to explore'}</span>
        </div>
        <div className="legend" role="group" aria-label="Highlight a category">
          {cats.map((c) => (
            <button key={c} aria-pressed={focus === c} onClick={() => setFocus(focus === c ? null : c)}>
              <i style={{ background: catMeta[c].color }} />
              {catMeta[c].name}
            </button>
          ))}
        </div>
      </Reveal>

      <section className="section">
        <div className="section__head">
          <Display top="Research" bottom="Methods" size="sm" />
        </div>
        {methods.map((m) => (
          <Reveal className="timeline-row" key={m.name}>
            <div className="timeline-row__t">{m.name}</div>
            <div className="timeline-row__s" style={{ marginTop: 0 }}>
              {m.note}
            </div>
          </Reveal>
        ))}
      </section>

      <section className="section">
        <div className="section__head">
          <Display top="By" bottom="Category" size="sm" />
        </div>
        <div className="toolgrid">
          {cats.map((c) => (
            <Reveal className="toolcat" key={c}>
              <h3 className="toolcat__name">
                <i style={{ background: catMeta[c].color }} />
                {catMeta[c].name}
              </h3>
              <div className="chips">
                {skillNodes
                  .filter((n) => n.cat === c)
                  .map((n) => (
                    <span className="chip" key={n.label}>
                      {n.label}
                    </span>
                  ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
