'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import PlatformIcon from './PlatformIcon'

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
        if (!response.ok || !Array.isArray(data)) {
          setInfluencers([])
          return
        }
        setInfluencers(data)
      } catch (error) {
        console.error('Error fetching influencers', error)
        setInfluencers([])
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
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <p className="text-slate-500">Cargando influencers...</p>
      </div>
    )
  }

  if (influencers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <p className="text-slate-500">No se encontraron influencers con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Creador</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Nicho</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Plataformas</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Seguidores</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Engagement</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {influencers.map((influencer) => {
              const platforms = influencer.platforms ?? []
              const maxFollowers = platforms.reduce((max, p) => Math.max(max, p.followers), 0)
              const avgEngagement = platforms.length > 0
                ? platforms.reduce((sum, p) => sum + p.engagementRate, 0) / platforms.length
                : 0

              return (
                <tr key={influencer.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-10 w-10 relative rounded-full overflow-hidden bg-slate-100">
                        {influencer.photo ? (
                          <Image src={influencer.photo} alt={influencer.name} fill className="object-cover" sizes="40px" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <span className="text-slate-500 text-sm font-medium">{influencer.name.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{influencer.name}</div>
                        <div className="text-sm text-slate-500">@{(platforms[0]?.username) || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700">
                      {influencer.niche}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{influencer.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {platforms.map((platform) => (
                        <span key={platform.id} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded bg-slate-100 text-slate-700">
                          <PlatformIcon platform={platform.platform} size={12} />
                          {platform.platform === 'INSTAGRAM' ? 'IG' : platform.platform === 'TIKTOK' ? 'TT' : platform.platform === 'FACEBOOK' ? 'FB' : 'YT'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{formatNumber(maxFollowers)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{avgEngagement.toFixed(2)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/influencer/${influencer.id}`}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
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
