import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Público: solo devuelve cantidades para diagnosticar si los datos se guardan en la base.
export async function GET() {
  try {
    const [pending, approved] = await Promise.all([
      prisma.influencer.count({ where: { status: 'PENDING' } }),
      prisma.influencer.count({ where: { status: 'APPROVED' } }),
    ])
    return NextResponse.json({ pending, approved })
  } catch (error) {
    console.error('Error counting influencers:', error)
    return NextResponse.json(
      { error: 'Error al contar', pending: 0, approved: 0 },
      { status: 500 }
    )
  }
}
