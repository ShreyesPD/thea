import { createClient } from '@/lib/supabase/server'

export default async function LookbookPage() {
  const supabase = await createClient()
  
  const { data: collections } = await supabase
    .from('lookbook_collections')
    .select('*')
    .order('year', { ascending: false })
    .order('created_at', { ascending: false })

  return (
    <div className="pt-16 md:pt-20">
      <section className="relative h-[60vh] flex items-center justify-center bg-charcoal/5">
        <div className="text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl mb-4 animate-fade-in">
            Lookbook
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto">
            A visual journey through our collections
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {collections && collections.length > 0 ? (
          <div className="space-y-24">
            {collections.map((collection, index) => (
              <div key={collection.id} className="animate-slide-up">
                <div className="mb-8">
                  <div className="flex items-baseline gap-4 mb-2">
                    <h2 className="font-serif text-3xl md:text-4xl">{collection.title}</h2>
                    {collection.season && collection.year && (
                      <span className="text-charcoal/60">
                        {collection.season} {collection.year}
                      </span>
                    )}
                  </div>
                  {collection.description && (
                    <p className="text-charcoal/70 max-w-2xl">{collection.description}</p>
                  )}
                </div>

                {collection.images && collection.images.length > 0 && (
                  <div className={`grid gap-4 ${
                    index % 2 === 0 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1 md:grid-cols-3'
                  }`}>
                    {collection.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`relative overflow-hidden bg-charcoal/5 ${
                          index % 2 === 0 && imgIndex === 0
                            ? 'md:col-span-2 md:row-span-2 aspect-[4/5]'
                            : imgIndex === 0
                            ? 'md:row-span-2 aspect-[3/4]'
                            : 'aspect-square'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${collection.title} ${imgIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-charcoal/70 mb-8">
              Our lookbook collections are coming soon. Stay tuned for visual inspiration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="aspect-[3/4] bg-charcoal/5" />
              <div className="aspect-[3/4] bg-charcoal/5" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
