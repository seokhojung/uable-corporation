'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { PortfolioProject } from '@/types/portfolio'

interface ImageGalleryProps {
  images: PortfolioProject['images']
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // 빈 갤러리 처리
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700 flex items-center justify-center">
            <span className="text-2xl">🖼️</span>
          </div>
          <p className="text-lg font-medium mb-2">갤러리 이미지 준비 중</p>
          <p className="text-sm text-slate-500">프로젝트 이미지가 곧 추가될 예정입니다.</p>
        </div>
      </div>
    )
  }

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length)
    }
  }

  return (
    <>
      {/* 그리드 갤러리 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Card 
            key={index}
            className="overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => openModal(index)}
          >
            <div className="relative aspect-square">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          </Card>
        ))}
      </div>

      {/* 이미지 모달 */}
      <Modal 
        isOpen={selectedImageIndex !== null} 
        onClose={closeModal}
        className="max-w-6xl"
      >
        {selectedImageIndex !== null && (
          <div className="relative">
            {/* 메인 이미지 */}
            <div className="relative aspect-video bg-slate-900">
              <Image
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
              
              {/* 이미지 네비게이션 */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-slate-100 p-3 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-slate-100 p-3 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            {/* 이미지 정보 */}
            <div className="p-6 bg-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                {images[selectedImageIndex].alt}
              </h3>
              <p className="text-sm text-slate-400">
                {selectedImageIndex + 1} / {images.length}
              </p>
            </div>
            
            {/* 썸네일 네비게이션 */}
            {images.length > 1 && (
              <div className="p-4 bg-slate-800 border-t border-slate-700">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`
                        flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all
                        ${index === selectedImageIndex 
                          ? 'border-blue-500 scale-110' 
                          : 'border-slate-600 hover:border-slate-400'}
                      `}
                    >
                      <Image
                        src={image.src}
                        alt={`썸네일 ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}