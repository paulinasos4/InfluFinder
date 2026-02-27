'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

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
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Filtros de búsqueda</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Nicho */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Nicho/Categoría
          </label>
          <select
            value={filters.niche}
            onChange={(e) => handleFilterChange('niche', e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {NICHE_OPTIONS.map(niche => (
              <option key={niche} value={niche}>{niche}</option>
            ))}
          </select>
        </div>

        {/* Departamento */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Departamento
          </label>
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Edad */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Edad del creador
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={filters.ageMin}
              onChange={(e) => handleFilterChange('ageMin', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Máx"
              value={filters.ageMax}
              onChange={(e) => handleFilterChange('ageMax', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Seguidores */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Rango de seguidores
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={filters.followersMin}
              onChange={(e) => handleFilterChange('followersMin', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Máx"
              value={filters.followersMax}
              onChange={(e) => handleFilterChange('followersMax', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Engagement Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Engagement Rate (%)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              placeholder="Mín"
              value={filters.engagementMin}
              onChange={(e) => handleFilterChange('engagementMin', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Máx"
              value={filters.engagementMax}
              onChange={(e) => handleFilterChange('engagementMax', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tipo de colaboración */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Tipo de colaboración
          </label>
          <select
            value={filters.collaborationType}
            onChange={(e) => handleFilterChange('collaborationType', e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {COLLABORATION_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Plataformas */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Plataformas
        </label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(platform => (
            <button
              key={platform.value}
              type="button"
              onClick={() => handlePlatformToggle(platform.value)}
              className={`px-4 py-2 rounded-md border transition-colors ${
                (filters.platforms as string[]).includes(platform.value)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {platform.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={applyFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Aplicar filtros
        </button>
        <button
          onClick={clearFilters}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}

