'use client'

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/design-system/utils'

/**
 * Modern Card Component System
 * 
 * A complete card implementation with compound pattern:
 * - Card (container)
 * - CardHeader
 * - CardTitle  
 * - CardDescription
 * - CardContent
 * - CardFooter
 * 
 * Features:
 * - Multiple visual variants
 * - Interactive states (hover, clickable)
 * - Compound pattern for flexible composition
 * - Full TypeScript support
 * - Design system integration
 */

const cardVariants = cva(
  [
    'rounded-lg border transition-all duration-200',
    'shadow-sm overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-700',
          'hover:border-gray-300 dark:hover:border-slate-600',
        ],
        elevated: [
          'bg-white border-gray-200 shadow-lg shadow-gray-900/10 dark:bg-slate-800 dark:border-slate-700 dark:shadow-slate-900/20',
          'hover:shadow-xl hover:shadow-gray-900/15 hover:border-gray-300 dark:hover:shadow-xl dark:hover:shadow-slate-900/30 dark:hover:border-slate-600',
        ],
        outlined: [
          'bg-transparent border-gray-300 dark:border-slate-600',
          'hover:bg-gray-50 hover:border-gray-400 dark:hover:bg-slate-800/30 dark:hover:border-slate-500',
        ],
        ghost: [
          'bg-gray-50 border-transparent dark:bg-slate-800/30 dark:border-transparent',
          'hover:bg-gray-100 hover:border-gray-200 dark:hover:bg-slate-800/50 dark:hover:border-slate-700',
        ],
        glass: [
          'bg-white/80 border-gray-200/50 backdrop-blur-sm dark:bg-slate-800/20 dark:border-slate-700/50',
          'hover:bg-white/90 hover:border-gray-300/70 dark:hover:bg-slate-800/30 dark:hover:border-slate-600/70',
        ],
      },
      size: {
        sm: 'p-4',
        md: 'p-6', 
        lg: 'p-8',
      },
      interactive: {
        true: [
          'cursor-pointer select-none',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
)

const cardHeaderVariants = cva('flex flex-col space-y-1.5')
const cardTitleVariants = cva('text-xl font-semibold text-slate-100')
const cardDescriptionVariants = cva('text-sm text-slate-400')
const cardContentVariants = cva('pt-0')
const cardFooterVariants = cva('flex items-center pt-0')

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Makes the card interactive (clickable)
   */
  interactive?: boolean
  
  /**
   * Called when the card is clicked (only if interactive)
   */
  onCardClick?: () => void
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      interactive = false,
      onCardClick,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (interactive && onCardClick) {
        onCardClick()
      }
      onClick?.(e)
    }

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, interactive }), className)}
        onClick={handleClick}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onCardClick?.()
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants(), className)}
      {...props}
    />
  )
)

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(cardTitleVariants(), className)}
      {...props}
    />
  )
)

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(cardDescriptionVariants(), className)}
      {...props}
    />
  )
)

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants(), className)}
      {...props}
    />
  )
)

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants(), className)}
      {...props}
    />
  )
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
}