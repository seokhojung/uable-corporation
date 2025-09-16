'use client'

import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import { CheckCircle, Play } from 'lucide-react'
import Link from 'next/link'
import { products } from '@/data/products'
import { useTheme } from '@/contexts/ThemeContext'

interface ProductsSectionProps {
  title?: string
  description?: string
  className?: string
}

export function ProductsSection({
  title = "Uable의 핵심 솔루션",
  description = "3D/AR/XR 기술의 최전선에서 개발한 혁신적인 자체 제품으로\n고객의 비즈니스 성장을 이끌어냅니다.",
  className = ""
}: ProductsSectionProps) {
  // 테마 컨텍스트 사용
  const { theme } = useTheme()
  
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <Badge variant="outline" className={`mb-6 ${
            theme === 'light' ? 'text-emerald-600 border-emerald-300' :
            theme === 'dark' ? 'text-emerald-400 border-emerald-300' :
            theme === 'brand' ? 'text-primary-200 border-primary-100/30' :
            'text-emerald-600 border-emerald-300'
          }`}>
            자체 제품 라인업
          </Badge>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            theme === 'light' ? 'text-gray-900' :
            theme === 'dark' ? 'text-slate-100' :
            theme === 'brand' ? 'text-custom-text-100' :
            'text-gray-900'
          }`}>
            {title}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto whitespace-pre-line ${
            theme === 'light' ? 'text-gray-600' :
            theme === 'dark' ? 'text-slate-300' :
            theme === 'brand' ? 'text-custom-text-200' :
            'text-gray-600'
          }`}>
            {description}
          </p>
        </div>

        {/* 제품 카드들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {products.map((product) => (
            <div key={product.id} className={`rounded-2xl shadow-lg overflow-hidden ${
              theme === 'light' ? 'bg-white border border-gray-200' :
              theme === 'dark' ? 'bg-slate-800 border border-slate-700' :
              theme === 'brand' ? 'bg-custom-bg-200 border border-primary-100/20' :
              'bg-white border border-gray-200'
            }`}>
              <div
                className={`relative h-64 ${product.backgroundStyle.gradient || product.backgroundStyle.backgroundColor} p-8 flex items-center justify-center`}
                style={{
                  backgroundImage: `url('${product.backgroundImage}')`,
                  backgroundSize: product.backgroundStyle.backgroundSize || 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute top-4 right-4">
                  <Badge className={`${product.badgeStyle.background} ${product.badgeStyle.textColor} ${product.badgeStyle.border}`}>
                    프로덕트
                  </Badge>
                </div>
              </div>

              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  {product.title}
                </h3>
                <p className={`mb-6 leading-relaxed ${
                  theme === 'light' ? 'text-gray-600' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-600'
                }`}>
                  {product.description}
                </p>

                {/* 핵심 기능 */}
                <div className="space-y-3 mb-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${
                        theme === 'brand' ? 'text-primary-200' : 'text-emerald-500'
                      }`} />
                      <span className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' :
                        theme === 'dark' ? 'text-slate-300' :
                        theme === 'brand' ? 'text-custom-text-200' :
                        'text-gray-600'
                      }`}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 성과 지표 */}
                <div className={`grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg ${
                  theme === 'light' ? 'bg-gray-50 border border-gray-100' :
                  theme === 'dark' ? 'bg-slate-700/50 border border-slate-600' :
                  theme === 'brand' ? 'bg-custom-bg-300 border border-primary-100/20' :
                  'bg-gray-50 border border-gray-100'
                }`}>
                  {product.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold ${
                        theme === 'light' ? 'text-gray-900' :
                        theme === 'dark' ? 'text-slate-100' :
                        theme === 'brand' ? 'text-custom-text-100' :
                        'text-gray-900'
                      }`}>{metric.label}</div>
                      <div className={`text-xs ${
                        theme === 'light' ? 'text-gray-500' :
                        theme === 'dark' ? 'text-slate-400' :
                        theme === 'brand' ? 'text-custom-text-200' :
                        'text-gray-500'
                      }`}>{metric.description}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  {product.buttons.primary.external ? (
                    <Button asChild className={`flex-1 ${
                      theme === 'light' ? 'bg-green-600 hover:bg-green-700 text-white' :
                      theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                      theme === 'brand' ? 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100' :
                      'bg-green-600 hover:bg-green-700 text-white'
                    }`}>
                      <Link href={product.buttons.primary.href} target="_blank">
                        <Play className="w-4 h-4 mr-2" />
                        {product.buttons.primary.text}
                      </Link>
                    </Button>
                  ) : (
                    <Button className={`flex-1 ${
                      theme === 'light' ? 'bg-green-600 hover:bg-green-700 text-white' :
                      theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                      theme === 'brand' ? 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100' :
                      'bg-green-600 hover:bg-green-700 text-white'
                    }`}>
                      <Play className="w-4 h-4 mr-2" />
                      {product.buttons.primary.text}
                    </Button>
                  )}
                  <Button variant="outline" asChild className={`flex-1 ${
                    theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-100' :
                    theme === 'dark' ? 'border-slate-600 text-slate-200 hover:bg-slate-700' :
                    theme === 'brand' ? 'border-primary-100/30 text-custom-text-100 hover:bg-custom-bg-300' :
                    'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}>
                    <Link href={product.buttons.secondary.href}>
                      {product.buttons.secondary.text}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}