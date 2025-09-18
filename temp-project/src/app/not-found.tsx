'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/primitives/Button'
import { Home, ArrowLeft, AlertCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function NotFound() {
  const { theme } = useTheme()

  useEffect(() => {
    // 404 에러 추적 (Google Analytics 등)
    if (typeof window !== 'undefined') {
      console.error('404 Error - Page not found:', window.location.pathname)
    }
  }, [])

  return (
    <div className={`min-h-screen ${
      theme === 'light' ? 'bg-white' :
      theme === 'dark' ? 'bg-slate-900' :
      theme === 'brand' ? 'bg-custom-bg-100' :
      'bg-white'
    }`}>
      <div className={`absolute inset-0 ${
        theme === 'light' ? 'bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.1),transparent_50%)]' :
        theme === 'dark' ? 'bg-[radial-gradient(ellipse_at_top_left,rgba(30,41,59,0.8),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(2,6,23,0.7),transparent_50%)]' :
        theme === 'brand' ? 'bg-gradient-to-br from-custom-bg-100 to-custom-bg-200' :
        'bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.1),transparent_50%)]'
      }`} />
      <Container>
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center gap-8 px-4">
          {/* 404 아이콘 */}
          <div className="relative animate-[fadeIn_600ms_ease-out]">
            <div className={`text-8xl font-bold ${
              theme === 'light' ? 'text-gray-300' :
              theme === 'dark' ? 'text-slate-700' :
              theme === 'brand' ? 'text-custom-text-300' :
              'text-gray-300'
            }`}>404</div>
            <AlertCircle className={`absolute -top-2 -right-2 w-8 h-8 ${
              theme === 'light' ? 'text-gray-400' :
              theme === 'dark' ? 'text-slate-500' :
              theme === 'brand' ? 'text-custom-text-300' :
              'text-gray-400'
            }`} />
          </div>

          <div className={`w-full max-w-2xl rounded-2xl border p-8 backdrop-blur-md shadow-xl animate-[fadeIn_600ms_ease-out] ${
            theme === 'light' ? 'border-gray-200 bg-white/80 shadow-gray-200/30' :
            theme === 'dark' ? 'border-slate-700/40 bg-slate-900/60 shadow-black/30' :
            theme === 'brand' ? 'border-primary-100/20 bg-custom-bg-200/80 shadow-primary-100/20' :
            'border-gray-200 bg-white/80 shadow-gray-200/30'
          }`}>
            <h1 className={`text-3xl font-bold ${
              theme === 'light' ? 'text-gray-900' :
              theme === 'dark' ? 'text-slate-100' :
              theme === 'brand' ? 'text-custom-text-100' :
              'text-gray-900'
            }`}>페이지 준비중입니다</h1>
            <p className={`mt-3 ${
              theme === 'light' ? 'text-gray-600' :
              theme === 'dark' ? 'text-slate-300' :
              theme === 'brand' ? 'text-custom-text-200' :
              'text-gray-600'
            }`}>
              더 나은 서비스를 위해 열심히 준비하고 있습니다.
              <br/> 곧 멋진 콘텐츠로 찾아뵐게요!
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button className={`text-white flex items-center gap-2 ${
                  theme === 'light' ? 'bg-green-600 hover:bg-green-700' :
                  theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' :
                  theme === 'brand' ? 'bg-primary-100 hover:bg-accent-200' :
                  'bg-green-600 hover:bg-green-700'
                }`}>
                  <Home className="w-4 h-4" />
                  홈으로 이동
                </Button>
              </Link>
              <button
                onClick={() => window.history.back()}
                className={`px-4 py-2 bg-transparent border rounded-lg transition-colors flex items-center gap-2 ${
                  theme === 'light' ? 'border-gray-300 hover:bg-gray-100 text-gray-900' :
                  theme === 'dark' ? 'border-slate-600 hover:bg-slate-800 text-slate-100' :
                  theme === 'brand' ? 'border-primary-100/30 hover:bg-custom-bg-300 text-custom-text-100' :
                  'border-gray-300 hover:bg-gray-100 text-gray-900'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                이전 페이지로
              </button>
            </div>

            {/* 추천 링크 */}
            <div className={`mt-8 pt-6 border-t ${
              theme === 'light' ? 'border-gray-200' :
              theme === 'dark' ? 'border-slate-700/40' :
              theme === 'brand' ? 'border-primary-100/20' :
              'border-gray-200'
            }`}>
              <p className={`text-sm mb-3 ${
                theme === 'light' ? 'text-gray-500' :
                theme === 'dark' ? 'text-slate-400' :
                theme === 'brand' ? 'text-custom-text-300' :
                'text-gray-500'
              }`}>자주 찾는 페이지</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/portfolio" className={`underline text-sm transition-colors ${
                  theme === 'light' ? 'text-gray-600 hover:text-gray-900' :
                  theme === 'dark' ? 'text-slate-300 hover:text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-200 hover:text-custom-text-100' :
                  'text-gray-600 hover:text-gray-900'
                }`}>
                  포트폴리오
                </Link>
                <span className={`${
                  theme === 'light' ? 'text-gray-400' :
                  theme === 'dark' ? 'text-slate-600' :
                  theme === 'brand' ? 'text-custom-text-300' :
                  'text-gray-400'
                }`}>•</span>
                <Link href="/contact" className={`underline text-sm transition-colors ${
                  theme === 'light' ? 'text-gray-600 hover:text-gray-900' :
                  theme === 'dark' ? 'text-slate-300 hover:text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-200 hover:text-custom-text-100' :
                  'text-gray-600 hover:text-gray-900'
                }`}>
                  문의하기
                </Link>
                <span className={`${
                  theme === 'light' ? 'text-gray-400' :
                  theme === 'dark' ? 'text-slate-600' :
                  theme === 'brand' ? 'text-custom-text-300' :
                  'text-gray-400'
                }`}>•</span>
                <Link href="/privacy" className={`underline text-sm transition-colors ${
                  theme === 'light' ? 'text-gray-600 hover:text-gray-900' :
                  theme === 'dark' ? 'text-slate-300 hover:text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-200 hover:text-custom-text-100' :
                  'text-gray-600 hover:text-gray-900'
                }`}>
                  개인정보처리방침
                </Link>
              </div>
            </div>
          </div>

          <p className={`text-xs ${
            theme === 'light' ? 'text-gray-500' :
            theme === 'dark' ? 'text-slate-500' :
            theme === 'brand' ? 'text-custom-text-300' :
            'text-gray-500'
          }`}>잠시만요 · 곧 준비될 예정입니다</p>
        </div>
      </Container>
    </div>
  )
}
