import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const influencers = await prisma.influencer.findMany({
      where: {
        status: 'PENDING'
      },
      include: {
        platforms: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(influencers, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    })
  } catch (error) {
    console.error('Error fetching pending influencers:', error)
    return NextResponse.json(
      { error: 'Error al obtener influencers pendientes' },
      { status: 500 }
    )
  }
}

