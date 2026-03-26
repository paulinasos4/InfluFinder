'use client'

import { CSSProperties, useEffect, useMemo, useState } from 'react'

interface RotatingWordProps {
  words: string[]
  intervalMs?: number
  className?: string
  style?: CSSProperties
}

export default function RotatingWord({
  words,
  intervalMs = 2400,
  className = '',
  style,
}: RotatingWordProps) {
  const safeWords = words.length > 0 ? words : ['']
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const minWidthCh = useMemo(
    () => Math.max(...safeWords.map((w) => w.length)),
    [safeWords]
  )

  useEffect(() => {
    if (safeWords.length <= 1) return

    const interval = setInterval(() => {
      setVisible(false)

      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % safeWords.length)
        setVisible(true)
      }, 180)

      return () => clearTimeout(timeout)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [intervalMs, safeWords])

  return (
    <span
      className={`inline-block whitespace-nowrap transition-all duration-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'} ${className}`}
      style={{ minWidth: `${minWidthCh}ch`, ...style }}
    >
      {safeWords[index]}
    </span>
  )
}
