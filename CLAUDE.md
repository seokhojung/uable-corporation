# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Uable Corporation** is a 3D/AR/WebXR technology company with a Next.js-based corporate website showcasing their immersive technology capabilities. The project has completed its UI refactoring initiative, successfully migrating to a modern component architecture.

### Key Business Context
- **Industry**: 3D/AR/WebXR technology solutions
- **Core Services**: 3D Product Configurators, AR Mobile Apps, WebXR Experiences
- **Target Stack**: Three.js, React Three Fiber, AR.js, WebXR API
- **Status**: ✅ Legacy cleanup completed (Sept 2025)

## Development Commands

```bash
# Development
cd temp-project
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # ESLint validation

# Windows-specific server management
npm run dev-safe         # Check server status before dev
npm run start-server     # Start PowerShell server
npm run server           # Start PowerShell server (alias)
npm run server-bg        # Start server in background
npm run stop-server      # Stop running server
npm run check-server     # Check server status

# SEO & Performance
npm run postbuild        # Generate sitemap after build
```

## Architecture Overview

### Current State (Post-Legacy Cleanup)
```
temp-project/src/
├── app/                 # App Router (Next.js 14)
│   ├── webgl/          # WebGL gallery dedicated page
│   ├── portfolio/      # Portfolio detail pages
│   ├── contact/        # Contact form page
│   └── privacy/        # Privacy policy page
├── components/
│   ├── primitives/     # Modern component system (CVA + Radix)
│   │   ├── Button/     # Button, Badge, Card, Input, Modal, etc.
│   │   └── index.ts    # Central exports
│   ├── ui/             # Specialized components (charts, containers)
│   ├── layout/         # Header, Footer
│   ├── sections/       # Page sections (Hero, Problem, Solution)
│   ├── portfolio/      # Portfolio-specific components
│   ├── webgl/          # WebGL gallery components
│   └── seo/           # SEO optimization components
├── contexts/           # React contexts
│   ├── ThemeContext.tsx      # Dark/light mode management
│   └── MigrationContext.tsx  # Simplified post-cleanup
├── data/               # Static portfolio data
│   └── webgl-gallery.ts # WebGL bundle management
├── hooks/              # Custom React hooks
├── lib/                # Utilities and validation
├── design-system/      # Design tokens and utilities
└── styles/             # Global styles
```

## Component Architecture (Post-Cleanup)

**✅ COMPLETED**: Legacy UI migration has been successfully completed. The project now uses a unified component system.

### 1. Component System Structure
All UI components now use a single, modern architecture:
- **`@/components/primitives/`**: Core components (Button, Badge, Card, Input, Modal, etc.)
- **`@/components/ui/`**: Specialized components (charts, containers, theme toggle)
- Import patterns: `import { Button } from '@/components/primitives/Button'`

### 2. Component Standards
```typescript
// CVA-based component pattern
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  }
})

interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean  // Polymorphic component support
}
```

### 3. Key Architectural Decisions
- **CVA**: Class Variance Authority for variant management
- **Radix UI**: Accessible primitives with full customization
- **Forward Refs**: All components support ref forwarding
- **TypeScript**: Full type safety with proper interfaces

## Key Dependencies

### Core Stack
- **Framework**: Next.js 14.2.13 (App Router)
- **React**: 18.3.1 with TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Forms**: React Hook Form + Zod validation
- **3D/WebGL**: Shapespark WebGL bundles integration

### UI Architecture
- **CVA**: Class Variance Authority for variant management
- **Radix UI**: Accessible primitives (Accordion, Dialog, Select, Slot)
- **Tailwind Merge**: Dynamic class merging via cn() utility
- **Lucide React**: Icon system
- **Framer Motion**: Animations and transitions

### SEO & Analytics
- **Sitemap**: next-sitemap for automatic generation
- **Schema**: Structured data for 3D/AR/WebXR keywords
- **Analytics**: Naver Analytics integration

## Development Guidelines

### 1. Component Development
- **Core UI components**: Add to `src/components/primitives/` using CVA + Radix patterns
- **Specialized components**: Add to `src/components/ui/` for charts, containers, etc.
- **Always use TypeScript**: Full type safety with proper interfaces
- **Follow CVA patterns**: Use `cva()` for component variants and styling

### 2. Import Patterns
```typescript
// Correct import patterns
import { Button } from '@/components/primitives/Button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/design-system/utils'

// Component usage with variants
<Button variant="primary" size="lg">Click me</Button>
```

### 3. SEO Considerations
- Maintain structured data in layout.tsx
- Include 3D/AR/WebXR keywords in meta tags
- Use semantic HTML for accessibility
- Optimize for Korean market (Naver, Google Korea)

## File Structure Conventions

### Primitive Components
```
src/components/primitives/
├── Button/
│   ├── Button.tsx       # Main component with CVA
│   └── index.ts         # Clean exports
├── Card/
│   ├── Card.tsx         # Compound component pattern
│   └── index.ts
```

### Specialized Components
```
src/components/ui/
├── theme-toggle.tsx     # Theme switching
├── container.tsx        # Layout containers
├── *-chart.tsx         # Data visualization
```

## WebGL Integration Architecture

### WebGL Bundle System
```typescript
interface WebGLBundle {
  id: string
  title: string
  description: string
  path: string
  thumbnail?: string
  tags: string[]
  status: 'active' | 'development' | 'disabled'
}
```

### Current WebGL Experiences
1. **웹툰 스튜디오**: Creative workspace 3D environment
2. **청우 F&B 쇼룸**: Cruise-themed virtual showroom
3. **홈 갤러리**: Modern residential space tour
4. **오피스 공간**: Contemporary office space experience
5. **주차장**: Realistic underground parking facility

### WebGL Component Usage
- **Gallery Component**: `<WebGLGallery />` for reusable gallery display
- **Home Integration**: Shows first 3 bundles with "View All" link
- **Dedicated Page**: `/webgl` for complete WebGL experience showcase
- **Header Navigation**: Direct access via main navigation menu

## Business Domain Knowledge

### Portfolio Data Structure
```typescript
interface PortfolioItem {
  id: string
  title: string
  description: string
  longDescription: string
  images: string[]
  videoUrl?: string
  tags: string[]
  metrics?: VisualMetric[]
  projectDetails: ProjectDetail[]
}
```

### 3D/AR/WebGL Specific Components
- Visual metrics charts (performance data)
- 3D model previews and galleries
- Interactive demo sections
- Technology stack badges
- **WebGL Gallery System**: Reusable gallery component for Shapespark bundles
- **WebGL Bundle Management**: Centralized data management for WebGL experiences

### Korean Market Optimization
- Naver search engine optimization
- Korean language structured data
- Mobile-first responsive design
- Local business schema markup

## Testing Strategy

- Component testing with TypeScript type checking
- Visual regression testing for UI components
- Validate SEO structured data after changes
- Performance testing for 3D/WebGL content
- Cross-browser testing for WebGL compatibility

## Additional Context

### Specialized Agents
This repository includes specialized AI agents via `.cursor/rules/` directory for different development roles (dev, architect, analyst, etc.). These can be referenced when working on specific aspects of the project.

### Documentation
- **`docs/`**: Comprehensive project documentation including architecture, specifications, and implementation guides
- **Architecture docs**: Up-to-date post-legacy cleanup architecture information
- **WebGL Integration**: Detailed guides for 3D experience implementation

### Business Focus
- Target market: Korean market with Naver SEO optimization
- Industry: 3D/AR/WebXR technology solutions
- Core value: Immersive technology showcase and client acquisition