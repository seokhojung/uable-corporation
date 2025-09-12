// src/components/ui/badge.tsx
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Badge = ({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200 hover:scale-105'
  
  const variants = {
    default: 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200',
    primary: 'bg-green-600 text-white',
    secondary: 'bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-slate-200',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
    outline: 'border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 bg-transparent',
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