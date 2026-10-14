import { useSearchParams } from 'react-router-dom'
import { Display, Reveal } from '../components/Motion'
import { ProjectRow } from '../components/Rows'
import { projects, trackLabel, type Track } from '../data/projects'
import { usePageTitle } from '../hooks'

const tracks = Object.keys(trackLabel) as Track[]
const filters: (Track | 'all')[] = ['all', ...tracks]

export default function Projects() {
  usePageTitle('Projects')
  const [params, setParams] = useSearchParams()
  const raw = params.get('track')
  const track: Track | 'all' = tracks.find((t) => t === raw) ?? 'all'
  const list = track === 'all' ? projects : projects.filter((p) => p.track === track)

  return (
    <>
      <section className="page-head">
        <Display as="h1" top="Selected" bottom="Builds" />
        <Reveal delay={0.15}>
          <p className="lead">
            {projects.length} systems across clinical-imaging research at GentracLabs, production AI at TCS Innovation Labs and
            chest X-ray research at Jio Institute.
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
