// src/components/ui/separator.tsx
interface SeparatorProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export const Separator = ({ 
  className = '', 
  orientation = 'horizontal' 
}: SeparatorProps) => {
  const orientationClasses = orientation === 'horizontal' 
    ? 'w-full h-px' 
    : 'h-full w-px'
    
  return (
    <div 
      className={`bg-gray-200 transition-all duration-300 ${orientationClasses} ${className}`}
      role="separator"
    />
  )
}