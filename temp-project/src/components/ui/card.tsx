// src/components/ui/card.tsx
interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card = ({ children, className = '', onClick }: CardProps) => {
  const baseClasses = 'bg-slate-800 rounded-lg border border-slate-700 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1'
  const classes = `${baseClasses} ${className}`

  if (onClick) {
    return (
      <div 
        className={`${classes} cursor-pointer`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <div className={classes}>
      {children}
    </div>
  )
}