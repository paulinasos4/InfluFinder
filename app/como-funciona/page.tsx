import Link from 'next/link'

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* Barra lavanda — misma altura que en el inicio */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#EEE0F3] py-2.5 text-center">
        <Link href="/" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors inline-flex items-center gap-1">
          Volver al inicio →
        </Link>
      </div>

      {/* Header azul — misma posición y estilo que en el inicio */}
      <header className="fixed top-10 left-0 right-0 z-50 px-4 sm:px-6 md:px-[1cm] pt-2 md:pt-3">
        <div className="w-full mx-auto">
          <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl bg-[#000020]">
            <div className="w-full px-3 sm:px-4 lg:px-6 py-2 md:py-3">
              <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white tracking-tight">Influ-finder</span>
                </Link>
                <Link
                  href="/"
                  className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium transition-colors text-xs md:text-sm"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sección 1 — base, naranja con espacio respecto al header y puntas circulares */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-[1cm] pt-[7.5rem] md:pt-[8.25rem] py-16 mt-24 md:mt-32 mx-4 sm:mx-6 md:mx-8 rounded-3xl bg-[#f97316] relative z-10 shadow-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black uppercase leading-tight mb-6">
            ¿Cómo funciona?
          </h1>
          <p className="text-lg sm:text-xl text-black/90 leading-relaxed">
            Influ-finder es el directorio de creadores e influencers de Uruguay. Las marcas pueden buscar, filtrar y analizar perfiles según audiencia, métricas y tipo de colaboración.
          </p>
        </div>
      </section>

      {/* Sección 2 — al deslizar aparece y se superpone, violeta, puntas circulares */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-[1cm] py-16 mx-4 sm:mx-6 md:mx-8 mt-6 md:mt-8 bg-[#7c3aed] rounded-3xl sticky top-0 z-20 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase leading-tight mb-6">
            Nuestro objetivo
          </h2>
          <p className="text-lg sm:text-xl text-white/95 leading-relaxed">
            Conectar marcas con el influencer ideal de forma simple y transparente, y dar visibilidad a creadores uruguayos en un solo lugar.
          </p>
        </div>
      </section>

      {/* Sección 3 — al deslizar aparece y se superpone, beige, puntas circulares */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-[1cm] py-16 mx-4 sm:mx-6 md:mx-8 mt-6 md:mt-8 bg-[#e8e0d5] rounded-3xl sticky top-0 z-30 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 uppercase leading-tight mb-6">
            Un solo lugar para encontrar
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-10">
            Filtrá por nicho, departamento, plataforma y tipo de colaboración. Sin hojas de cálculo, sin correos perdidos.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#000020] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-900 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  )
}
