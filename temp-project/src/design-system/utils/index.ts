/**
 * Design System Utilities
 * 
 * Helper functions and utilities for the design system
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Enhanced className merging utility that handles Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Focus ring utility for consistent focus styling
 */
export const focusRing = {
  default: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900',
  destructive: 'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900',
  none: 'focus:outline-none',
  visible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
} as const

/**
 * Common animation classes
 */
export const animations = {
  fadeIn: 'animate-in fade-in duration-200',
  fadeOut: 'animate-out fade-out duration-200',
  slideIn: 'animate-in slide-in-from-bottom-2 duration-200',
  slideOut: 'animate-out slide-out-to-bottom-2 duration-200',
  scaleIn: 'animate-in zoom-in-95 duration-200',
  scaleOut: 'animate-out zoom-out-95 duration-200',
  
  // Hover effects
  hoverScale: 'transition-transform duration-200 hover:scale-105',
  hoverGlow: 'transition-all duration-200 hover:shadow-md hover:shadow-blue-500/20',
  
  // Loading states
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
} as const

/**
 * Common disabled state utilities
 */
export const disabledStyles = {
  opacity: 'disabled:opacity-50',
  cursor: 'disabled:cursor-not-allowed',
  pointer: 'disabled:pointer-events-none',
  all: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
} as const

/**
 * Screen reader only text utility
 */
export const srOnly = 'sr-only'

/**
 * Common interactive states
 */
export const interactiveStyles = {
  clickable: 'cursor-pointer select-none',
  hoverable: 'transition-colors duration-200',
  focusable: focusRing.visible,
  disabled: disabledStyles.all,
} as const

/**
 * Responsive breakpoint utilities
 */
export const breakpoints = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  '2xl': '2xl:',
} as const

/**
 * Common layout utilities
 */
export const layout = {
  center: 'flex items-center justify-center',
  centerX: 'flex justify-center',
  centerY: 'flex items-center',
  spaceBetween: 'flex items-center justify-between',
  column: 'flex flex-col',
  row: 'flex flex-row',
  grid: 'grid',
  hidden: 'hidden',
  block: 'block',
  inline: 'inline',
  inlineBlock: 'inline-block',
  inlineFlex: 'inline-flex',
} as const

/**
 * Typography utilities
 */
export const text = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  
  // Weights
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  
  // Colors
  primary: 'text-slate-100',
  secondary: 'text-slate-300',
  muted: 'text-slate-400',
  inverse: 'text-slate-900',
  
  // Alignment
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const

/**
 * Border utilities
 */
export const borders = {
  none: 'border-0',
  default: 'border border-slate-600',
  focus: 'border-blue-500',
  error: 'border-red-500',
  success: 'border-green-500',
  
  // Radius
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    default: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
} as const

/**
 * Background utilities
 */
export const backgrounds = {
  primary: 'bg-slate-900',
  secondary: 'bg-slate-800',
  tertiary: 'bg-slate-700',
  glass: 'bg-slate-700/80 backdrop-blur-sm',
  transparent: 'bg-transparent',
  
  // Interactive
  hover: 'hover:bg-slate-700',
  focus: 'focus:bg-slate-700',
  active: 'active:bg-slate-600',
} as const

/**
 * Shadow utilities
 */
export const shadows = {
  sm: 'shadow-sm',
  default: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  none: 'shadow-none',
  
  // Colored shadows
  blue: 'shadow-blue-500/20',
  red: 'shadow-red-500/20',
  green: 'shadow-green-500/20',
} as const

/**
 * Utility to create consistent spacing
 */
export const createSpacing = (size: keyof typeof spacingMap) => spacingMap[size]

const spacingMap = {
  xs: 'gap-1 p-1',
  sm: 'gap-2 p-2',
  md: 'gap-3 p-3',
  lg: 'gap-4 p-4',
  xl: 'gap-6 p-6',
} as const

/**
 * Create variant-based className utility
 */
export function createVariants<T extends Record<string, any>>(
  base: string,
  variants: T
): (variant: keyof T) => string {
  return (variant) => cn(base, variants[variant])
}

/**
 * Conditional className utility
 */
export function conditional(
  condition: boolean | undefined,
  trueClass: string,
  falseClass?: string
): string {
  if (condition) return trueClass
  if (falseClass) return falseClass
  return ''
}

/**
 * Create responsive utilities
 */
export function responsive(
  classes: Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>
): string {
  const result: string[] = []
  
  if (classes.base) result.push(classes.base)
  if (classes.sm) result.push(`sm:${classes.sm}`)
  if (classes.md) result.push(`md:${classes.md}`)
  if (classes.lg) result.push(`lg:${classes.lg}`)
  if (classes.xl) result.push(`xl:${classes.xl}`)
  if (classes['2xl']) result.push(`2xl:${classes['2xl']}`)
  
  return result.join(' ')
}

export { clsx, twMerge }