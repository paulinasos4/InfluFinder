'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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
  email: string
  niche: string
  department: string
  status: string
  platforms: PlatformData[]
  createdAt: string
}

export default function AdminPage() {
  const [pendingInfluencers, setPendingInfluencers] = useState<Influencer[]>([])
  const [approvedInfluencers, setApprovedInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [loginUser, setLoginUser] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    checkAuthAndFetch()
  }, [])

  const checkAuthAndFetch = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/influencers/pending', { credentials: 'include' })
      if (response.status === 401) {
        setLoggedIn(false)
        setPendingInfluencers([])
        setApprovedInfluencers([])
        return
      }
      const data = await response.json()
      setLoggedIn(true)
      setPendingInfluencers(Array.isArray(data) ? data : [])

      const approvedRes = await fetch('/api/influencers')
      const approvedData = await approvedRes.json()
      setApprovedInfluencers(Array.isArray(approvedData) ? approvedData : [])
    } catch (error) {
      console.error('Error:', error)
      setLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: loginUser, password: loginPassword }),
        credentials: 'include',
      })
      const data = await response.json()
      if (!response.ok) {
        setLoginError(data.error || 'Error al iniciar sesión')
        return
      }
      setLoggedIn(true)
      setLoginPassword('')
      await checkAuthAndFetch()
    } catch {
      setLoginError('Error de conexión')
    }
  }

  const approveInfluencer = async (id: string) => {
    try {
      const response = await fetch(`/api/influencers/${id}/approve`, {
        method: 'PATCH',
        credentials: 'include',
      })
      if (response.ok) {
        setPendingInfluencers(prev => prev.filter(inf => inf.id !== id))
        alert('Influencer aprobado exitosamente')
      } else {
        alert('Error al aprobar. ¿Sesión expirada? Intenta volver a iniciar sesión.')
      }
    } catch (error) {
      console.error('Error approving influencer:', error)
      alert('Error al aprobar el influencer')
    }
  }

  const deleteInfluencer = async (id: string, name: string, fromApproved: boolean = false) => {
    if (!confirm(`¿Eliminar a "${name}" del directorio? Esta acción no se puede deshacer.`)) return
    try {
      const response = await fetch(`/api/influencers/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (response.ok) {
        setPendingInfluencers(prev => prev.filter(inf => inf.id !== id))
        if (fromApproved) setApprovedInfluencers(prev => prev.filter(inf => inf.id !== id))
        alert('Influencer eliminado')
      } else {
        alert('Error al eliminar. ¿Sesión expirada? Intenta volver a iniciar sesión.')
      }
    } catch (error) {
      console.error('Error deleting influencer:', error)
      alert('Error al eliminar el influencer')
    }
  }

  // Pantalla de login
  if (loggedIn === false) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Admin</h1>
          <p className="text-gray-600 mb-6">Solo el administrador puede entrar.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Usuario</label>
              <input
                type="text"
                value={loginUser}
                onChange={e => setLoginUser(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Contraseña</label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-50 border border-gray-400 rounded-md text-gray-900"
                autoComplete="current-password"
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-600">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
              Entrar
            </button>
          </form>
          <p className="mt-4 text-center">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </main>
    )
  }

  if (loading && loggedIn === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Volver al directorio
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Influencers Pendientes de Aprobación</h2>

          {pendingInfluencers.length === 0 ? (
            <p className="text-gray-600">No hay influencers pendientes de aprobación.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nicho</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departamento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plataformas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingInfluencers.map((influencer) => (
                    <tr key={influencer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{influencer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.niche}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {influencer.platforms.map((platform) => (
                            <span
                              key={platform.id}
                              className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700"
                            >
                              {platform.platform === 'INSTAGRAM' ? 'IG' : platform.platform === 'TIKTOK' ? 'TT' : 'YT'}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(influencer.createdAt).toLocaleDateString('es-UY')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                        <button
                          onClick={() => approveInfluencer(influencer.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => deleteInfluencer(influencer.id, influencer.name, false)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Influencers en el directorio (aprobados)</h2>
          <p className="text-gray-600 text-sm mb-4">Estos perfiles ya están visibles en la web. Podés eliminarlos para sacarlos del directorio.</p>

          {approvedInfluencers.length === 0 ? (
            <p className="text-gray-600">No hay influencers aprobados en el directorio.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nicho</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departamento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plataformas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvedInfluencers.map((influencer) => (
                    <tr key={influencer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{influencer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.niche}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {influencer.platforms.map((platform) => (
                            <span
                              key={platform.id}
                              className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700"
                            >
                              {platform.platform === 'INSTAGRAM' ? 'IG' : platform.platform === 'TIKTOK' ? 'TT' : 'YT'}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => deleteInfluencer(influencer.id, influencer.name, true)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                        >
                          Eliminar del directorio
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
