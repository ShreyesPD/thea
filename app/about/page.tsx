import Image from "next/image";
import { Instagram, MapPin, ArrowUpRight } from "lucide-react";

type InstagramPost = {
  id: number;
  url: string;
  image: string;
  caption: string;
};

const instagramPosts: InstagramPost[] = [
  {
    id: 0,
    url: "https://www.instagram.com/p/C7qUd9Lv_xW/?igsh=MTRvOGdzdmpnNDBoNw==",
    image: "https://www.instagram.com/p/C7qUd9Lv_xW/media?size=l",
    caption: "Handcrafted mirror-work bodice fresh from the atelier",
  },
  {
    id: 1,
    url: "https://www.instagram.com/p/DRwd6kCkh3A/?igsh=MWxuZHJxNnEzamc3dg==",
    image: "https://www.instagram.com/p/DRwd6kCkh3A/media?size=l",
    caption: "Pure jade hues inside the atelier",
  },
  {
    id: 2,
    url: "https://www.instagram.com/p/DJw96y-z730/?igsh=MXU5cXJvdG5saG8ycw==",
    image: "https://www.instagram.com/p/DJw96y-z730/media?size=l",
    caption: "Editorial shoot in the monsoon garden",
  },
  {
    id: 3,
    url: "https://www.instagram.com/p/DDL27ViieKU/?igsh=d290NGhqNzR1aTV2",
    image: "https://www.instagram.com/p/DDL27ViieKU/media?size=l",
    caption: "Silk storyboards pinned for fittings",
  },
  {
    id: 4,
    url: "https://www.instagram.com/p/C7vasPOyvHC/?igsh=MXE1d2VjZHBrNjQ1aQ==",
    image: "https://www.instagram.com/p/C7vasPOyvHC/media?size=l",
    caption: "Twin drapes from the Noir capsule",
  },
  {
    id: 5,
    url: "https://www.instagram.com/p/C7lN0AioGlm/?igsh=MXY4c2pwd3Y2cDA3cw==",
    image: "https://www.instagram.com/p/C7lN0AioGlm/media?size=l",
    caption: "Hand-painted silk ready for dispatch",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-br from-charcoal/5 to-gold/10">
        <div className="text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl mb-6 animate-fade-in">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70">
            Where timeless elegance meets contemporary design
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="prose prose-lg max-w-none">
          <div className="mb-16 animate-slide-up">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              The Beginning
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-4">
              Thea was born from a simple belief: fashion should be both
              beautiful and meaningful. Founded with a vision to create pieces
              that transcend fleeting trends, we've built a brand that
              celebrates individuality while honoring timeless craftsmanship.
            </p>
            <p className="text-charcoal/80 leading-relaxed">
              Every garment tells a story—of skilled artisans, carefully sourced
              materials, and a commitment to quality that you can see and feel.
              We believe that true style is not about following trends, but
              about finding pieces that resonate with who you are.
            </p>
          </div>

          <div
            className="mb-16 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Our Values</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-3">Craftsmanship</h3>
                <p className="text-charcoal/80 leading-relaxed">
                  We partner with skilled artisans who share our passion for
                  excellence. Each piece is crafted with meticulous attention to
                  detail, ensuring that every stitch, seam, and finish meets our
                  exacting standards.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Sustainability</h3>
                <p className="text-charcoal/80 leading-relaxed">
                  Fashion should never come at the cost of our planet. We're
                  committed to sustainable practices, from sourcing eco-friendly
                  materials to ensuring ethical production processes throughout
                  our supply chain.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Timeless Design</h3>
                <p className="text-charcoal/80 leading-relaxed">
                  We create pieces designed to last—not just in quality, but in
                  style. Our collections feature classic silhouettes with modern
                  touches, ensuring they remain relevant season after season,
                  year after year.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Individuality</h3>
                <p className="text-charcoal/80 leading-relaxed">
                  We celebrate the unique beauty of every individual. Our
                  designs are versatile enough to complement your personal style
                  while being distinctive enough to make a statement.
                </p>
              </div>
            </div>
          </div>

          <div
            className="mb-16 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Looking Forward
            </h2>
            <p className="text-charcoal/80 leading-relaxed mb-4">
              As we continue to grow, our commitment remains unchanged: to
              create beautiful, sustainable fashion that empowers you to express
              your authentic self. We're not just building a brand—we're
              cultivating a community of individuals who value quality,
              craftsmanship, and conscious consumption.
            </p>
            <p className="text-charcoal/80 leading-relaxed">
              Thank you for being part of our journey. Together, we're
              redefining what it means to dress with intention and style.
            </p>
          </div>

          <div
            className="mb-20 grid gap-8 lg:grid-cols-2 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Instagram preview */}
            <div className="relative overflow-hidden bg-gradient-to-br from-charcoal/5 via-ivory to-gold/10 border border-charcoal/10">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(201, 168, 106, 0.2), transparent 60%)",
                }}
              />
              <div className="relative p-6 md:p-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-charcoal/50">
                      Instagram
                    </p>
                    <h3 className="font-serif text-2xl mt-2">@thea_label_</h3>
                  </div>
                  <a
                    href="https://www.instagram.com/thea_label_?igsh=MXhqa25nZWx1aGpxNg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-charcoal/70 hover:text-gold transition-colors"
                  >
                    Follow
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {instagramPosts.map((post) => (
                    <a
                      key={post.id}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold"
                      aria-label={post.caption}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden border border-charcoal/10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-transparent">
                        <Image
                          src={post.image}
                          alt={post.caption}
                          fill
                          sizes="(min-width: 1024px) 33vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-ivory text-xs uppercase tracking-[0.3em]">
                          <span>View Post</span>
                          <Instagram className="w-4 h-4" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <p className="text-sm text-charcoal/60 mt-6 leading-relaxed">
                  A glimpse into our world—behind-the-scenes tailoring, atelier
                  fittings, and the women who bring Thea to life.
                </p>
              </div>
            </div>

            {/* Location preview */}
            <div className="relative overflow-hidden bg-charcoal text-ivory">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%)",
                }}
              />
              <div className="relative p-6 md:p-10 h-full flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-ivory/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-ivory/60">
                      Boutique
                    </p>
                    {/* <h3 className="font-serif text-2xl mt-1">Visit The Atelier</h3> */}
                  </div>
                </div>
                {/* <p className="text-ivory/80 leading-relaxed">
                  Discover the atelier tucked inside Porvorim—surrounded by lush hillside views yet moments away from the city pulse.
                </p> */}
                <div className="relative rounded-xl overflow-hidden border border-ivory/10 shadow-2xl">
                  <iframe
                    src="https://maps.google.com/maps?width=600&height=450&hl=en&q=Thea%20Label%20Porvorim+(Thea%20Label)&t=k&z=18&ie=UTF8&iwloc=B&output=embed"
                    className="w-full h-[320px] md:h-[360px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Thea boutique satellite map"
                  />
                </div>
                {/* <div className="flex flex-col gap-1 text-sm text-ivory/80">
                  <p className="uppercase tracking-[0.3em] text-xs text-ivory/60">
                    Hours
                  </p>
                  <p className="font-serif text-lg">Tuesday – Sunday · 11am to 7pm</p>
                </div> */}
                <a
                  href="https://maps.app.goo.gl/7L27gz732bzw1Qva8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gold hover:text-ivory transition-colors"
                >
                  Open full map
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div
            className="text-center py-12 border-t border-charcoal/10 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="font-serif text-2xl mb-2">Join Us</p>
            <p className="text-charcoal/70 mb-6">
              Experience the Thea difference for yourself
            </p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 bg-charcoal text-ivory hover:bg-charcoal/90 transition-all"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
