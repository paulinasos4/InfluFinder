import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user, password } = body

    const adminUser = process.env.ADMIN_USER
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminUser || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin no configurado. Agrega ADMIN_USER y ADMIN_PASSWORD en .env' },
        { status: 500 }
      )
    }

    if (user === adminUser && password === adminPassword) {
      const res = NextResponse.json({ success: true })
      res.cookies.set('admin_session', adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 horas
        path: '/',
      })
      return res
    }

    return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Error en el login' }, { status: 500 })
  }
}
