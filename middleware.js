import { NextResponse } from 'next/server'

export function middleware(req) {
  if(req.nextUrl.pathname === '/games') return NextResponse.next();

  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'adam' && pwd === process.env.PASSWORD) {
      return NextResponse.next()
    }
  }
  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}