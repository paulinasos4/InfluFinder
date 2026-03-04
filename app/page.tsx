import SearchFilters from '@/components/SearchFilters'
import InfluencerList from '@/components/InfluencerList'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      {/* Contenedor con puntas circulares que no llega a los bordes (estilo Modash) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          {/* Header */}
          <header className="bg-slate-900 border-b border-slate-800">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white tracking-tight">Influ-finder</span>
                </Link>
                <Link
                  href="/creador/registro"
                  className="bg-white text-slate-900 hover:bg-slate-100 px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                >
                  Soy creador
                </Link>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-[#3f3e3e]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight text-white">
                Encontrá el influencer ideal para tu marca
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto font-medium">
                Buscá, filtrá y analizá según su audiencia y métricas
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Módulo de búsqueda y filtros */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <Suspense fallback={<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 animate-pulse h-72" />}>
          <SearchFilters />
        </Suspense>
      </section>

      {/* Listado de resultados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <Suspense fallback={<div className="text-center py-16 text-slate-500">Cargando...</div>}>
          <InfluencerList />
        </Suspense>
      </section>
    </main>
  )
}
