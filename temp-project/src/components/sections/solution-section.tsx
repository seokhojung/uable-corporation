// src/components/sections/solution-section.tsx
'use client'

import { Box, Smartphone, Palette, Zap, Globe, Shield } from 'lucide-react'
import { Card } from '@/components/primitives/Card'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import Link from 'next/link'

const solutions = [
  {
    icon: Box,
    title: "3D 제품 컨피규레이터",
    description: "고객이 제품을 360도로 확인하고 다양한 옵션을 실시간으로 구성할 수 있는 인터랙티브 3D 솔루션",
    benefits: ["실물 경험 제공", "구매 전환율 향상", "반품률 감소"],
    technologies: ["Three.js", "WebGL", "React Three Fiber"],
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-700"
  },
  {
    icon: Smartphone,
    title: "AR 모바일 앱",
    description: "스마트폰 카메라를 통해 실제 환경에 제품을 배치하고 확인할 수 있는 증강현실 솔루션",
    benefits: ["실제 환경 체험", "구매 확신 증가", "브랜드 차별화"],
    technologies: ["ARKit", "ARCore", "Unity"],
    color: "text-green-400",
    bgColor: "bg-green-900/20",
    borderColor: "border-green-700"
  },
  {
    icon: Globe,
    title: "WebXR 웹 경험",
    description: "브라우저에서 바로 VR/AR 경험을 제공하는 웹 기반 확장현실 솔루션",
    benefits: ["접근성 향상", "설치 불필요", "크로스 플랫폼"],
    technologies: ["WebXR", "A-Frame", "Three.js"],
    color: "text-purple-400",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-700"
  },
  {
    icon: Palette,
    title: "인터랙티브 디자인",
    description: "사용자의 행동에 반응하는 동적이고 매력적인 웹 디자인 솔루션",
    benefits: ["사용자 참여도 증가", "브랜드 인지도 향상", "전환율 개선"],
    technologies: ["CSS3", "GSAP", "Lottie"],
    color: "text-orange-400",
    bgColor: "bg-orange-900/20",
    borderColor: "border-orange-700"
  },
  {
    icon: Zap,
    title: "실시간 렌더링",
    description: "고성능 그래픽 엔진을 활용한 실시간 3D 렌더링 및 시뮬레이션",
    benefits: ["실시간 반응", "고품질 그래픽", "성능 최적화"],
    technologies: ["WebGL", "Shader", "GPU 가속"],
    color: "text-red-400",
    bgColor: "bg-red-900/20",
    borderColor: "border-red-700"
  },
  {
    icon: Shield,
    title: "보안 및 최적화",
    description: "데이터 보안과 성능 최적화를 동시에 제공하는 안전한 솔루션",
    benefits: ["데이터 보안", "성능 최적화", "신뢰성 확보"],
    technologies: ["SSL/TLS", "CDN", "캐싱"],
    color: "text-indigo-400",
    bgColor: "bg-indigo-900/20",
    borderColor: "border-indigo-700"
  }
]

export const SolutionSection = () => {
  return (
    <section className="py-20 bg-slate-800">
      <Container>
        <div className="text-center mb-16 animate-fadeIn">
          <Badge variant="primary" className="mb-4">
            솔루션 제공
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-6">
            혁신적인{' '}
            <span className="text-slate-300">디지털 솔루션</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            최신 기술과 창의적인 접근으로 비즈니스의 디지털 한계를 극복합니다.
            각 솔루션은 특정 문제를 해결하고 비즈니스 성과를 향상시킵니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className={`h-full hover:shadow-lg transition-all duration-300 ${solution.borderColor} hover:border-2`}>
                <div className="p-6">
                  <div className={`w-12 h-12 ${solution.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <solution.icon className={`w-6 h-6 ${solution.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {solution.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-200 mb-2">주요 혜택:</h4>
                    <ul className="space-y-1">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-slate-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {solution.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="bg-slate-700 border border-slate-600 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">
              모든 솔루션의 특징
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-slate-100 text-xs font-bold">✓</span>
                </div>
                <p className="text-slate-300">맞춤형 개발</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-slate-100 text-xs font-bold">✓</span>
                </div>
                <p className="text-slate-300">24/7 지원</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-slate-100 text-xs font-bold">✓</span>
                </div>
                <p className="text-slate-300">지속적 업데이트</p>
              </div>
            </div>
          </div>
          
          <Button size="lg" className="bg-slate-600 hover:bg-slate-700">
            <Link href="/contact">
              솔루션 자세히 보기
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}