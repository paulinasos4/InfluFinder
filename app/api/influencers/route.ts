export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Obtener filtros de los query params
    const niche = searchParams.get('niche')
    const audienceCity = searchParams.get('audienceCity')
    const audienceAgeRange = searchParams.get('audienceAgeRange')
    const audienceGender = searchParams.get('audienceGender')
    const platforms = searchParams.get('platforms')?.split(',') || []
    const collaborationType = searchParams.get('collaborationType')

    // Construir filtros para Prisma
    // Directorio público: solo influencers aprobados
    const where: any = {
      status: 'APPROVED',
    }

    if (niche) {
      where.niche = niche
    }

    if (audienceCity) {
      // Por ahora mapea a departamento del creador hasta tener ciudad de audiencia separada.
      where.department = audienceCity
    }

    if (audienceAgeRange) {
      where.audienceAgeRange = audienceAgeRange
    }

    if (audienceGender) {
      where.audienceGender = audienceGender
    }

    if (collaborationType) {
      where.collaborations = {
        has: collaborationType
      }
    }

    // Filtros para plataformas
    const platformWhere: any = {}
    if (platforms.length > 0) {
      platformWhere.platform = {
        in: platforms
      }
    }

    // Buscar influencers con filtros (select explícito de platforms para compatibilidad si falta columna profileUrl en prod)
    const influencers = await prisma.influencer.findMany({
      where,
      include: {
        platforms: {
          where: Object.keys(platformWhere).length > 0 ? platformWhere : undefined,
          select: {
            id: true,
            platform: true,
            username: true,
            followers: true,
            engagementRate: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Filtrar influencers que tengan al menos una plataforma que cumpla los criterios
    const filteredInfluencers = influencers.filter(influencer => {
      if (platforms.length > 0 && influencer.platforms.length === 0) {
        return false
      }
      return true
    })

    return NextResponse.json(filteredInfluencers)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error al obtener influencers'
    console.error('Error fetching influencers:', error)
    return NextResponse.json(
      { error: 'Error al obtener influencers', detail: message },
      { status: 500 }
    )
  }
}

