import Link from 'next/link'
import { Instagram, MapPin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl mb-4">THEA</h3>
            <p className="text-ivory/70 text-sm leading-relaxed max-w-md">
              Contemporary fashion that celebrates individuality and timeless elegance. 
              Crafted with care, designed for those who appreciate quality.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-ivory/70 hover:text-gold transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="text-ivory/70 hover:text-gold transition-colors">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ivory/70 hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ivory/70 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="font-medium mb-4 tracking-wide">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/thea_label_?igsh=MXhqa25nZWx1aGpxNg=="
                  className="text-ivory/70 hover:text-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Thea on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://maps.app.goo.gl/7L27gz732bzw1Qva8"
                  className="text-ivory/70 hover:text-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find Thea boutique on Google Maps"
                >
                  <MapPin className="w-5 h-5" />
                </a>
                <a href="mailto:hello@thea.com" className="text-ivory/70 hover:text-gold transition-colors" aria-label="Email Thea">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4 tracking-wide">Visit Us</h4>
              <p className="text-sm text-ivory/70 leading-relaxed">
                Experience our atelier in person. Book a styling session or drop by our boutique for a private fitting.
              </p>
              <a
                href="https://maps.app.goo.gl/7L27gz732bzw1Qva8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-gold hover:text-ivory transition-colors"
              >
                <MapPin className="w-4 h-4" />
                View boutique on Maps
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/10 mt-12 pt-8 text-center text-sm text-ivory/50">
          <p>&copy; {new Date().getFullYear()} Thea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
