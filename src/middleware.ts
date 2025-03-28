import { NextResponse, type NextRequest } from 'next/server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'

// List of public paths that don't require authentication
const PUBLIC_PATHS = ['/', '/login', '/register', '/auth/callback', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  try {
    // Create Supabase server client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options })
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options })
            response.cookies.set({ name, value: '', ...options })
          }
        }
      }
    )

    // Get session
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()

    // Handle potential errors

    if (error) {
      console.error('Middleware auth error:', error)

      // Clear invalid session
      response.cookies.set({
        name: 'sb-access-token',
        value: '',
        expires: new Date(0),
        path: '/'
      })
      response.cookies.set({
        name: 'sb-refresh-token',
        value: '',
        expires: new Date(0),
        path: '/'
      })
    }

    const isPublicPath = PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path))

    // Redirect authenticated users away from auth pages
    if (session && isPublicPath && !request.nextUrl.pathname.startsWith('/auth/callback')) {
      return NextResponse.redirect(new URL('/home', request.url))
    }

    // Redirect unauthenticated users trying to access protected routes

    if (!session && !isPublicPath) {
      // Store the attempted URL for redirect after login
      const loginUrl = new URL('/login', request.url)

      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)

      return NextResponse.redirect(loginUrl)
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)

    // Fallback response in case of errors
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     * - public assets (images, fonts, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images|fonts).*)'
  ]
}
