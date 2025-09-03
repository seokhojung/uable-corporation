'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, AlertCircle } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    // 404 에러 추적 (Google Analytics 등)
    if (typeof window !== 'undefined') {
      console.error('404 Error - Page not found:', window.location.pathname)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,41,59,0.8),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(2,6,23,0.7),transparent_50%)]" />
      <Container>
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center gap-8 px-4">
          {/* 404 아이콘 */}
          <div className="relative animate-[fadeIn_600ms_ease-out]">
            <div className="text-8xl font-bold text-slate-700">404</div>
            <AlertCircle className="absolute -top-2 -right-2 w-8 h-8 text-slate-500" />
          </div>

          <div className="w-full max-w-2xl rounded-2xl border border-slate-700/40 bg-slate-900/60 p-8 backdrop-blur-md shadow-xl shadow-black/30 animate-[fadeIn_600ms_ease-out]">
            <h1 className="text-3xl font-bold text-slate-100">페이지를 찾을 수 없습니다</h1>
            <p className="mt-3 text-slate-300">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
              <br/> URL을 다시 확인하시거나 아래 버튼을 이용해 주세요.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button className="bg-slate-700 hover:bg-slate-600 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  홈으로 이동
                </Button>
              </Link>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-transparent border border-slate-600 hover:bg-slate-800 text-slate-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                이전 페이지로
              </button>
            </div>

            {/* 추천 링크 */}
            <div className="mt-8 pt-6 border-t border-slate-700/40">
              <p className="text-sm text-slate-400 mb-3">자주 찾는 페이지</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/portfolio" className="text-slate-300 hover:text-slate-100 underline text-sm">
                  포트폴리오
                </Link>
                <span className="text-slate-600">•</span>
                <Link href="/contact" className="text-slate-300 hover:text-slate-100 underline text-sm">
                  문의하기
                </Link>
                <span className="text-slate-600">•</span>
                <Link href="/privacy" className="text-slate-300 hover:text-slate-100 underline text-sm">
                  개인정보처리방침
                </Link>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">오류 코드: 404 · 페이지를 찾을 수 없습니다</p>
        </div>
      </Container>
    </div>
  )
}
