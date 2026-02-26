import SearchFilters from '@/components/SearchFilters'
import InfluencerList from '@/components/InfluencerList'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header con botón "Soy creador" */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">InfluFinder</h1>
            <Link
              href="/creador/registro"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Soy creador
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Encuentra al influencer ideal para tu marca
          </h2>
          <p className="text-xl md:text-2xl text-blue-100">
            Directorio público de creadores en Uruguay
          </p>
        </div>
      </section>

      {/* Módulo de búsqueda y filtros */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="bg-white rounded-lg shadow-md p-6 animate-pulse h-64" />}>
          <SearchFilters />
        </Suspense>
      </section>

      {/* Listado de resultados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Suspense fallback={<div className="text-center py-12 text-gray-600">Cargando...</div>}>
          <InfluencerList />
        </Suspense>
      </section>
    </main>
  )
}

