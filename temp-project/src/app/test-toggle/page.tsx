'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function TestTogglePage() {
  const { theme, toggleTheme, mounted } = useTheme()
  
  console.log('🔍 TestTogglePage - theme:', theme, 'mounted:', mounted)
  
  // DOM 직접 확인 및 강제 적용
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      const hasClassInDOM = document.documentElement.classList.contains('dark')
      const dataTheme = document.documentElement.getAttribute('data-theme')
      console.log('🔍 DOM 상태 - classList.contains(dark):', hasClassInDOM, 'data-theme:', dataTheme)
      
      // 강제로 DOM에 클래스 적용 테스트
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.setAttribute('data-theme', 'dark')
        console.log('🔧 강제 다크 모드 클래스 적용됨')
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.setAttribute('data-theme', 'light')
        console.log('🔧 강제 라이트 모드 클래스 적용됨')
      }
    }
  }, [theme])
  
  // 하이드레이션 문제 디버깅을 위해 임시로 mounted 체크 우회
  // if (!mounted) {
  //   return <div>Loading...</div>
  // }
  
  const isDark = theme === 'dark'
  
  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🚀 토글 테스트 페이지</h1>
        
        {/* 현재 상태 표시 */}
        <div className="mb-8 p-6 bg-gray-100 dark:bg-slate-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">현재 테마 상태</h2>
          <p className="text-lg">테마: <span className="font-bold">{theme}</span></p>
          <p className="text-lg">다크 모드: <span className="font-bold">{isDark ? '✅ 활성' : '❌ 비활성'}</span></p>
          <button 
            onClick={() => {
              console.log('🖱️ Toggle button clicked!')
              toggleTheme()
            }}
            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            테마 토글
          </button>
        </div>
        
        {/* 코덱스 수정 테스트 섹션 */}
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">✅ 1단계: 기능 플래그 통일</h3>
            <p className="text-gray-600 dark:text-slate-300">
              footer.tsx, portfolio-card.tsx, service-scroll.tsx의 기능 플래그를 !== 'false'로 통일 완료
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">✅ 2단계: PostCSS 정리</h3>
            <p className="text-gray-600 dark:text-slate-300">
              postcss.config.mjs 파일 삭제 및 .next 캐시 정리 완료
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">🔄 3단계: 헤더/푸터 수정</h3>
            <p className="text-gray-600 dark:text-slate-300">
              헤더와 푸터의 applyThemeClasses 제거하여 모든 페이지에 즉시 반영
            </p>
          </div>
          
          {/* 다양한 컴포넌트 스타일 테스트 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div 
              className="p-4 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg"
              style={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderColor: isDark ? '#475569' : '#d1d5db',
                color: isDark ? '#f1f5f9' : '#0f172a'
              }}
            >
              <h4 
                className="font-semibold text-green-600 dark:text-green-400"
                style={{ color: isDark ? '#4ade80' : '#16a34a' }}
              >
                성공 카드 (강제 스타일 적용)
              </h4>
              <p 
                className="text-sm text-gray-500 dark:text-slate-400"
                style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
              >
                이 카드는 인라인 스타일로 강제 적용됩니다
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white">정보 카드 (루트 설정 차단 후 테스트)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">루트 postcss.config.mjs 간섭 차단 후 dark: 클래스 테스트</p>
            </div>
          </div>
          
          {/* 버튼 테스트 */}
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 rounded transition-colors">
              보조 버튼
            </button>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded transition-colors">
              경고 버튼  
            </button>
          </div>
        </div>
        
        {/* CSS 디버깅 섹션 */}
        <div className="mt-8 space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🔍 CSS 디버깅</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              브라우저 콘솔에서 확인: document.documentElement.classList.contains('dark')
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              로컬 스토리지: localStorage.getItem('theme')
            </p>
          </div>
          
          {/* 강제 스타일 테스트 */}
          <div className="p-4 border-2 border-dashed border-red-500 dark:border-red-400">
            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">🧪 강제 스타일 테스트</h4>
            <div className="space-y-2">
              <div style={{backgroundColor: isDark ? '#1e293b' : '#f8fafc', color: isDark ? '#f1f5f9' : '#0f172a', padding: '8px', borderRadius: '4px'}}>
                인라인 스타일 (JS 제어): {isDark ? '다크 모드' : '라이트 모드'}
              </div>
              <div className={isDark ? 'bg-slate-800 text-white' : 'bg-gray-100 text-black'} style={{padding: '8px', borderRadius: '4px'}}>
                조건부 클래스: {isDark ? '다크 모드' : '라이트 모드'}
              </div>
              <div className="bg-blue-500 text-white p-2 rounded">
                고정 스타일 (파란색): 항상 보여야 함
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}