// src/components/layout/header.tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/primitives/Button'
import { BrandThemeToggle } from '@/components/ui/brand-theme-toggle'
import { useHeaderTheme } from '@/lib/header-theme-utils'
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'WebGL', href: '/webgl' },
]

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // 안전한 테마 시스템 사용
  const themeClasses = useHeaderTheme()

  return (
    <header className={`sticky top-0 z-50 ${themeClasses.headerBackground} transition-all duration-300 ${mobileMenuOpen ? 'min-h-80 lg:min-h-20' : 'min-h-16 lg:min-h-20'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <div className="h-8 flex items-center justify-center overflow-hidden">
              <Image
                src="/UABLE-logo-full.png"
                alt="Uable Corporation Logo"
                width={128}
                height={32}
                className="object-contain h-full w-auto"
                priority
              />
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${themeClasses.mobileMenuButton} ${themeClasses.mobileMenuButtonHover}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">메뉴 열기</span>
            <Menu className={`h-6 w-6 ${themeClasses.menuIcon}`} aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm font-semibold leading-6 ${themeClasses.navText} ${themeClasses.navTextHover} transition-colors group`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${themeClasses.navUnderline} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
          ))}
          {/* 테마 토글 버튼 - 데스크톱 */}
          <div className="flex items-center gap-2 ml-2">
            <BrandThemeToggle />
          </div>
          <Button variant="primary" className={`${themeClasses.contactButton} ${themeClasses.contactButtonHover} transition-all duration-300`}>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </nav>
      
      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto ${themeClasses.mobileMenuOverlay} px-6 py-6 sm:max-w-sm sm:ring-1`}>
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <div className="h-6 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/UABLE-logo-full.png"
                    alt="Uable Corporation Logo"
                    width={96}
                    height={24}
                    className="object-contain h-full w-auto"
                    priority
                  />
                </div>
              </Link>
              <button
                type="button"
                className={`-m-2.5 rounded-md p-2.5 ${themeClasses.mobileMenuButton} ${themeClasses.mobileMenuButtonHover}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">메뉴 닫기</span>
                <X className={`h-6 w-6 ${themeClasses.menuIcon}`} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className={`-my-6 divide-y ${themeClasses.divider}`}>
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${themeClasses.navText} ${themeClasses.navTextHover}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  {/* 테마 토글 버튼 - 모바일 */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${themeClasses.navText}`}>테마</span>
                    <div className="flex items-center gap-2">
                      <BrandThemeToggle />
                    </div>
                  </div>
                  <Button variant="primary" className={`w-full ${themeClasses.contactButton} ${themeClasses.contactButtonHover}`}>
                    <Link href="/contact">Contact</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
