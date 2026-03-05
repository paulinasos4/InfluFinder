import SearchFilters from '@/components/SearchFilters'
import InfluencerList from '@/components/InfluencerList'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#f4e8f3]">
      <div className="w-full mx-auto px-[1cm] pt-[1cm] pb-[1cm] space-y-4">
        {/* Header — barra fija al hacer scroll */}
        <header className="sticky top-0 z-50 rounded-2xl overflow-hidden shadow-xl bg-slate-900">
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

        {/* Hero Section — bloque separado con puntas circulares, se extiende hacia abajo */}
        <section className="rounded-2xl overflow-hidden shadow-xl py-16 md:py-24 min-h-[70vh] bg-[#c4dafa]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-[0.5cm] bg-[#c4dafa]">
            <h1 className="font-hero text-5xl md:text-6xl lg:text-[72px] mb-6 tracking-tight leading-tight text-[#fc6998] uppercase">
              Encontrá el influencer ideal para tu marca
            </h1>
            <p className="text-sm md:text-base text-slate-900 max-w-2xl mx-auto font-light uppercase">
              Buscá, filtrá y analizá según su audiencia y métricas
            </p>
          </div>
        </section>
      </div>

      {/* Módulo unificado: filtros + resultados */}
      <section className="w-full mx-auto px-[1cm] -mt-[28rem] relative z-10 flex justify-center pb-20">
        <div className="w-full max-w-7xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <Suspense fallback={<div className="p-8 animate-pulse h-72" />}>
            <SearchFilters />
          </Suspense>
          <div className="border-t border-slate-200">
            <Suspense fallback={<div className="p-12 text-center text-slate-500">Cargando...</div>}>
              <InfluencerList />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
