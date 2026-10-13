import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ScanEye, Workflow } from 'lucide-react'
import { Display, Reveal } from '../components/Motion'
import { ProjectRow } from '../components/Rows'
import { ContactForm } from '../components/ContactForm'
import { profile, focusAreas } from '../data/profile'
import { projects } from '../data/projects'
import { roles } from '../data/experience'
import { publications } from '../data/research'
import { photos, photoSrc } from '../data/photos'
import { stats } from '../data/stats'
import { usePageTitle } from '../hooks'

export default function Home() {
  usePageTitle()
  const recent = projects.slice(0, 4)
  const recentPubs = publications.slice(0, 3)

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-head">
        <Display as="h1" top={profile.headlineTop} bottom={profile.headlineBottom} />
        <Reveal delay={0.15}>
          <p className="lead">{profile.intro}</p>
        </Reveal>
        <Reveal delay={0.25} className="stats">
          <Stat value={stats.publications} label={'Peer-reviewed\npublications'} />
          <Stat value={stats.years} plus label={'Years in\nAI research'} />
          <Stat value={stats.patents} label={'Patents\npending'} />
        </Reveal>
      </section>

      <Reveal className="tiles" delay={0.3}>
        {focusAreas.map((f) => (
          <Link key={f.id} to={f.to} className={`tile tile--${f.tone}`}>
            <TileArt tone={f.tone} />
            <div className="tile__icon">{f.tone === 'orange' ? <ScanEye size={30} strokeWidth={1.6} /> : <Workflow size={30} strokeWidth={1.6} />}</div>
            <div>
              <h2 className="tile__title">{f.title}</h2>
              <p className="tile__blurb">{f.blurb}</p>
            </div>
            <span className="tile__go" aria-hidden="true">
              <ArrowRight size={17} />
            </span>
          </Link>
        ))}
      </Reveal>

      {/* ── Projects ── */}
      <section className="section">
        <div className="section__head">
          <Display top="Recent" bottom="Projects" size="md" />
        </div>
        <div className="rows">
          {recent.map((p, i) => (
            <ProjectRow key={p.slug} p={p} i={i} />
          ))}
        </div>
        <div className="section__foot">
          <Link to="/projects" className="text-link">
            All {stats.projects} projects <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="section">
        <div className="section__head">
          <Display top={`${stats.years}+ Years of`} bottom="Experience" size="md" />
        </div>
        <div className="rows">
          {roles.slice(0, 3).map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05}>
              <Link to="/experience" className="row row--plain">
                <div>
                  <h3 className="row__title">{r.org}</h3>
                  <p className="row__sub">{r.title}</p>
                  <div className="row__meta">
                    <span>
                      {r.start} – {r.end ?? 'Present'}
                    </span>
                    {r.end === null ? <span className="live">Current</span> : null}
                  </div>
                </div>
                <ArrowUpRight className="row__arrow" size={22} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="section__foot">
          <Link to="/experience" className="text-link">
            Full experience & education <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Research ── */}
      <section className="section">
        <div className="section__head">
          <Display top="Selected" bottom="Research" size="md" />
        </div>
        <div className="rows">
          {recentPubs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link to="/research" className="row row--plain">
                <div>
                  <h3 className="row__title">{p.title}</h3>
                  <div className="row__meta">
                    <span>
                      {p.publisher} · {p.venue} · {p.year}
                    </span>
                    <span className="chip chip--lime">{p.highlight}</span>
                  </div>
                </div>
                <ArrowUpRight className="row__arrow" size={22} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="section__foot">
          <Link to="/research" className="text-link">
            All {stats.publications} papers & {stats.patents} patents <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Photography ── */}
      <section className="section">
        <div className="section__head">
          <Display top="Through" bottom="The Lens" size="md" />
        </div>
        <Reveal className="strip">
          {photos.slice(0, 4).map((p) => (
            <Link key={p.file} to="/photography" aria-label={`Photography: ${p.caption}`}>
              <img src={photoSrc(p)} alt={p.caption} loading="lazy" decoding="async" />
            </Link>
          ))}
        </Reveal>
        <div className="section__foot">
          <Link to="/photography" className="text-link">
            Open the gallery <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section">
        <div className="section__head">
          <Display top="Let's work" bottom="Together" size="md" />
        </div>
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
    </>
  )
}

function Stat({ value, label, plus = false }: { value: number; label: string; plus?: boolean }) {
  return (
    <div>
      <div className="stat__num">
        {value}
        {plus ? <sup>+</sup> : null}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  )
}

/** Background line art for the focus tiles: light rays (optics) and a lattice (systems). */
function TileArt({ tone }: { tone: 'orange' | 'lime' }) {
  if (tone === 'orange')
    return (
      <svg className="tile__art" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx="250" cy="-10" r={40 + i * 26} fill="none" stroke="#171412" strokeOpacity="0.22" strokeWidth="1" />
        ))}
      </svg>
    )
  return (
    <svg className="tile__art" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path
        d="M-10 200 L40 140 L80 175 L130 90 L175 130 L220 40 L260 85 L320 20"
        fill="none"
        stroke="#171412"
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />
      <path
        d="M-10 240 L40 180 L80 215 L130 130 L175 170 L220 80 L260 125 L320 60"
        fill="none"
        stroke="#171412"
        strokeOpacity="0.14"
        strokeWidth="1.2"
      />
      {[
        [40, 140],
        [80, 175],
        [130, 90],
        [175, 130],
        [220, 40],
        [260, 85],
      ].map(([x, y]) => (
        <circle key={`${x}`} cx={x} cy={y} r="3.5" fill="#171412" fillOpacity="0.28" />
      ))}
    </svg>
  )
}
