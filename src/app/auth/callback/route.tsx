import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'

// We'll implement our own server-side redirect logic

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          }
        }
      }
    )

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Determine the appropriate redirect URL based on environment and request
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  console.log('Using redirect URL:', siteUrl) // For debugging

  return NextResponse.redirect(`${siteUrl}/home`)
}
