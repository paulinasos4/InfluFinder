import SearchFilters from '@/components/SearchFilters'
import InfluencerList from '@/components/InfluencerList'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#f4e8f3]">
      {/* Header — fijo arriba al hacer scroll */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-[1cm] pt-3 md:pt-4">
        <div className="w-full mx-auto">
          <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl bg-slate-900">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-3 md:py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-white tracking-tight">Influ-finder</span>
              </Link>
              <Link
                href="/creador/registro"
                className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium transition-colors text-xs md:text-sm"
              >
                Soy creador
              </Link>
            </div>
          </div>
        </div>
        </div>
      </header>

      <div className="w-full mx-auto px-4 sm:px-6 md:px-[1cm] pt-24 md:pt-28 pb-14 md:pb-16 space-y-3 md:space-y-4">
        {/* Hero Section — en móvil más compacto, en desktop se extiende */}
        <section className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl py-8 sm:py-12 md:py-16 lg:py-24 min-h-0 md:min-h-[70vh] bg-[#c4dafa]">
          <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center pb-6 bg-[#c4dafa]">
            <h1 className="font-hero text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] mb-3 md:mb-6 tracking-tight leading-tight text-[#fc6998] uppercase">
              Encontrá el influencer ideal para tu marca
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-900 max-w-2xl mx-auto font-light uppercase">
              Buscá, filtrá y analizá según su audiencia y métricas
            </p>
          </div>
        </section>
      </div>

      {/* Módulo unificado: superpuesto al hero en móvil y desktop */}
      <section className="w-full mx-auto px-4 sm:px-6 md:px-[1cm] -mt-10 sm:-mt-14 md:-mt-[28rem] relative z-10 flex justify-center pb-8 md:pb-20">
        <div className="w-full max-w-7xl bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-lg md:shadow-xl overflow-hidden">
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
