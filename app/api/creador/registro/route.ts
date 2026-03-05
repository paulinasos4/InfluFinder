import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      photo,
      bio,
      niche,
      department,
      age,
      audienceGender,
      audienceAgeRange,
      hasProfessionalTeam,
      influencerType,
      collaborationTypes,
      platforms,
    } = body

    // Validaciones básicas
    if (!name || !email || !niche || !department) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    if (!platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Debe agregar al menos una plataforma' },
        { status: 400 }
      )
    }

    const collab = Array.isArray(collaborationTypes) ? collaborationTypes : []
    if (collab.length === 0) {
      return NextResponse.json(
        { error: 'Debe seleccionar al menos un tipo de colaboración' },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const existingInfluencer = await prisma.influencer.findUnique({
      where: { email }
    })

    if (existingInfluencer) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 400 }
      )
    }

    // Crear el influencer con estado PENDING
    // No enviamos profileUrl para compatibilidad con bases que aún no tienen esa columna (ej. producción)
    const platformCreate = platforms.map((p: any) => ({
      platform: p.platform,
      username: p.username,
      followers: p.followers,
      engagementRate: p.engagementRate,
    }))

    const influencer = await prisma.influencer.create({
      data: {
        name,
        email,
        phone: phone || null,
        photo: photo || null,
        bio: bio || null,
        niche,
        department,
        age: age ? parseInt(age) : null,
        audienceGender: audienceGender || null,
        audienceAgeRange: audienceAgeRange || null,
        hasProfessionalTeam: hasProfessionalTeam || false,
        influencerType: influencerType || null,
        collaborations: collab,
        status: 'PENDING',
        platforms: { create: platformCreate }
      },
      include: { platforms: true }
    })

    return NextResponse.json(
      { 
        message: 'Registro exitoso. Tu perfil está pendiente de aprobación.',
        influencer 
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating influencer:', error)
    let message = 'Error al registrar. Intenta nuevamente.'
    if (error?.message) {
      if (error.message.includes('Unique constraint') || error.message.includes('unique')) {
        message = 'Este email ya está registrado.'
      } else if (error.message.includes('connect') || error.message.includes('database')) {
        message = 'Error de conexión con la base de datos. Revisá la configuración en producción.'
      } else {
        message = error.message
      }
    }
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

