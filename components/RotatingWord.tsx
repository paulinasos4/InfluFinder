'use client'

import {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

interface RotatingWordProps {
  words: string[]
  intervalMs?: number
  className?: string
  style?: CSSProperties
  /** 'end' (default): palabra corta alineada a la derecha del ancho fijo (cerca de lo que sigue, ej. “tiene”). 'start': al inicio (cerca de lo anterior, ej. después de “qué”). */
  alignShortWord?: 'start' | 'end'
  /** Texto inmediatamente después de la palabra (ej. “ puede ayudarte?”). Con ancho fijo, acerca el trazo si la palabra actual es más corta. */
  followingText?: string
}

export default function RotatingWord({
  words,
  intervalMs = 1900,
  className = '',
  style,
  alignShortWord = 'end',
  followingText,
}: RotatingWordProps) {
  const safeWords = words.length > 0 ? words : ['']
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const measureRef = useRef<HTMLSpanElement>(null)
  const shortestRef = useRef<HTMLSpanElement>(null)
  const [minPx, setMinPx] = useState<number | undefined>(undefined)
  const [followingPullPx, setFollowingPullPx] = useState<number | undefined>(
    undefined
  )

  const longest = useMemo(
    () =>
      safeWords.reduce(
        (a, b) => (a.length >= b.length ? a : b),
        safeWords[0] ?? ''
      ),
    [safeWords]
  )
  const shortest = useMemo(
    () =>
      safeWords.reduce(
        (a, b) => (a.length <= b.length ? a : b),
        safeWords[0] ?? ''
      ),
    [safeWords]
  )

  const remeasure = () => {
    const longestEl = measureRef.current
    if (!longestEl) return
    const longestW = longestEl.getBoundingClientRect().width
    if (longestW <= 0) return
    const roundedLongest = Math.ceil(longestW)
    setMinPx(roundedLongest)

    if (!followingText) {
      setFollowingPullPx(undefined)
      return
    }

    const shortestW = shortestRef.current?.getBoundingClientRect().width ?? 0
    if (shortestW <= 0) {
      setFollowingPullPx(undefined)
      return
    }
    const gap = roundedLongest - shortestW
    setFollowingPullPx(gap > 1 ? Math.round(gap * 0.93) : undefined)
  }

  useLayoutEffect(() => {
    remeasure()
    if (typeof document !== 'undefined' && 'fonts' in document) {
      void document.fonts.ready.then(remeasure)
    }
  }, [longest, className, style])

  useEffect(() => {
    window.addEventListener('resize', remeasure)
    return () => window.removeEventListener('resize', remeasure)
  }, [longest, className, style])

  const current = safeWords[index]
  const shortWord = current.length < longest.length

  useEffect(() => {
    if (safeWords.length <= 1) return

    let timeout: ReturnType<typeof setTimeout> | undefined

    const interval = setInterval(() => {
      setVisible(false)

      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % safeWords.length)
        setVisible(true)
      }, 180)
    }, intervalMs)

    return () => {
      clearInterval(interval)
      if (timeout) clearTimeout(timeout)
    }
  }, [intervalMs, safeWords.length])

  const textAlignClass = followingText
    ? 'text-left'
    : !shortWord || alignShortWord === 'start'
      ? 'text-left'
      : 'text-right'

  return (
    <span className="relative inline-block align-baseline">
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[-1] select-none whitespace-nowrap opacity-0 text-left"
      >
        {longest}
      </span>
      {followingText ? (
        <span
          ref={shortestRef}
          aria-hidden
          className="pointer-events-none fixed left-[-10000px] top-0 whitespace-nowrap opacity-0"
        >
          {shortest}
        </span>
      ) : null}
      <span
        className={`inline-block whitespace-nowrap transition-all duration-200 ${textAlignClass} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'} ${className}`}
        style={{
          minWidth: minPx != null && minPx > 0 ? `${minPx}px` : undefined,
          transform:
            followingText && !shortWord && followingPullPx != null
              ? `translateX(-${followingPullPx}px)`
              : undefined,
          ...style,
        }}
      >
        {safeWords[index]}
      </span>
      {followingText ? (
        <span
          className="inline"
          style={
            followingPullPx != null && followingPullPx > 0
              ? { marginLeft: `-${followingPullPx}px` }
              : undefined
          }
        >
          {followingText}
        </span>
      ) : null}
    </span>
  )
}
