// src/components/sections/hero-section.tsx
'use client'

import { ArrowRight, Play, Star, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const stats = [
  { label: '완료 프로젝트', value: '150+', icon: Award },
  { label: '만족한 고객', value: '200+', icon: Users },
  { label: '평균 평점', value: '4.9', icon: Star },
]

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 배경 요소 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-700 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-600 rounded-full opacity-20 animate-pulse" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* 텍스트 콘텐츠 */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* 배지 */}
            <div className="mb-6">
              <Badge variant="primary" size="lg" className="inline-flex items-center">
                <Star className="w-4 h-4 mr-2" />
                혁신적인 디지털 솔루션
              </Badge>
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-100 mb-4 sm:mb-6 leading-tight">
              비즈니스의{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400">
                디지털 혁신
              </span>
              을 이끌어갑니다
            </h1>

            {/* 서브헤드라인 */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              최신 기술과 창의적인 디자인으로 고객의 비전을 현실로 만듭니다. 
              웹 개발부터 모바일 앱, UI/UX 디자인까지 모든 디지털 솔루션을 제공합니다.
            </p>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  프로젝트 시작하기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Play className="w-4 h-4 mr-2" />
                데모 보기
              </Button>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-4 mt-8 sm:mt-12 lg:mt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-slate-300 mr-2" />
                    <span className="text-2xl sm:text-3xl font-bold text-slate-100">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 시각적 요소 */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* 메인 카드 */}
              <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700 hover:-translate-y-2 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg h-32 sm:h-40 flex items-center justify-center">
                    <div className="text-slate-100 text-center">
                      <div className="text-2xl sm:text-3xl font-bold mb-2">3D/AR</div>
                      <div className="text-sm opacity-90">WebXR Experience</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-700 rounded-full"></div>
                    <div className="h-2 bg-slate-700 rounded-full w-3/4"></div>
                    <div className="h-2 bg-slate-700 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>

              {/* 플로팅 요소들 */}
              <div className="absolute -top-4 -right-4 bg-slate-700 rounded-lg p-3 shadow-lg animate-bounce">
                <Star className="w-6 h-6 text-slate-200" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-slate-700 rounded-lg p-3 shadow-lg animate-bounce">
                <Award className="w-6 h-6 text-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}