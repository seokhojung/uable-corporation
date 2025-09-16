'use client'

import { useState } from 'react'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import { ArrowRight, Code, Lightbulb, Rocket, Box } from 'lucide-react'
import { ProductsSection } from '@/components/products/products-section'
import { BrandThemeToggle } from '@/components/ui/brand-theme-toggle'

export default function TestPage() {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', name: '히어로 섹션', icon: Rocket },
    { id: 'feature', name: '기능 섹션', icon: Lightbulb },
    { id: 'demo', name: '데모 섹션', icon: Code },
    { id: 'colors', name: '신규 색상 테스트', icon: Box },
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