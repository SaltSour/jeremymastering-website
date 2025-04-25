'use client'

import "./globals.css"
import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'

// Dynamically import components with proper loading strategies
const Navigation = dynamic(() => import('./components/Navigation'), {
  ssr: true,
  loading: () => <div className="h-[70px]"></div>
})
// Désactiver le SSR pour le Footer pour éviter les problèmes d'hydratation
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const LoadingScreen = dynamic(() => import('./components/LoadingScreen'), { ssr: false })

// Font optimization with proper subsets
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif'],
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Jérémy Mastering",
  "image": "https://www.jeremy-mastering.com/photomoi.jpg",
  "description": "Studio de mastering professionnel à Toulouse - Ingénieur mixage et mastering",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toulouse",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.604652",
    "longitude": "1.444209"
  },
  "url": "https://www.jeremy-mastering.com",
  "telephone": "+33600000000",
  "priceRange": "€€",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://www.instagram.com/jeremymastering"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPage = pathname === '/admin'

  // Performance monitoring and optimization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Lazy load non-critical resources after main content
      const lazyLoadNonCritical = () => {
        // Add prefetch for potential next pages
        if (pathname === '/projets') {
          const linkAbout = document.createElement('link');
          linkAbout.rel = 'prefetch';
          linkAbout.href = '/about';
          document.head.appendChild(linkAbout);
        } else if (pathname === '/about') {
          const linkProjects = document.createElement('link');
          linkProjects.rel = 'prefetch';
          linkProjects.href = '/projets';
          document.head.appendChild(linkProjects);
        }
      };

      // Load monitoring after main content
      setTimeout(lazyLoadNonCritical, 2000);
    }
  }, [pathname]);

  return (
    <html lang="fr" dir="ltr" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        <title>Jérémy Mastering | Studio de Mastering Professionnel à Toulouse</title>
        <meta name="title" content="Jérémy Mastering | Studio de Mastering Professionnel à Toulouse" />
        <meta name="description" content="Studio de mastering professionnel à Toulouse spécialisé dans le mastering audio de haute qualité. Services de mixage et mastering pour tous genres musicaux." />
        <meta name="keywords" content="mastering, mixage, mastering audio, studio mastering, mastering professionnel, mastering musique, mastering toulouse, studio toulouse, mastering électronique, mastering rap" />
        <meta name="author" content="Jérémy Mastering" />
        <meta name="robots" content="index, follow" />

        {/* Performance optimizations */}
        <meta name="theme-color" content="#ffffff" />
        <link rel="dns-prefetch" href="//www.jeremy-mastering.com" />
        <link rel="preconnect" href="//www.jeremy-mastering.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical assets */}
        <link rel="preload" href="/fonts/NeueMontreal-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />

        {/* Mobile optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* Favicons */}
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icons/icon-192x192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icons/icon-512x512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="mask-icon" href="/icons/icon.svg" color="#000000" />

        {/* SEO tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jeremy-mastering.com/" />
        <meta property="og:title" content="Jérémy Mastering | Studio de Mastering Professionnel à Toulouse" />
        <meta property="og:description" content="Studio de mastering professionnel à Toulouse spécialisé dans le mastering audio de haute qualité. Services de mixage et mastering pour tous genres musicaux." />
        <meta property="og:image" content="https://www.jeremy-mastering.com/photomoi.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Jérémy Mastering - Studio de mastering professionnel à Toulouse" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Jérémy Mastering" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.jeremy-mastering.com/" />
        <meta name="twitter:title" content="Jérémy Mastering | Studio de Mastering Professionnel à Toulouse" />
        <meta name="twitter:description" content="Studio de mastering professionnel à Toulouse spécialisé dans le mastering audio de haute qualité. Services de mixage et mastering pour tous genres musicaux." />
        <meta name="twitter:image" content="https://www.jeremy-mastering.com/photomoi.jpg" />
        <meta name="twitter:image:alt" content="Jérémy Mastering - Studio de mastering professionnel à Toulouse" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <div className={`min-h-screen flex flex-col ${isAdminPage ? '' : ''}`}>
          <Navigation />

          <main className="flex-1 w-full">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}