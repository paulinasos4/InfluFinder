import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface PageProps {
  params: {
    id: string
  }
}

export default async function InfluencerProfile({ params }: PageProps) {
  const influencer = await prisma.influencer.findUnique({
    where: {
      id: params.id,
      status: 'APPROVED',
    },
    include: {
      platforms: true
    }
  })

  if (!influencer) {
    notFound()
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'INSTAGRAM': return 'Instagram'
      case 'TIKTOK': return 'TikTok'
      case 'YOUTUBE': return 'YouTube'
      default: return platform
    }
  }

  const getCollaborationLabel = (type: string) => {
    switch (type) {
      case 'CANJE': return 'Canje'
      case 'PAGO': return 'Pago'
      case 'AMBOS': return 'Ambos'
      default: return type
    }
  }

  const getAudienceGenderLabel = (gender: string | null) => {
    switch (gender) {
      case 'HOMBRE': return 'Hombre'
      case 'MUJER': return 'Mujer'
      case 'AMBOS': return 'Ambos'
      default: return 'No especificado'
    }
  }

  const getAgeRangeLabel = (range: string | null) => {
    switch (range) {
      case 'RANGE_18_24': return '18-24 años'
      case 'RANGE_24_34': return '24-34 años'
      case 'RANGE_35_44': return '35-44 años'
      case 'RANGE_45_PLUS': return '45+ años'
      default: return 'No especificado'
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Volver al directorio
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header del perfil */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="flex items-center gap-6">
              {influencer.photo ? (
                <div className="relative w-[120px] h-[120px]">
                  <Image
                    src={influencer.photo}
                    alt={influencer.name}
                    fill
                    className="rounded-full object-cover border-4 border-white"
                    sizes="120px"
                  />
                </div>
              ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center border-4 border-white">
                  <span className="text-blue-600 text-4xl font-bold">
                    {influencer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{influencer.name}</h1>
                <p className="text-blue-100 text-lg">
                  {influencer.platforms[0]?.username && `@${influencer.platforms[0].username}`}
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {influencer.niche}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {influencer.department}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido del perfil */}
          <div className="px-8 py-8">
            {/* Biografía */}
            {influencer.bio && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Biografía</h2>
                <p className="text-gray-700 leading-relaxed">{influencer.bio}</p>
              </section>
            )}

            {/* Métricas por plataforma */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Métricas por plataforma</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {influencer.platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {getPlatformLabel(platform.platform)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      @{platform.username}
                    </p>
                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Seguidores:</span>
                        <p className="text-lg font-semibold">
                          {formatNumber(platform.followers)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Engagement Rate:</span>
                        <p className="text-lg font-semibold text-blue-600">
                          {platform.engagementRate.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Información adicional */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Información adicional</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Tipo de colaboración</h3>
                  <div className="flex flex-wrap gap-2">
                    {influencer.collaborations.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {getCollaborationLabel(type)}
                      </span>
                    ))}
                  </div>
                </div>

                {influencer.age && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Edad del creador</h3>
                    <p className="text-gray-900">{influencer.age} años</p>
                  </div>
                )}

                {influencer.audienceGender && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Tipo de audiencia</h3>
                    <p className="text-gray-900">
                      {getAudienceGenderLabel(influencer.audienceGender)}
                    </p>
                  </div>
                )}

                {influencer.audienceAgeRange && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Rango etario de audiencia</h3>
                    <p className="text-gray-900">
                      {getAgeRangeLabel(influencer.audienceAgeRange)}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Equipo profesional</h3>
                  <p className="text-gray-900">
                    {influencer.hasProfessionalTeam ? 'Sí' : 'No'}
                  </p>
                </div>

                {influencer.influencerType && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Tipo de influencer</h3>
                    <p className="text-gray-900">
                      {influencer.influencerType === 'MICRO' ? 'Micro influencer' : 'Macro influencer'}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Contacto */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Contacto</h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {influencer.email}
                </p>
                {influencer.phone && (
                  <p className="text-gray-700">
                    <span className="font-medium">Teléfono:</span> {influencer.phone}
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

