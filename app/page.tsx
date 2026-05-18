import Link from 'next/link'
import RotatingWord from '@/components/RotatingWord'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#EEE0F3] py-2.5 text-center">
        <Link href="/explorar" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
          Descubrir perfiles →
        </Link>
      </div>

      {/* Naranja fija — al deslizar aparecen violeta y beige encima */}
      <section className="fixed top-[7.5rem] md:top-[8.25rem] left-4 right-4 sm:left-6 sm:right-6 md:left-[1cm] md:right-[1cm] z-10 flex flex-col justify-center py-16 rounded-3xl bg-[#F5B5BE] shadow-2xl h-[calc(100vh-7.5rem)] md:h-[calc(100vh-8.25rem)]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="animate-hero font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#000020] leading-tight tracking-tight px-2">
            <span className="whitespace-nowrap">
              ¿No sabés qué{' '}
              <RotatingWord
                words={['creador de contenido', 'influencer']}
                className="text-[#ff7384]"
                style={{ WebkitTextStroke: '1px #000020' }}
                alignShortWord="start"
              />
            </span>{' '}
            tiene la audiencia que tu marca necesita?
          </h1>
        </div>
      </section>

      {/* Espaciador levemente más corto para que la tarjeta azul asome y sugiera scroll */}
      <div className="min-h-screen" aria-hidden />

      <div
        aria-hidden
        className="fixed left-1/2 bottom-6 -translate-x-1/2 text-white/90 text-xl leading-none animate-bounce z-30 pointer-events-none"
      >
        ^
      </div>

      <section className="relative flex flex-col justify-center px-4 sm:px-6 md:px-[1cm] py-16 mt-6 md:mt-8 mx-4 sm:mx-6 md:mx-8 bg-[#000020] rounded-3xl sticky top-[9rem] md:top-[10.5rem] z-20 shadow-2xl h-[calc(100vh-9rem)] md:h-[calc(100vh-10.5rem)]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight px-2">
              ¿Querés llegar a más personas, pero no sabés qué{' '}
              <span className="block sm:hidden">
                <RotatingWord
                  words={['creador de contenido', 'influencer']}
                  className="text-[#ff7384]"
                  style={{ WebkitTextStroke: '1px #ffffff' }}
                  alignShortWord="center"
                />
              </span>
              <span className="block sm:hidden">puede ayudarte?</span>
              <span className="hidden whitespace-nowrap sm:inline">
                <RotatingWord
                  words={['creador de contenido', 'influencer']}
                  className="text-[#ff7384]"
                  style={{ WebkitTextStroke: '1px #ffffff' }}
                  followingText=" puede ayudarte?"
                />
              </span>
            </h2>
          </ScrollReveal>
        </div>
      </section>

      <section className="flex flex-col justify-center px-4 sm:px-6 md:px-[1cm] py-16 mt-12 md:mt-16 mx-4 sm:mx-6 md:mx-8 bg-[#EEE0F3] rounded-3xl sticky top-[7.5rem] md:top-[8.25rem] z-30 shadow-2xl h-[calc(100vh-10.5rem)] md:h-[calc(100vh-12.25rem)]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#000020] uppercase leading-tight mb-6 tracking-tight px-2">
              ENCONTRÁ QUIÉN MEJOR CONECTA CON TU MARCA
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-xs sm:text-sm md:text-base text-slate-700 max-w-2xl mx-auto font-light uppercase leading-relaxed mb-10">
              influ-finder reúne creadores e influencers de Uruguay en un solo lugar para que puedas buscar, filtrar y analizar perfiles según audiencia, métricas y tipo de colaboración.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <Link
              href="/explorar"
              className="inline-flex items-center gap-2 bg-[#000020] text-white px-6 py-3 rounded-full font-bold text-sm md:text-base tracking-tight hover:bg-slate-900 transition-colors uppercase"
            >
              Descubrir perfiles →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
