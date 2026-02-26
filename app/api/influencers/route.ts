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
      if (ageMin) where.age.gte = parseInt(ageMin)
      if (ageMax) where.age.lte = parseInt(ageMax)
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
      if (followersMin) platformWhere.followers.gte = parseInt(followersMin)
      if (followersMax) platformWhere.followers.lte = parseInt(followersMax)
    }

    if (engagementMin || engagementMax) {
      platformWhere.engagementRate = {}
      if (engagementMin) platformWhere.engagementRate.gte = parseFloat(engagementMin)
      if (engagementMax) platformWhere.engagementRate.lte = parseFloat(engagementMax)
    }

    // Buscar influencers con filtros
    const influencers = await prisma.influencer.findMany({
      where,
      include: {
        platforms: {
          where: Object.keys(platformWhere).length > 0 ? platformWhere : undefined
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
  } catch (error) {
    console.error('Error fetching influencers:', error)
    return NextResponse.json(
      { error: 'Error al obtener influencers' },
      { status: 500 }
    )
  }
}

