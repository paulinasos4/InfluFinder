import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = 'public/uploads'
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No se envió ningún archivo' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Formato no permitido. Usá JPG, PNG, WebP o GIF.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'La imagen no puede superar 5 MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const ext = path.extname(file.name) || '.jpg'
    const filename = `profile-${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN
    if (blobToken) {
      const blob = await put(filename, buffer, {
        access: 'public',
        token: blobToken,
      })
      return NextResponse.json({ url: blob.url })
    }

    const dir = path.join(process.cwd(), UPLOAD_DIR)
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, filename), buffer)

    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (err) {
    console.error('Upload error:', err)
    const hint =
      process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN
        ? ' En Vercel hace falta Vercel Blob: en el proyecto Storage → Blob, creá un store y enlazá BLOB_READ_WRITE_TOKEN.'
        : ''
    return NextResponse.json(
      {
        error:
          'No se pudo guardar la imagen en el servidor (el disco de producción suele ser de solo lectura).' +
          hint,
      },
      { status: 500 }
    )
  }
}
