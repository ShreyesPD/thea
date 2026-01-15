import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/layout/ClientLayout"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Thea Fashion Boutique - Contemporary Fashion",
  description: "Premium fashion boutique featuring curated collections. Discover elegant, timeless pieces for the modern wardrobe.",
  icons: {
    icon: "/thea-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-ivory text-charcoal">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
