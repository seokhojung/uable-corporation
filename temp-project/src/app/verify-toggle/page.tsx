'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function VerifyTogglePage() {
  const { theme, toggleTheme, mounted } = useTheme()
  
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      console.log('🔍 검증 - theme:', theme, 'mounted:', mounted)
      console.log('🔍 검증 - document.documentElement.classList:', document.documentElement.classList.toString())
      console.log('🔍 검증 - document.documentElement.getAttribute("data-theme"):', document.documentElement.getAttribute('data-theme'))
    }
  }, [theme, mounted])
  
  const isDark = theme === 'dark'
  
  return (
    <div className="min-h-screen p-8 transition-colors bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 토글 검증 페이지</h1>
        
        <div className="space-y-6">
          {/* 현재 상태 */}
          <div className="p-6 border rounded-lg bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4">현재 상태</h2>
            <p>테마: <strong>{theme}</strong></p>
            <p>마운트됨: <strong>{mounted.toString()}</strong></p>
            <p>다크 모드: <strong>{isDark ? '활성화됨' : '비활성화됨'}</strong></p>
            
            <button 
              onClick={toggleTheme}
              className="mt-4 px-6 py-3 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
            >
              테마 전환
            </button>
          </div>
          
          {/* CSS 클래스 테스트 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">CSS 클래스 테스트</h2>
            
            {/* 일반 dark: 클래스들 */}
            <div className="p-4 border rounded bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600">
              <h3 className="font-medium text-gray-900 dark:text-white">일반 dark: 클래스</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                이 박스가 테마에 따라 색상이 바뀌면 성공입니다.
              </p>
            </div>
            
            {/* 조건부 클래스 (비교용) */}
            <div className={`p-4 border rounded ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300'}`}>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>조건부 클래스</h3>
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                이 박스는 JavaScript로 제어됩니다 (비교용).
              </p>
            </div>
            
            {/* 색상 테스트 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 text-center rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                빨간색 테스트
              </div>
              <div className="p-3 text-center rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                초록색 테스트
              </div>
              <div className="p-3 text-center rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                파란색 테스트
              </div>
              <div className="p-3 text-center rounded bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                보라색 테스트
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}