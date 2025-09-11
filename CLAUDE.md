# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Uable Corporation** is a 3D/AR/WebXR technology company with a Next.js-based corporate website showcasing their immersive technology capabilities. The project is currently undergoing a comprehensive UI refactoring initiative to modernize the component architecture while maintaining zero downtime.

### Key Business Context
- **Industry**: 3D/AR/WebXR technology solutions
- **Core Services**: 3D Product Configurators, AR Mobile Apps, WebXR Experiences
- **Target Stack**: Three.js, React Three Fiber, AR.js, WebXR API

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
npm run server           # Start PowerShell server
npm run server-bg        # Start server in background
npm run stop-server      # Stop running server
npm run check-server     # Check server status

# SEO & Performance
npm run postbuild        # Generate sitemap after build
```

## Architecture Overview

### Current State (Legacy)
```
temp-project/src/
├── app/                 # App Router (Next.js 14)
├── components/
│   ├── ui/             # Current UI components (being phased out)
│   ├── layout/         # Header, Footer
│   ├── sections/       # Page sections (Hero, Problem, Solution)
│   ├── portfolio/      # Portfolio-specific components
│   └── seo/           # SEO optimization components
├── data/               # Static portfolio data
├── hooks/              # Custom React hooks
├── lib/                # Utilities and validation
└── styles/             # Global styles and design tokens
```

### Migration Architecture (In Progress)
```
temp-project/src/
├── components/
│   ├── ui/             # Legacy components (kept for compatibility)
│   └── primitives/     # New component system (CVA + Radix)
├── contexts/
│   └── MigrationContext.tsx  # Controls gradual migration
├── design-system/
│   ├── tokens/         # Design tokens
│   └── utils/          # Design system utilities
```

## UI Refactoring Strategy

**CRITICAL**: This project is undergoing a zero-risk UI migration. Always follow the gradual migration approach:

### 1. Migration Context System
- Use `MigrationContext` to control component switching
- Feature flags determine which components to use
- Maintains 100% backward compatibility

### 2. Component Development Pattern
```typescript
// New component (src/components/primitives/)
export const NewButton = ({ ... }) => { /* CVA + Radix implementation */ }

// Adapter component (src/components/ui/)  
export const Button = (props) => {
  const { isMigrated } = useMigrationContext()
  
  if (isMigrated('Button')) {
    return <NewButton {...mappedProps} />
  }
  
  return <LegacyButton {...props} />
}
```

### 3. Migration Phases
- **Phase 1**: Infrastructure setup (Migration Context, Feature Flags)
- **Phase 2**: Core primitives (Button, Input, Card)
- **Phase 3**: Complex components (Forms, Modals)
- **Phase 4**: Full migration and cleanup

## Key Dependencies

### Core Stack
- **Framework**: Next.js 14.2.13 (App Router)
- **React**: 18.3.1 with TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Forms**: React Hook Form + Zod validation

### UI Architecture (Migration)
- **CVA**: Class Variance Authority for variant management
- **Radix UI**: Accessible primitives (@radix-ui/react-slot)
- **Tailwind Merge**: Dynamic class merging
- **Lucide React**: Icon system

### SEO & Analytics
- **Sitemap**: next-sitemap for automatic generation
- **Schema**: Structured data for 3D/AR/WebXR keywords
- **Analytics**: Naver Analytics integration

## Development Guidelines

### 1. Migration Rules
- **NEVER** modify existing `src/components/ui/` files directly
- **ALWAYS** create new components in `src/components/primitives/`
- **ALWAYS** use Migration Context for gradual rollout
- Test both legacy and new components during development

### 2. Component Standards
```typescript
// Use CVA for variants
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  }
})

// TypeScript interfaces
interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>, 
  VariantProps<typeof buttonVariants> {}
```

### 3. SEO Considerations
- Maintain structured data in layout.tsx
- Include 3D/AR/WebXR keywords in meta tags
- Use semantic HTML for accessibility
- Optimize for Korean market (Naver, Google Korea)

## File Structure Conventions

### New Components
```
src/components/primitives/
├── Button/
│   ├── Button.tsx       # Main component
│   ├── index.ts         # Exports
│   └── Button.stories.tsx (future)
```

### Legacy Adapters
```
src/components/ui/
├── button.tsx           # Adapter using Migration Context
├── button-adapter.tsx   # Explicit adapter pattern
```

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

### 3D/AR Specific Components
- Visual metrics charts (performance data)
- 3D model previews and galleries
- Interactive demo sections
- Technology stack badges

### Korean Market Optimization
- Naver search engine optimization
- Korean language structured data
- Mobile-first responsive design
- Local business schema markup

## Testing Strategy

- Legacy components must continue working during migration
- Test both code paths in Migration Context
- Validate SEO structured data after changes
- Performance testing for 3D/WebGL content

## Specialized Agent Integration

This repository uses specialized AI agents via `.cursor/rules/` directory:
- **@dev**: Full-stack development with story-based workflows
- **@architect**: System architecture and technical decisions
- **@ux-expert**: UI/UX design and user experience
- **@qa**: Quality assurance and testing protocols

When working with these agents, reference the UI refactoring documentation in `docs/ui-refactoring/` for current migration strategy and implementation guidelines.