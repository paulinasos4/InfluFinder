import SearchFilters from '@/components/SearchFilters'
import InfluencerList from '@/components/InfluencerList'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* Barra de info arriba de todo */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#EEE0F3] py-2.5 text-center">
        <Link href="/como-funciona" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
          ¿Cómo funciona? Conocé nuestro objetivo →
        </Link>
      </div>

      {/* Header — fijo debajo de la barra */}
      <header className="fixed top-10 left-0 right-0 z-50 px-4 sm:px-6 md:px-[1cm] pt-2 md:pt-3">
        <div className="w-full mx-auto">
          <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl bg-[#000020]">
            <div className="w-full px-3 sm:px-4 lg:px-6 py-2 md:py-3">
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

      <div className="w-full mx-auto px-4 sm:px-6 md:px-[1cm] pt-[7.5rem] md:pt-[8.25rem] pb-6 md:pb-8 space-y-3 md:space-y-4">
        {/* Hero Section — en móvil más compacto, en desktop se extiende */}
        <section className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl py-8 sm:py-10 md:py-14 lg:py-16 min-h-0 md:min-h-[70vh] bg-hero-moodboard">
          <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center pb-6 bg-transparent mt-4 md:mt-6">
            <h1 className="font-hero font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] 2xl:text-[6rem] mb-3 md:mb-6 tracking-tight leading-tight text-[#f99aaa] uppercase">
              Encontrá el influencer ideal para tu marca
            </h1>
<p className="text-xs sm:text-sm md:text-base text-white max-w-2xl mx-auto font-light uppercase">
            Buscá, filtrá y analizá según su audiencia y métricas
            </p>
          </div>
        </section>
      </div>

      {/* Módulo unificado: superpuesto al hero en móvil y desktop */}
      <section className="w-full mx-auto px-4 sm:px-6 md:px-[1cm] -mt-10 sm:-mt-14 md:-mt-[26rem] relative z-10 flex justify-center pb-8 md:pb-20">
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
