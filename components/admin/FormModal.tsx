'use client'

import { useState, ReactNode, ReactElement, cloneElement, MouseEventHandler } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

type TriggerElement = ReactElement<{ onClick?: MouseEventHandler }>

interface FormModalProps {
  title: string
  description?: string
  trigger: TriggerElement
  children: ReactNode | ((options: { close: () => void }) => ReactNode)
  size?: 'sm' | 'md' | 'lg'
}

const sizes: Record<NonNullable<FormModalProps['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl'
}

export default function FormModal({
  title,
  description,
  trigger,
  children,
  size = 'md'
}: FormModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  const triggerWithHandler = cloneElement(trigger, {
    onClick: ((event) => {
      if (typeof trigger.props.onClick === 'function') {
        trigger.props.onClick(event)
      }
      open()
    }) as MouseEventHandler,
  })

  return (
    <>
      {triggerWithHandler}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`w-full ${sizes[size]} rounded-2xl bg-ivory shadow-2xl border border-charcoal/10 mx-4`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
            >
              <div className="flex items-start justify-between border-b border-charcoal/10 px-6 py-4">
                <div>
                  <h2 className="font-serif text-2xl">{title}</h2>
                  {description && <p className="text-sm text-charcoal/60 mt-1">{description}</p>}
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full p-2 text-charcoal/60 hover:bg-charcoal/10"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="px-6 py-6">{typeof children === 'function' ? children({ close }) : children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
