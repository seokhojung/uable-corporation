'use client'

import { getActiveWebGLBundles } from '@/data/webgl-gallery'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'

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

  const openWebGL = (path: string) => {
    window.open(path, '_blank', 'width=1200,height=800')
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-slate-100 mb-4">
          {title}
        </h2>
        <p className="text-lg lg:text-xl text-gray-600 dark:text-slate-300">
          {description}
        </p>
      </div>

      {/* WebGL 갤러리 그리드 */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBundles.map((bundle) => (
            <div 
              key={bundle.id}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-slate-700"
              onClick={() => openWebGL(bundle.path)}
            >
              {/* 썸네일 영역 */}
              <div className="relative aspect-video">
                {bundle.thumbnail ? (
                  <img 
                    src={bundle.thumbnail} 
                    alt={bundle.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-blue-400 to-purple-600 w-full h-full flex items-center justify-center">
                    <div className="bg-white bg-opacity-20 rounded-full p-6">
                      <svg 
                        className="w-12 h-12 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l7-5-7-5z"/>
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">
                    WebGL
                  </Badge>
                </div>
              </div>

              {/* 카드 정보 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">
                  {bundle.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-300 mb-4">
                  {bundle.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {bundle.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="outline" 
                      className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
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
          <p className="text-gray-600 dark:text-slate-300 mb-4">또는 직접 접근:</p>
          <div className="space-y-2">
            {displayBundles.map((bundle) => (
              <div key={bundle.id}>
                <a 
                  href={bundle.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline text-sm"
                >
                  {bundle.path}
                </a>
                <span className="text-gray-500 dark:text-slate-400 text-sm ml-2">({bundle.title})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}