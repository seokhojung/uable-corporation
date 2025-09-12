'use client'

/**
 * Modal Component
 * 
 * A comprehensive modal system built on Radix UI Dialog with complete accessibility,
 * keyboard navigation, and customizable styling. Part of the 04 story implementation
 * for advanced layout components.
 * 
 * Features:
 * - Full accessibility support (ARIA, focus management)
 * - Multiple variants and sizes
 * - Custom trigger and content rendering
 * - Backdrop customization
 * - Animation and positioning
 * - Portal rendering
 * - Glass morphism effects
 */

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Modal content variant styles using design tokens
const modalContentVariants = cva(
  'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background-secondary p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
  {
    variants: {
      variant: {
        default: 'border-border-default bg-background-secondary',
        glass: 'border-border-default bg-background-glass backdrop-blur-sm',
        solid: 'border-border-default bg-background-primary',
        elevated: 'border-border-default bg-background-secondary shadow-xl',
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const modalOverlayVariants = cva(
  'fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      backdrop: {
        blur: 'bg-background-primary/80 backdrop-blur-sm',
        dark: 'bg-background-primary/90',
        light: 'bg-background-primary/50',
        glass: 'bg-background-glass backdrop-blur-md',
      },
    },
    defaultVariants: {
      backdrop: 'blur',
    },
  }
)

// Base Modal Components
const Modal = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger
const ModalPortal = DialogPrimitive.Portal
const ModalClose = DialogPrimitive.Close

// Modal Overlay
interface ModalOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof modalOverlayVariants> {}

const ModalOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  ModalOverlayProps
>(({ className, backdrop, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(modalOverlayVariants({ backdrop }), className)}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

// Modal Content
interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  showCloseButton?: boolean
  backdrop?: VariantProps<typeof modalOverlayVariants>['backdrop']
}

const ModalContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, variant, size, showCloseButton = true, backdrop = 'blur', children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay backdrop={backdrop} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(modalContentVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background-primary transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = DialogPrimitive.Content.displayName

// Modal Header
const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
ModalHeader.displayName = 'ModalHeader'

// Modal Footer
const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
ModalFooter.displayName = 'ModalFooter'

// Modal Title
const ModalTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight text-text-primary',
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

// Modal Description
const ModalDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

// Modal Body
const ModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex-1 space-y-4', className)}
    {...props}
  />
)
ModalBody.displayName = 'ModalBody'

// Compound Modal Component for common use cases
interface CompoundModalProps {
  trigger?: React.ReactNode
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  variant?: VariantProps<typeof modalContentVariants>['variant']
  size?: VariantProps<typeof modalContentVariants>['size']
  backdrop?: VariantProps<typeof modalOverlayVariants>['backdrop']
  showCloseButton?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const CompoundModal = ({
  trigger,
  title,
  description,
  children,
  footer,
  variant = 'default',
  size = 'md',
  backdrop = 'blur',
  showCloseButton = true,
  open,
  onOpenChange,
}: CompoundModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
      <ModalContent 
        variant={variant} 
        size={size} 
        backdrop={backdrop}
        showCloseButton={showCloseButton}
      >
        {(title || description) && (
          <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            {description && <ModalDescription>{description}</ModalDescription>}
          </ModalHeader>
        )}
        
        <ModalBody>
          {children}
        </ModalBody>
        
        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

// Confirmation Modal for common confirmation dialogs
interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  loading?: boolean
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  loading = false,
}: ConfirmationModalProps) => {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        
        <ModalFooter>
          <ModalClose asChild>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:pointer-events-none disabled:opacity-50 border border-border-default bg-background-primary hover:bg-background-secondary h-10 px-4 py-2"
            >
              {cancelText}
            </button>
          </ModalClose>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2',
              variant === 'destructive'
                ? 'bg-interactive-destructive-DEFAULT text-white hover:bg-interactive-destructive-hover'
                : 'bg-interactive-primary-DEFAULT text-white hover:bg-interactive-primary-hover'
            )}
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
            ) : null}
            {confirmText}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

// Export all components
export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
  CompoundModal,
  ConfirmationModal,
}

// Export types
export type {
  ModalContentProps,
  ModalOverlayProps,
  CompoundModalProps,
  ConfirmationModalProps,
}

// Default export
export default Modal