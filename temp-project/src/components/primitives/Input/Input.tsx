'use client'

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, focusRing } from '@/design-system/utils'

/**
 * Modern Input Component
 * 
 * A complete reimplementation of the Input component with:
 * - Enhanced visual design with proper states
 * - Full TypeScript support
 * - Design system integration
 * - Multiple variants and sizes
 * - Improved accessibility (WCAG 2.1 AA)
 * - Error and success states
 * - Icon support
 */

const inputVariants = cva(
  [
    'flex w-full rounded-md border transition-all duration-200',
    'placeholder:text-slate-500',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    focusRing.visible,
  ],
  {
    variants: {
      variant: {
        default: [
          'border-slate-600 bg-slate-800/50 text-slate-100',
          'hover:border-slate-500 hover:bg-slate-800/70',
          'focus:border-blue-500 focus:bg-slate-800',
          'focus:ring-blue-500/20',
        ],
        filled: [
          'border-slate-700 bg-slate-700 text-slate-100',
          'hover:border-slate-600 hover:bg-slate-600/70',
          'focus:border-blue-500 focus:bg-slate-800',
          'focus:ring-blue-500/20',
        ],
        ghost: [
          'border-transparent bg-transparent text-slate-100',
          'hover:border-slate-600 hover:bg-slate-800/30',
          'focus:border-blue-500 focus:bg-slate-800/50',
          'focus:ring-blue-500/20',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-11 px-4 text-base',
      },
      state: {
        default: '',
        error: [
          'border-red-500 bg-red-500/5',
          'hover:border-red-400',
          'focus:border-red-500 focus:ring-red-500/20',
        ],
        success: [
          'border-green-500 bg-green-500/5',
          'hover:border-green-400',
          'focus:border-green-500 focus:ring-green-500/20',
        ],
        warning: [
          'border-yellow-500 bg-yellow-500/5',
          'hover:border-yellow-400',
          'focus:border-yellow-500 focus:ring-yellow-500/20',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode
  
  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode
  
  /**
   * Helper text to display below the input
   */
  helperText?: string
  
  /**
   * Error message to display below the input
   */
  error?: string
  
  /**
   * Success message to display below the input
   */
  success?: string
  
  /**
   * Warning message to display below the input
   */
  warning?: string
  
  /**
   * Label for the input
   */
  label?: string
  
  /**
   * Whether the label should be required (shows *)
   */
  required?: boolean
  
  /**
   * Container className for the wrapper div
   */
  containerClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      leftIcon,
      rightIcon,
      helperText,
      error,
      success,
      warning,
      label,
      required,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    // Determine state based on props
    const actualState = error ? 'error' : success ? 'success' : warning ? 'warning' : state
    
    // Generate unique id if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    // Helper/error/success text
    const messageText = error || success || warning || helperText
    const messageId = messageText ? `${inputId}-message` : undefined

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-200 block"
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant, size, state: actualState }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-describedby={messageId}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper/Error/Success/Warning Text */}
        {messageText && (
          <p
            id={messageId}
            className={cn(
              'text-xs',
              error && 'text-red-400',
              success && 'text-green-400',
              warning && 'text-yellow-400',
              !error && !success && !warning && 'text-slate-400'
            )}
          >
            {messageText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }