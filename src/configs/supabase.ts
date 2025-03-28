import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // Force the site URL to be the production URL for auth redirects
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://scriptor-kappa.vercel.app'
      : typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000')

  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true
    },
    global: {
      headers: {
        'x-site-url': siteUrl
      }
    }
  })
}
