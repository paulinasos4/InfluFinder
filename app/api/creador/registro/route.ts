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

    const photoStr = typeof photo === 'string' ? photo.trim() : ''
    if (photoStr.startsWith('data:image/')) {
      // ~5 MB binario en base64 ≈ 6,9 M caracteres
      const maxLen = 7_200_000
      if (photoStr.length > maxLen) {
        return NextResponse.json(
          { error: 'La imagen es demasiado grande (máx. 5 MB). Comprimila o configurá almacenamiento Blob.' },
          { status: 400 }
        )
      }
      const base64part = photoStr.split(',')[1]
      if (!base64part || base64part.length < 50) {
        return NextResponse.json({ error: 'Imagen inválida' }, { status: 400 })
      }
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

    const requiredInt = (v: unknown): number => {
      if (v === null || v === undefined || v === '') return 0
      const n = typeof v === 'number' && Number.isFinite(v) ? Math.floor(v) : parseInt(String(v).replace(/\D/g, ''), 10)
      return Number.isFinite(n) ? n : 0
    }

    const followersInt = (v: unknown): number => {
      if (typeof v === 'number' && Number.isFinite(v)) return Math.max(0, Math.floor(v))
      const n = parseInt(String(v).replace(/\D/g, ''), 10)
      return Number.isFinite(n) ? n : 0
    }

    const engagementFloat = (v: unknown): number => {
      if (typeof v === 'number' && Number.isFinite(v)) return v
      const n = parseFloat(String(v).trim().replace(/\s/g, '').replace(',', '.'))
      return Number.isFinite(n) ? n : 0
    }

    const allowedPlatforms = new Set(['INSTAGRAM', 'TIKTOK', 'FACEBOOK', 'YOUTUBE'])

    const platformCreate = platforms.map((p: any) => ({
      platform: p.platform,
      username: String(p.username || '').trim(),
      profileUrl: p.profileUrl || null,
      followers: followersInt(p.followers),
      engagementRate: engagementFloat(p.engagementRate),
      impressions: requiredInt(p.impressions),
      interactions: requiredInt(p.interactions),
      newFollowers30: requiredInt(p.newFollowers30),
      avgReelViews: requiredInt(p.avgReelViews),
      avgStoryViews: requiredInt(p.avgStoryViews),
      avgPostReach: requiredInt(p.avgPostReach),
      profileVisits: requiredInt(p.profileVisits),
    }))

    for (const row of platformCreate) {
      if (!row.username) {
        return NextResponse.json({ error: 'Cada plataforma necesita un usuario o @' }, { status: 400 })
      }
      if (!allowedPlatforms.has(String(row.platform))) {
        return NextResponse.json({ error: 'Tipo de plataforma no válido' }, { status: 400 })
      }
      if (row.followers < 1) {
        return NextResponse.json(
          { error: 'La cantidad de seguidores debe ser un número mayor a 0 en cada plataforma' },
          { status: 400 }
        )
      }
      if (row.engagementRate < 0) {
        return NextResponse.json({ error: 'El engagement debe ser un número válido (0 o mayor)' }, { status: 400 })
      }
    }

    const influencer = await prisma.influencer.create({
      data: {
        name,
        email,
        phone: phone || null,
        photo: photoStr ? photoStr : null,
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
    const code = error?.code as string | undefined
    const msg = String(error?.message || '')

    // Códigos Prisma: https://www.prisma.io/docs/reference/api-reference/error-reference
    if (code === 'P1001' || code === 'P1000' || code === 'P1017' || code === 'P1014') {
      message =
        'No hay conexión a la base de datos. En la raíz del proyecto, actualizá DATABASE_URL en el archivo .env con la cadena del host nuevo (Neon/Railway) y reiniciá el servidor (npm run dev). Luego ejecutá: npx prisma migrate deploy'
    } else if (code === 'P2002') {
      message = 'Este email ya está registrado.'
    } else if (msg.includes('Unique constraint') || msg.toLowerCase().includes('unique')) {
      message = 'Este email ya está registrado.'
    } else if (msg && code !== 'P2002') {
      message = msg.length < 200 ? msg : message
    }
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

