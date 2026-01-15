import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/products/ProductCard";

export default async function Home() {
  const supabase = await createClient();

  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .limit(4)
    .order("created_at", { ascending: false });

  return (
    <div className="pt-16 md:pt-20">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/5 to-gold/10" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wide">
            Thea
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 mb-8 max-w-2xl mx-auto whitespace-normal sm:whitespace-nowrap">
            An customizable fashion brand which lets you choose & create your own bold designs.
          </p>
          <p className="text-lg md:text-xl text-charcoal/70 mb-8 max-w-2xl mx-auto">
            Designing & stiching all at one stop
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 bg-charcoal text-ivory hover:bg-charcoal/90 transition-all group"
            >
              Shop Collection
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/lookbook"
              className="inline-flex items-center justify-center px-8 py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-all"
            >
              View Lookbook
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Our Philosophy
            </h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              We believe in creating pieces that stand the test of time. Each
              garment is thoughtfully designed to blend modern aesthetics with
              timeless craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-serif text-xl mb-2">Quality First</h3>
              <p className="text-sm text-charcoal/70">
                Premium materials and meticulous attention to detail in every
                piece
              </p>
            </div>

            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-serif text-xl mb-2">Sustainable</h3>
              <p className="text-sm text-charcoal/70">
                Committed to ethical practices and environmental responsibility
              </p>
            </div>

            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="font-serif text-xl mb-2">Timeless Design</h3>
              <p className="text-sm text-charcoal/70">
                Classic silhouettes with contemporary touches that never go out
                of style
              </p>
            </div>
          </div>
        </div>
      </section>

      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 px-4 bg-charcoal/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Featured Collection
              </h2>
              <p className="text-charcoal/70">Discover our latest arrivals</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-all group"
              >
                View All Products
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
