// src/components/ui/container.tsx
import { forwardRef } from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  as?: 'div' | 'section' | 'main' | 'article'
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = '', size = 'lg', as: Component = 'div' }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
    }
    
    const classes = `mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`
    
    return (
      <Component ref={ref} className={classes}>
        {children}
      </Component>
    )
  }
)

Container.displayName = 'Container' 