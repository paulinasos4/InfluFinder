import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.influencer.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Influencer eliminado' })
  } catch (error) {
    console.error('Error deleting influencer:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el influencer' },
      { status: 500 }
    )
  }
}
