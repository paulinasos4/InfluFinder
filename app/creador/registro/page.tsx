'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
  { value: 'YOUTUBE', label: 'YouTube' }
]

interface PlatformFormData {
  platform: string
  username: string
  followers: string
  engagementRate: string
}

export default function RegistroCreador() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    bio: '',
    niche: '',
    department: '',
    age: '',
    audienceGender: '',
    audienceAgeRange: '',
    hasProfessionalTeam: false,
    influencerType: '',
    collaborationTypes: [] as string[],
  })
  const [platforms, setPlatforms] = useState<PlatformFormData[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleCollaborationToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      collaborationTypes: prev.collaborationTypes.includes(type)
        ? prev.collaborationTypes.filter(t => t !== type)
        : [...prev.collaborationTypes, type]
    }))
  }

  const addPlatform = () => {
    setPlatforms([...platforms, {
      platform: '',
      username: '',
      followers: '',
      engagementRate: ''
    }])
  }

  const removePlatform = (index: number) => {
    setPlatforms(platforms.filter((_, i) => i !== index))
  }

  const updatePlatform = (index: number, field: keyof PlatformFormData, value: string) => {
    const updated = [...platforms]
    updated[index] = { ...updated[index], [field]: value }
    setPlatforms(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Validar que haya al menos una plataforma
      if (platforms.length === 0) {
        setMessage({ type: 'error', text: 'Debes agregar al menos una plataforma' })
        setLoading(false)
        return
      }

      // Validar que todas las plataformas estén completas
      for (const platform of platforms) {
        if (!platform.platform || !platform.username || !platform.followers || !platform.engagementRate) {
          setMessage({ type: 'error', text: 'Completa todos los campos de las plataformas' })
          setLoading(false)
          return
        }
      }

      const response = await fetch('/api/creador/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          platforms: platforms.map(p => ({
            platform: p.platform,
            username: p.username,
            followers: parseInt(p.followers),
            engagementRate: parseFloat(p.engagementRate)
          }))
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '¡Registro exitoso! Tu perfil está pendiente de aprobación. Si no apareces en Admin, usá el botón "Refrescar lista" en el panel.',
        })
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al registrar. Intenta nuevamente.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al registrar. Intenta nuevamente.' })
    } finally {
      setLoading(false)
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
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Registro de Creador</h1>
          <p className="text-gray-700 mb-6">
            Completa el formulario para aparecer en nuestro directorio. Tu perfil quedará pendiente de aprobación.
          </p>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información básica */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Información básica</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    URL de foto de perfil
                  </label>
                  <input
                    type="url"
                    name="photo"
                    value={formData.photo}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Biografía
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Información profesional */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Información profesional</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Nicho/Categoría *
                  </label>
                  <select
                    name="niche"
                    value={formData.niche}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona...</option>
                    {NICHE_OPTIONS.map(niche => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Departamento *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona...</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="13"
                    max="100"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Tipo de influencer
                  </label>
                  <select
                    name="influencerType"
                    value={formData.influencerType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona...</option>
                    <option value="MICRO">Micro influencer</option>
                    <option value="MACRO">Macro influencer</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Audiencia */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Audiencia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Género de audiencia
                  </label>
                  <select
                    name="audienceGender"
                    value={formData.audienceGender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona...</option>
                    <option value="HOMBRE">Hombre</option>
                    <option value="MUJER">Mujer</option>
                    <option value="AMBOS">Ambos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Rango etario de audiencia
                  </label>
                  <select
                    name="audienceAgeRange"
                    value={formData.audienceAgeRange}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona...</option>
                    <option value="RANGE_18_24">18-24 años</option>
                    <option value="RANGE_24_34">24-34 años</option>
                    <option value="RANGE_35_44">35-44 años</option>
                    <option value="RANGE_45_PLUS">45+ años</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Colaboraciones */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Tipo de colaboración *</h2>
              <div className="flex flex-wrap gap-3">
                {['CANJE', 'PAGO', 'AMBOS'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleCollaborationToggle(type)}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      formData.collaborationTypes.includes(type)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {type === 'CANJE' ? 'Canje' : type === 'PAGO' ? 'Pago' : 'Ambos'}
                  </button>
                ))}
              </div>
            </section>

            {/* Equipo profesional */}
            <section>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hasProfessionalTeam"
                  checked={formData.hasProfessionalTeam}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Tengo equipo profesional
                </span>
              </label>
            </section>

            {/* Plataformas */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Plataformas sociales *</h2>
                <button
                  type="button"
                  onClick={addPlatform}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  + Agregar plataforma
                </button>
              </div>

              {platforms.map((platform, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Plataforma {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removePlatform(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Plataforma *
                      </label>
                      <select
                        value={platform.platform}
                        onChange={(e) => updatePlatform(index, 'platform', e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecciona...</option>
                        {PLATFORMS.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Usuario *
                      </label>
                      <input
                        type="text"
                        value={platform.username}
                        onChange={(e) => updatePlatform(index, 'username', e.target.value)}
                        placeholder="@usuario"
                        required
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Seguidores *
                      </label>
                      <input
                        type="number"
                        value={platform.followers}
                        onChange={(e) => updatePlatform(index, 'followers', e.target.value)}
                        required
                        min="0"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Engagement Rate (%) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={platform.engagementRate}
                        onChange={(e) => updatePlatform(index, 'engagementRate', e.target.value)}
                        required
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {platforms.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Haz clic en {'"'}Agregar plataforma{'"'} para comenzar
                </p>  
              )}
            </section>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar registro'}
              </button>
              <Link
                href="/"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

