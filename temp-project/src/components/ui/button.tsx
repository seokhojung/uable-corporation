'use client'

// src/components/ui/button.tsx
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  className?: string
  asChild?: boolean
}

const Button = forwardRef<HTMLDivElement, ButtonProps>(
  ({ children, variant = 'default', size = 'md', disabled = false, className = '', asChild = false, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105'

    const variants = {
      default: 'bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500',
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-slate-600 text-slate-100 hover:bg-slate-500 focus:ring-slate-400',
      outline: 'border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100 focus:ring-slate-500',
      ghost: 'text-slate-300 hover:bg-slate-700 hover:text-slate-100 focus:ring-slate-500',
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

Button.displayName = 'Button'

export { Button }