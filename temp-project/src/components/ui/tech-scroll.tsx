'use client'

import { useEffect, useRef, useState } from 'react'

interface TechScrollProps {
  technologies: string[]
  speed?: number
  className?: string
}

export const TechScroll = ({ technologies, speed = 1, className = '' }: TechScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(0)
  const animationRef = useRef<number>()

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) {
      return
    }

    // 이미 애니메이션이 실행 중이면 중단
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    let position = 0

    const animate = () => {
      position -= speed // 왼쪽으로 이동
      
      // 첫 번째 세트가 완전히 사라지면 위치 리셋
      const firstSetWidth = scrollElement.children[0]?.clientWidth || 0
      if (Math.abs(position) >= firstSetWidth) {
        position = 0
      }
      
      setTranslateX(position)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed, technologies])

  return (
    <div className={`overflow-hidden bg-slate-800 w-full ${className}`}>
      <div 
        ref={scrollRef}
        className="flex whitespace-nowrap py-3 md:py-4 lg:py-6 h-10 md:h-12 lg:h-15 w-full"
        style={{ 
          transform: `translate3d(${translateX}px, 0px, 0px)`,
          transition: 'none'
        }}
      >
                 {/* 첫 번째 세트 */}
         <div className="flex items-center space-x-8 md:space-x-12 lg:space-x-16 px-4 md:px-6 lg:px-8">
           {technologies.map((tech, index) => (
             <span
               key={`first-${index}`}
               className="text-sm md:text-lg lg:text-xl font-semibold text-slate-400"
             >
               {tech}
             </span>
           ))}
         </div>
         
         {/* 두 번째 세트 (무한 스크롤을 위해 복제) */}
         <div className="flex items-center space-x-8 md:space-x-12 lg:space-x-16 px-4 md:px-6 lg:px-8">
           {technologies.map((tech, index) => (
             <span
               key={`second-${index}`}
               className="text-sm md:text-lg lg:text-xl font-semibold text-slate-300"
             >
               {tech}
             </span>
           ))}
         </div>
      </div>
    </div>
  )
} 