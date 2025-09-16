'use client'

/**
 * Accordion Component
 * 
 * A flexible accordion system built on Radix UI with complete accessibility,
 * smooth animations, and customizable styling. Part of the 04 story implementation
 * for advanced layout components.
 * 
 * Features:
 * - Full accessibility support (ARIA, keyboard navigation)
 * - Smooth animations and transitions
 * - Multiple variants and styles
 * - Single or multiple item expansion
 * - Custom trigger and content rendering
 * - Collapsible functionality
 */

import React, { forwardRef, ReactNode } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

// Accordion variant styles using design tokens
const accordionRootVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        card: 'bg-background-secondary border border-border-default rounded-lg overflow-hidden',
        outlined: 'space-y-2',
        ghost: '',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const accordionItemVariants = cva(
  'border-b border-border-default',
  {
    variants: {
      variant: {
        default: 'border-b border-border-default',
        card: 'border-b border-border-default last:border-b-0',
        outlined: 'border border-border-default rounded-lg mb-2 last:mb-0',
        ghost: 'border-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline text-left',
  {
    variants: {
      variant: {
        default: 'px-0',
        card: 'px-6',
        outlined: 'px-4',
        ghost: 'px-0',
      },
      size: {
        sm: 'py-3 text-sm',
        md: 'py-4 text-base',
        lg: 'py-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const accordionContentVariants = cva(
  'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {
      variant: {
        default: 'px-0 pb-4',
        card: 'px-6 pb-6',
        outlined: 'px-4 pb-4',
        ghost: 'px-0 pb-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Base Accordion Components
const Accordion = AccordionPrimitive.Root

// Accordion Item
interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {}

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant }), className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

// Accordion Trigger
interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {
  icon?: 'chevron' | 'plus' | 'none'
  iconPosition?: 'left' | 'right'
}

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, variant, size, icon = 'chevron', iconPosition = 'right', ...props }, ref) => {
  const renderIcon = () => {
    if (icon === 'none') return null
    
    const iconClasses = 'h-4 w-4 shrink-0 transition-transform duration-200'
    
    if (icon === 'plus') {
      return (
        <div className="relative">
          <Plus className={cn(iconClasses, 'data-[state=open]:opacity-0')} />
          <Minus className={cn(iconClasses, 'absolute inset-0 data-[state=closed]:opacity-0')} />
        </div>
      )
    }
    
    return (
      <ChevronDown className={cn(iconClasses, 'data-[state=open]:rotate-180')} />
    )
  }

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(accordionTriggerVariants({ variant, size }), className)}
        {...props}
      >
        {iconPosition === 'left' && renderIcon()}
        <span className="flex-1 text-left">{children}</span>
        {iconPosition === 'right' && renderIcon()}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// Accordion Content
interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {}

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, variant, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ variant }), className)}
    {...props}
  >
    <div className="text-text-secondary">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Compound Accordion Component for easy usage
interface CompoundAccordionProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  variant?: VariantProps<typeof accordionRootVariants>['variant']
  size?: VariantProps<typeof accordionRootVariants>['size']
  className?: string
  items: Array<{
    value: string
    title: ReactNode
    content: React.ReactNode
    disabled?: boolean
    icon?: 'chevron' | 'plus' | 'none'
  }>
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const CompoundAccordion = ({
  type = 'single',
  collapsible = false,
  variant = 'default',
  size = 'md',
  className,
  items,
  defaultValue,
  value,
  onValueChange,
}: CompoundAccordionProps) => {
  return (
    <div className={cn(accordionRootVariants({ variant, size }), className)}>
      <Accordion
        type={type as any}
        collapsible={collapsible}
        defaultValue={defaultValue as any}
        value={value as any}
        onValueChange={onValueChange as any}
      >
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value} variant={variant}>
            <AccordionTrigger
              variant={variant}
              size={size}
              icon={item.icon}
              disabled={item.disabled}
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent variant={variant}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

// FAQ Accordion - specialized for frequently asked questions
interface FAQAccordionProps {
  faqs: Array<{
    question: string
    answer: React.ReactNode
    id?: string
  }>
  variant?: VariantProps<typeof accordionRootVariants>['variant']
  searchable?: boolean
}

const FAQAccordion = ({
  faqs,
  variant = 'outlined',
  searchable = false,
}: FAQAccordionProps) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  
  const filteredFAQs = React.useMemo(() => {
    if (!searchable || !searchTerm) return faqs
    
    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [faqs, searchTerm, searchable])

  const accordionItems = filteredFAQs.map((faq, index) => ({
    value: faq.id || `faq-${index}`,
    title: faq.question,
    content: faq.answer,
  }))

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border-default rounded-md bg-background-primary text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-border-focus"
          />
        </div>
      )}
      
      <CompoundAccordion
        type="single"
        collapsible
        variant={variant}
        items={accordionItems}
      />
      
      {searchable && filteredFAQs.length === 0 && (
        <div className="text-center py-8 text-text-muted">
          No FAQs found matching &quot;{searchTerm}&quot;
        </div>
      )}
    </div>
  )
}

// Settings Accordion - specialized for settings/preferences
interface SettingsAccordionProps {
  sections: Array<{
    title: ReactNode
    description?: string
    settings: React.ReactNode
    id: string
  }>
}

const SettingsAccordion = ({ sections }: SettingsAccordionProps) => {
  const accordionItems = sections.map((section) => ({
    value: section.id,
    title: (
      <div>
        <div className="font-medium">{section.title}</div>
        {section.description && (
          <div className="text-sm text-text-muted font-normal">{section.description}</div>
        )}
      </div>
    ),
    content: section.settings,
  }))

  return (
    <CompoundAccordion
      type="multiple"
      variant="card"
      items={accordionItems}
    />
  )
}

// Export all components
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  CompoundAccordion,
  FAQAccordion,
  SettingsAccordion,
}

// Export types
export type {
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  CompoundAccordionProps,
  FAQAccordionProps,
  SettingsAccordionProps,
}

// Default export
export default Accordion