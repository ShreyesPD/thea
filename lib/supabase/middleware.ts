import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type SupabaseCookie = {
  name: string
  value: string
  options?: Parameters<NextResponse['cookies']['set']>[2]
}

export async function updateSession(request: NextRequest) {
  const isServerActionRequest = request.headers.has('next-action')
  const isNonGetRequest = request.method !== 'GET'

  if (isServerActionRequest || isNonGetRequest) {
    return NextResponse.next()
  }

  const pendingCookies: SupabaseCookie[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          pendingCookies.push(...cookiesToSet)
        },
      },
    }
  )

  const applyPendingCookies = (response: NextResponse) => {
    pendingCookies.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options)
    })
    return response
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/signup') &&
    (request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.startsWith('/account'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return applyPendingCookies(NextResponse.redirect(url))
  }

  if (user && request.nextUrl.pathname.startsWith('/admin')) {
    const { data: profile, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    console.log('middleware admin guard', {
      pathname: request.nextUrl.pathname,
      user,
      profile,
      error,
    })

    if (profile?.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return applyPendingCookies(NextResponse.redirect(url))
    }
  }

  return applyPendingCookies(
    NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  )
}
