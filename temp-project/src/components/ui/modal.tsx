'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = '', 
  showCloseButton = true 
}: ModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // 배경 스크롤 방지
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* 모달 컨테이너 */}
      <div 
        className={`
          relative max-w-4xl max-h-[90vh] w-full mx-auto
          bg-slate-800 rounded-lg shadow-2xl border border-slate-700
          overflow-hidden transition-all duration-300
          transform scale-100 opacity-100
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        {/* 모달 내용 */}
        <div className="relative overflow-auto max-h-[90vh]">
          {children}
        </div>
      </div>
    </div>
  )

  // Portal을 사용하여 document.body에 렌더링
  return createPortal(modalContent, document.body)
}