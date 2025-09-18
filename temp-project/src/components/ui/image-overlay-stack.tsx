'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

interface ImageData {
  src: string
  alt: string
  width?: number
  height?: number
}

interface ImageOverlayStackProps {
  images: ImageData[]
  autoRotateInterval?: number
  className?: string
}

export function ImageOverlayStack({
  images,
  autoRotateInterval = 3000,
  className = ""
}: ImageOverlayStackProps) {
  const { theme } = useTheme()
  const [currentTopIndex, setCurrentTopIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentTopIndex((prev) => (prev + 1) % images.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [autoRotateInterval, isPaused, images.length])

  const stackConfigs = [
    { rotate: 0, scale: 1, x: 0, y: 0, opacity: 1, zIndex: 4 },
    { rotate: -4, scale: 0.92, x: -20, y: 15, opacity: 0.85, zIndex: 3 },
    { rotate: 3, scale: 0.84, x: 25, y: -10, opacity: 0.75, zIndex: 2 },
    { rotate: -2, scale: 0.76, x: -15, y: 30, opacity: 0.65, zIndex: 1 }
  ]

  const getImageOrder = () => {
    const orderedImages = []
    for (let i = 0; i < images.length; i++) {
      const index = (currentTopIndex + i) % images.length
      orderedImages.push({ ...images[index], originalIndex: index })
    }
    return orderedImages
  }

  const orderedImages = getImageOrder()

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <div
        className="relative aspect-square"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {orderedImages.map((image, stackPosition) => {
          const config = stackConfigs[stackPosition] || stackConfigs[stackConfigs.length - 1]

          return (
            <div
              key={`${image.originalIndex}-${currentTopIndex}`}
              className="absolute inset-0 cursor-pointer transition-all duration-500 group"
              style={{
                transform: `
                  rotate(${config.rotate}deg)
                  scale(${config.scale})
                  translate(${config.x}px, ${config.y}px)
                `,
                opacity: config.opacity,
                zIndex: config.zIndex,
              }}
              onClick={() => setCurrentTopIndex(image.originalIndex)}
            >
              <div className={`relative w-full h-full rounded-3xl overflow-hidden border transition-all duration-300 group-hover:scale-110 group-hover:rotate-0 group-hover:shadow-3xl ${
                theme === 'light' ? 'border-gray-200 shadow-lg group-hover:shadow-gray-400/60 group-hover:border-gray-300' :
                theme === 'dark' ? 'border-slate-700 shadow-xl group-hover:shadow-slate-900/90 group-hover:border-slate-600' :
                theme === 'brand' ? 'border-primary-100/20 shadow-xl group-hover:shadow-primary-100/50 group-hover:border-primary-100/40' :
                'border-gray-200 shadow-lg group-hover:shadow-gray-400/60 group-hover:border-gray-300'
              }`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          )
        })}

        {/* 진행 상태 표시 점들 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTopIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTopIndex
                  ? theme === 'light' ? 'bg-gray-900' :
                    theme === 'dark' ? 'bg-slate-100' :
                    theme === 'brand' ? 'bg-custom-text-100' :
                    'bg-gray-900'
                  : theme === 'light' ? 'bg-gray-400' :
                    theme === 'dark' ? 'bg-slate-600' :
                    theme === 'brand' ? 'bg-custom-text-300' :
                    'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}