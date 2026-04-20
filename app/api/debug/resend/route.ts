import { NextResponse } from 'next/server'

/** Solo en desarrollo: comprobá si Next carga RESEND_API_KEY (sin mostrar la clave). */
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'No disponible' }, { status: 404 })
  }

  const raw = process.env.RESEND_API_KEY ?? ''
  const key = raw.trim().replace(/^["']|["']$/g, '')

  return NextResponse.json({
    resendKeyConfigured: key.length > 0,
    startsWithRe: key.startsWith('re_'),
    emailFrom: process.env.EMAIL_FROM?.trim() || '(por defecto: Influ Finder <onboarding@resend.dev>)',
    hint:
      'Si resendKeyConfigured es false, la clave no está en .env.local o no reiniciaste npm run dev desde la raíz del proyecto.',
  })
}
