import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    return NextResponse.json(influencers)
  } catch (error) {
    console.error('Error fetching pending influencers:', error)
    return NextResponse.json(
      { error: 'Error al obtener influencers pendientes' },
      { status: 500 }
    )
  }
}

