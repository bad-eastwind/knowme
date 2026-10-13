import { House, FolderOpen, BriefcaseBusiness, FlaskConical, Layers, Camera, Send } from 'lucide-react'

export const navItems = [
  { to: '/', label: 'Home', Icon: House, end: true },
  { to: '/projects', label: 'Projects', Icon: FolderOpen },
  { to: '/experience', label: 'Experience', Icon: BriefcaseBusiness },
  { to: '/research', label: 'Research', Icon: FlaskConical },
  { to: '/stack', label: 'Stack', Icon: Layers },
  { to: '/photography', label: 'Photography', Icon: Camera },
  { to: '/contact', label: 'Contact', Icon: Send },
]

/** A path's place in the tab order (sub-pages count as their tab), so page changes can slide the right way. */
export function navIndex(pathname: string) {
  const i = navItems.findIndex(({ to }) => to !== '/' && (pathname === to || pathname.startsWith(`${to}/`)))
  return i === -1 ? 0 : i
}
