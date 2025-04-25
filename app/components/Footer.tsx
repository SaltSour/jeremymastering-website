'use client'

import { usePathname } from 'next/navigation'
import { RiInstagramLine, RiMailLine } from 'react-icons/ri'
import Link from 'next/link'

export default function Footer() {
  const pathname = usePathname()
  const isAboutPage = pathname === '/about'
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-40 w-full py-8 md:py-10 px-4 md:px-8 border-t border-black/5 bg-white/80 backdrop-blur-md mt-auto">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="text-sm font-medium tracking-wide mb-4">CONTACT</div>
            <div className="space-y-2">
              <a
                href="mailto:contact@jeremymastering.com"
                className="flex items-center gap-2 text-sm font-light opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                <RiMailLine className="w-4 h-4" />
                <span>contact@jeremymastering.com</span>
              </a>

              <p className="text-sm font-light opacity-70 mt-1">Toulouse, FR</p>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <div className="text-sm font-medium tracking-wide mb-4">NAVIGATION</div>
            <div className="space-y-2">
              <div>
                <Link href="/projets" className="text-sm font-light opacity-80 hover:opacity-100 transition-opacity duration-200">
                  WORK
                </Link>
              </div>
              <div>
                <Link href="/about" className="text-sm font-light opacity-80 hover:opacity-100 transition-opacity duration-200">
                  ABOUT
                </Link>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="text-sm font-medium tracking-wide mb-4">FOLLOW ME</div>
            <div className="flex">
              <a
                href="https://instagram.com/jeremymastering"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                <RiInstagramLine className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs font-light opacity-60">© {currentYear} JÉRÉMY MASTERING. ALL RIGHTS RESERVED.</p>
          <p className="text-xs font-light opacity-60 mt-2 md:mt-0">TOULOUSE, FRANCE</p>
        </div>
      </div>
    </footer>
  )
}