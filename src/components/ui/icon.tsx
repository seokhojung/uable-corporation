// src/components/ui/icon.tsx
import { LucideIcon } from 'lucide-react'

interface IconProps {
  icon: LucideIcon
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const Icon = ({ icon: IconComponent, size = 'md', className = '' }: IconProps) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }
  
  const classes = `${sizes[size]} ${className}`
  
  return <IconComponent className={classes} />
} 