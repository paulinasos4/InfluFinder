import SearchFilters from '@/components/SearchFilters'
import InfluencerList from '@/components/InfluencerList'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header estilo Modash: oscuro, minimalista */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">Influ-finder</span>
            </Link>
            <Link
              href="/creador/registro"
              className="bg-white text-slate-900 hover:bg-slate-100 px-5 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              Soy creador
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-800 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight text-white drop-shadow-sm">
            Encontrá el influencer ideal para tu marca
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Buscá, filtrá y analizá según su audiencia y métricas
          </p>
          <p className="text-slate-400 text-sm">
            Directorio de creadores en Uruguay · Instagram, TikTok, YouTube, Facebook
          </p>
        </div>
      </section>

      {/* Módulo de búsqueda y filtros */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
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
