// src/components/ui/button.tsx
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  className?: string
}

const Button = forwardRef<HTMLDivElement, ButtonProps>(
  ({ children, variant = 'default', size = 'md', disabled = false, className = '', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105'

    const variants = {
      default: 'bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500',
      primary: 'bg-slate-600 text-slate-100 hover:bg-slate-700 focus:ring-slate-500',
      secondary: 'bg-slate-600 text-slate-100 hover:bg-slate-700 focus:ring-slate-500',
      outline: 'border border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700 focus:ring-slate-500',
      ghost: 'text-slate-200 hover:bg-slate-700 focus:ring-slate-500',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg'
    }

    const classes = cn(baseClasses, variants[variant], sizes[size], className)

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (props.onClick) {
          props.onClick(event as unknown as React.MouseEvent<HTMLDivElement>)
        }
      }
    }

    return (
      <div
        ref={ref}
        className={classes}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Button.displayName = 'Button'

export { Button }