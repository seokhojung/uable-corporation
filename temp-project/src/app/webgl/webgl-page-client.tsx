'use client'

import { useEffect, useRef } from 'react'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import { Box } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import { WebGLGallery } from '@/components/webgl/webgl-gallery'
import { getActiveWebGLBundles } from '@/data/webgl-gallery'

export function WebGLPageClient() {
  const { theme } = useTheme()
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroVisualRef = useRef<HTMLDivElement>(null)

  const activeWebGLBundles = getActiveWebGLBundles()
  const stats = [
    { label: '3D 공간', value: activeWebGLBundles.length.toString(), icon: Box },
    { label: '공간 타입', value: '5+', icon: Box },
    { label: 'WebGL 품질', value: 'HD', icon: Box },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const elements = [
      heroContentRef.current,
      heroVisualRef.current,
    ].filter(Boolean)

    elements.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToGallery = () => {
    const galleryElement = document.querySelector('[data-webgl-gallery]')
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className={
      theme === 'light' ? 'min-h-screen bg-white' :
      theme === 'dark' ? 'min-h-screen bg-slate-900' :
      theme === 'brand' ? 'min-h-screen bg-custom-bg-100' :
      'min-h-screen bg-white'
    }>
      {/* Hero Section */}
      <section className={`relative min-h-screen md:h-[90vh] lg:h-[85vh] flex items-center justify-center overflow-hidden md:pt-0 ${
        theme === 'light' ? 'bg-gradient-to-br from-gray-50 via-white to-gray-50' :
        theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' :
        theme === 'brand' ? 'bg-gradient-to-r from-custom-bg-100 via-custom-bg-100 to-custom-bg-200' :
        'bg-gray-50'
      }`}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* 텍스트 콘텐츠 */}
            <div ref={heroContentRef} className="lg:col-span-7 text-center lg:text-left animate-hero-content py-8 lg:py-0">
              {/* 배지 */}
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 ${
                theme === 'light' ? 'bg-gray-200 text-gray-800' :
                theme === 'dark' ? 'bg-slate-700 text-slate-200' :
                theme === 'brand' ? 'bg-primary-100/10 text-primary-200' :
                'bg-gray-200 text-gray-800'
              }`}>
                <Box className="w-4 h-4 mr-2" />
                인터랙티브 3D 체험
              </div>

              {/* 메인 헤드라인 */}
              <h1 className={`text-4xl lg:text-6xl xl:text-6xl font-bold mb-8 leading-tight ${
                theme === 'light' ? 'text-gray-900' :
                theme === 'dark' ? 'text-slate-100' :
                theme === 'brand' ? 'text-custom-text-100' :
                'text-gray-900'
              }`}>
                몰입감 있는 3D 공간을
                <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === 'light' ? 'from-green-600 to-teal-600' :
                  theme === 'dark' ? 'from-slate-300 to-slate-400' :
                  theme === 'brand' ? 'from-primary-100 to-accent-100' :
                  'from-green-600 to-teal-600'
                }`}>
                  직접 체험하세요
                </span>
              </h1>

              {/* 서브헤드라인 */}
              <p className={`text-xl lg:text-2xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
                theme === 'light' ? 'text-gray-600' :
                theme === 'dark' ? 'text-slate-300' :
                theme === 'brand' ? 'text-custom-text-200' :
                'text-gray-600'
              }`}>
                Uable의 WebGL 기술로 구현한 실감나는 3D 환경들을 탐험하고
                <br />다양한 공간에서 인터랙티브한 경험을 즐겨보세요.
              </p>

              {/* CTA 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button
                  size="lg"
                  onClick={scrollToGallery}
                  className={`text-lg px-16 py-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    theme === 'light' ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-green-500/25 hover:shadow-green-500/30' :
                    theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25 hover:shadow-blue-500/30' :
                    theme === 'brand' ? 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100 shadow-primary-100/25 hover:shadow-primary-100/30' :
                    'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-green-500/25 hover:shadow-green-500/30'
                  }`}
                >
                  3D 갤러리 탐험하기
                </Button>

                <Link href="/portfolio">
                  <Button variant="outline" size="lg" className={`text-lg px-12 py-4 ${
                    theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-100' :
                    theme === 'dark' ? 'border-slate-600 text-slate-200 hover:bg-slate-700' :
                    theme === 'brand' ? 'border-primary-100/30 text-custom-text-100 hover:bg-custom-bg-300' :
                    'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}>
                    포트폴리오 보기
                  </Button>
                </Link>
              </div>

              {/* 통계 */}
              <div className={`grid grid-cols-3 gap-8 pt-8 border-t ${
                theme === 'light' ? 'border-gray-200' :
                theme === 'dark' ? 'border-slate-700' :
                theme === 'brand' ? 'border-primary-100/20' :
                'border-gray-200'
              }`}>
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className={`w-6 h-6 mr-2 ${
                        theme === 'light' ? 'text-gray-600' :
                        theme === 'dark' ? 'text-slate-300' :
                        theme === 'brand' ? 'text-custom-text-200' :
                        'text-gray-600'
                      }`} />
                      <span className={`text-3xl lg:text-4xl font-bold ${
                        theme === 'light' ? 'text-gray-900' :
                        theme === 'dark' ? 'text-slate-100' :
                        theme === 'brand' ? 'text-custom-text-100' :
                        'text-gray-900'
                      }`}>
                        {stat.value}
                      </span>
                    </div>
                    <p className={`text-sm font-medium ${
                      theme === 'light' ? 'text-gray-600' :
                      theme === 'dark' ? 'text-slate-300' :
                      theme === 'brand' ? 'text-custom-text-200' :
                      'text-gray-600'
                    }`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 시각적 요소 */}
            <div ref={heroVisualRef} className="lg:col-span-5 relative animate-hero-visual py-8 lg:py-0 min-h-[200px] lg:min-h-auto">
              {/* WebGL 번들 미니 프리뷰 */}
              <div className="hidden lg:block h-full">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {activeWebGLBundles.slice(0, 4).map((bundle, index) => (
                    <div
                      key={bundle.id}
                      className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                        theme === 'light' ? 'bg-white border border-gray-200' :
                        theme === 'dark' ? 'bg-slate-800 border border-slate-700' :
                        theme === 'brand' ? 'bg-custom-bg-200 border border-primary-100/20' :
                        'bg-white border border-gray-200'
                      }`}
                      style={{
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      {bundle.thumbnail && (
                        <Image
                          src={bundle.thumbnail}
                          alt={bundle.title}
                          width={200}
                          height={96}
                          className="w-full h-24 object-cover"
                        />
                      )}
                      <div className="p-3">
                        <h3 className={`text-sm font-semibold ${
                          theme === 'light' ? 'text-gray-900' :
                          theme === 'dark' ? 'text-slate-100' :
                          theme === 'brand' ? 'text-custom-text-100' :
                          'text-gray-900'
                        }`}>
                          {bundle.title}
                        </h3>
                        <p className={`text-xs mt-1 ${
                          theme === 'light' ? 'text-gray-600' :
                          theme === 'dark' ? 'text-slate-300' :
                          theme === 'brand' ? 'text-custom-text-200' :
                          'text-gray-600'
                        }`}>
                          {bundle.tags.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 모바일/태블릿용 대체 콘텐츠 */}
              <div className="lg:hidden flex items-center justify-center h-full">
                <div className="text-center">
                  <Box className={`w-16 h-16 mx-auto mb-4 ${
                    theme === 'light' ? 'text-green-600' :
                    theme === 'dark' ? 'text-blue-400' :
                    theme === 'brand' ? 'text-primary-200' :
                    'text-green-600'
                  }`} />
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' :
                    theme === 'dark' ? 'text-slate-300' :
                    theme === 'brand' ? 'text-custom-text-200' :
                    'text-gray-600'
                  }`}>
                    3D 공간 체험 준비 완료
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 갤러리 섹션 */}
      <section className={`py-32 ${
        theme === 'light' ? 'bg-white' :
        theme === 'dark' ? 'bg-slate-800' :
        theme === 'brand' ? 'bg-gradient-to-r from-custom-bg-100 via-custom-bg-100 to-custom-bg-200' :
        'bg-gray-50'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div data-webgl-gallery>
            <WebGLGallery
              title="3D 체험 갤러리"
              description="다양한 3D 공간을 체험해보세요"
              showDirectLinks={false}
              className="py-8"
            />
          </div>
        </div>
      </section>
    </main>
  )
}