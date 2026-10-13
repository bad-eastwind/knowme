import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Display } from '../components/Motion'
import { usePageTitle } from '../hooks'

export default function NotFound() {
  usePageTitle('Not found')
  return (
    <section className="notfound">
      <Display as="h1" top="Lost in" bottom="Latent space" />
      <p className="lead">This page doesn't exist, or it moved when the site was rebuilt.</p>
      <Link to="/" className="btn btn--ghost">
        <ArrowLeft size={16} /> Back home
      </Link>
    </section>
  )
}
