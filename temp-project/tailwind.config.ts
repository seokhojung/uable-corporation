/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom Brand Colors
      colors: {
        primary: {
          100: '#2E8B57', // Sea Green
          200: '#61bc84', // Light Sea Green
          300: '#c6ffe6', // Very Light Green
        },
        accent: {
          100: '#8FBC8F', // Dark Sea Green
          200: '#345e37', // Dark Forest Green
        },
        custom: {
          text: {
            100: '#FFFFFF', // Pure White
            200: '#e0e0e0', // Light Gray
          },
          bg: {
            100: '#1E1E1E', // Very Dark Gray
            200: '#2d2d2d', // Dark Gray
            300: '#454545', // Medium Dark Gray
          }
        }
      },
      
      // Typography system
      fontFamily: {
        display: ['"Poppins"', '"Pretendard"', 'sans-serif'],
        body: ['"Inter"', '"Pretendard"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      
      // Extended spacing (8px grid system)
      // Using default Tailwind spacing
      
      // Border radius system  
      // Using default Tailwind borderRadius
      
      // Shadow system
      boxShadow: {
        // Glass morphism shadow
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        // Colored shadows
        primary: '0 10px 25px -3px rgba(59, 130, 246, 0.3)',
        success: '0 10px 25px -3px rgba(34, 197, 94, 0.3)',
        error: '0 10px 25px -3px rgba(239, 68, 68, 0.3)',
      },
      
      // Animation system
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
        slower: '500ms',
      },
      
      transitionTimingFunction: {
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      scale: {
        subtle: '102',
        normal: '105',
        emphasized: '110',
      },
      
      // Enhanced animations
      animation: {
        // Existing
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        // New from 02 guide
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-up': 'scaleUp 0.2s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      
      keyframes: {
        // Existing
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // New from 02 guide
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      
      // Z-index system
      // Using default Tailwind zIndex
      
      // Breakpoints (responsive design)
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  // 동적 테마 클래스(applyThemeClasses) 대응: Purge 방지 세이프리스트
  safelist: [
    // Brand theme selectors
    {
      pattern: /data-\[theme=brand\]:.*/,
    },
    // 테스트용 명시적 클래스들
    'dark',
    'bg-white', 'bg-black', 'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900',
    'bg-slate-50', 'bg-slate-100', 'bg-slate-200', 'bg-slate-300', 'bg-slate-400', 'bg-slate-500', 'bg-slate-600', 'bg-slate-700', 'bg-slate-800', 'bg-slate-900',
    'dark:bg-white', 'dark:bg-black', 'dark:bg-gray-50', 'dark:bg-gray-100', 'dark:bg-gray-200', 'dark:bg-gray-300', 'dark:bg-gray-400', 'dark:bg-gray-500', 'dark:bg-gray-600', 'dark:bg-gray-700', 'dark:bg-gray-800', 'dark:bg-gray-900',
    'dark:bg-slate-50', 'dark:bg-slate-100', 'dark:bg-slate-200', 'dark:bg-slate-300', 'dark:bg-slate-400', 'dark:bg-slate-500', 'dark:bg-slate-600', 'dark:bg-slate-700', 'dark:bg-slate-800', 'dark:bg-slate-900',
    'text-white', 'text-black', 'text-gray-50', 'text-gray-100', 'text-gray-200', 'text-gray-300', 'text-gray-400', 'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    'text-slate-50', 'text-slate-100', 'text-slate-200', 'text-slate-300', 'text-slate-400', 'text-slate-500', 'text-slate-600', 'text-slate-700', 'text-slate-800', 'text-slate-900',
    'dark:text-white', 'dark:text-black', 'dark:text-gray-50', 'dark:text-gray-100', 'dark:text-gray-200', 'dark:text-gray-300', 'dark:text-gray-400', 'dark:text-gray-500', 'dark:text-gray-600', 'dark:text-gray-700', 'dark:text-gray-800', 'dark:text-gray-900',
    'dark:text-slate-50', 'dark:text-slate-100', 'dark:text-slate-200', 'dark:text-slate-300', 'dark:text-slate-400', 'dark:text-slate-500', 'dark:text-slate-600', 'dark:text-slate-700', 'dark:text-slate-800', 'dark:text-slate-900',
    'border-gray-200', 'border-gray-300', 'border-slate-600', 'border-slate-700',
    'dark:border-gray-200', 'dark:border-gray-300', 'dark:border-slate-600', 'dark:border-slate-700',
    'hover:bg-gray-100', 'hover:bg-slate-700', 'hover:bg-slate-800',
    'dark:hover:bg-gray-100', 'dark:hover:bg-slate-700', 'dark:hover:bg-slate-800',
    // 테스트 페이지용 파란색 다크 클래스 추가
    'bg-blue-50', 'bg-blue-900', 'border-blue-200', 'border-blue-800', 
    'text-blue-600', 'text-blue-700', 'text-blue-400', 'text-blue-300',
    'dark:bg-blue-50', 'dark:bg-blue-900', 'dark:border-blue-200', 'dark:border-blue-800',
    'dark:text-blue-600', 'dark:text-blue-700', 'dark:text-blue-400', 'dark:text-blue-300',
    // 투명도 포함 클래스
    'bg-blue-900/20', 'dark:bg-blue-900/20',
  ],
  plugins: [],
}; 
