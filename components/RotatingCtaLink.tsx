'use client'

import Link from 'next/link'
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const DEFAULT_LABELS = ['Soy creador', 'Soy influencer']

type RotatingCtaLinkProps = {
  href?: string
  labels?: string[]
  className?: string
  intervalMs?: number
}

export default function RotatingCtaLink({
  href = '/creador/registro',
  labels,
  className = '',
  intervalMs = 2600,
}: RotatingCtaLinkProps) {
  const safe = labels?.length ? labels : DEFAULT_LABELS
  const longest = useMemo(
    () =>
      safe.reduce((a, b) => (a.length >= b.length ? a : b), safe[0] ?? ''),
    [safe]
  )
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [minPx, setMinPx] = useState<number | undefined>(undefined)

  const remeasure = () => {
    const el = measureRef.current
    if (!el) return
    const w = el.getBoundingClientRect().width
    if (w > 0) setMinPx(Math.ceil(w))
  }

  useLayoutEffect(() => {
    remeasure()
    if (typeof document !== 'undefined' && 'fonts' in document) {
      void document.fonts.ready.then(remeasure)
    }
  }, [longest, className])

  useEffect(() => {
    window.addEventListener('resize', remeasure)
    return () => window.removeEventListener('resize', remeasure)
  }, [longest, className])

  useEffect(() => {
    if (safe.length <= 1) return

    let timeout: ReturnType<typeof setTimeout> | undefined

    const id = setInterval(() => {
      setVisible(false)
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIndex((p) => (p + 1) % safe.length)
        setVisible(true)
      }, 180)
    }, intervalMs)

    return () => {
      clearInterval(id)
      if (timeout) clearTimeout(timeout)
    }
  }, [intervalMs, safe.length])

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center ${className}`.trim()}
    >
      <span className="relative inline-flex items-center justify-center">
        <span
          ref={measureRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 -z-10 select-none whitespace-nowrap opacity-0"
        >
          {longest}
        </span>
        <span
          className="relative inline-block whitespace-nowrap text-center transition-[opacity,transform] duration-200"
          style={{
            minWidth: minPx != null && minPx > 0 ? `${minPx}px` : undefined,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-0.25rem)',
          }}
        >
          {safe[index]}
        </span>
      </span>
    </Link>
  )
}
