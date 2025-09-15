'use client'

import { useState } from 'react'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import { ArrowRight, Code, Lightbulb, Rocket, Box } from 'lucide-react'
import { ProductsSection } from '@/components/products/products-section'

export default function TestPage() {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', name: '히어로 섹션', icon: Rocket },
    { id: 'feature', name: '기능 섹션', icon: Lightbulb }, 
    { id: 'demo', name: '데모 섹션', icon: Code },
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
                variant={activeSection === section.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveSection(section.id)}
                className="flex items-center gap-2"
              >
                <section.icon className="w-4 h-4" />
                {section.name}
              </Button>
            ))}
          </div>
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