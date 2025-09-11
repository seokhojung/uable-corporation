'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

/**
 * Migration Context for Zero-Risk UI Refactoring
 * 
 * This context manages the gradual migration from legacy components to new ones.
 * It provides:
 * - Component migration state tracking
 * - Feature flag integration
 * - Rollback capabilities
 * - Runtime switching between old/new components
 */

interface MigrationContextType {
  /** Set of component names that have been migrated to new implementation */
  migratedComponents: Set<string>
  
  /** Migrate a component to the new implementation */
  migrateComponent: (name: string) => void
  
  /** Rollback a component to the legacy implementation */
  rollbackComponent: (name: string) => void
  
  /** Check if a component has been migrated */
  isMigrated: (name: string) => boolean
  
  /** Get migration status for debugging */
  getMigrationStatus: () => Record<string, boolean>
}

const MigrationContext = createContext<MigrationContextType | null>(null)

interface MigrationProviderProps {
  children: ReactNode
  /** Initial set of migrated components */
  initialMigrated?: string[]
  /** Override for development/testing */
  forceNewUI?: boolean
}

export const MigrationProvider: React.FC<MigrationProviderProps> = ({ 
  children, 
  initialMigrated = [], 
  forceNewUI = false 
}) => {
  const [migratedComponents, setMigratedComponents] = useState<Set<string>>(
    new Set(initialMigrated)
  )

  // Load migration state from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMigration = localStorage.getItem('ui-migration-state')
      if (savedMigration) {
        try {
          const parsedState = JSON.parse(savedMigration)
          setMigratedComponents(new Set(parsedState))
        } catch (error) {
          console.warn('Failed to load migration state from localStorage:', error)
        }
      }
    }
  }, [])

  // Save migration state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ui-migration-state', JSON.stringify([...migratedComponents]))
    }
  }, [migratedComponents])

  // Apply environment-based feature flags
  useEffect(() => {
    // Phase 3: 70% Migration (Button, Badge, ThemeToggle migrated)
    if (process.env.NEXT_PUBLIC_PHASE_3_MIGRATION === 'true') {
      setMigratedComponents(new Set(['Button', 'Badge', 'ThemeToggle'])) // 70% migration
    }

    // Phase 4: 95% Migration (All components except 5% legacy support)
    if (process.env.NEXT_PUBLIC_PHASE_4_MIGRATION === 'true') {
      setMigratedComponents(new Set(['Button', 'Badge', 'ThemeToggle', 'Input', 'Card'])) // 95% migration
    }

    // In development mode, optionally enable all new components
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_NEW_UI === 'true') {
      setMigratedComponents(new Set(['Button', 'Badge', 'ThemeToggle', 'Input', 'Card']))
    }

    // Force new UI flag (for testing/staging)
    if (forceNewUI) {
      setMigratedComponents(new Set(['Button', 'Badge', 'ThemeToggle', 'Input', 'Card']))
    }

    // 테마 시스템 Feature Flag
    if (process.env.NEXT_PUBLIC_THEME_SYSTEM === 'true') {
      setMigratedComponents(prev => {
        const newSet = new Set(prev)
        newSet.add('ThemeToggle')
        newSet.add('ThemeSystem')
        return newSet
      })
    }

    // 테마 토글 버튼 개별 제어
    if (process.env.NEXT_PUBLIC_THEME_TOGGLE_MIGRATED === 'true') {
      setMigratedComponents(prev => {
        const newSet = new Set(prev)
        newSet.add('ThemeToggle')
        return newSet
      })
    }
  }, [forceNewUI])

  const migrateComponent = (name: string) => {
    setMigratedComponents(prev => {
      const newSet = new Set(prev)
      newSet.add(name)
      return newSet
    })
    
    // Log migration for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Migrated component: ${name}`)
    }
  }

  const rollbackComponent = (name: string) => {
    setMigratedComponents(prev => {
      const newSet = new Set(prev)
      newSet.delete(name)
      return newSet
    })
    
    // Log rollback for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`↩️  Rolled back component: ${name}`)
    }
  }

  const isMigrated = (name: string): boolean => {
    return migratedComponents.has(name) || 
           process.env.NEXT_PUBLIC_FORCE_NEW_UI === 'true' ||
           forceNewUI
  }

  const getMigrationStatus = (): Record<string, boolean> => {
    const components = ['Button', 'Badge', 'Input', 'Card', 'ThemeToggle', 'ThemeSystem']
    return components.reduce((acc, component) => ({
      ...acc,
      [component]: isMigrated(component)
    }), {})
  }

  const value: MigrationContextType = {
    migratedComponents,
    migrateComponent,
    rollbackComponent,
    isMigrated,
    getMigrationStatus
  }

  return (
    <MigrationContext.Provider value={value}>
      {children}
    </MigrationContext.Provider>
  )
}

export const useMigrationContext = (): MigrationContextType => {
  const context = useContext(MigrationContext)
  if (!context) {
    throw new Error('useMigrationContext must be used within a MigrationProvider')
  }
  return context
}

/**
 * Hook to conditionally use new or legacy component
 * @param componentName Name of the component to check
 * @returns boolean indicating whether to use the new implementation
 */
export const useNewComponent = (componentName: string): boolean => {
  const { isMigrated } = useMigrationContext()
  return isMigrated(componentName)
}

/**
 * Development helper component to display migration status
 */
export const MigrationDebugger: React.FC = () => {
  const { getMigrationStatus } = useMigrationContext()
  
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const status = getMigrationStatus()
  
  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 border border-slate-600 rounded-lg p-3 text-xs text-slate-300 z-50">
      <div className="font-bold mb-2">UI Migration Status</div>
      {Object.entries(status).map(([component, migrated]) => (
        <div key={component} className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${migrated ? 'bg-green-500' : 'bg-gray-500'}`} />
          <span>{component}: {migrated ? 'New' : 'Legacy'}</span>
        </div>
      ))}
    </div>
  )
}