import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Solo protegemos las APIs de admin con cookie. La página /admin siempre carga.
const adminSecret = process.env.ADMIN_PASSWORD

function isAdminAuthenticated(request: NextRequest): boolean {
  if (!adminSecret) return true
  const cookie = request.cookies.get('admin_session')?.value
  return cookie === adminSecret
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isPendingApi = pathname === '/api/influencers/pending'
  const isApproveApi = /^\/api\/influencers\/[^/]+\/approve$/.test(pathname)
  const isDeleteInfluencer =
    request.method === 'DELETE' && /^\/api\/influencers\/[^/]+$/.test(pathname)

  if (isPendingApi || isApproveApi || isDeleteInfluencer) {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/influencers/pending', '/api/influencers/:id/approve', '/api/influencers/:id'],
}
