'use client'

import { useEffect, useState, useRef } from 'react'

interface CountUpProps {
  end: number
  duration?: number
  className?: string
  suffix?: string
  decimal?: boolean
}

export const CountUp = ({ end, duration = 2000, className = '', suffix = '', decimal = false }: CountUpProps) => {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isInView])

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // easeOutExpo 함수로 부드러운 애니메이션
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)
      const currentCount = end * easeOutExpo
      
      if (decimal) {
        setCount(Math.round(currentCount * 10) / 10)
      } else {
        setCount(Math.round(currentCount))
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
} 