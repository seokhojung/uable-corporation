'use client'

import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import { CheckCircle, Play } from 'lucide-react'
import Link from 'next/link'
import { products } from '@/data/products'

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
  
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 text-emerald-600 dark:text-emerald-400 border-emerald-300">
            자체 제품 라인업
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto whitespace-pre-line">
            {description}
          </p>
        </div>

        {/* 제품 카드들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700">
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                {/* 핵심 기능 */}
                <div className="space-y-3 mb-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm text-gray-600 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* 성과 지표 */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  {product.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold text-${metric.value}`}>{metric.label}</div>
                      <div className="text-xs text-gray-500">{metric.description}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {product.buttons.primary.external ? (
                    <Button asChild className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Link href={product.buttons.primary.href} target="_blank">
                        <Play className="w-4 h-4 mr-2" />
                        {product.buttons.primary.text}
                      </Link>
                    </Button>
                  ) : (
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      {product.buttons.primary.text}
                    </Button>
                  )}
                  <Button variant="outline" asChild className="flex-1">
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