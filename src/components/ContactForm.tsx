import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'

const topics = ['Research collaboration', 'AI engineering role', 'Applied ML consulting', 'Speaking / writing', 'Just saying hello']

/**
 * GitHub Pages has no server, so the form composes an email in the visitor's
 * mail app instead of posting anywhere. Nothing is collected or stored.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') || '').trim()
    const email = String(f.get('email') || '').trim()
    const topic = String(f.get('topic') || topics[0])
    const message = String(f.get('message') || '').trim()
    const subject = `${topic} — ${name || 'hello'}`
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ''}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" autoComplete="name" placeholder="Your name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@domain.com" />
      </div>
      <div className="field field--full">
        <label htmlFor="cf-topic">What's it about?</label>
        <select id="cf-topic" name="topic" defaultValue={topics[0]}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="field field--full">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" placeholder="A few lines about what you have in mind" required />
      </div>
      <button className="btn btn--primary form__submit" type="submit">
        {sent ? 'Opened in your mail app' : 'Send message'} <ArrowUpRight size={17} />
      </button>
      <p className="form__note">Opens a pre-filled email to {profile.email}. Nothing is stored on this site.</p>
    </form>
  )
}
