export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Obtener filtros de los query params
    const niche = searchParams.get('niche')
    const department = searchParams.get('department')
    const ageMin = searchParams.get('ageMin')
    const ageMax = searchParams.get('ageMax')
    const followersMin = searchParams.get('followersMin')
    const followersMax = searchParams.get('followersMax')
    const engagementMin = searchParams.get('engagementMin')
    const engagementMax = searchParams.get('engagementMax')
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

    if (department) {
      where.department = department
    }

    if (ageMin || ageMax) {
      where.age = {}
      const aMin = parseInt(ageMin || '', 10)
      const aMax = parseInt(ageMax || '', 10)
      if (ageMin && !Number.isNaN(aMin)) where.age.gte = aMin
      if (ageMax && !Number.isNaN(aMax)) where.age.lte = aMax
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

    if (followersMin || followersMax) {
      platformWhere.followers = {}
      const fMin = parseInt(followersMin || '', 10)
      const fMax = parseInt(followersMax || '', 10)
      if (followersMin && !Number.isNaN(fMin)) platformWhere.followers.gte = fMin
      if (followersMax && !Number.isNaN(fMax)) platformWhere.followers.lte = fMax
    }

    if (engagementMin || engagementMax) {
      platformWhere.engagementRate = {}
      const eMin = parseFloat(engagementMin || '')
      const eMax = parseFloat(engagementMax || '')
      if (engagementMin && !Number.isNaN(eMin)) platformWhere.engagementRate.gte = eMin
      if (engagementMax && !Number.isNaN(eMax)) platformWhere.engagementRate.lte = eMax
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

