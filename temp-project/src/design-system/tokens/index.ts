/**
 * Design System Tokens
 * 
 * Centralized design tokens for consistent styling across the application.
 * This follows the token hierarchy: primitive → semantic → component
 */

// Primitive color palette
const primitiveColors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
} as const

// Semantic color tokens
export const colors = {
  // Background colors
  background: {
    primary: primitiveColors.slate[900],
    secondary: primitiveColors.slate[800],
    tertiary: primitiveColors.slate[700],
    glass: 'rgba(51, 65, 85, 0.8)', // slate-700 with opacity
  },
  
  // Text colors
  text: {
    primary: primitiveColors.slate[100],
    secondary: primitiveColors.slate[300],
    tertiary: primitiveColors.slate[400],
    muted: primitiveColors.slate[500],
    inverse: primitiveColors.slate[900],
  },
  
  // Border colors
  border: {
    default: primitiveColors.slate[600],
    focus: primitiveColors.blue[500],
    error: primitiveColors.red[500],
    success: primitiveColors.green[500],
  },
  
  // Interactive states
  interactive: {
    primary: {
      default: primitiveColors.blue[600],
      hover: primitiveColors.blue[700],
      active: primitiveColors.blue[800],
      disabled: primitiveColors.slate[600],
    },
    secondary: {
      default: primitiveColors.slate[600],
      hover: primitiveColors.slate[500],
      active: primitiveColors.slate[400],
      disabled: primitiveColors.slate[700],
    },
    tertiary: {
      default: 'transparent',
      hover: primitiveColors.slate[700],
      active: primitiveColors.slate[600],
      disabled: 'transparent',
    },
    destructive: {
      default: primitiveColors.red[600],
      hover: primitiveColors.red[700],
      active: primitiveColors.red[800],
      disabled: primitiveColors.slate[600],
    },
    success: {
      default: primitiveColors.green[600],
      hover: primitiveColors.green[700],
      active: primitiveColors.green[800],
      disabled: primitiveColors.slate[600],
    },
    warning: {
      default: primitiveColors.yellow[500],
      hover: primitiveColors.yellow[600],
      active: primitiveColors.yellow[700],
      disabled: primitiveColors.slate[600],
    },
  },
  
  // Status colors with backgrounds
  status: {
    success: {
      bg: `${primitiveColors.green[600]}20`, // 20% opacity
      border: `${primitiveColors.green[600]}30`,
      text: primitiveColors.green[400],
    },
    warning: {
      bg: `${primitiveColors.yellow[600]}20`,
      border: `${primitiveColors.yellow[600]}30`,
      text: primitiveColors.yellow[400],
    },
    error: {
      bg: `${primitiveColors.red[600]}20`,
      border: `${primitiveColors.red[600]}30`,
      text: primitiveColors.red[400],
    },
    info: {
      bg: `${primitiveColors.blue[600]}20`,
      border: `${primitiveColors.blue[600]}30`,
      text: primitiveColors.blue[400],
    },
  },
} as const

// Typography system
export const typography = {
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
  },
  
  fontSize: {
    xs: { size: '0.75rem', lineHeight: '1rem' },     // 12px
    sm: { size: '0.875rem', lineHeight: '1.25rem' },  // 14px
    base: { size: '1rem', lineHeight: '1.5rem' },     // 16px
    lg: { size: '1.125rem', lineHeight: '1.75rem' },  // 18px
    xl: { size: '1.25rem', lineHeight: '1.75rem' },   // 20px
    '2xl': { size: '1.5rem', lineHeight: '2rem' },    // 24px
    '3xl': { size: '1.875rem', lineHeight: '2.25rem' }, // 30px
    '4xl': { size: '2.25rem', lineHeight: '2.5rem' },  // 36px
    '5xl': { size: '3rem', lineHeight: '1' },          // 48px
    '6xl': { size: '3.75rem', lineHeight: '1' },       // 60px
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const

// Spacing system (8px grid)
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
} as const

// Border radius system
export const borderRadius = {
  none: '0',
  xs: '0.125rem',   // 2px
  sm: '0.25rem',    // 4px
  default: '0.375rem', // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  full: '9999px',
} as const

// Shadow system
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
} as const

// Animation and transition tokens
export const animation = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  
  easing: {
    ease: 'ease',
    linear: 'linear',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  scale: {
    subtle: '1.02',
    normal: '1.05',
    emphasized: '1.1',
  },
} as const

// Breakpoints for responsive design
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Z-index system
export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
  max: 2147483647,
} as const

// Component-specific size variants
export const sizes = {
  button: {
    xs: { height: '1.75rem', padding: '0 0.5rem', fontSize: typography.fontSize.xs },      // 28px
    sm: { height: '2rem', padding: '0 0.75rem', fontSize: typography.fontSize.sm },        // 32px
    md: { height: '2.5rem', padding: '0 1rem', fontSize: typography.fontSize.sm },         // 40px
    lg: { height: '2.75rem', padding: '0 1.5rem', fontSize: typography.fontSize.base },    // 44px
    xl: { height: '3rem', padding: '0 2rem', fontSize: typography.fontSize.lg },           // 48px
  },
  
  input: {
    sm: { height: '2rem', padding: '0 0.75rem', fontSize: typography.fontSize.sm },
    md: { height: '2.5rem', padding: '0 0.75rem', fontSize: typography.fontSize.sm },
    lg: { height: '2.75rem', padding: '0 1rem', fontSize: typography.fontSize.base },
  },
  
  badge: {
    sm: { padding: '0.125rem 0.5rem', fontSize: typography.fontSize.xs },
    md: { padding: '0.25rem 0.625rem', fontSize: typography.fontSize.sm },
    lg: { padding: '0.375rem 0.75rem', fontSize: typography.fontSize.base },
  },
} as const

// Complete tokens export
export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
  sizes,
} as const

export default tokens