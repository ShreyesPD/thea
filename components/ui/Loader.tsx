'use client'

import { motion } from 'framer-motion'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function Loader({ size = 'md', text }: LoaderProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className={`${sizes[size]} border-2 border-charcoal/20 border-t-gold rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner pulsing dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {text && (
        <motion.p
          className="text-sm text-charcoal/70 font-light tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Minimal inline loader for buttons
export function ButtonLoader() {
  return (
    <motion.div
      className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

// Fashion-themed skeleton loader
export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-charcoal/5 via-charcoal/10 to-charcoal/5 rounded ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        backgroundSize: '200% 100%'
      }}
    />
  )
}
