'use client'

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, focusRing } from '@/design-system/utils'

/**
 * Modern Badge Component
 * 
 * A complete reimplementation of the Badge component with:
 * - Enhanced visual design with proper contrast
 * - Full TypeScript support
 * - Design system integration
 * - Multiple variants and sizes
 * - Improved accessibility
 */

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center gap-1 font-medium rounded-full transition-all duration-200',
    'select-none whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-blue-600 text-white',
          'hover:bg-blue-700',
        ],
        secondary: [
          'bg-slate-600 text-slate-100',
          'hover:bg-slate-500',
        ],
        success: [
          'bg-green-600 text-white',
          'hover:bg-green-700',
        ],
        warning: [
          'bg-yellow-500 text-yellow-900',
          'hover:bg-yellow-400',
        ],
        error: [
          'bg-red-600 text-white',
          'hover:bg-red-700',
        ],
        info: [
          'bg-cyan-600 text-white',
          'hover:bg-cyan-700',
        ],
        outline: [
          'border border-slate-600 text-slate-300 bg-transparent',
          'hover:bg-slate-700 hover:text-slate-100 hover:border-slate-500',
        ],
        ghost: [
          'text-slate-300 bg-slate-800/50',
          'hover:bg-slate-700 hover:text-slate-100',
        ],
      },
      size: {
        xs: 'px-1.5 py-0.5 text-xs h-5',
        sm: 'px-2 py-0.5 text-xs h-6',
        md: 'px-2.5 py-1 text-sm h-7',
        lg: 'px-3 py-1.5 text-sm h-8',
      },
      interactive: {
        true: [
          'cursor-pointer',
          focusRing.visible,
          'active:scale-95',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      interactive: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode
  
  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode
  
  /**
   * If true, adds interactive styles and behaviors
   */
  interactive?: boolean
  
  /**
   * If true, shows a dot indicator
   */
  dot?: boolean
}

/**
 * Dot indicator component
 */
const DotIndicator = ({ className = '' }: { className?: string }) => (
  <span
    className={cn('w-2 h-2 rounded-full bg-current opacity-75', className)}
    aria-hidden="true"
  />
)

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      interactive = false,
      leftIcon,
      rightIcon,
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = interactive ? 'button' : 'span'
    
    return (
      <Comp
        ref={ref as any}
        className={cn(badgeVariants({ variant, size, interactive }), className)}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {dot && <DotIndicator />}
        {!dot && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </Comp>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }