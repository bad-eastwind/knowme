import { siGithub, siGooglescholar } from 'simple-icons'

type P = { size?: number }

export function GithubIcon({ size = 18 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={siGithub.path} />
    </svg>
  )
}

export function ScholarIcon({ size = 18 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={siGooglescholar.path} />
    </svg>
  )
}

/** Simple-icons no longer ships LinkedIn, so this is a plain hand-drawn "in" mark. */
export function LinkedinIcon({ size = 18 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 3A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3h-15Zm2.9 3.6a1.55 1.55 0 1 1 0 3.1 1.55 1.55 0 0 1 0-3.1ZM6.1 10.7h2.6V18H6.1v-7.3Zm4.3 0h2.5v1c.4-.7 1.3-1.2 2.6-1.2 2.3 0 3 1.4 3 3.6V18h-2.6v-3.5c0-1-.2-1.8-1.3-1.8s-1.6.8-1.6 1.9V18h-2.6v-7.3Z" />
    </svg>
  )
}
