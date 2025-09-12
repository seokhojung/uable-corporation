'use client'

import { useState } from 'react'

export default function WebGLTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openWebGL = () => {
    // public 루트에서 직접 접근
    window.open('/webtoon-webgl/index.html', '_blank', 'width=1200,height=800')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            WebGL 테스트 페이지
          </h1>
          <p className="text-lg text-gray-600">
            웹툰 스튜디오 3D 공간을 체험해보세요
          </p>
        </div>

        {/* 썸네일 카드 */}
        <div className="max-w-md mx-auto">
          <div 
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={openWebGL}
          >
            {/* 썸네일 영역 */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-400 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center">
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
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                  WebGL
                </span>
              </div>
            </div>

            {/* 카드 정보 */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                웹툰 스튜디오
              </h3>
              <p className="text-gray-600 mb-4">
                창작 공간과 엔터테인먼트가 어우러진 인터랙티브 3D 스튜디오 체험
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                체험하기
              </button>
            </div>
          </div>
        </div>

        {/* 모달 팝업 */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* 배경 오버레이 */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-75"
              onClick={closeModal}
            ></div>
            
            {/* 모달 컨텐츠 */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-full flex flex-col">
                {/* 모달 헤더 */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-bold">웹툰 스튜디오</h2>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                
                {/* iframe 컨테이너 */}
                <div className="flex-1">
                  <iframe 
                    src="/webgl/webtoon/index.html"
                    className="w-full h-full border-none"
                    title="웹툰 스튜디오 WebGL 체험"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 직접 링크 테스트 */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">또는 직접 접근:</p>
          <a 
            href="/webtoon-webgl/index.html" 
            target="_blank"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            /webtoon-webgl/index.html
          </a>
        </div>
      </div>
    </div>
  )
}