// src/components/sections/problem-section.tsx
'use client'

import { AlertTriangle, Users, Globe, TrendingDown, Clock, Shield } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'

const problems = [
  {
    icon: AlertTriangle,
    title: "기술적 한계",
    description: "기존 웹사이트로는 복잡한 3D/AR 기술을 효과적으로 전달하기 어려움",
    impact: "고객 이해도 저하",
    color: "text-red-400",
    bgColor: "bg-red-900/20",
    borderColor: "border-red-700"
  },
  {
    icon: Users,
    title: "사용자 경험 부족",
    description: "방문자가 회사의 기술 역량을 직관적으로 이해하기 어려운 상황",
    impact: "전환율 감소",
    color: "text-orange-400",
    bgColor: "bg-orange-900/20",
    borderColor: "border-orange-700"
  },
  {
    icon: Globe,
    title: "시장 경쟁력",
    description: "경쟁사 대비 차별화된 온라인 프레즌스 부족",
    impact: "브랜드 인지도 저하",
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-700"
  },
  {
    icon: TrendingDown,
    title: "매출 손실",
    description: "온라인에서 제품의 실물 경험을 제공하지 못해 발생하는 매출 손실",
    impact: "매출 감소",
    color: "text-purple-400",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-700"
  },
  {
    icon: Clock,
    title: "비효율적 프로세스",
    description: "복잡한 제품 설명으로 인한 시간과 비용 낭비",
    impact: "운영 비용 증가",
    color: "text-green-400",
    bgColor: "bg-green-900/20",
    borderColor: "border-green-700"
  },
  {
    icon: Shield,
    title: "신뢰도 부족",
    description: "기술력을 시각적으로 보여주지 못해 발생하는 신뢰도 문제",
    impact: "고객 신뢰 저하",
    color: "text-indigo-400",
    bgColor: "bg-indigo-900/20",
    borderColor: "border-indigo-700"
  }
]

export const ProblemSection = () => {
  return (
    <section className="py-20 bg-slate-900">
      <Container>
        <div className="text-center mb-16 animate-fadeIn">
          <Badge variant="secondary" className="mb-4">
            문제 인식
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-6">
            비즈니스가 직면한{' '}
            <span className="text-red-400">디지털 한계</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            많은 기업들이 온라인 환경에서 다음과 같은 명백한 한계와 고민에 직면해 있습니다.
            이러한 문제들을 해결하기 위해 혁신적인 솔루션이 필요합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className={`h-full hover:shadow-lg transition-all duration-300 ${problem.borderColor} hover:border-2`}>
                <div className="p-6">
                  <div className={`w-12 h-12 ${problem.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <problem.icon className={`w-6 h-6 ${problem.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {problem.description}
                  </p>
                  <Badge variant="error" className="text-xs">
                    {problem.impact}
                  </Badge>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-red-300 mb-2">
              이러한 문제들이 해결되지 않으면...
            </h3>
            <p className="text-red-200">
              고객 이탈, 매출 감소, 경쟁력 약화로 이어질 수 있습니다.
              지금 바로 해결책을 찾아보세요.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}