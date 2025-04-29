import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });
  // console.log('supabaseResponse', supabaseResponse);
  // await supabase.auth.getUser();
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/signup'
  ) {
    return supabaseResponse;
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('User not logged in, redirecting to login page...');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}
