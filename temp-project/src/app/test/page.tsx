'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import { ArrowRight, Code, Lightbulb, Rocket, Box, Palette } from 'lucide-react'
import { ProductsSection } from '@/components/products/products-section'
import { BrandThemeToggle } from '@/components/ui/brand-theme-toggle'

// 히어로 배경 아트 옵션들
const backgroundOptions = [
  {
    id: 'tech-grid',
    name: 'Tech Grid',
    description: '기술적 격자 패턴',
  },
  {
    id: 'particles',
    name: 'Floating Particles',
    description: '떠다니는 파티클',
  },
  {
    id: 'glass-layers',
    name: 'Glass Layers',
    description: '글래스 레이어',
  },
  {
    id: '3d-geometry',
    name: '3D Geometry',
    description: '3D 기하학',
  },
  {
    id: 'wave-aurora',
    name: 'Wave Aurora',
    description: '파도 오로라',
  },
  {
    id: 'morph-blobs',
    name: 'Morph Blobs',
    description: '변형 블롭',
  },
  {
    id: 'dotted-waves',
    name: 'Dotted Waves',
    description: '점들의 파도',
  },
  {
    id: 'hero-wave-pattern',
    name: 'Hero Wave Pattern',
    description: '히어로 파도 패턴',
  },
  {
    id: 'interactive-cursor',
    name: 'Interactive Cursor',
    description: '인터랙티브 커서',
  },
  {
    id: 'combined-waves',
    name: 'Combined Waves',
    description: '조합된 파도 패턴',
  },
  {
    id: 'shader-inspired-waves',
    name: 'Shader-Inspired Waves',
    description: 'WebGL 스타일 파도',
  },
]

// 각 배경 옵션별 CSS 코드
const getBackgroundCSS = (optionId: string) => {
  switch (optionId) {
    case 'tech-grid':
      return `/* Tech Grid */
.hero-bg-tech-grid {
  background:
    linear-gradient(90deg, transparent 24px, rgba(46, 139, 87, 0.03) 25px, rgba(46, 139, 87, 0.03) 26px, transparent 27px),
    linear-gradient(transparent 24px, rgba(46, 139, 87, 0.03) 25px, rgba(46, 139, 87, 0.03) 26px, transparent 27px),
    #0A0A0A;
  background-size: 50px 50px;
}
.hero-bg-tech-grid::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(46, 139, 87, 0.1) 0%, transparent 50%);
  animation: grid-pulse 4s ease-in-out infinite;
}
@keyframes grid-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}`

    case 'particles':
      return `/* Floating Particles */
.hero-bg-particles {
  position: relative;
  background: #0A0A0A;
}
.particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(46, 139, 87, 0.6) 0%, rgba(97, 188, 132, 0.2) 70%, transparent 100%);
  animation: float var(--duration) ease-in-out infinite var(--delay);
}
@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-10px) translateX(-5px); }
  75% { transform: translateY(-15px) translateX(8px); }
}`

    case 'glass-layers':
      return `/* Glass Layers */
.hero-bg-glass {
  background: #0A0A0A;
  position: relative;
}
.glass-layer {
  position: absolute;
  background: rgba(46, 139, 87, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(46, 139, 87, 0.1);
  border-radius: 20px;
  animation: glass-float var(--duration) ease-in-out infinite var(--delay);
}
@keyframes glass-float {
  0%, 100% { transform: translateX(0px) rotate(0deg); }
  50% { transform: translateX(var(--move-x)) rotate(var(--rotate)); }
}`

    case '3d-geometry':
      return `/* 3D Geometry */
.hero-bg-3d {
  background: #0A0A0A;
  perspective: 1000px;
}
.geometry-shape {
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, rgba(46, 139, 87, 0.1), rgba(97, 188, 132, 0.05));
  border: 1px solid rgba(46, 139, 87, 0.2);
  transform-style: preserve-3d;
  animation: geometry-rotate var(--duration) linear infinite;
}
.hexagon {
  clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
}
@keyframes geometry-rotate {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
}`

    case 'wave-aurora':
      return `/* Wave Aurora */
.hero-bg-aurora {
  background: #0A0A0A;
  position: relative;
  overflow: hidden;
}
.aurora-wave {
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(ellipse at center, rgba(46, 139, 87, 0.1) 0%, transparent 50%);
  border-radius: 40% 60% 70% 30%;
  animation: aurora-wave var(--duration) ease-in-out infinite;
}
@keyframes aurora-wave {
  0%, 100% {
    transform: rotate(0deg) scale(1);
    border-radius: 40% 60% 70% 30%;
  }
  50% {
    transform: rotate(180deg) scale(1.1);
    border-radius: 60% 40% 30% 70%;
  }
}`

    case 'morph-blobs':
      return `/* Morph Blobs */
.hero-bg-blobs {
  background: #0A0A0A;
  position: relative;
}
.morph-blob {
  position: absolute;
  background: radial-gradient(circle, rgba(46, 139, 87, 0.15) 0%, rgba(97, 188, 132, 0.05) 50%, transparent 100%);
  border-radius: 60% 40% 30% 70%;
  animation: morph var(--duration) ease-in-out infinite var(--delay);
}
@keyframes morph {
  0%, 100% {
    border-radius: 60% 40% 30% 70%;
    transform: scale(1) rotate(0deg);
  }
  50% {
    border-radius: 30% 60% 70% 40%;
    transform: scale(1.1) rotate(180deg);
  }
}`

    case 'dotted-waves':
      return `/* Dotted Waves */
.hero-bg-dotted-waves {
  background: #0A0A0A;
  position: relative;
  overflow: hidden;
}
.wave-dots {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(46, 139, 87, 0.6);
  border-radius: 50%;
  animation: wave-flow var(--wave-duration) ease-in-out infinite var(--delay);
}
.wave-row-1 { top: 20%; }
.wave-row-2 { top: 35%; }
.wave-row-3 { top: 50%; }
.wave-row-4 { top: 65%; }
.wave-row-5 { top: 80%; }

@keyframes wave-flow {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-15px) scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-25px) scale(1.5);
    opacity: 1;
  }
  75% {
    transform: translateY(-15px) scale(1.2);
    opacity: 0.8;
  }
}`

    case 'hero-wave-pattern':
      return `/* Hero Wave Pattern */
.hero-bg-wave-pattern {
  background: linear-gradient(135deg, #0A0A0A 0%, #1a2e1a 50%, #0A0A0A 100%);
  position: relative;
  overflow: hidden;
}
.wave-dot {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(46, 139, 87, var(--opacity));
  border-radius: 50%;
  animation: wave-glow 4s ease-in-out infinite var(--delay);
}
.wave-layer-1 { --base-y: 60%; }
.wave-layer-2 { --base-y: 70%; }
.wave-layer-3 { --base-y: 80%; }
.wave-layer-4 { --base-y: 90%; }

@keyframes wave-glow {
  0%, 100% {
    opacity: var(--opacity);
    transform: translateY(0px) scale(1);
  }
  50% {
    opacity: calc(var(--opacity) * 1.5);
    transform: translateY(-8px) scale(1.2);
  }
}`

    case 'interactive-cursor':
      return `/* Interactive Cursor */
.hero-bg-interactive {
  background: #0A0A0A;
  position: relative;
  overflow: hidden;
  cursor: none; /* 기본 커서 숨김 */
}
.cursor-custom {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.1s ease-out;
}
.cursor-text {
  background: rgba(46, 139, 87, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(46, 139, 87, 0.3);
  box-shadow: 0 4px 20px rgba(46, 139, 87, 0.2);
}
.cursor-dot {
  width: 6px;
  height: 6px;
  background: #2E8B57;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(46, 139, 87, 0.8);
}`

    case 'combined-waves':
      return `/* Combined Waves - Consistent Wave Flow */
.hero-bg-combined-waves {
  background: linear-gradient(135deg, #0A0A0A 0%, #0f1a0f 25%, #1a1a1a 50%, #0f1a0f 75%, #0A0A0A 100%);
  position: relative;
  overflow: hidden;
  perspective: 1200px;
}

.hero-wave-dot {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(46, 139, 87, var(--opacity));
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(46, 139, 87, var(--glow));
  transform-style: preserve-3d;
  will-change: transform;
  animation: consistent-wave-flow 4s ease-in-out infinite;
  animation-delay: calc(var(--wave-delay) * 0.1s);
}

/* 일관된 파도 흐름 - 왼쪽에서 오른쪽으로 파도가 전파됨 */
@keyframes consistent-wave-flow {
  0% {
    transform: translate3d(0px, 0px, 0px) scale(1);
    opacity: var(--opacity);
  }
  25% {
    transform: translate3d(5px, -15px, 10px) scale(1.2);
    opacity: calc(var(--opacity) * 1.3);
  }
  50% {
    transform: translate3d(8px, -25px, 18px) scale(1.4);
    opacity: calc(var(--opacity) * 1.6);
  }
  75% {
    transform: translate3d(5px, -15px, 10px) scale(1.2);
    opacity: calc(var(--opacity) * 1.3);
  }
  100% {
    transform: translate3d(0px, 0px, 0px) scale(1);
    opacity: var(--opacity);
  }
}

/* 파도 전파를 위한 딜레이 계산 */
.wave-row-1 { --wave-speed: 1; }
.wave-row-2 { --wave-speed: 1.1; }
.wave-row-3 { --wave-speed: 1.2; }
.wave-row-4 { --wave-speed: 1.3; }

/* 연속된 파도 효과 */
.hero-wave-dot:nth-child(even) {
  animation-direction: alternate;
}

/* 강화된 글로우 효과 */
.hero-wave-dot:hover {
  box-shadow: 0 0 15px rgba(46, 139, 87, 0.9);
}`

    case 'shader-inspired-waves':
      return `/* Shader-Inspired Waves - WebGL Style with CSS */
.hero-bg-shader-waves {
  background: radial-gradient(ellipse at center, #0A0A0A 0%, #0d1a0d 30%, #0A0A0A 70%);
  position: relative;
  overflow: hidden;
  perspective: 1500px;
}

.shader-wave-dot {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(46, 139, 87, var(--intensity)) 0%, transparent 70%);
  transform-style: preserve-3d;
  will-change: transform;
  animation: shader-wave-motion var(--period) linear infinite;
  animation-delay: calc(var(--phase) * 1s);
}

/* WebGL 스타일 파도 모션 - 수학적 정확성 */
@keyframes shader-wave-motion {
  0% {
    transform: translate3d(
      calc(cos(var(--phase) * 360deg) * var(--amplitude-x) * 1px),
      calc(sin(var(--phase) * 360deg + var(--wave-offset)) * var(--amplitude-y) * 1px),
      calc(sin(var(--phase) * 180deg) * var(--amplitude-z) * 1px)
    ) scale(var(--base-scale));
  }
  25% {
    transform: translate3d(
      calc(cos((var(--phase) + 0.25) * 360deg) * var(--amplitude-x) * 1px),
      calc(sin((var(--phase) + 0.25) * 360deg + var(--wave-offset)) * var(--amplitude-y) * 1px),
      calc(sin((var(--phase) + 0.25) * 180deg) * var(--amplitude-z) * 1px)
    ) scale(calc(var(--base-scale) * 1.2));
  }
  50% {
    transform: translate3d(
      calc(cos((var(--phase) + 0.5) * 360deg) * var(--amplitude-x) * 1px),
      calc(sin((var(--phase) + 0.5) * 360deg + var(--wave-offset)) * var(--amplitude-y) * 1px),
      calc(sin((var(--phase) + 0.5) * 180deg) * var(--amplitude-z) * 1px)
    ) scale(calc(var(--base-scale) * 1.4));
  }
  75% {
    transform: translate3d(
      calc(cos((var(--phase) + 0.75) * 360deg) * var(--amplitude-x) * 1px),
      calc(sin((var(--phase) + 0.75) * 360deg + var(--wave-offset)) * var(--amplitude-y) * 1px),
      calc(sin((var(--phase) + 0.75) * 180deg) * var(--amplitude-z) * 1px)
    ) scale(calc(var(--base-scale) * 1.2));
  }
  100% {
    transform: translate3d(
      calc(cos((var(--phase) + 1) * 360deg) * var(--amplitude-x) * 1px),
      calc(sin((var(--phase) + 1) * 360deg + var(--wave-offset)) * var(--amplitude-y) * 1px),
      calc(sin((var(--phase) + 1) * 180deg) * var(--amplitude-z) * 1px)
    ) scale(var(--base-scale));
  }
}

/* 성능 최적화 */
.shader-wave-dot {
  backface-visibility: hidden;
  pointer-events: none;
}`

    default:
      return '/* CSS 코드가 여기에 표시됩니다 */'
  }
}

// 히어로 배경 아트 섹션 컴포넌트
interface HeroBackgroundArtSectionProps {
  activeBgOption: string
  setActiveBgOption: (option: string) => void
}

function HeroBackgroundArtSection({ activeBgOption, setActiveBgOption }: HeroBackgroundArtSectionProps) {
  return (
    <section className="bg-custom-bg-100 text-custom-text-100 p-8 rounded-lg">
      <div className="text-center mb-8">
        <Badge variant="primary" className="bg-primary-100 text-custom-text-100 border-primary-100 mb-4">
          🎨 히어로 배경 아트 미리보기
        </Badge>
        <h2 className="text-3xl font-bold text-custom-text-100 mt-4 mb-2">
          6가지 배경 디자인 옵션
        </h2>
        <p className="text-custom-text-200">
          브랜드 테마에 최적화된 히어로 섹션 배경 효과들을 미리보기하고 선택하세요.
        </p>
      </div>

      {/* 배경 옵션 탭 */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {backgroundOptions.map((option) => (
          <Button
            key={option.id}
            variant={activeBgOption === option.id ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveBgOption(option.id)}
            className={activeBgOption === option.id
              ? 'bg-primary-100 text-custom-text-100 border-primary-100'
              : 'border-gray-600 text-custom-text-200 hover:bg-custom-bg-200'
            }
          >
            {option.name}
          </Button>
        ))}
      </div>

      {/* 미리보기 영역 - 더 큰 사이즈 */}
      <div className="space-y-8">
        {/* 대형 배경 미리보기 */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-custom-text-100">미리보기</h3>
          <div
            className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden border border-gray-600"
            style={{ background: '#0A0A0A' }}
          >
            <BackgroundPreview option={activeBgOption} />

            {/* 미리보기 오버레이 텍스트 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center z-10">
                <h4 className="text-3xl lg:text-4xl font-bold text-custom-text-100 mb-3">
                  {backgroundOptions.find(opt => opt.id === activeBgOption)?.name}
                </h4>
                <p className="text-lg text-custom-text-200">
                  {backgroundOptions.find(opt => opt.id === activeBgOption)?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CSS 코드 - 더 넓은 레이아웃 */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-custom-text-100">CSS 코드</h3>
            <div className="bg-custom-bg-000 rounded-lg p-4 border border-gray-700 max-h-80 overflow-y-auto">
              <pre className="text-sm text-custom-text-200 overflow-x-auto whitespace-pre-wrap">
                <code>{getBackgroundCSS(activeBgOption)}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-custom-text-100">구현 가이드</h3>
            <div className="bg-custom-bg-200 rounded-lg p-4 border border-gray-600">
              <div className="text-sm text-custom-text-200 space-y-3">
                <div>
                  <p className="font-semibold text-custom-text-100 mb-2">적용 방법:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>위 CSS를 globals.css 또는 컴포넌트 스타일에 추가</li>
                    <li>히어로 섹션 className에 해당 클래스 적용</li>
                    <li>브랜드 테마에서 최적화된 색상으로 표시</li>
                  </ol>
                </div>

                <div>
                  <p className="font-semibold text-custom-text-100 mb-2">성능 팁:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>GPU 가속을 위해 will-change 속성 사용</li>
                    <li>transform3d로 하드웨어 가속화</li>
                    <li>적절한 애니메이션 duration 설정</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 배경 미리보기 컴포넌트
function BackgroundPreview({ option }: { option: string }) {
  switch (option) {
    case 'tech-grid':
      return (
        <div className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              background: `
                linear-gradient(90deg, transparent 24px, rgba(46, 139, 87, 0.1) 25px, rgba(46, 139, 87, 0.1) 26px, transparent 27px),
                linear-gradient(transparent 24px, rgba(46, 139, 87, 0.1) 25px, rgba(46, 139, 87, 0.1) 26px, transparent 27px),
                #0A0A0A
              `,
              backgroundSize: '50px 50px',
            }}
          >
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(46, 139, 87, 0.15) 0%, transparent 50%)',
              }}
            />
          </div>
        </div>
      )

    case 'particles':
      return (
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                background: `radial-gradient(circle, rgba(46, 139, 87, ${Math.random() * 0.3 + 0.2}) 0%, rgba(97, 188, 132, 0.1) 70%, transparent 100%)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 3}s`,
              }}
            />
          ))}
        </div>
      )

    case 'glass-layers':
      return (
        <div className="absolute inset-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute backdrop-blur-sm rounded-lg border animate-pulse"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 150 + 80}px`,
                left: `${Math.random() * 60}%`,
                top: `${Math.random() * 60}%`,
                background: 'rgba(46, 139, 87, 0.08)',
                borderColor: 'rgba(46, 139, 87, 0.2)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
              }}
            />
          ))}
        </div>
      )

    case '3d-geometry':
      return (
        <div className="absolute inset-0" style={{ perspective: '1000px' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-spin"
              style={{
                width: '60px',
                height: '60px',
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
                background: 'linear-gradient(45deg, rgba(46, 139, 87, 0.15), rgba(97, 188, 132, 0.08))',
                border: '1px solid rgba(46, 139, 87, 0.3)',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )

    case 'wave-aurora':
      return (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                width: '200%',
                height: '200%',
                left: '-50%',
                top: '-50%',
                background: `radial-gradient(ellipse at center, rgba(46, 139, 87, ${0.05 + i * 0.03}) 0%, transparent 50%)`,
                borderRadius: '40% 60% 70% 30%',
                animationDuration: `${8 + i * 2}s`,
                animationDelay: `${i * 2}s`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
      )

    case 'morph-blobs':
      return (
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                width: `${Math.random() * 150 + 100}px`,
                height: `${Math.random() * 150 + 100}px`,
                left: `${Math.random() * 70}%`,
                top: `${Math.random() * 70}%`,
                background: `radial-gradient(circle, rgba(46, 139, 87, ${Math.random() * 0.1 + 0.05}) 0%, rgba(97, 188, 132, 0.03) 50%, transparent 100%)`,
                borderRadius: '60% 40% 30% 70%',
                animationDuration: `${Math.random() * 8 + 6}s`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )

    case 'dotted-waves':
      return (
        <div className="absolute inset-0">
          {/* 5개의 파도 줄 생성 */}
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="absolute w-full"
              style={{
                top: `${20 + rowIndex * 15}%`,
              }}
            >
              {/* 각 줄마다 점들 생성 */}
              {Array.from({ length: 25 }).map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className="absolute rounded-full"
                  style={{
                    width: '4px',
                    height: '4px',
                    left: `${dotIndex * 4}%`,
                    background: `rgba(46, 139, 87, ${Math.random() * 0.4 + 0.3})`,
                    animation: `wave-motion ${3 + rowIndex * 0.5}s ease-in-out infinite`,
                    animationDelay: `${dotIndex * 0.1 + rowIndex * 0.2}s`,
                  }}
                />
              ))}
            </div>
          ))}

          {/* CSS 키프레임을 위한 스타일 태그 */}
          <style jsx>{`
            @keyframes wave-motion {
              0%, 100% {
                transform: translateY(0px) scale(1);
                opacity: 0.4;
              }
              25% {
                transform: translateY(-12px) scale(1.3);
                opacity: 0.7;
              }
              50% {
                transform: translateY(-20px) scale(1.6);
                opacity: 1;
              }
              75% {
                transform: translateY(-12px) scale(1.3);
                opacity: 0.7;
              }
            }
          `}</style>
        </div>
      )

    case 'hero-wave-pattern':
      return (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A 0%, #1a2e1a 50%, #0A0A0A 100%)',
          }}
        >
          {/* 4개의 파도 레이어 생성 */}
          {Array.from({ length: 4 }).map((_, layerIndex) => (
            <div key={layerIndex} className="absolute inset-0">
              {/* 각 레이어마다 곡선 형태의 점들 생성 */}
              {Array.from({ length: 50 }).map((_, dotIndex) => {
                const x = (dotIndex / 49) * 100; // 0-100%
                const baseY = 60 + layerIndex * 10; // 60%, 70%, 80%, 90%

                // 사인 파형으로 곡선 생성
                const waveOffset = Math.sin((dotIndex / 49) * Math.PI * 3 + layerIndex * 0.5) * (8 - layerIndex * 1.5);
                const finalY = baseY + waveOffset;

                // 거리에 따른 투명도 계산
                const opacity = Math.max(0.2, 1 - (layerIndex * 0.15) - (Math.abs(dotIndex - 25) / 50) * 0.3);

                return (
                  <div
                    key={dotIndex}
                    className="absolute rounded-full"
                    style={{
                      width: '3px',
                      height: '3px',
                      left: `${x}%`,
                      top: `${finalY}%`,
                      background: `rgba(46, 139, 87, ${opacity})`,
                      boxShadow: `0 0 6px rgba(46, 139, 87, ${opacity * 0.8})`,
                      animation: `wave-pulse ${3 + layerIndex * 0.5}s ease-in-out infinite`,
                      animationDelay: `${dotIndex * 0.02 + layerIndex * 0.1}s`,
                    }}
                  />
                );
              })}
            </div>
          ))}

          {/* 추가 글로우 효과 */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 50% 80%, rgba(46, 139, 87, 0.1) 0%, transparent 70%)',
            }}
          />

          {/* CSS 애니메이션 */}
          <style jsx>{`
            @keyframes wave-pulse {
              0%, 100% {
                transform: translateY(0px) scale(1);
                opacity: 1;
              }
              50% {
                transform: translateY(-5px) scale(1.3);
                opacity: 0.7;
              }
            }
          `}</style>
        </div>
      )

    case 'interactive-cursor':
      return <InteractiveCursorPreview />

    case 'combined-waves':
      return <CombinedWavesPreview />

    case 'shader-inspired-waves':
      return <ShaderInspiredWavesPreview />

    default:
      return null
  }
}

// 인터랙티브 커서 미리보기 컴포넌트
function InteractiveCursorPreview() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect()
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const previewElement = document.querySelector('.cursor-preview-area')
    if (previewElement) {
      previewElement.addEventListener('mousemove', handleMouseMove as any)
      return () => previewElement.removeEventListener('mousemove', handleMouseMove as any)
    }
  }, [])

  return (
    <div
      className="cursor-preview-area absolute inset-0"
      style={{
        background: '#0A0A0A',
        cursor: 'none',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 배경 그라데이션 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(46, 139, 87, 0.05), transparent 40%)',
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`,
        } as any}
      />

      {/* 떠다니는 점들 */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            width: '2px',
            height: '2px',
            left: `${(i * 5 + 10)}%`,
            top: `${Math.random() * 80 + 10}%`,
            background: `rgba(46, 139, 87, ${Math.random() * 0.5 + 0.2})`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}

      {/* 커스텀 커서 */}
      {isHovering && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(0.8)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* 커서 텍스트 */}
          <div
            className="relative"
            style={{
              background: 'rgba(46, 139, 87, 0.9)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(46, 139, 87, 0.3)',
              boxShadow: '0 4px 20px rgba(46, 139, 87, 0.3)',
              transform: 'translate(-50%, -120%)',
            }}
          >
            Explore
          </div>

          {/* 커서 점 */}
          <div
            style={{
              width: '6px',
              height: '6px',
              background: '#2E8B57',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(46, 139, 87, 0.8)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}

      {/* 중앙 안내 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white/70">
          <div className="text-lg mb-2">마우스를 움직여보세요</div>
          <div className="text-sm">커스텀 커서가 따라다닙니다</div>
        </div>
      </div>
    </div>
  )
}

// 일관된 파도 흐름 미리보기 컴포넌트
function CombinedWavesPreview() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #0f1a0f 25%, #1a1a1a 50%, #0f1a0f 75%, #0A0A0A 100%)',
        perspective: '1200px',
      }}
    >
      {/* 일관된 파도 레이어들 */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {Array.from({ length: 4 }).map((_, layerIndex) => {
          return (
            <div key={`consistent-wave-${layerIndex}`} className="absolute inset-0">
              {Array.from({ length: 50 }).map((_, dotIndex) => {
                const x = (dotIndex / 49) * 100;
                const baseY = 60 + layerIndex * 10;

                // 일관된 곡선 패턴 (모든 점이 같은 파형을 따름)
                const wavePhase = (dotIndex / 49) * Math.PI * 2.5 + layerIndex * 0.5;
                const curveY = baseY + Math.sin(wavePhase) * (8 - layerIndex * 1.5);

                // 거리에 따른 투명도 (더 은은하게)
                const centerDistance = Math.abs(dotIndex - 25) / 25;
                const opacity = Math.max(0.15, 0.6 - (layerIndex * 0.12) - (centerDistance * 0.25));

                // 파도 전파를 위한 딜레이 계산 (왼쪽에서 오른쪽으로)
                const waveDelay = dotIndex * 0.08 + layerIndex * 0.15;

                return (
                  <div
                    key={dotIndex}
                    className="absolute rounded-full"
                    style={{
                      width: '3px',
                      height: '3px',
                      left: `${x}%`,
                      top: `${curveY}%`,
                      background: `rgba(46, 139, 87, ${opacity})`,
                      boxShadow: `0 0 6px rgba(46, 139, 87, ${opacity * 0.5})`,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                      // 모든 점이 동일한 애니메이션을 사용하되, 딜레이로 파도 전파 효과
                      animation: 'consistent-wave-motion 4s ease-in-out infinite',
                      animationDelay: `${waveDelay}s`,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* 파도 방향 표시용 화살표 효과 */}
      <div
        className="absolute top-4 left-4 text-white/50 text-sm flex items-center gap-2"
      >
        <span>파도 방향:</span>
        <div className="flex">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary-100 rounded-full mx-1 animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s',
              }}
            />
          ))}
        </div>
        <span>→</span>
      </div>

      {/* 글로우 효과 (더 은은하게) */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(46, 139, 87, 0.06) 0%, transparent 75%)',
        }}
      />

      {/* 일관된 파도 애니메이션 */}
      <style jsx>{`
        @keyframes consistent-wave-motion {
          0% {
            transform: translate3d(0px, 0px, 0px) scale(1);
            opacity: 1;
          }
          25% {
            transform: translate3d(4px, -12px, 8px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translate3d(6px, -20px, 15px) scale(1.4);
            opacity: 0.9;
          }
          75% {
            transform: translate3d(4px, -12px, 8px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate3d(0px, 0px, 0px) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

// WebGL 셰이더 스타일 파도 미리보기 컴포넌트 (아이소메트릭 뷰)
function ShaderInspiredWavesPreview() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(to bottom, #0A0A0A 0%, #0d1a0d 40%, #1a1a1a 70%, #0A0A0A 100%)',
        perspective: '2000px',
        perspectiveOrigin: '50% 80%', // 지평선 느낌을 위해 아래쪽 관점
      }}
    >
      {/* 지평선 라인 */}
      <div
        className="absolute w-full h-px opacity-20"
        style={{
          top: '75%',
          background: 'linear-gradient(to right, transparent 0%, rgba(46, 139, 87, 0.3) 50%, transparent 100%)',
        }}
      />

      {/* 올바른 원근법 파도 그리드 */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) rotateY(0deg)', // 아이소메트릭 각도
        }}
      >
        {/* 원근법에 따른 행 간격 구현 */}
        {Array.from({ length: 15 }).map((_, rowIndex) => {
          // 0 = 지평선(중간, 멀음), 14 = 가까운 곳(아래)
          const distanceFromHorizon = rowIndex / 14; // 0(지평선) → 1(가까움)

          // 지평선은 좁은 간격, 가까운 곳은 넓은 간격
          const baseRowSpacing = 2; // 지평선 최소 간격
          const maxRowSpacing = 15; // 가까운 곳 최대 간격
          const rowSpacing = baseRowSpacing + (maxRowSpacing - baseRowSpacing) * Math.pow(distanceFromHorizon, 2);

          // Y 위치: 지평선(중간) → 가까운 곳(아래)
          const y = 45 + (rowIndex * rowSpacing * 0.8);

          // 가로 점들의 개수 (모든 행 동일)
          const dotsPerRow = 20;

          // 원근 효과
          const perspectiveScale = 1 - (distanceFromHorizon * 0.3); // 가까울수록 크게
          const perspectiveOpacity = 0.9 - (distanceFromHorizon * 0.4); // 가까울수록 밝게 (역방향)

          return Array.from({ length: dotsPerRow }).map((_, colIndex) => {
            const x = (colIndex / (dotsPerRow - 1)) * 80 + 10; // 10-90% 범위

            // 파도 웨이브 파라미터
            const waveDelay = (colIndex * 0.08) + (rowIndex * 0.05);

            // 크기와 진폭
            const baseAmplitude = 15 + (distanceFromHorizon * 10); // 가까울수록 큰 진폭
            const amplitude = {
              x: baseAmplitude * 0.6,
              y: baseAmplitude * 1.2,
              z: baseAmplitude * 0.8,
            };

            // 중앙 집중 강도
            const centerDistance = Math.abs(colIndex - (dotsPerRow - 1) / 2) / ((dotsPerRow - 1) / 2);
            const intensity = Math.max(0.15, (0.7 - centerDistance * 0.3) * perspectiveOpacity);

            // 점 크기
            const size = Math.max(1, (2 + intensity * 2) * (0.7 + distanceFromHorizon * 0.5));

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${x}%`,
                  top: `${y}%`,
                  background: `radial-gradient(circle, rgba(46, 139, 87, ${intensity}) 0%, transparent 70%)`,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  pointerEvents: 'none',
                  transform: `translateZ(${-rowIndex * 15}px)`, // 순차적 깊이
                  animation: 'isometric-wave 4s ease-in-out infinite',
                  animationDelay: `${waveDelay}s`,
                  '--amplitude-x': amplitude.x,
                  '--amplitude-y': amplitude.y,
                  '--amplitude-z': amplitude.z,
                  '--intensity': intensity,
                  '--base-scale': 0.8 + intensity * 0.4,
                  '--depth-factor': distanceFromHorizon,
                } as any}
              />
            );
          });
        }).flat()}
      </div>

      {/* 정보 패널 */}
      <div className="absolute top-4 left-4 text-white/60 text-xs">
        <div className="bg-black/30 backdrop-blur-sm rounded px-3 py-2">
          <div>🏞️ Correct Perspective Grid</div>
          <div>300 vertices, proper row spacing</div>
          <div>15 rows × 20 cols</div>
          <div>Spacing: 2px(horizon) → 15px(near)</div>
        </div>
      </div>

      {/* 원근법 시각화 */}
      <div className="absolute top-4 right-4 text-white/40 text-xs">
        <div className="bg-black/20 backdrop-blur-sm rounded px-2 py-1">
          <div className="mb-2">
            <div className="text-xs mb-1">Row Spacing:</div>
            <div className="flex flex-col gap-1">
              {/* 지평선 (좁은 간격) */}
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <div className="w-1 h-px bg-primary-100 opacity-60"></div>
                  <div className="w-1 h-px bg-primary-100 opacity-60"></div>
                  <div className="w-1 h-px bg-primary-100 opacity-60"></div>
                </div>
                <span className="text-xs opacity-60">Horizon</span>
              </div>

              <div className="text-xs mx-1 text-center">↓</div>

              {/* 가까운 곳 (넓은 간격) */}
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1.5">
                  <div className="w-1 h-px bg-primary-100"></div>
                  <div className="w-1 h-px bg-primary-100"></div>
                  <div className="w-1 h-px bg-primary-100"></div>
                </div>
                <span className="text-xs opacity-60">Near</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 아이소메트릭 웨이브 애니메이션 */}
      <style jsx>{`
        @keyframes isometric-wave {
          0% {
            transform: translateZ(calc(var(--depth-factor) * -200px))
                      translate3d(0px, 0px, 0px)
                      scale(var(--base-scale));
            opacity: var(--intensity);
          }
          25% {
            transform: translateZ(calc(var(--depth-factor) * -200px))
                      translate3d(
                        calc(var(--amplitude-x) * 0.4 * 1px),
                        calc(var(--amplitude-y) * -0.8 * 1px),
                        calc(var(--amplitude-z) * 0.6 * 1px)
                      )
                      scale(calc(var(--base-scale) * 1.3));
            opacity: calc(var(--intensity) * 1.4);
          }
          50% {
            transform: translateZ(calc(var(--depth-factor) * -200px))
                      translate3d(
                        calc(var(--amplitude-x) * 0.6 * 1px),
                        calc(var(--amplitude-y) * -1.2 * 1px),
                        calc(var(--amplitude-z) * 1 * 1px)
                      )
                      scale(calc(var(--base-scale) * 1.6));
            opacity: calc(var(--intensity) * 1.8);
          }
          75% {
            transform: translateZ(calc(var(--depth-factor) * -200px))
                      translate3d(
                        calc(var(--amplitude-x) * 0.4 * 1px),
                        calc(var(--amplitude-y) * -0.8 * 1px),
                        calc(var(--amplitude-z) * 0.6 * 1px)
                      )
                      scale(calc(var(--base-scale) * 1.3));
            opacity: calc(var(--intensity) * 1.4);
          }
          100% {
            transform: translateZ(calc(var(--depth-factor) * -200px))
                      translate3d(0px, 0px, 0px)
                      scale(var(--base-scale));
            opacity: var(--intensity);
          }
        }
      `}</style>
    </div>
  )
}

export default function TestPage() {
  const [activeSection, setActiveSection] = useState('hero')
  const [activeBgOption, setActiveBgOption] = useState('tech-grid')

  const sections = [
    { id: 'hero', name: '히어로 섹션', icon: Rocket },
    { id: 'feature', name: '기능 섹션', icon: Lightbulb },
    { id: 'demo', name: '데모 섹션', icon: Code },
    { id: 'colors', name: '신규 색상 테스트', icon: Box },
    { id: 'hero-bg', name: '히어로 배경 아트', icon: Palette },
    { id: 'products', name: '자체 제품', icon: Box },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* 테스트 네비게이션 */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Badge variant="outline" className="text-blue-600 dark:text-blue-400">
            테스트 페이지
          </Badge>
          <div className="flex gap-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveSection(section.id)}
                className="flex items-center gap-2"
              >
                <section.icon className="w-4 h-4" />
                {section.name}
              </Button>
            ))}
          </div>
          <BrandThemeToggle />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto p-8">
        
        {/* 히어로 섹션 테스트 */}
        {activeSection === 'hero' && (
          <section className="py-16 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="primary" className="mb-6">
                새로운 섹션 개발
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-slate-100 mb-6">
                테스트 섹션 제목
              </h1>
              <p className="text-xl text-gray-600 dark:text-slate-300 mb-8">
                이곳에서 새로운 섹션의 레이아웃과 디자인을 테스트할 수 있습니다.
                다양한 컴포넌트와 스타일을 실험해보세요.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  기본 버튼
                </Button>
                <Button variant="outline" size="lg">
                  아웃라인 버튼
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* 기능 섹션 테스트 */}
        {activeSection === 'feature' && (
          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700"
                >
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
                    기능 {item}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-300 mb-4">
                    이 기능은 사용자에게 훌륭한 경험을 제공합니다. 테스트를 통해 최적화된 디자인을 구현할 수 있습니다.
                  </p>
                  <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 p-0">
                    자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 데모 섹션 테스트 */}
        {activeSection === 'demo' && (
          <section className="py-16">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 rounded-lg p-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-6">
                    인터랙티브 데모
                  </Badge>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-6">
                    실시간 테스트 환경
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">색상 테스트</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500'].map((color) => (
                        <div key={color} className={`${color} h-12 rounded`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">버튼 테스트</h3>
                    <div className="space-y-3">
                      <Button className="w-full">기본 버튼</Button>
                      <Button variant="outline" className="w-full">아웃라인 버튼</Button>
                      <Button variant="ghost" className="w-full">고스트 버튼</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 신규 색상 팔레트 테스트 */}
        {activeSection === 'colors' && (
          <section className="py-16 space-y-8">

            {/* 브랜드 테마 모드 테스트 */}
            <div className="bg-brand-dark border border-brand-accent rounded-lg p-8">
              <div className="text-center mb-8">
                <Badge variant="primary" className="bg-brand-primary text-brand-primary border-brand-accent">
                  🎨 브랜드 테마 시스템
                </Badge>
                <h2 className="text-3xl font-bold text-brand-primary mt-4 mb-2">
                  브랜드 전용 색상 테마
                </h2>
                <p className="text-brand-secondary">
                  테마 토글로 light → dark → brand 순환, data-theme=&quot;brand&quot;로 활성화됩니다.
                </p>
              </div>

              {/* 색상 팔레트 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Primary Colors */}
                <div className="bg-brand-darker rounded-lg p-6">
                  <h3 className="text-brand-primary font-semibold mb-4">Primary Colors</h3>
                  <div className="space-y-3">
                    <div className="bg-primary-100 h-12 rounded flex items-center justify-center">
                      <span className="text-white font-medium">#2E8B57</span>
                    </div>
                    <div className="bg-primary-200 h-12 rounded flex items-center justify-center">
                      <span className="text-white font-medium">#61bc84</span>
                    </div>
                    <div className="bg-primary-300 h-12 rounded flex items-center justify-center">
                      <span className="text-gray-800 font-medium">#c6ffe6</span>
                    </div>
                  </div>
                </div>

                {/* Accent Colors */}
                <div className="bg-brand-darker rounded-lg p-6">
                  <h3 className="text-brand-primary font-semibold mb-4">Accent Colors</h3>
                  <div className="space-y-3">
                    <div className="bg-accent-100 h-12 rounded flex items-center justify-center">
                      <span className="text-white font-medium">#8FBC8F</span>
                    </div>
                    <div className="bg-accent-200 h-12 rounded flex items-center justify-center">
                      <span className="text-white font-medium">#345e37</span>
                    </div>
                    <div className="h-12 rounded bg-gradient-to-r from-accent-100 to-accent-200 flex items-center justify-center">
                      <span className="text-white font-medium">Gradient</span>
                    </div>
                  </div>
                </div>

                {/* Background Colors */}
                <div className="bg-brand-darker rounded-lg p-6">
                  <h3 className="text-brand-primary font-semibold mb-4">Background Colors</h3>
                  <div className="space-y-3">
                    <div style={{ backgroundColor: 'var(--bg-100)' }} className="h-12 rounded border border-brand-accent flex items-center justify-center">
                      <span className="text-brand-secondary font-medium">#1E1E1E</span>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-200)' }} className="h-12 rounded border border-brand-accent flex items-center justify-center">
                      <span className="text-brand-secondary font-medium">#2d2d2d</span>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-300)' }} className="h-12 rounded flex items-center justify-center">
                      <span className="text-brand-secondary font-medium">#454545</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 버튼 테스트 */}
              <div className="bg-brand-darker rounded-lg p-6 mb-6">
                <h3 className="text-brand-primary font-semibold mb-4">브랜드 테마 버튼 변형</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-primary-100 hover:bg-primary-200 text-custom-text-100">
                    Primary
                  </Button>
                  <Button className="bg-accent-200 hover:bg-accent-100 text-custom-text-100">
                    Accent
                  </Button>
                  <Button variant="outline" className="border-primary-100 text-primary-100 hover:bg-primary-100 hover:text-custom-text-100">
                    Outline
                  </Button>
                  <Button className="bg-gradient-to-r from-primary-100 to-accent-200 text-custom-text-100">
                    Gradient
                  </Button>
                </div>
              </div>

              {/* 카드 컴포넌트 테스트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-custom-bg-200 border border-custom-bg-300 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Lightbulb className="w-6 h-6 text-custom-text-100" />
                    </div>
                    <div>
                      <h4 className="text-custom-text-100 font-semibold">Feature Card</h4>
                      <p className="text-custom-text-200 text-sm">새로운 색상 적용</p>
                    </div>
                  </div>
                  <p className="text-custom-text-200 mb-4">
                    새로운 브랜드 색상을 적용한 카드 컴포넌트입니다. 다크모드에 최적화된 색상으로 가독성과 브랜드 일관성을 제공합니다.
                  </p>
                  <Button variant="outline" className="border-primary-200 text-primary-200 hover:bg-primary-200 hover:text-custom-text-100">
                    자세히 보기
                  </Button>
                </div>

                <div className="bg-custom-bg-200 border border-custom-bg-300 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent-200 rounded-lg flex items-center justify-center mr-4">
                      <Code className="w-6 h-6 text-custom-text-100" />
                    </div>
                    <div>
                      <h4 className="text-custom-text-100 font-semibold">Code Component</h4>
                      <p className="text-custom-text-200 text-sm">액센트 색상 적용</p>
                    </div>
                  </div>
                  <p className="text-custom-text-200 mb-4">
                    액센트 색상을 활용한 컴포넌트입니다. 강조가 필요한 요소에 사용하여 시각적 하이어라키를 구성할 수 있습니다.
                  </p>
                  <Button className="bg-accent-200 hover:bg-accent-100 text-custom-text-100">
                    실행하기
                  </Button>
                </div>
              </div>
            </div>

            {/* 색상 가이드 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">
                색상 사용 가이드
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-slate-100 mb-2">Primary Colors</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-slate-300">
                    <li>• primary-100: 메인 브랜드 색상, 주요 버튼</li>
                    <li>• primary-200: 호버 상태, 보조 요소</li>
                    <li>• primary-300: 밝은 배경, 강조 텍스트</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-slate-100 mb-2">Accent Colors</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-slate-300">
                    <li>• accent-100: 부드러운 강조, 보조 버튼</li>
                    <li>• accent-200: 강한 강조, 액션 버튼</li>
                    <li>• 그라디언트 조합으로 고급 효과 연출</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 히어로 배경 아트 섹션 */}
        {activeSection === 'hero-bg' && (
          <HeroBackgroundArtSection
            activeBgOption={activeBgOption}
            setActiveBgOption={setActiveBgOption}
          />
        )}

        {/* 자체 제품 섹션 테스트 */}
        {activeSection === 'products' && (
          <ProductsSection />
        )}

        {/* 개발 정보 */}
        <div className="mt-16 p-6 bg-gray-100 dark:bg-slate-800 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
            개발 정보
          </h3>
          <div className="text-sm text-gray-600 dark:text-slate-300 space-y-1">
            <p><strong>현재 섹션:</strong> {sections.find(s => s.id === activeSection)?.name}</p>
            <p><strong>페이지 경로:</strong> /test</p>
            <p><strong>파일 위치:</strong> src/app/test/page.tsx</p>
          </div>
        </div>
      </div>
    </div>
  )
}