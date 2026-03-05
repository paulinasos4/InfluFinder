import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PlatformIcon from '@/components/PlatformIcon'

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
      case 'FACEBOOK': return 'Facebook'
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
    <main className="min-h-screen bg-[#f4e8f3]">
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
            ← Volver al directorio
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header del perfil */}
          <div className="bg-slate-900 px-8 py-12">
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
                <div className="w-[120px] h-[120px] rounded-full bg-slate-700 flex items-center justify-center border-4 border-slate-800">
                  <span className="text-indigo-400 text-4xl font-bold">
                    {influencer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{influencer.name}</h1>
                <p className="text-slate-300 text-lg">
                  {influencer.platforms[0]?.username && `@${influencer.platforms[0].username}`}
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    {influencer.niche}
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    {influencer.department}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido del perfil */}
          <div className="px-8 py-8 text-slate-900">
            {/* Biografía */}
            {influencer.bio && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-slate-900">Biografía</h2>
                <p className="text-slate-700 leading-relaxed">{influencer.bio}</p>
              </section>
            )}

            {/* Métricas por plataforma */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Métricas por plataforma</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {influencer.platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50/50"
                  >
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-slate-900">
                      <PlatformIcon platform={platform.platform} size={22} />
                      {getPlatformLabel(platform.platform)}
                    </h3>
                    <p className="text-sm text-slate-800 mb-1">
                      @{platform.username}
                    </p>
                    {platform.profileUrl && (
                      <a
                        href={platform.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-slate-900 hover:text-slate-700 mb-3"
                      >
                        Ir a {getPlatformLabel(platform.platform)} →
                      </a>
                    )}
                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-sm text-slate-700">Seguidores:</span>
                        <p className="text-lg font-semibold text-slate-900">
                          {formatNumber(platform.followers)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-700">Engagement Rate:</span>
                        <p className="text-lg font-semibold text-indigo-600">
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
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Información adicional</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-slate-800 mb-2">Tipo de colaboración</h3>
                  <div className="flex flex-wrap gap-2">
                    {influencer.collaborations.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                      >
                        {getCollaborationLabel(type)}
                      </span>
                    ))}
                  </div>
                </div>

                {influencer.age && (
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Edad del creador</h3>
                    <p className="text-slate-900">{influencer.age} años</p>
                  </div>
                )}

                {influencer.audienceGender && (
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Tipo de audiencia</h3>
                    <p className="text-slate-900">
                      {getAudienceGenderLabel(influencer.audienceGender)}
                    </p>
                  </div>
                )}

                {influencer.audienceAgeRange && (
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Rango etario de audiencia</h3>
                    <p className="text-slate-900">
                      {getAgeRangeLabel(influencer.audienceAgeRange)}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-slate-800 mb-2">Equipo profesional</h3>
                  <p className="text-slate-900">
                    {influencer.hasProfessionalTeam ? 'Sí' : 'No'}
                  </p>
                </div>

                {influencer.influencerType && (
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Tipo de influencer</h3>
                    <p className="text-slate-900">
                      {influencer.influencerType === 'MICRO' ? 'Micro influencer' : 'Macro influencer'}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Contacto */}
            <section className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Contacto</h2>
              <div className="space-y-2">
                <p className="text-slate-800">
                  <span className="font-medium text-slate-900">Email:</span> {influencer.email}
                </p>
                {influencer.phone && (
                  <p className="text-slate-800">
                    <span className="font-medium text-slate-900">Teléfono:</span> {influencer.phone}
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

