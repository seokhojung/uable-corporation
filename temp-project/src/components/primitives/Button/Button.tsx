'use client'

import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, focusRing } from '@/design-system/utils'

/**
 * Modern Button Component
 * 
 * A complete reimplementation of the Button component with:
 * - Proper semantic HTML (button element)
 * - Full TypeScript support
 * - Enhanced accessibility (WCAG 2.1 AA)
 * - Design system integration
 * - Loading states and icons
 * - Polymorphic component support
 */

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200',
    'disabled:opacity-50 disabled:pointer-events-none',
    focusRing.visible,
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-blue-600 text-white shadow-sm',
          'hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20',
          'active:bg-blue-800 active:scale-95',
        ],
        secondary: [
          'bg-gray-100 text-gray-900 shadow-sm',
          'hover:bg-gray-200 hover:shadow-md',
          'active:bg-gray-300 active:scale-95',
        ],
        tertiary: [
          'bg-transparent text-gray-700',
          'hover:bg-gray-100 hover:text-gray-900',
          'active:bg-gray-200 active:scale-95',
        ],
        ghost: [
          'bg-transparent text-gray-700',
          'hover:bg-gray-100 hover:text-gray-900',
          'active:bg-gray-200',
        ],
        destructive: [
          'bg-red-500 text-white shadow-sm',
          'hover:bg-red-600 hover:shadow-md hover:shadow-red-500/20',
          'active:bg-red-700 active:scale-95',
        ],
        outline: [
          'border border-gray-300 text-gray-900 bg-transparent',
          'hover:bg-gray-50 hover:border-gray-400',
          'active:bg-gray-100 active:scale-95',
        ],
        link: [
          'text-blue-600 bg-transparent underline-offset-4',
          'hover:underline hover:text-blue-700',
          'active:text-blue-800',
        ],
      },
      size: {
        xs: 'h-7 px-2 text-xs gap-1',
        sm: 'h-8 px-3 text-sm gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-11 px-6 text-base gap-2',
        xl: 'h-12 px-8 text-lg gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will render as a child element instead of a button.
   * This is useful when you need to render the button as a link or other element.
   */
  asChild?: boolean
  
  /**
   * Loading state - shows spinner and disables interaction
   */
  loading?: boolean
  
  /**
   * Icon to display on the left side of the button
   */
  leftIcon?: React.ReactNode
  
  /**
   * Icon to display on the right side of the button
   */
  rightIcon?: React.ReactNode
  
  /**
   * If true, the button will take up the full width of its container
   */
  fullWidth?: boolean
}

/**
 * Spinner component for loading state
 */
const Spinner = ({ className = '' }: { className?: string }) => (
  <svg
    className={cn('animate-spin h-4 w-4', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && <Spinner />}
        {!loading && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={cn(loading && 'opacity-0')}>{children}</span>
        {!loading && rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }