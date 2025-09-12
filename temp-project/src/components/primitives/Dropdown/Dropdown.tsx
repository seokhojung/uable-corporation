'use client'

/**
 * Dropdown Component
 * 
 * A flexible dropdown menu component built on Radix UI with complete customization,
 * accessibility support, and multiple interaction patterns. Part of the 03 story
 * implementation for advanced navigation and action components.
 * 
 * Features:
 * - Full accessibility support (ARIA, keyboard navigation)
 * - Multiple trigger styles (button, text, custom)
 * - Nested submenus support
 * - Separators and labels
 * - Checkable items and radio groups
 * - Custom icons and shortcuts
 * - Glass morphism and themed variants
 * - Animation and positioning options
 */

import React, { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cva, type VariantProps } from 'class-variance-authority'
import { 
  Check, 
  ChevronRight, 
  Circle,
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Dropdown content variant styles using design tokens
const dropdownContentVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 text-text-primary shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'bg-background-secondary border-border-default shadow-md',
        glass: 'bg-background-glass backdrop-blur-sm border-border-default shadow-glass',
        elevated: 'bg-background-secondary border-border-default shadow-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const dropdownTriggerVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-interactive-primary-DEFAULT text-white hover:bg-interactive-primary-hover',
        secondary: 'bg-interactive-secondary-DEFAULT text-text-primary hover:bg-interactive-secondary-hover',
        ghost: 'hover:bg-background-tertiary hover:text-text-primary',
        outline: 'border border-border-default bg-background-primary hover:bg-background-secondary hover:text-text-primary',
        text: 'text-text-primary hover:text-text-secondary underline-offset-4 hover:underline p-0',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

// Base Dropdown Components
const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

// Custom Dropdown Trigger with variants
interface DropdownTriggerProps 
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>,
    VariantProps<typeof dropdownTriggerVariants> {
  showChevron?: boolean
  loading?: boolean
}

const DropdownTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownTriggerProps
>(({ className, variant, size, showChevron = false, loading = false, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn(dropdownTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {loading ? (
      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
    ) : null}
    {children}
    {showChevron && <ChevronDown className="ml-2 h-4 w-4" />}
  </DropdownMenuPrimitive.Trigger>
))
DropdownTrigger.displayName = 'DropdownTrigger'

// Dropdown Content
interface DropdownContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
    VariantProps<typeof dropdownContentVariants> {}

const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownContentProps
>(({ className, variant, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(dropdownContentVariants({ variant }), className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

// Dropdown Item
interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean
  destructive?: boolean
}

const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, destructive, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
      'focus:bg-background-tertiary focus:text-text-primary',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      destructive && 'text-status-error-text focus:bg-status-error-bg focus:text-status-error-text',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

// Dropdown Checkable Item
const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
      'focus:bg-background-tertiary focus:text-text-primary',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

// Dropdown Radio Item
const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
      'focus:bg-background-tertiary focus:text-text-primary',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

// Dropdown Label
const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold text-text-secondary',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

// Dropdown Separator
const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border-default', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

// Dropdown Shortcut
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-text-muted', className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

// Dropdown Sub-components
const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      'focus:bg-background-tertiary focus:text-text-primary',
      'data-[state=open]:bg-background-tertiary',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> &
    VariantProps<typeof dropdownContentVariants>
>(({ className, variant, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(dropdownContentVariants({ variant }), className)}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

// Quick Action Dropdown Component
interface QuickDropdownProps {
  trigger?: React.ReactNode
  triggerVariant?: VariantProps<typeof dropdownTriggerVariants>['variant']
  contentVariant?: VariantProps<typeof dropdownContentVariants>['variant']
  items: Array<{
    type: 'item' | 'separator' | 'label' | 'checkbox' | 'radio'
    label?: string
    onClick?: () => void
    icon?: React.ReactNode
    shortcut?: string
    checked?: boolean
    value?: string
    destructive?: boolean
    disabled?: boolean
    items?: Array<any> // For submenu items
  }>
  children?: React.ReactNode
}

const QuickDropdown = ({ 
  trigger, 
  triggerVariant = 'ghost',
  contentVariant = 'default',
  items,
  children,
}: QuickDropdownProps) => {
  const renderItems = (itemList: typeof items) => {
    return itemList.map((item, index) => {
      switch (item.type) {
        case 'separator':
          return <DropdownMenuSeparator key={index} />
        
        case 'label':
          return (
            <DropdownMenuLabel key={index}>
              {item.label}
            </DropdownMenuLabel>
          )
        
        case 'checkbox':
          return (
            <DropdownMenuCheckboxItem
              key={index}
              checked={item.checked}
              onCheckedChange={item.onClick}
              disabled={item.disabled}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </div>
            </DropdownMenuCheckboxItem>
          )
        
        case 'radio':
          return (
            <DropdownMenuRadioItem
              key={index}
              value={item.value || ''}
              disabled={item.disabled}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </div>
            </DropdownMenuRadioItem>
          )
        
        default:
          if (item.items) {
            // Submenu
            return (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger disabled={item.disabled}>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {renderItems(item.items)}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )
          }
          
          return (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              destructive={item.destructive}
              disabled={item.disabled}
            >
              <div className="flex items-center gap-2 w-full">
                {item.icon}
                <span>{item.label}</span>
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </div>
            </DropdownMenuItem>
          )
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownTrigger variant={triggerVariant}>
        {trigger || <MoreHorizontal className="h-4 w-4" />}
      </DropdownTrigger>
      <DropdownMenuContent variant={contentVariant}>
        {children || renderItems(items)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Export all components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  QuickDropdown,
}

// Export types
export type {
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownMenuItemProps,
  QuickDropdownProps,
}

// Default export
export default DropdownMenu