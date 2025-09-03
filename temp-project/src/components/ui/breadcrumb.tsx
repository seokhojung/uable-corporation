'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname()
  
  // 자동 breadcrumb 생성
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items
    
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: '홈', href: '/' }
    ]
    
    const pathLabels: Record<string, string> = {
      'portfolio': '포트폴리오',
      'contact': '문의하기',
      'privacy': '개인정보처리방침',
    }
    
    paths.forEach((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`
      const label = pathLabels[path] || path.charAt(0).toUpperCase() + path.slice(1)
      breadcrumbs.push({ label, href: index === paths.length - 1 ? undefined : href })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbItems = generateBreadcrumbs()
  
  // 구조화된 데이터 생성
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://uable.co.kr${item.href}` : undefined
    }))
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-slate-500" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-slate-400 hover:text-slate-200 transition-colors flex items-center"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-200 font-medium flex items-center">
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}