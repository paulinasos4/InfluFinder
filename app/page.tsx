import SearchFilters from '@/components/SearchFilters'
import InfluencerList from '@/components/InfluencerList'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#f4e8f3]">
      <div className="w-full mx-auto px-[1cm] pt-[1cm] pb-[1cm] space-y-4">
        {/* Header — bloque separado con puntas circulares */}
        <header className="rounded-2xl overflow-hidden shadow-xl bg-slate-900">
          <div className="w-full px-[4cm] py-4">
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

        {/* Hero Section — bloque separado con puntas circulares */}
        <section className="rounded-2xl overflow-hidden shadow-xl py-16 md:py-24 bg-[#c4dafa]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#c4dafa]">
            <h1 className="font-hero text-5xl md:text-6xl lg:text-[72px] mb-6 tracking-tight leading-tight text-[#fc6998] uppercase">
              Encontrá el influencer ideal para tu marca
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto font-medium">
              Buscá, filtrá y analizá según su audiencia y métricas
            </p>
          </div>
        </section>
      </div>

      {/* Módulo de búsqueda y filtros — más chico y superpuesto al hero */}
      <section className="w-full mx-auto px-[1cm] -mt-12 relative z-10 flex justify-center">
        <div className="w-full max-w-4xl">
          <Suspense fallback={<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 animate-pulse h-72" />}>
            <SearchFilters />
          </Suspense>
        </div>
      </section>

      {/* Listado de resultados */}
      <section className="w-full mx-auto px-[1cm] py-12 pb-20">
        <Suspense fallback={<div className="text-center py-16 text-slate-500">Cargando...</div>}>
          <InfluencerList />
        </Suspense>
      </section>
    </main>
  )
}
