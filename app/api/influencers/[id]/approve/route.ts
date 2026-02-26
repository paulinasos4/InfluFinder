import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const influencer = await prisma.influencer.update({
      where: {
        id: params.id
      },
      data: {
        status: 'APPROVED'
      }
    })

    return NextResponse.json({ 
      message: 'Influencer aprobado exitosamente',
      influencer 
    })
  } catch (error) {
    console.error('Error approving influencer:', error)
    return NextResponse.json(
      { error: 'Error al aprobar el influencer' },
      { status: 500 }
    )
  }
}

