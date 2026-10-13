import type { ReactNode } from 'react'
import { Mail, MapPin, Download } from 'lucide-react'
import { Display, Reveal } from '../components/Motion'
import { ContactForm } from '../components/ContactForm'
import { GithubIcon, LinkedinIcon, ScholarIcon } from '../components/Icons'
import { profile } from '../data/profile'
import { usePageTitle } from '../hooks'

export default function Contact() {
  usePageTitle('Contact')
  const [user, domain] = profile.email.split('@')
  const channels: { icon: ReactNode; label: string; value: ReactNode; href?: string }[] = [
    {
      icon: <Mail size={18} />,
      label: 'Email',
      // only ever wrap at the @, never mid-word
      value: (
        <>
          {user}@<wbr />
          {domain}
        </>
      ),
      href: `mailto:${profile.email}`,
    },
    { icon: <LinkedinIcon />, label: 'LinkedIn', value: 'in/anweshkabiraj', href: profile.links.linkedin },
    { icon: <ScholarIcon />, label: 'Google Scholar', value: 'Publications & citations', href: profile.links.scholar },
    { icon: <GithubIcon />, label: 'GitHub', value: 'bad-eastwind', href: profile.links.github },
    { icon: <Download size={18} />, label: 'Curriculum vitae', value: 'Download PDF', href: profile.cv },
    { icon: <MapPin size={18} />, label: 'Based in', value: profile.location },
  ]

  return (
    <>
      <section className="page-head">
        <Display as="h1" top="Let's work" bottom="Together" />
        <Reveal delay={0.15}>
          <p className="lead">Open to research collaborations, AI engineering roles and applied ML consulting.</p>
        </Reveal>
      </section>

      <div className="contact">
        <Reveal>
          <ContactForm />
        </Reveal>
        <Reveal className="channels" delay={0.1}>
          {channels.map((c) => {
            const inner = (
              <>
                <span className="channel__icon">{c.icon}</span>
                <span>
                  <span className="channel__l">{c.label}</span>
                  <br />
                  <span className="channel__v">{c.value}</span>
                </span>
              </>
            )
            return c.href ? (
              <a
                key={c.label}
                className="channel"
                href={c.href}
                {...(c.href.startsWith('http') || c.href.endsWith('.pdf') ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {inner}
              </a>
            ) : (
              <div key={c.label} className="channel">
                {inner}
              </div>
            )
          })}
        </Reveal>
      </div>
    </>
  )
}
