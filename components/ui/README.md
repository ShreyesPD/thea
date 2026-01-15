# UI Components Documentation

## Overview
Fashion-forward UI components with elegant animations powered by Framer Motion.

## Components

### SplashScreen
Elegant entrance animation displayed on first visit (per session).

**Usage:**
```tsx
import SplashScreen from '@/components/ui/SplashScreen'

<SplashScreen 
  onComplete={() => console.log('Splash complete')} 
  duration={2500} 
/>
```

**Props:**
- `onComplete?: () => void` - Callback when animation completes
- `duration?: number` - Duration in ms (default: 2500)

**Features:**
- Animated logo entrance with glow effect
- Elegant tagline fade-in
- Decorative line animations
- Radial gradient background animation
- Only shows once per session (uses sessionStorage)

---

### Loader
Versatile loading spinner with fashion-themed design.

**Usage:**
```tsx
import Loader, { ButtonLoader, SkeletonLoader } from '@/components/ui/Loader'

// Main loader
<Loader size="md" text="Loading products..." />

// Button loader (for loading states)
<button disabled={loading}>
  {loading ? <ButtonLoader /> : 'Submit'}
</button>

// Skeleton loader (for content placeholders)
<SkeletonLoader className="h-48 w-full" />
```

**Props:**
- `size?: 'sm' | 'md' | 'lg'` - Loader size (default: 'md')
- `text?: string` - Optional loading text

**Variants:**
- `Loader` - Main animated ring loader
- `ButtonLoader` - Minimal inline loader for buttons
- `SkeletonLoader` - Shimmer effect for content loading

---

### PageTransition
Smooth page transitions with stagger animations.

**Usage:**
```tsx
import PageTransition, { StaggerContainer, StaggerItem } from '@/components/ui/PageTransition'

// Wrap page content
<PageTransition>
  <h1>Page Title</h1>
  <p>Content...</p>
</PageTransition>

// Stagger list items
<StaggerContainer className="grid grid-cols-3 gap-4">
  {items.map(item => (
    <StaggerItem key={item.id}>
      <ProductCard product={item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

**Components:**
- `PageTransition` - Fade and slide animation for page content
- `StaggerContainer` - Container for staggered children
- `StaggerItem` - Individual animated item

---

## Design Philosophy

All components follow Thea's design principles:
- **Elegant**: Smooth, refined animations
- **Minimal**: Clean, unobtrusive UI
- **Fashion-forward**: Premium feel with attention to detail
- **Performant**: Optimized animations using Framer Motion

## Color Palette

Components use the brand colors:
- `ivory` - Background (#FAF9F6)
- `charcoal` - Primary text (#2B2B2B)
- `gold` - Accent (#C9A86A)
- `rose` - Secondary accent (#D4A5A5)

## Animation Timing

- **Fast**: 0.3s - Hover effects, micro-interactions
- **Medium**: 0.5-0.8s - Page transitions, component entrance
- **Slow**: 1.5-2.5s - Splash screen, ambient animations

## Best Practices

1. **Use Loader for async operations**
   ```tsx
   {loading ? <Loader size="sm" /> : <Content />}
   ```

2. **Wrap pages with PageTransition**
   ```tsx
   export default function Page() {
     return (
       <PageTransition>
         {/* page content */}
       </PageTransition>
     )
   }
   ```

3. **Use SkeletonLoader for better UX**
   ```tsx
   {loading ? (
     <SkeletonLoader className="h-64 w-full" />
   ) : (
     <Image src={product.image} />
   )}
   ```

4. **Stagger animations for lists**
   - Improves perceived performance
   - Creates elegant entrance effect
   - Better than loading all at once
