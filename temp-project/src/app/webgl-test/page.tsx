'use client'

import { WebGLGallery } from '@/components/webgl/webgl-gallery'

export default function WebGLTestPage() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <WebGLGallery 
          title="WebGL 테스트 페이지"
          description="다양한 3D 공간을 체험해보세요"
          showDirectLinks={true}
          className="py-8"
        />
      </div>
    </div>
  )
}