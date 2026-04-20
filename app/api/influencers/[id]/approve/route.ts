import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendApprovalEmail } from '@/lib/email'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existing = await prisma.influencer.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Influencer no encontrado' },
        { status: 404 }
      )
    }

    if (existing.status === 'APPROVED') {
      return NextResponse.json({
        message: 'El perfil ya estaba aprobado',
        influencer: existing,
      })
    }

    const influencer = await prisma.influencer.update({
      where: {
        id: params.id,
      },
      data: {
        status: 'APPROVED',
      },
    })

    const emailResult = await sendApprovalEmail(
      influencer.email,
      influencer.name
    )
    if (!emailResult.ok && 'error' in emailResult) {
      console.error('[email] Aviso de aprobación:', emailResult.error)
    }

    return NextResponse.json({
      message: 'Influencer aprobado exitosamente',
      influencer,
      ...(process.env.NODE_ENV === 'development' ? { emailDebug: emailResult } : {}),
    })
  } catch (error) {
    console.error('Error approving influencer:', error)
    return NextResponse.json(
      { error: 'Error al aprobar el influencer' },
      { status: 500 }
    )
  }
}

