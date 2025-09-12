// src/components/layout/header.tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { applyThemeClasses } from '@/lib/theme-class-mapping'
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'WebGL', href: '/webgl' },
]

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // 테마 시스템 기본 활성화(명시적으로 'false'인 경우만 비활성)
  const isThemeSystemEnabled = process.env.NEXT_PUBLIC_THEME_SYSTEM !== 'false'

  return (
    <header className={applyThemeClasses(
      `sticky top-0 z-50 bg-slate-800/20 backdrop-blur-lg border-b border-slate-700/30 shadow-sm transition-all duration-300 ${mobileMenuOpen ? 'min-h-80 lg:min-h-20' : 'min-h-16 lg:min-h-20'}`,
      isThemeSystemEnabled
    )}>
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
            className={applyThemeClasses("-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-300", isThemeSystemEnabled)}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">메뉴 열기</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={applyThemeClasses(
                "relative text-sm font-semibold leading-6 text-slate-100 hover:text-slate-300 transition-colors group",
                isThemeSystemEnabled
              )}
            >
              {item.name}
              <span className={applyThemeClasses(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 transition-all duration-300 group-hover:w-full",
                isThemeSystemEnabled
              )}></span>
            </Link>
          ))}
          {/* 테마 토글 버튼 - 데스크톱 */}
          <ThemeToggle className="ml-2" />
          <Button variant="primary" className={applyThemeClasses(
            "!bg-gradient-to-r !from-emerald-500 !to-green-500 hover:!from-emerald-600 hover:!to-green-600 !text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300",
            isThemeSystemEnabled
          )}>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </nav>
      
      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className={applyThemeClasses(
            "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-800/90 backdrop-blur-lg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-700/30",
            isThemeSystemEnabled
          )}>
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
                className={applyThemeClasses(
                  "-m-2.5 rounded-md p-2.5 text-slate-300",
                  isThemeSystemEnabled
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">메뉴 닫기</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className={applyThemeClasses(
                "-my-6 divide-y divide-slate-700/30",
                isThemeSystemEnabled
              )}>
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={applyThemeClasses(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-100 hover:bg-slate-700/50",
                        isThemeSystemEnabled
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  {/* 테마 토글 버튼 - 모바일 */}
                  <div className="flex items-center justify-between">
                    <span className={applyThemeClasses(
                      "text-sm font-medium text-slate-300",
                      isThemeSystemEnabled
                    )}>테마</span>
                    <ThemeToggle />
                  </div>
                  <Button variant="primary" className="w-full">
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
