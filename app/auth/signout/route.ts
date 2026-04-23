import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

async function handleSignOut(request: Request) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  const redirectUrl = new URL('/', request.url)

  if (error) {
    redirectUrl.searchParams.set('error', 'signout')
  }

  return NextResponse.redirect(redirectUrl, { status: 302 })
}

export async function POST(request: Request) {
  return handleSignOut(request)
}

export async function GET(request: Request) {
  return handleSignOut(request)
}
