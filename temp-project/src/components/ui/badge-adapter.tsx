'use client'

/**
 * Badge Adapter - Zero-Risk Migration Component
 * 
 * This adapter provides backward compatibility for the legacy Badge component
 * while enabling gradual migration to the new Badge implementation.
 * 
 * Key features:
 * - 100% API compatibility with legacy Badge
 * - Runtime switching via MigrationContext
 * - Proper props mapping between old and new APIs
 * - Fallback to legacy implementation when needed
 * - Zero breaking changes for existing code
 */

import React, { forwardRef } from 'react'
import { useMigrationContext } from '@/contexts/MigrationContext'
import { Badge as NewBadge, type BadgeProps as NewBadgeProps } from '@/components/primitives/Badge'

// Legacy Badge interface (exact match with current implementation)
interface LegacyBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Legacy Badge Implementation
 * This is the exact current implementation, preserved for fallback
 */
const LegacyBadge = ({ children, variant = 'default', size = 'md', className = '' }: LegacyBadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200 hover:scale-105'
  
  const variants = {
    default: 'bg-slate-700 text-slate-200',
    primary: 'bg-slate-600 text-slate-200',
    secondary: 'bg-slate-600 text-slate-200',
    success: 'bg-slate-600 text-slate-200',
    warning: 'bg-slate-600 text-slate-200',
    error: 'bg-red-600 text-white',
    outline: 'border border-slate-600 text-slate-200 bg-transparent',
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <span className={classes}>
      {children}
    </span>
  )
}

LegacyBadge.displayName = 'LegacyBadge'

/**
 * Props mapping function
 * Maps legacy Badge props to new Badge props
 */
function mapLegacyToNewProps(legacyProps: LegacyBadgeProps): Partial<NewBadgeProps> {
  const { variant, size, className, children } = legacyProps

  // Map variant (most are 1:1, with some improvements)
  const variantMap: Record<string, NewBadgeProps['variant']> = {
    'default': 'secondary', // Legacy 'default' maps to new 'secondary'
    'primary': 'primary',
    'secondary': 'secondary', 
    'success': 'success',
    'warning': 'warning',
    'error': 'error',
    'outline': 'outline',
  }

  // Size mapping (exact match)
  const sizeMap: Record<string, NewBadgeProps['size']> = {
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg',
  }

  return {
    variant: variantMap[variant || 'default'] || 'secondary',
    size: sizeMap[size || 'md'] || 'md',
    className: className,
    children: children,
  } as NewBadgeProps
}

/**
 * Badge Adapter Component
 * 
 * This is the component that existing code will use.
 * It decides at runtime whether to use the new or legacy implementation.
 */
const BadgeAdapter = forwardRef<HTMLSpanElement, LegacyBadgeProps>(
  (props, ref) => {
    const { isMigrated } = useMigrationContext()
    const shouldUseNewBadge = isMigrated('Badge')

    // Log usage for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Badge: Using ${shouldUseNewBadge ? 'NEW' : 'LEGACY'} implementation`)
    }

    if (shouldUseNewBadge) {
      // Use new Badge implementation with mapped props
      const mappedProps = mapLegacyToNewProps(props)
      
      return <NewBadge {...mappedProps} ref={ref} />
    }

    // Fallback to legacy implementation
    return <LegacyBadge {...props} />
  }
)

BadgeAdapter.displayName = 'BadgeAdapter'

export { BadgeAdapter as Badge }
export type { LegacyBadgeProps as BadgeProps }