import { profile } from './profile'
import { publications, patents } from './research'
import { projects } from './projects'

const yearsSince = (d: Date) => Math.floor((Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000))

/** Every number on the site comes from here, so nothing drifts out of sync. */
export const stats = {
  publications: publications.length,
  journals: publications.filter((p) => p.kind === 'journal').length,
  conferences: publications.filter((p) => p.kind === 'conference').length,
  patents: patents.length,
  projects: projects.length,
  years: yearsSince(profile.careerStart),
  publishers: [...new Set(publications.map((p) => p.publisher))],
  pubRange: `${Math.min(...publications.map((p) => p.year))}–${Math.max(...publications.map((p) => p.year))}`,
}
