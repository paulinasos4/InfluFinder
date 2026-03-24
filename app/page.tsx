import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#EEE0F3] py-2.5 text-center">
        <Link href="/explorar" className="font-bold text-sm md:text-base tracking-tight uppercase text-slate-700 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
          Ir al directorio de influencers →
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

      {/* Naranja fija — al deslizar aparecen violeta y beige encima */}
      <section className="fixed top-[7.5rem] md:top-[8.25rem] left-4 right-4 sm:left-6 sm:right-6 md:left-[1cm] md:right-[1cm] z-10 flex flex-col justify-center py-16 rounded-3xl bg-[#F5B5BE] shadow-2xl h-[calc(100vh-7.5rem)] md:h-[calc(100vh-8.25rem)]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#000020] leading-tight tracking-tight px-2">
            ¿No sabés qué influencer tiene la audiencia que tu marca necesita?
          </h1>
        </div>
      </section>

      <div className="min-h-screen" aria-hidden />

      <section className="flex flex-col justify-center px-4 sm:px-6 md:px-[1cm] py-16 mt-6 md:mt-8 mx-4 sm:mx-6 md:mx-8 bg-[#000020] rounded-3xl sticky top-[9rem] md:top-[10.5rem] z-20 shadow-2xl h-[calc(100vh-9rem)] md:h-[calc(100vh-10.5rem)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight px-2">
            ¿Querés llegar a más personas, pero no sabés qué influencer puede ayudarte?
          </h2>
        </div>
      </section>

      <section className="flex flex-col justify-center px-4 sm:px-6 md:px-[1cm] py-16 mt-12 md:mt-16 mx-4 sm:mx-6 md:mx-8 bg-[#EEE0F3] rounded-3xl sticky top-[7.5rem] md:top-[8.25rem] z-30 shadow-2xl h-[calc(100vh-10.5rem)] md:h-[calc(100vh-12.25rem)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#000020] uppercase leading-tight mb-6 tracking-tight px-2">
            Encontrá al influencer que tu marca necesita
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 max-w-2xl mx-auto font-light uppercase leading-relaxed mb-10">
            influ-finder reúne creadores e influencers de Uruguay en un solo lugar para que puedas buscar, filtrar y analizar perfiles según audiencia, métricas y tipo de colaboración.
          </p>
          <Link
            href="/explorar"
            className="inline-flex items-center gap-2 bg-[#000020] text-white px-6 py-3 rounded-full font-bold text-sm md:text-base tracking-tight hover:bg-slate-900 transition-colors uppercase"
          >
            Descubrir perfiles →
          </Link>
        </div>
      </section>
    </main>
  )
}
