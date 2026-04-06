import type { Metadata } from 'next'
import RotatingWord from '@/components/RotatingWord'
import SearchFilters from '@/components/SearchFilters'
import InfluencerList from '@/components/InfluencerList'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Explorar influencers | Influ Finder',
  description: 'Buscá y filtrá influencers en Uruguay por nicho, plataforma y métricas.',
}

export default async function ExplorarPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#EEE0F3] py-2.5 text-center">
        <Link href="/" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
          ← Conocé nuestro objetivo
        </Link>
      </div>

      <header className="fixed left-0 right-0 z-50 px-4 sm:px-6 md:px-[1cm] top-[3.25rem] md:top-[3.5rem] pt-0">
        <div className="w-full mx-auto">
          <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl bg-[#000020]">
            <div className="w-full px-3 sm:px-4 lg:px-6 py-2 md:py-2.5">
              <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-4">
                  <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-visible -ml-1">
                    <Image src="/logo.png" alt="InfluFinder" width={88} height={88} unoptimized className="rounded-lg object-contain !w-11 !h-11" style={{ transform: 'scale(1.45)' }} />
                  </span>
                  <span className="text-xl font-bold text-white tracking-tight">influ-finder</span>
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
        <section className="rounded-xl md:rounded-2xl shadow-lg md:shadow-xl py-8 sm:py-10 md:py-14 lg:py-16 min-h-0 md:min-h-[70vh] bg-hero-moodboard">
          <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center pb-16 sm:pb-20 md:pb-32 lg:pb-40 bg-transparent mt-4 md:mt-6">
            <h1 className="font-hero font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] 2xl:text-[6rem] mb-3 md:mb-6 tracking-tight leading-[1.1] sm:leading-tight text-white uppercase px-1 drop-shadow-md">
              Encontrá{' '}
              <span className="whitespace-nowrap">
                el{' '}
                <RotatingWord
                  words={['creador de contenido', 'influencer']}
                  className="text-[#ff7384] relative -top-[0.08em]"
                  style={{ WebkitTextStroke: '1px #000020' }}
                />
              </span>{' '}
              ideal para tu marca
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white max-w-2xl mx-auto font-light uppercase">
              Buscá, filtrá y analizá según su audiencia y métricas
            </p>
          </div>
        </section>
      </div>

      <section className="w-full mx-auto px-4 sm:px-6 md:px-[1cm] -mt-10 sm:-mt-14 md:-mt-[20rem] lg:-mt-[22rem] relative z-10 flex justify-center pb-8 md:pb-20">
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
