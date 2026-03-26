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
  'Estilo de vida', 'Fitness', 'Belleza', 'Moda', 'Gastronomía',
  'Viajes', 'Tecnología', 'Gaming', 'Música', 'Comedia',
  'Educación', 'Negocios', 'Deportes', 'Arte', 'Otro'
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

const AUDIENCE_GENDER_OPTIONS = [
  { value: 'MUJER', label: 'Mayormente mujeres' },
  { value: 'HOMBRE', label: 'Mayormente hombres' },
  { value: 'AMBOS', label: 'Mixto' },
]

const AUDIENCE_AGE_OPTIONS = [
  { value: 'RANGE_18_24', label: '18-24' },
  { value: 'RANGE_24_34', label: '25-34' },
  { value: 'RANGE_35_44', label: '35-44' },
  { value: 'RANGE_45_PLUS', label: '45+' },
]

const inputClass = "w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-sm"
const labelClass = "block text-sm font-medium text-[#000020] mb-1.5"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    niche: searchParams.get('niche') || '',
    audienceAgeRange: searchParams.get('audienceAgeRange') || '',
    audienceGender: searchParams.get('audienceGender') || '',
    audienceCity: searchParams.get('audienceCity') || '',
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
      audienceAgeRange: '',
      audienceGender: '',
      audienceCity: '',
      platforms: [],
      collaborationType: '',
    })
    router.push('/')
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-[#000020] mb-4 sm:mb-6 uppercase">Filtros de búsqueda</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
          <label className={labelClass}>Ciudad principal de la audiencia</label>
          <select value={filters.audienceCity} onChange={(e) => handleFilterChange('audienceCity', e.target.value)} className={inputClass}>
            <option value="">Todos</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Edad de la audiencia</label>
          <select value={filters.audienceAgeRange} onChange={(e) => handleFilterChange('audienceAgeRange', e.target.value)} className={inputClass}>
            <option value="">Todas</option>
            {AUDIENCE_AGE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Género de la audiencia</label>
          <select value={filters.audienceGender} onChange={(e) => handleFilterChange('audienceGender', e.target.value)} className={inputClass}>
            <option value="">Todos</option>
            {AUDIENCE_GENDER_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
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

      <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-slate-200">
        <label className={labelClass}>Plataformas</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(platform => (
            <button
              key={platform.value}
              type="button"
              onClick={() => handlePlatformToggle(platform.value)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                (filters.platforms as string[]).includes(platform.value)
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 focus:ring-2 focus:ring-slate-900 focus:ring-offset-1'
              }`}
            >
              <PlatformIcon platform={platform.value} size={16} className="flex-shrink-0" />
              {platform.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button onClick={applyFilters} className="bg-[#3f3e3e] hover:bg-[#353434] text-white px-6 py-3 sm:py-2.5 rounded-lg font-medium text-sm transition-colors w-full sm:w-auto">
          Aplicar filtros
        </button>
        <button onClick={clearFilters} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3 sm:py-2.5 rounded-lg font-medium text-sm transition-colors w-full sm:w-auto">
          Limpiar
        </button>
      </div>
    </div>
  )
}
