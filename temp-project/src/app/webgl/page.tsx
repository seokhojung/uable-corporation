'use client'

import { WebGLGallery } from '@/components/webgl/webgl-gallery'

export default function WebGLTestPage() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <WebGLGallery 
          title="3D 체험 갤러리"
          description="다양한 3D 공간을 체험해보세요"
          showDirectLinks={false}
          className="py-8"
        />
      </div>
    </div>
  )
}