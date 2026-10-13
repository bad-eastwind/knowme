import { useSearchParams } from 'react-router-dom'
import { Display, Reveal } from '../components/Motion'
import { ProjectRow } from '../components/Rows'
import { projects, trackLabel, type Track } from '../data/projects'
import { usePageTitle } from '../hooks'

const filters: (Track | 'all')[] = ['all', 'gentraclabs', 'tcs']

export default function Projects() {
  usePageTitle('Projects')
  const [params, setParams] = useSearchParams()
  const raw = params.get('track')
  const track: Track | 'all' = raw === 'gentraclabs' || raw === 'tcs' ? raw : 'all'
  const list = track === 'all' ? projects : projects.filter((p) => p.track === track)

  return (
    <>
      <section className="page-head">
        <Display as="h1" top="Selected" bottom="Builds" />
        <Reveal delay={0.15}>
          <p className="lead">
            {projects.length} systems across clinical-imaging research at GentracLabs and production AI at TCS Innovation Labs.
          </p>
        </Reveal>
      </section>

      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            className="filter"
            aria-pressed={track === f}
            onClick={() => setParams(f === 'all' ? {} : { track: f }, { replace: true })}
          >
            {f === 'all' ? 'All' : trackLabel[f]}
            <span>{f === 'all' ? projects.length : projects.filter((p) => p.track === f).length}</span>
          </button>
        ))}
      </div>

      <div className="rows" key={track}>
        {list.map((p, i) => (
          <ProjectRow key={p.slug} p={p} i={i} />
        ))}
      </div>
    </>
  )
}
