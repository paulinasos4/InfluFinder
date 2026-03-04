'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PlatformIcon from './PlatformIcon'

const DEPARTMENTS = [
  'Montevideo', 'Canelones', 'Maldonado', 'Salto', 'Paysandú',
  'Río Negro', 'Tacuarembó', 'Colonia', 'Soriano', 'Durazno',
  'Flores', 'Florida', 'Lavalleja', 'Rocha', 'San José',
  'Artigas', 'Cerro Largo', 'Rivera', 'Treinta y Tres'
]

const NICHE_OPTIONS = [
  'Lifestyle', 'Fitness', 'Beauty', 'Fashion', 'Food',
  'Travel', 'Tech', 'Gaming', 'Music', 'Comedy',
  'Education', 'Business', 'Sports', 'Art', 'Otro'
]

const PLATFORMS = [
  { value: 'INSTAGRAM', label: 'Instagram' },
  { value: 'TIKTOK', label: 'TikTok' },
  { value: 'FACEBOOK', label: 'Facebook' },
  { value: 'YOUTUBE', label: 'YouTube' }
]

const COLLABORATION_TYPES = [
  { value: 'CANJE', label: 'Canje' },
  { value: 'PAGO', label: 'Pago' },
  { value: 'AMBOS', label: 'Ambos' }
]

const inputClass = "w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    niche: searchParams.get('niche') || '',
    department: searchParams.get('department') || '',
    ageMin: searchParams.get('ageMin') || '',
    ageMax: searchParams.get('ageMax') || '',
    followersMin: searchParams.get('followersMin') || '',
    followersMax: searchParams.get('followersMax') || '',
    engagementMin: searchParams.get('engagementMin') || '',
    engagementMax: searchParams.get('engagementMax') || '',
    platforms: searchParams.get('platforms')?.split(',') || [],
    collaborationType: searchParams.get('collaborationType') || '',
  })

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handlePlatformToggle = (platform: string) => {
    const current = filters.platforms as string[]
    const updated = current.includes(platform)
      ? current.filter(p => p !== platform)
      : [...current, platform]
    handleFilterChange('platforms', updated)
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && (Array.isArray(value) ? value.length > 0 : true)) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','))
        } else {
          params.set(key, value.toString())
        }
      }
    })

    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      niche: '',
      department: '',
      ageMin: '',
      ageMax: '',
      followersMin: '',
      followersMax: '',
      engagementMin: '',
      engagementMax: '',
      platforms: [],
      collaborationType: '',
    })
    router.push('/')
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Filtros de búsqueda</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>Nicho / Categoría</label>
          <select value={filters.niche} onChange={(e) => handleFilterChange('niche', e.target.value)} className={inputClass}>
            <option value="">Todos</option>
            {NICHE_OPTIONS.map(niche => (
              <option key={niche} value={niche}>{niche}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Departamento</label>
          <select value={filters.department} onChange={(e) => handleFilterChange('department', e.target.value)} className={inputClass}>
            <option value="">Todos</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Edad del creador</label>
          <div className="flex gap-2">
            <input type="number" placeholder="Mín" value={filters.ageMin} onChange={(e) => handleFilterChange('ageMin', e.target.value)} className={inputClass} />
            <input type="number" placeholder="Máx" value={filters.ageMax} onChange={(e) => handleFilterChange('ageMax', e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Rango de seguidores</label>
          <div className="flex gap-2">
            <input type="number" placeholder="Mín" value={filters.followersMin} onChange={(e) => handleFilterChange('followersMin', e.target.value)} className={inputClass} />
            <input type="number" placeholder="Máx" value={filters.followersMax} onChange={(e) => handleFilterChange('followersMax', e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Engagement Rate (%)</label>
          <div className="flex gap-2">
            <input type="number" step="0.1" placeholder="Mín" value={filters.engagementMin} onChange={(e) => handleFilterChange('engagementMin', e.target.value)} className={inputClass} />
            <input type="number" step="0.1" placeholder="Máx" value={filters.engagementMax} onChange={(e) => handleFilterChange('engagementMax', e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Tipo de colaboración</label>
          <select value={filters.collaborationType} onChange={(e) => handleFilterChange('collaborationType', e.target.value)} className={inputClass}>
            <option value="">Todos</option>
            {COLLABORATION_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-slate-100">
        <label className={labelClass}>Plataformas</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(platform => (
            <button
              key={platform.value}
              type="button"
              onClick={() => handlePlatformToggle(platform.value)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                (filters.platforms as string[]).includes(platform.value)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <PlatformIcon platform={platform.value} size={16} className="flex-shrink-0" />
              {platform.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={applyFilters} className="bg-[#3f3e3e] hover:bg-[#353434] text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors">
          Aplicar filtros
        </button>
        <button onClick={clearFilters} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-2.5 rounded-lg font-medium text-sm transition-colors">
          Limpiar
        </button>
      </div>
    </div>
  )
}
