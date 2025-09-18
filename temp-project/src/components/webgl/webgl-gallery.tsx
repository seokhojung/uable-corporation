'use client'

import { getActiveWebGLBundles } from '@/data/webgl-gallery'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'

interface WebGLGalleryProps {
  title?: string
  description?: string
  maxItems?: number
  showDirectLinks?: boolean
  className?: string
}

export function WebGLGallery({
  title = "WebGL 3D 체험",
  description = "인터랙티브한 3D 공간을 직접 체험해보세요",
  maxItems,
  showDirectLinks = false,
  className = ""
}: WebGLGalleryProps) {
  const webglBundles = getActiveWebGLBundles()
  const displayBundles = maxItems ? webglBundles.slice(0, maxItems) : webglBundles
  const { theme } = useTheme()

  const openWebGL = (path: string) => {
    window.open(path, '_blank', 'width=1200,height=800')
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h2 className={`text-4xl lg:text-6xl font-bold mb-4 ${
          theme === 'light' ? 'text-gray-900' :
          theme === 'dark' ? 'text-slate-100' :
          theme === 'brand' ? 'text-custom-text-100' :
          'text-gray-900'
        }`}>
          {title}
        </h2>
        <p className={`text-lg lg:text-xl ${
          theme === 'light' ? 'text-gray-600' :
          theme === 'dark' ? 'text-slate-300' :
          theme === 'brand' ? 'text-custom-text-200' :
          'text-gray-600'
        }`}>
          {description}
        </p>
      </div>

      {/* WebGL 갤러리 그리드 */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 border ${
                theme === 'light' ? 'bg-white border-gray-200 hover:border-gray-300' :
                theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:border-slate-600' :
                theme === 'brand' ? 'bg-custom-bg-200 border-primary-100/20 hover:border-primary-100/30' :
                'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => openWebGL(bundle.path)}
            >
              {/* 썸네일 영역 */}
              <div className="relative aspect-video">
                {bundle.thumbnail ? (
                  <Image
                    src={bundle.thumbnail}
                    alt={bundle.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    theme === 'light' ? 'bg-gradient-to-br from-gray-100 to-gray-200' :
                    theme === 'dark' ? 'bg-gradient-to-br from-slate-700 to-slate-800' :
                    theme === 'brand' ? 'bg-gradient-to-br from-custom-bg-200 to-custom-bg-300' :
                    'bg-gradient-to-br from-gray-100 to-gray-200'
                  }`}>
                    <div className={`rounded-full p-6 ${
                      theme === 'light' ? 'bg-white/80' :
                      theme === 'dark' ? 'bg-slate-800/80' :
                      theme === 'brand' ? 'bg-custom-bg-100/80' :
                      'bg-white/80'
                    }`}>
                      <svg
                        className={`w-12 h-12 ${
                          theme === 'light' ? 'text-gray-600' :
                          theme === 'dark' ? 'text-slate-300' :
                          theme === 'brand' ? 'text-primary-200' :
                          'text-gray-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l7-5-7-5z"/>
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge className={`${
                    theme === 'light' ? 'bg-green-600 text-white' :
                    theme === 'dark' ? 'bg-blue-500 text-white' :
                    theme === 'brand' ? 'bg-primary-100 text-custom-text-100' :
                    'bg-green-600 text-white'
                  }`}>
                    WebGL
                  </Badge>
                </div>
              </div>

              {/* 카드 정보 */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  {bundle.title}
                </h3>
                <p className={`mb-4 h-12 leading-6 overflow-hidden ${
                  theme === 'light' ? 'text-gray-600' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-600'
                }`}>
                  {bundle.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {bundle.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-xs ${
                        theme === 'light' ? 'bg-gray-100 text-gray-700 border-gray-300' :
                        theme === 'dark' ? 'bg-slate-700 text-slate-300 border-slate-600' :
                        theme === 'brand' ? 'bg-custom-bg-300 text-custom-text-200 border-primary-100/30' :
                        'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className={`w-full ${
                  theme === 'light' ? 'bg-green-600 hover:bg-green-700 text-white' :
                  theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                  theme === 'brand' ? 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100' :
                  'bg-green-600 hover:bg-green-700 text-white'
                }`}>
                  체험하기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 직접 링크 (옵션) */}
      {showDirectLinks && (
        <div className="text-center mt-12">
          <p className={`mb-4 ${
            theme === 'light' ? 'text-gray-600' :
            theme === 'dark' ? 'text-slate-300' :
            theme === 'brand' ? 'text-custom-text-200' :
            'text-gray-600'
          }`}>또는 직접 접근:</p>
          <div className="space-y-2">
            {displayBundles.map((bundle) => (
              <div key={bundle.id}>
                <a
                  href={bundle.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline text-sm transition-colors ${
                    theme === 'light' ? 'text-blue-600 hover:text-blue-800' :
                    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' :
                    theme === 'brand' ? 'text-primary-200 hover:text-primary-100' :
                    'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  {bundle.path}
                </a>
                <span className={`text-sm ml-2 ${
                  theme === 'light' ? 'text-gray-500' :
                  theme === 'dark' ? 'text-slate-400' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-500'
                }`}>({bundle.title})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}