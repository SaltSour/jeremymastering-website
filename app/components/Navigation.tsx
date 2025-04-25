'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [time, setTime] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        const scrollingDown = currentScrollY > lastScrollY
        const scrollDifference = Math.abs(currentScrollY - lastScrollY)

        if (scrollDifference > 10) {
          setIsVisible(!scrollingDown)
          if (scrollingDown) {
            setIsMenuOpen(false)
          }
        }

        setLastScrollY(currentScrollY)
      }
    }

    const throttledControlNavbar = () => {
      window.requestAnimationFrame(controlNavbar)
    }

    window.addEventListener('scroll', throttledControlNavbar, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledControlNavbar)
    }
  }, [lastScrollY])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris'
      }
      setTime(now.toLocaleTimeString('fr-FR', options))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { name: 'WORK', path: '/projets', ariaLabel: 'Voir mes projets de mastering' },
    { name: 'ABOUT', path: '/about', ariaLabel: 'En savoir plus sur mes services' },
    { name: 'CONTACT', path: '/about#contact', ariaLabel: 'Me contacter' }
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transform will-change-transform bg-white/80 backdrop-blur-md border-b border-black/5 transition-transform duration-300"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
      }}
      role="banner"
    >
      <nav className="p-4 md:py-6" role="navigation" aria-label="Navigation principale">
        <div className="flex justify-between items-center max-w-[1800px] mx-auto">
          {/* Left side - Logo */}
          <div className="flex-1">
            <div className="opacity-100 transition-all duration-300">
              <Link href="/projets" aria-label="Retour à la galerie de projets">
                <span
                  className="text-base font-medium tracking-[0.1em] cursor-pointer hover:opacity-80 transition-opacity active:scale-95 duration-200"
                >
                  JÉRÉMY MASTERING
                </span>
              </Link>
            </div>
          </div>

          {/* Menu burger pour mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="space-y-1.5">
                <div className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Right side - Navigation Desktop */}
          <div className="hidden md:flex flex-1 justify-end">
            <div className="flex gap-8 items-center">
              {navItems.map((item) => (
                <div key={item.path} className="relative group">
                  <Link 
                    href={item.path}
                    aria-label={item.ariaLabel}
                  >
                    <span
                      className={`text-sm tracking-wider font-light relative hover:opacity-100 transition-opacity duration-300 ${pathname === item.path ? 'opacity-100' : 'opacity-70'}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                  <div className={`absolute -bottom-[1px] left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${pathname === item.path ? 'scale-x-100' : ''}`}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg overflow-hidden transition-all duration-300"
            id="mobile-menu"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-6 space-y-5">
              {navItems.map((item) => (
                <div 
                  key={item.path} 
                  className="relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link 
                    href={item.path}
                    aria-label={item.ariaLabel}
                    role="menuitem"
                    className="block py-2"
                  >
                    <span 
                      className={`text-base tracking-wider transition-opacity duration-300 ${pathname === item.path ? 'opacity-100 font-normal' : 'opacity-70 font-light'}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                  <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-black/10 ${pathname === item.path ? 'opacity-100' : 'opacity-50'}`}/>
                </div>
              ))}
              <div className="pt-4 text-xs font-light tracking-wider opacity-50">
                {time} CET
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}