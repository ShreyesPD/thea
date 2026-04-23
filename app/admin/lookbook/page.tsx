import { Plus, ImageOff, Trash2, Edit } from 'lucide-react'

import { requireAdmin } from '../_lib/auth'
import TableShell from '@/components/admin/tables/TableShell'
import SearchToolbar from '@/components/admin/SearchToolbar'
import FormModal from '@/components/admin/FormModal'
import { createCollection, updateCollection, deleteCollection } from './actions'

interface LookbookPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function LookbookPage({ searchParams }: LookbookPageProps) {
  const { supabase } = await requireAdmin()

  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : ''
  const seasonFilter = typeof resolvedSearchParams?.season === 'string' ? resolvedSearchParams.season : ''

  let collectionsQuery = supabase
    .from('lookbook_collections')
    .select('*')
    .order('created_at', { ascending: false })

  if (query) {
    const likeQuery = `%${query}%`
    collectionsQuery = collectionsQuery.or(`title.ilike.${likeQuery},description.ilike.${likeQuery},season.ilike.${likeQuery}`)
  }

  if (seasonFilter) {
    collectionsQuery = collectionsQuery.eq('season', seasonFilter)
  }

  const { data: collections } = await collectionsQuery
  const seasons = Array.from(new Set(collections?.map((collection) => collection.season).filter(Boolean))).sort()

  return (
    <div className="space-y-8">
      <TableShell
        title="Lookbook"
        description="Keep campaigns curated and cohesive across seasons."
        action={
          <FormModal
            title="Add collection"
            description="Upload imagery, season, and notes."
            trigger={
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-charcoal px-4 py-2 text-sm text-ivory shadow hover:bg-charcoal/90"
              >
                <Plus className="h-4 w-4" />
                New collection
              </button>
            }
          >
            <form action={createCollection} className="space-y-4">
              <label className="text-sm block">
                Title
                <input name="title" required className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm">
                  Season
                  <input name="season" className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  Year
                  <input name="year" type="number" min="2000" max="2100" className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" />
                </label>
              </div>
              <label className="text-sm block">
                Description
                <textarea name="description" rows={3} className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" />
              </label>
              <label className="text-sm block">
                Images (comma separated URLs)
                <textarea name="images" rows={2} className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm" />
              </label>
              <div className="flex justify-end gap-3">
                <button type="reset" className="rounded-xl border border-charcoal/20 px-4 py-2 text-sm text-charcoal/70">Reset</button>
                <button type="submit" className="rounded-xl bg-charcoal px-4 py-2 text-sm text-ivory">Save collection</button>
              </div>
            </form>
          </FormModal>
        }
        toolbar={
          <SearchToolbar
            placeholder="Search by title or season"
            searchKey="q"
            filterKey="season"
            clearLabel="All seasons"
            filters={seasons.map((season) => ({ label: season, value: season }))}
          />
        }
      >
        {collections && collections.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((collection) => (
              <div key={collection.id} className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <div className="aspect-video overflow-hidden rounded-t-3xl bg-charcoal/5">
                  {collection.images?.[0] ? (
                    <img src={collection.images[0]} alt={collection.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-charcoal/40">
                      <ImageOff className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">{collection.season || 'Seasonless'}</p>
                      <h3 className="font-serif text-2xl">{collection.title}</h3>
                      {collection.year && <p className="text-sm text-charcoal/60">{collection.year}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <FormModal
                        title={`Edit ${collection.title}`}
                        trigger={
                          <button
                            type="button"
                            className="rounded-full p-2 text-charcoal/70 hover:bg-charcoal/10"
                            aria-label={`Edit ${collection.title}`}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        }
                      >
                        <form action={updateCollection} className="space-y-4">
                          <input type="hidden" name="id" value={collection.id} />
                          <label className="text-sm block">
                            Title
                            <input
                              name="title"
                              defaultValue={collection.title}
                              className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm"
                            />
                          </label>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <label className="text-sm">
                              Season
                              <input
                                name="season"
                                defaultValue={collection.season ?? ''}
                                className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm"
                              />
                            </label>
                            <label className="text-sm">
                              Year
                              <input
                                name="year"
                                type="number"
                                defaultValue={collection.year ?? ''}
                                className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm"
                              />
                            </label>
                          </div>
                          <label className="text-sm block">
                            Description
                            <textarea
                              name="description"
                              rows={3}
                              defaultValue={collection.description ?? ''}
                              className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm"
                            />
                          </label>
                          <label className="text-sm block">
                            Images (comma separated URLs)
                            <textarea
                              name="images"
                              rows={2}
                              defaultValue={collection.images?.join(', ') ?? ''}
                              className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 text-sm"
                            />
                          </label>
                          <div className="flex justify-end gap-3">
                            <button type="submit" className="rounded-xl bg-charcoal px-4 py-2 text-sm text-ivory">
                              Save
                            </button>
                          </div>
                        </form>
                      </FormModal>
                      <form action={deleteCollection}>
                        <input type="hidden" name="id" value={collection.id} />
                        <button
                          type="submit"
                          className="rounded-full p-2 text-rose hover:bg-rose/10"
                          aria-label={`Delete ${collection.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal/70 line-clamp-3">{collection.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-charcoal/20 py-16 text-center">
            <p className="text-charcoal/60">No collections yet.</p>
            <p className="text-sm text-charcoal/50">Use the button above to upload your first story.</p>
          </div>
        )}
      </TableShell>
    </div>
  )
}
