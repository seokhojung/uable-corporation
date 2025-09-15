// src/components/sections/differentiators-section.tsx
'use client'

import { Award, Zap, Users, Globe, Shield, TrendingUp } from 'lucide-react'
import { Card } from '@/components/primitives/Card'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/primitives/Badge'

const differentiators = [
  {
    icon: Award,
    title: "10년+ 기술 경험",
    description: "3D/AR/WebXR 분야에서 10년 이상의 전문 경험",
    metric: "10+",
    unit: "년",
    detail: "다양한 산업 분야의 프로젝트 경험",
    color: "text-yellow-400",
    bgColor: "bg-yellow-900/20",
    borderColor: "border-yellow-700"
  },
  {
    icon: Zap,
    title: "최신 기술 스택",
    description: "Three.js, WebXR, AR.js 등 최신 기술 활용",
    metric: "15+",
    unit: "기술",
    detail: "지속적인 기술 업데이트 및 적용",
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-700"
  },
  {
    icon: Users,
    title: "고객 만족도",
    description: "프로젝트 완료 후 고객 만족도",
    metric: "98%",
    unit: "만족도",
    detail: "지속적인 커뮤니케이션과 품질 관리",
    color: "text-green-400",
    bgColor: "bg-green-900/20",
    borderColor: "border-green-700"
  },
  {
    icon: Globe,
    title: "글로벌 프로젝트",
    description: "전 세계 다양한 지역의 프로젝트 수행",
    metric: "25+",
    unit: "국가",
    detail: "다양한 문화와 요구사항 이해",
    color: "text-purple-400",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-700"
  },
  {
    icon: Shield,
    title: "보안 인증",
    description: "국제 보안 표준 준수 및 인증",
    metric: "100%",
    unit: "준수",
    detail: "ISO 27001, SOC 2 등 보안 인증",
    color: "text-red-400",
    bgColor: "bg-red-900/20",
    borderColor: "border-red-700"
  },
  {
    icon: TrendingUp,
    title: "성장률",
    description: "연간 매출 및 고객 수 증가율",
    metric: "150%",
    unit: "성장",
    detail: "지속적인 비즈니스 성장과 확장",
    color: "text-indigo-400",
    bgColor: "bg-indigo-900/20",
    borderColor: "border-indigo-700"
  }
]

export const DifferentiatorsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <Container>
        <div className="text-center mb-16 animate-fadeIn">
          <Badge variant="primary" className="mb-4">
            차별화 요소
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-6">
            왜{' '}
            <span className="text-slate-300">Uable Corporation</span>
            인가요?
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            경쟁사와 차별화된 우리만의 강점과 전문성을 통해 
            고객의 비즈니스 성공을 이끌어갑니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className={`h-full hover:shadow-lg transition-all duration-300 ${item.borderColor} hover:border-2 group`}>
                <div className="p-6">
                  <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline mb-2">
                      <span className="text-3xl font-bold text-slate-100">{item.metric}</span>
                      <span className="text-lg text-slate-300 ml-1">{item.unit}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 mb-3">
                      {item.description}
                    </p>
                    <p className="text-sm text-slate-400">
                      {item.detail}
                    </p>
                  </div>
                  
                  <Badge variant="secondary" className="text-xs">
                    검증된 실적
                  </Badge>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">
              검증된 전문성
            </h3>
            <p className="text-slate-300 mb-6">
              우리의 차별화된 가치는 실제 프로젝트 성과와 고객 만족도로 검증되었습니다.
              지금 바로 프로젝트를 시작해보세요.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-slate-200" />
                </div>
                <h4 className="font-semibold text-slate-100 mb-1">인증된 전문성</h4>
                <p className="text-sm text-slate-300">국제 표준 인증 보유</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-slate-200" />
                </div>
                <h4 className="font-semibold text-slate-100 mb-1">고객 중심</h4>
                <p className="text-sm text-slate-300">98% 고객 만족도</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-slate-200" />
                </div>
                <h4 className="font-semibold text-slate-100 mb-1">글로벌 경험</h4>
                <p className="text-sm text-slate-300">25개국 프로젝트</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}