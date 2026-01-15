# Thea - Premium Fashion E-Commerce Platform

A modern, full-featured e-commerce website for a contemporary fashion brand, built with Next.js 15, Supabase, and Tailwind CSS.

## Features

### 🛍️ E-Commerce Functionality
- Product catalog with filtering and sorting
- Product detail pages with image galleries
- Shopping cart with persistent state
- Secure checkout process
- Order management and history

### 👥 User Roles
- **Guest Users**: Browse products, lookbook, and content
- **Customers**: Place orders, view order history, manage profile
- **Admins**: Full dashboard with product, order, and content management

### 🎨 Design
- Premium, editorial-style design
- Fully responsive layout
- Smooth animations and transitions
- Modern UI with Tailwind CSS
- Custom color palette (ivory, charcoal, gold accents)

### 🔐 Authentication & Security
- Supabase Auth for secure login/signup
- Row Level Security (RLS) policies
- Role-based access control
- Protected admin routes

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif), Inter (sans-serif)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd thea
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase database**
- Create a new Supabase project
- Run the migration file in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor
- This will create all necessary tables, RLS policies, and triggers

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Schema

### Tables
- **users**: User profiles with roles (customer/admin)
- **products**: Product catalog with images, pricing, and inventory
- **orders**: Customer orders with status tracking
- **order_items**: Individual items within orders
- **enquiries**: Customer contact form submissions
- **lookbook_collections**: Editorial lookbook content

### Security
All tables have Row Level Security (RLS) enabled with appropriate policies for each user role.

## Project Structure

```
thea/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── account/           # Customer account pages
│   ├── shop/              # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   └── ...                # Other pages
├── components/            # Reusable components
│   ├── layout/           # Header, Footer
│   └── products/         # Product components
├── lib/                   # Utilities and helpers
│   ├── supabase/         # Supabase clients
│   ├── store/            # Zustand stores
│   └── types/            # TypeScript types
└── supabase/             # Database migrations
```

## Key Features Implementation

### Shopping Cart
- Persistent cart using Zustand with localStorage
- Add/remove items with size selection
- Quantity management
- Real-time total calculation

### Admin Dashboard
- Product CRUD operations
- Order management with status updates
- Customer enquiry management
- Lookbook collection management
- Low stock alerts
- Sales metrics

### Authentication Flow
- Secure signup/login with Supabase Auth
- Automatic user profile creation via database triggers
- Role-based redirects (admin → dashboard, customer → account)
- Protected routes with middleware

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  ivory: '#FAF9F6',
  charcoal: '#2B2B2B',
  gold: '#C9A86A',
  rose: '#D4A5A5',
  earth: '#8B7355',
}
```

### Fonts
Fonts are configured in `app/layout.tsx`. Current setup uses:
- Playfair Display (headings)
- Inter (body text)

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Future Enhancements

- [ ] Stripe payment integration
- [ ] Email notifications (order confirmations, shipping updates)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Multi-currency support
- [ ] Newsletter subscription
- [ ] Size guide
- [ ] Product recommendations

## Admin Setup

To create an admin user:
1. Sign up normally through the website
2. In Supabase, go to Table Editor → users
3. Find your user and change `role` from `customer` to `admin`
4. Log out and log back in to access admin dashboard

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.