'use client'

/**
 * Button Adapter - Zero-Risk Migration Component
 * 
 * This adapter provides backward compatibility for the legacy Button component
 * while enabling gradual migration to the new Button implementation.
 * 
 * Key features:
 * - 100% API compatibility with legacy Button
 * - Runtime switching via MigrationContext
 * - Proper props mapping between old and new APIs
 * - Fallback to legacy implementation when needed
 * - Zero breaking changes for existing code
 */

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useMigrationContext } from '@/contexts/MigrationContext'
import { Button as NewButton, type ButtonProps as NewButtonProps } from '@/components/primitives/Button'

// Legacy Button interface (exact match with current implementation)
interface LegacyButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  className?: string
  asChild?: boolean
}

/**
 * Legacy Button Implementation
 * This is the exact current implementation, preserved for fallback
 */
const LegacyButton = forwardRef<HTMLDivElement, LegacyButtonProps>(
  ({ children, variant = 'default', size = 'md', disabled = false, className = '', asChild = false, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105'

    const variants = {
      default: 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-slate-100 hover:bg-gray-300 dark:hover:bg-slate-600 focus:ring-gray-500 dark:focus:ring-slate-500',
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-100 dark:bg-slate-600 text-gray-900 dark:text-slate-100 hover:bg-gray-200 dark:hover:bg-slate-500 focus:ring-gray-400 dark:focus:ring-slate-400',
      outline: 'border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100 focus:ring-gray-500 dark:focus:ring-slate-500',
      ghost: 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100 focus:ring-gray-500 dark:focus:ring-slate-500',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg'
    }

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    )

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(classes, (children as React.ReactElement).props.className),
        ...props
      })
    }

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </div>
    )
  }
)

LegacyButton.displayName = 'LegacyButton'

/**
 * Props mapping function
 * Maps legacy Button props to new Button props
 */
function mapLegacyToNewProps(legacyProps: LegacyButtonProps): Partial<NewButtonProps> {
  const { variant, size, disabled, asChild, className, children, ...restProps } = legacyProps

  // Map variant (most are 1:1, 'default' maps to 'secondary')
  const variantMap: Record<string, NewButtonProps['variant']> = {
    'default': 'secondary', // Legacy 'default' was similar to new 'secondary'
    'primary': 'primary',
    'secondary': 'secondary',
    'outline': 'outline',
    'ghost': 'ghost',
    'destructive': 'destructive',
  }

  // Size mapping (exact match)
  const sizeMap: Record<string, NewButtonProps['size']> = {
    'sm': 'sm',
    'md': 'md', 
    'lg': 'lg',
    'xl': 'xl',
  }

  return {
    variant: variantMap[variant || 'default'] || 'secondary',
    size: sizeMap[size || 'md'] || 'md',
    disabled: disabled,
    asChild: asChild,
    className: className,
    children: children,
    // Convert div props to button props (most are compatible)
    ...restProps,
  } as NewButtonProps
}

/**
 * Button Adapter Component
 * 
 * This is the component that existing code will use.
 * It decides at runtime whether to use the new or legacy implementation.
 */
const ButtonAdapter = forwardRef<HTMLDivElement | HTMLButtonElement, LegacyButtonProps>(
  (props, ref) => {
    const { isMigrated } = useMigrationContext()
    const shouldUseNewButton = isMigrated('Button')

    // Log usage for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Button: Using ${shouldUseNewButton ? 'NEW' : 'LEGACY'} implementation`)
    }

    if (shouldUseNewButton) {
      // Use new Button implementation with mapped props
      const mappedProps = mapLegacyToNewProps(props)
      
      // Note: Type casting needed here due to ref type differences
      // This is safe because the NewButton handles both scenarios correctly
      return <NewButton {...mappedProps} ref={ref as any} />
    }

    // Fallback to legacy implementation
    return <LegacyButton {...props} ref={ref as React.RefObject<HTMLDivElement>} />
  }
)

ButtonAdapter.displayName = 'ButtonAdapter'

export { ButtonAdapter as Button }
export type { LegacyButtonProps as ButtonProps }