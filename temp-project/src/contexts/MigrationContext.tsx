'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

/**
 * Simplified Migration Context - Post-Legacy Cleanup
 * 
 * This context now serves as a minimal compatibility layer.
 * Legacy cleanup completed - all components use new implementations.
 * 
 * Maintained for:
 * - Future component migrations
 * - Development debugging
 * - Backward compatibility
 */

interface MigrationContextType {
  /** Check if a component has been migrated (always true post-cleanup) */
  isMigrated: (name: string) => boolean
  
  /** Get migration status for debugging */
  getMigrationStatus: () => Record<string, boolean>
}

const MigrationContext = createContext<MigrationContextType | null>(null)

interface MigrationProviderProps {
  children: ReactNode
}

export const MigrationProvider: React.FC<MigrationProviderProps> = ({ children }) => {
  // Post-cleanup: All components are migrated by default
  const isMigrated = (name: string): boolean => {
    // Always return true as legacy cleanup is complete
    return true
  }

  const getMigrationStatus = (): Record<string, boolean> => {
    const components = ['Button', 'Badge', 'Card', 'Input', 'Modal', 'Select', 'Tabs', 'Toast', 'Accordion', 'Dropdown', 'ThemeToggle', 'ThemeSystem']
    return components.reduce((acc, component) => ({
      ...acc,
      [component]: true // All components migrated
    }), {})
  }

  // Log cleanup completion in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Legacy Cleanup Complete: All components using new implementations')
    }
  }, [])

  const value: MigrationContextType = {
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
 * @param componentName Name of the component to check (legacy compatibility)
 * @returns always true as legacy cleanup is complete
 */
export const useNewComponent = (componentName: string): boolean => {
  // Post-cleanup: Always return true
  return true
}

/**
 * Development helper component to display migration status
 */
export const MigrationDebugger: React.FC = () => {
  // Migration completed - debugger disabled
  return null
}