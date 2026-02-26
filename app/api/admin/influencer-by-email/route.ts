import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: buscar influencer por email (para ver estado y recuperar)
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')?.trim()
    if (!email) {
      return NextResponse.json({ error: 'Falta el email' }, { status: 400 })
    }

    const influencer = await prisma.influencer.findUnique({
      where: { email },
      include: { platforms: true },
    })

    if (!influencer) {
      return NextResponse.json({ found: false })
    }

    return NextResponse.json({
      found: true,
      id: influencer.id,
      name: influencer.name,
      email: influencer.email,
      status: influencer.status,
    })
  } catch (error) {
    console.error('Error finding influencer by email:', error)
    return NextResponse.json({ error: 'Error al buscar' }, { status: 500 })
  }
}

// PATCH: poner de nuevo en pendientes (para que aparezca en la lista)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const email = body.email?.trim()
    if (!email) {
      return NextResponse.json({ error: 'Falta el email' }, { status: 400 })
    }

    const influencer = await prisma.influencer.updateMany({
      where: { email },
      data: { status: 'PENDING' },
    })

    if (influencer.count === 0) {
      return NextResponse.json({ error: 'No se encontró ese email' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Perfil pasado a pendientes' })
  } catch (error) {
    console.error('Error updating influencer:', error)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
