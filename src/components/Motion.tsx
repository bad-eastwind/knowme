import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useMediaQuery } from '../hooks'

const ease = [0.16, 1, 0.3, 1] as const

/** Big two-tone uppercase heading. Each line rises out of a mask. */
export function Display({
  top,
  bottom,
  as = 'h2',
  size,
}: {
  top: ReactNode
  bottom?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  size?: 'md' | 'sm'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const line = (content: ReactNode, i: number, ghost = false) => (
    <span className="line" key={i}>
      <motion.span
        className={ghost ? 'ghost' : undefined}
        variants={{
          hidden: { y: '105%' },
          shown: { y: '0%', transition: { duration: 0.9, ease, delay: i * 0.08 } },
        }}
      >
        {content}
      </motion.span>
    </span>
  )
  // The heading, not each line, is watched for visibility: a line starts pushed out of its
  // overflow-hidden mask, and IntersectionObserver never reports a clipped-away target as visible.
  return (
    <Tag
      className={`display${size ? ` display--${size}` : ''}`}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {line(top, 0)}
      {bottom ? line(bottom, 1, true) : null}
    </Tag>
  )
}

/** Fade-and-rise on first scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </M>
  )
}

/** Route-level enter/exit. On phones, moving along the tab bar slides pages sideways (`dir` is -1, 0 or 1). */
export function Page({ children, dir = 0 }: { children: ReactNode; dir?: number }) {
  const reduce = useReducedMotion()
  const phone = useMediaQuery('(max-width: 960px)')
  const variants = {
    enter: (d: number) => (phone && d ? { opacity: 0, x: d * 48 } : { opacity: 0, y: 14 }),
    shown: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease } },
    leave: (d: number) => ({ opacity: 0, ...(phone && d ? { x: d * -48 } : { y: -8 }), transition: { duration: 0.2 } }),
  }
  return (
    <motion.div custom={dir} variants={variants} initial={reduce ? false : 'enter'} animate="shown" exit={reduce ? undefined : 'leave'}>
      {children}
    </motion.div>
  )
}
