'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface PlatformData {
  id: string
  platform: string
  username: string
  followers: number
  engagementRate: number
}

interface Influencer {
  id: string
  name: string
  photo: string | null
  niche: string
  department: string
  platforms: PlatformData[]
  _maxFollowers?: number
  _avgEngagement?: number
}

export default function InfluencerList() {
  const searchParams = useSearchParams()
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInfluencers = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams(searchParams.toString())
        const response = await fetch(`/api/influencers?${params.toString()}`)
        const data = await response.json()
        setInfluencers(data)
      } catch (error) {
        console.error('Error fetching influencers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInfluencers()
  }, [searchParams])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Cargando influencers...</p>
      </div>
    )
  }

  if (influencers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No se encontraron influencers con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Creador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nicho
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plataformas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seguidores
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Engagement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {influencers.map((influencer) => {
              const maxFollowers = influencer.platforms.reduce((max, p) => 
                Math.max(max, p.followers), 0
              )
              const avgEngagement = influencer.platforms.length > 0
                ? influencer.platforms.reduce((sum, p) => sum + p.engagementRate, 0) / influencer.platforms.length
                : 0

              return (
                <tr key={influencer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        {influencer.photo ? (
                          <Image
                            src={influencer.photo}
                            alt={influencer.name}
                            fill
                            className="rounded-full object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 text-sm font-medium">
                              {influencer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{influencer.name}</div>
                        <div className="text-sm text-gray-500">
                          @{influencer.platforms[0]?.username || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {influencer.niche}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {influencer.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {influencer.platforms.map((platform) => (
                        <span
                          key={platform.id}
                          className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700"
                        >
                          {platform.platform === 'INSTAGRAM' ? 'IG' : 
                           platform.platform === 'TIKTOK' ? 'TT' : 'YT'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(maxFollowers)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {avgEngagement.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/influencer/${influencer.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Ver perfil
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

