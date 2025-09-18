'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface HeroWaveBackgroundProps {
  className?: string
  enabled?: boolean
}

export function HeroWaveBackground({
  className = '',
  enabled = true
}: HeroWaveBackgroundProps) {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // 클라이언트 마운트 감지
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 접근성 및 성능 감지
  useEffect(() => {
    if (!isMounted) return

    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setIsReducedMotion(mediaQuery.matches)
    }

    checkReducedMotion()

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', checkReducedMotion)

    return () => {
      mediaQuery.removeEventListener('change', checkReducedMotion)
    }
  }, [isMounted])

  // Intersection Observer로 지연 활성화
  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px'
      }
    )

    const element = document.querySelector('.hero-wave-container')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [enabled])

  // 파도 점들 생성
  const generateWavePoints = () => {
    if (!enabled) return []
    // isReducedMotion 체크 제거 - 애니메이션이 보이도록

    const rows = 12
    const cols = 16
    const points = []

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const distanceFromHorizon = rowIndex / (rows - 1)

      // 원근법에 따른 행 간격
      const baseRowSpacing = 2
      const maxRowSpacing = 15
      const rowSpacing = baseRowSpacing + (maxRowSpacing - baseRowSpacing) * Math.pow(distanceFromHorizon, 2)

      const y = 45 + (rowIndex * rowSpacing * 0.8)

      // 원근 효과
      const perspectiveScale = 1 - (distanceFromHorizon * 0.3)
      const perspectiveOpacity = 0.9 - (distanceFromHorizon * 0.4)

      for (let colIndex = 0; colIndex < cols; colIndex++) {
        const x = (colIndex / (cols - 1)) * 80 + 10

        // 파도 웨이브 파라미터
        const waveDelay = (colIndex * 0.08) + (rowIndex * 0.05)

        // 크기와 진폭
        const baseAmplitude = 15 + (distanceFromHorizon * 10)
        const amplitude = {
          x: baseAmplitude * 0.6,
          y: baseAmplitude * 1.2,
          z: baseAmplitude * 0.8,
        }

        // 중앙 집중 강도 (디버깅용으로 고정)
        const centerDistance = Math.abs(colIndex - (cols - 1) / 2) / ((cols - 1) / 2)
        const intensity = 1 // 완전히 불투명하게

        // 점 크기 (디버깅용으로 크게)
        const size = 10 // 고정 크기로 확실히 보이게

        points.push({
          id: `${rowIndex}-${colIndex}`,
          x,
          y,
          size,
          intensity,
          waveDelay,
          amplitude,
          distanceFromHorizon,
          perspectiveScale,
          rowIndex
        })
      }
    }

    return points
  }

  const wavePoints = generateWavePoints()

  // 디버깅 로그
  console.log('🌊 Wave points generated:', wavePoints.length)
  console.log('🌊 isVisible:', isVisible)
  console.log('🌊 isReducedMotion:', isReducedMotion)
  console.log('🌊 isMounted:', isMounted)
  console.log('🌊 enabled:', enabled)
  console.log('🌊 theme:', theme)

  // 테마별 색상 설정
  const getWaveColor = () => {
    switch (theme) {
      case 'brand':
        return 'rgba(46, 139, 87, 0.8)' // 브랜드 그린
      case 'dark':
        return 'rgba(59, 130, 246, 0.6)' // 블루
      case 'light':
      default:
        return 'rgba(34, 197, 94, 0.5)' // 라이트 그린
    }
  }

  const getStaticGradient = () => {
    switch (theme) {
      case 'brand':
        return 'radial-gradient(ellipse at 50% 80%, rgba(46, 139, 87, 0.06) 0%, transparent 70%)'
      case 'dark':
        return 'radial-gradient(ellipse at 50% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
      case 'light':
      default:
        return 'radial-gradient(ellipse at 50% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 70%)'
    }
  }

  // 서버 사이드 렌더링 시에는 빈 div 반환
  if (!isMounted) {
    return <div className={`hero-wave-container absolute inset-0 ${className}`} />
  }

  if (!enabled) {
    return (
      <div className={`hero-wave-container absolute inset-0 ${className}`}>
        {/* 정적 배경 그라데이션 */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: getStaticGradient(),
          }}
        />
      </div>
    )
  }

  return (
    <div className={`hero-wave-container absolute inset-0 ${className}`}>
      {/* 지평선 라인 */}
      <div
        className="absolute w-full h-px opacity-20"
        style={{
          top: '75%',
          background: 'linear-gradient(to right, transparent 0%, rgba(46, 139, 87, 0.3) 50%, transparent 100%)',
        }}
      />

      {/* 아이소메트릭 관점의 파도 그리드 */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) rotateY(0deg)',
          perspective: '2000px',
          perspectiveOrigin: '50% 80%',
        }}
      >
        {/* 파도 점들 */}
        {wavePoints.map((point) => (
          <div
            key={point.id}
            className="absolute rounded-full wave-dot"
            style={{
              width: `${point.size}px`,
              height: `${point.size}px`,
              left: `${point.x}%`,
              top: `${point.y}%`,
              background: `radial-gradient(circle, ${getWaveColor().replace('0.8)', `${point.intensity})`).replace('0.6)', `${point.intensity})`).replace('0.5)', `${point.intensity})`)} 0%, transparent 70%)`,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              pointerEvents: 'none',
              transform: `translateZ(${-point.rowIndex * 15}px)`,
              animationName: isReducedMotion ? 'none' : 'isometric-wave',
              animationDuration: '4s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${point.waveDelay}s`,
              '--amplitude-x': point.amplitude.x,
              '--amplitude-y': point.amplitude.y,
              '--amplitude-z': point.amplitude.z,
              '--intensity': point.intensity,
              '--base-scale': 0.8 + point.intensity * 0.4,
              '--depth-factor': point.distanceFromHorizon,
            } as any}
          />
        ))}
      </div>

      {/* CSS 애니메이션 */}
      <style jsx global>{`
        @keyframes isometric-wave {
          0% {
            transform: translate3d(0px, 0px, 0px) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate3d(0px, -20px, 0px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate3d(0px, 0px, 0px) scale(1);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wave-dot {
            animation: none !important;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}