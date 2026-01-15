# Thea Design System

## Brand Identity

**Thea Fashion Boutique** - A contemporary fashion brand that embodies elegance, sophistication, and timeless style.

### Tagline
"Curating Elegance"

### Brand Values
- **Timeless**: Classic pieces that transcend trends
- **Quality**: Premium materials and craftsmanship
- **Elegance**: Refined, sophisticated aesthetic
- **Modern**: Contemporary cuts and silhouettes

---

## Visual Identity

### Logo
The Thea logo features:
- Elegant serif typography
- "Fashion Boutique" subtitle
- Decorative flowing lines suggesting fabric and movement
- Circular composition for balance and harmony

**Usage:**
- Primary: Full logo with subtitle
- Favicon: Circular logo mark
- Minimum size: 80px width for legibility

### Color Palette

```css
/* Primary Colors */
--ivory: #FAF9F6      /* Backgrounds, light surfaces */
--charcoal: #2B2B2B   /* Primary text, dark elements */

/* Accent Colors */
--gold: #C9A86A       /* Premium accents, CTAs */
--rose: #D4A5A5       /* Secondary accents, highlights */
--earth: #8B7355      /* Tertiary accents */
```

**Color Usage:**
- **Ivory**: Main background, creates airy, premium feel
- **Charcoal**: Text, borders, strong contrast
- **Gold**: Hover states, active elements, premium indicators
- **Rose**: Soft accents, decorative elements
- **Earth**: Subtle details, muted accents

### Typography

**Headings**: Playfair Display (Serif)
- Editorial, elegant feel
- Used for: H1-H6, brand name, section titles
- Weights: 400 (Regular), 600 (SemiBold), 700 (Bold)

**Body**: Inter (Sans-serif)
- Clean, highly legible
- Used for: Body text, UI elements, buttons
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)

**Type Scale:**
```
H1: 3rem (48px) - Hero titles
H2: 2.5rem (40px) - Page titles
H3: 2rem (32px) - Section headers
H4: 1.5rem (24px) - Card titles
Body: 1rem (16px) - Standard text
Small: 0.875rem (14px) - Captions, labels
```

---

## Layout & Spacing

### Grid System
- Max width: 1280px (7xl)
- Padding: 1rem (mobile), 1.5rem (tablet), 2rem (desktop)
- Columns: 1 (mobile), 2-3 (tablet), 3-4 (desktop)

### Spacing Scale
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## Components

### Buttons

**Primary Button:**
```tsx
<button className="px-8 py-3 bg-charcoal text-ivory hover:bg-charcoal/90 transition-all">
  Shop Now
</button>
```

**Secondary Button:**
```tsx
<button className="px-8 py-3 border border-charcoal hover:bg-charcoal hover:text-ivory transition-all">
  Learn More
</button>
```

**Text Button:**
```tsx
<button className="text-charcoal hover:text-gold transition-colors underline">
  View Details
</button>
```

### Cards

**Product Card:**
- Minimal border or shadow
- Large product image (aspect ratio 3:4)
- Product name, price below
- Hover: Subtle scale or border color change

**Content Card:**
- Ivory background
- Subtle border (charcoal/10)
- Generous padding
- Hover: Border color intensifies

### Navigation

**Header:**
- Fixed position
- Backdrop blur for modern effect
- Logo left, nav center, icons right
- Height: 64px (mobile), 80px (desktop)

**Footer:**
- Divided sections
- Links, social media, newsletter
- Copyright and legal

---

## Animations

### Principles
1. **Subtle**: Animations enhance, don't distract
2. **Smooth**: Use easing functions (ease-in-out)
3. **Fast**: Keep under 0.5s for interactions
4. **Purposeful**: Every animation has meaning

### Common Animations

**Fade In:**
```tsx
opacity: [0, 1]
duration: 0.5s
```

**Slide Up:**
```tsx
y: [20, 0]
opacity: [0, 1]
duration: 0.5s
```

**Scale:**
```tsx
scale: [0.95, 1]
duration: 0.3s
```

**Stagger:**
```tsx
staggerChildren: 0.1s
```

---

## Photography Style

### Product Photography
- Clean white or ivory background
- Natural lighting
- Multiple angles (front, side, detail)
- Lifestyle shots with models
- Flat lays for accessories

### Lookbook Photography
- Editorial style
- Natural environments
- Soft, diffused lighting
- Muted color grading
- Focus on styling and composition

---

## Voice & Tone

### Brand Voice
- **Sophisticated**: Refined language, avoid slang
- **Warm**: Approachable, not cold or distant
- **Confident**: Assured, not arrogant
- **Descriptive**: Paint pictures with words

### Writing Guidelines
- Use active voice
- Keep sentences concise
- Avoid jargon
- Focus on benefits, not just features
- Tell stories about the pieces

### Example Copy

**Good:**
"This silk blouse drapes beautifully, creating an effortlessly elegant silhouette perfect for both office and evening occasions."

**Avoid:**
"Buy this awesome shirt! It's super cool and trendy!"

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements have clear focus states
- Don't rely on color alone to convey information

### Typography
- Minimum font size: 14px
- Line height: 1.5 for body text
- Adequate letter spacing for readability

### Interactive Elements
- Minimum touch target: 44x44px
- Clear hover and focus states
- Keyboard navigable
- Screen reader friendly

---

## Implementation Notes

### Performance
- Lazy load images below fold
- Optimize images (WebP format)
- Code splitting for routes
- Minimize animation janking

### Responsive Design

- Mobile-first approach
- Touch-friendly on mobile
- Optimized images per breakpoint
- Simplified navigation on mobile

### Responsive System

| Breakpoint | Tailwind Prefix | Usage |
|------------|-----------------|-------|
| Base       | none            | Phones under 640px – stack layout, full-width imagery, larger tap targets |
| `sm` (640px) | `sm:` | Small tablets – enable horizontal navigation, split hero CTAs |
| `md` (768px) | `md:` | Tablets – two-column grids, reveal sidebar cards |
| `lg` (1024px) | `lg:` | Small desktops – three-column grids, full-width hero text |
| `xl` (1280px) | `xl:` | Large desktops – luxury spacing, editorial layouts |

**Guidelines**
1. **Typography**: Reduce heading size by one step below `sm` to avoid overflow.
2. **Spacing**: Use `gap-y-8` for stacked sections on mobile; introduce horizontal spacing at `md`.
3. **Images**: Prefer `aspect-[4/5]` or `aspect-video` with `object-cover`; add `rounded-none sm:rounded-lg` for subtle refinement.
4. **Buttons**: Minimum height 48px; use `w-full sm:w-auto` for hero CTAs.
5. **Grids**: Start with single column; promote to two at `sm`, three at `lg`. Maintain `gap-4` mobile, `gap-6` desktop.
6. **Animations**: Keep motion subtle on mobile (`duration-300`), allow longer sequences (`duration-700`) on desktop.
7. **Testing**: Validate layouts at 360px, 768px, and 1280px before merging.

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement
- Graceful degradation for older browsers
