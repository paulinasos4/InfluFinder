import Link from 'next/link'
import Image from 'next/image'
import RotatingCtaLink from '@/components/RotatingCtaLink'

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 z-50 px-4 sm:px-6 md:px-[1cm] top-[3.25rem] md:top-[3.5rem] pt-0">
      <div className="w-full mx-auto">
        <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl bg-[#000020]">
          <div className="w-full px-3 sm:px-4 lg:px-6 py-2 md:py-2.5">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-4">
                <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-visible -ml-1">
                  <Image
                    src="/logo.png"
                    alt="InfluFinder"
                    width={88}
                    height={88}
                    unoptimized
                    priority
                    className="rounded-lg object-contain !w-11 !h-11"
                    style={{ transform: 'scale(1.45)' }}
                  />
                </span>
                <span className="text-xl font-bold text-white tracking-tight">influ-finder</span>
              </Link>
              <RotatingCtaLink className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium transition-colors text-xs md:text-sm" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
