'use client'

import { useEffect, useRef, useState } from 'react'
import { Globe, Smartphone, Code, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface ServiceScrollProps {
  className?: string
  speed?: number
}

const services = [
  {
    icon: Globe,
    title: '웹 개발',
    description: '반응형 웹사이트 및 웹 애플리케이션 개발',
    color: 'from-slate-600 to-slate-500',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop'
  },
  {
    icon: Smartphone,
    title: '모바일 앱',
    description: 'iOS/Android 네이티브 및 크로스 플랫폼 앱',
    color: 'from-slate-500 to-slate-400',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'
  },
  {
    icon: Code,
    title: '3D/AR/WebXR',
    description: '최신 기술을 활용한 인터랙티브 경험',
    color: 'from-slate-500 to-slate-400',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop'
  }
]

export const ServiceScroll = ({ className = '', speed = 1 }: ServiceScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) {
      console.log('ServiceScroll: scrollElement not found')
      return
    }

    console.log('ServiceScroll: Starting animation with', services.length, 'services')
    
    let animationId: number
    let position = 0

    const animate = () => {
      position -= speed // 위로 이동
      
      // 첫 번째 세트가 완전히 사라지면 위치 리셋
      const firstSetHeight = scrollElement.children[0]?.clientHeight || 0
      if (Math.abs(position) >= firstSetHeight) {
        position = 0
      }
      
      setTranslateY(position)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [speed])

  return (
    <div className={`overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl ${className}`}>
      <div 
        ref={scrollRef}
        className="space-y-6"
        style={{ 
          transform: `translate3d(0px, ${translateY}px, 0px)`,
          transition: 'none'
        }}
      >
        {/* 첫 번째 세트 */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <div key={`first-${service.title}`} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${service.color} shadow-lg`}>
                  <service.icon className="w-8 h-8 text-slate-100" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">{service.title}</h3>
                  <p className="text-slate-300">{service.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
              <div className="mt-4 rounded-lg overflow-hidden">
                <div className="overflow-hidden">
                  <Image 
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 두 번째 세트 (무한 스크롤을 위해 복제) */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <div key={`second-${service.title}`} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${service.color} shadow-lg`}>
                  <service.icon className="w-8 h-8 text-slate-100" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">{service.title}</h3>
                  <p className="text-slate-300">{service.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
              <div className="mt-4 rounded-lg overflow-hidden">
                <div className="overflow-hidden">
                  <Image 
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 