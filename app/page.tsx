"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Project, featuredProjects } from '../data/projects'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useMotionValue(65)
  const spotlightY = useMotionValue(50)
  
  const springConfig = { 
    damping: 20, 
    stiffness: 150,
    mass: 0.5,
    restSpeed: 0.001
  }

  const translateX = useSpring(mouseX, springConfig)
  const translateY = useSpring(mouseY, springConfig)
  const scale = useSpring(1.15, springConfig)
  const smoothSpotlightX = useSpring(spotlightX, { ...springConfig, damping: 30 })
  const smoothSpotlightY = useSpring(spotlightY, { ...springConfig, damping: 30 })

  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    let rafId: number
    
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e
        const moveX = (clientX - window.innerWidth / 2) * 0.025
        const moveY = (clientY - window.innerHeight / 2) * 0.025
        
        mouseX.set(moveX)
        mouseY.set(moveY)
        
        const newSpotlightX = 65 + ((clientX / window.innerWidth) - 0.5) * 20
        const newSpotlightY = 50 + ((clientY / window.innerHeight) - 0.5) * 20
        spotlightX.set(newSpotlightX)
        spotlightY.set(newSpotlightY)
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [mouseX, mouseY, spotlightX, spotlightY])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = 0.5

    const handleTimeUpdate = () => {
      if (video.currentTime >= video.duration - 0.5) {
        setIsTransitioning(true)
      } else {
        setIsTransitioning(false)
      }
    }

    const handleEnded = () => {
      video.currentTime = 0
      video.play()
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Video Container */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          style={{
            x: translateX,
            y: translateY,
            scale,
            margin: '-3%',
            width: '106%',
            height: '106%',
            overflow: 'hidden'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover object-center scale-110 w-full h-full transition-opacity duration-1000"
            style={{ 
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <source src="bg.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      {/* Spotlight overlay */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <motion.div 
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(
                50% 70% at ${smoothSpotlightX.get()}% ${smoothSpotlightY.get()}%, 
                transparent 10%, 
                rgba(245, 245, 245, 0.98) 75%
              ),
              radial-gradient(
                25% 35% at ${smoothSpotlightX.get()}% ${smoothSpotlightY.get()}%,
                rgba(255, 255, 255, 0.15),
                transparent 100%
              )
            `
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center p-8">
        <motion.div 
          className="max-w-3xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-sm mb-4 font-light">2021 — 2025 PRESENT</div>
          <h1 className="text-2xl font-light mb-8 leading-relaxed">
            {"INGÉNIEUR MIXAGE & MASTERING"}
            <br />
            {"INGÉNIEUR DU SON @ JEREMY MASTERING"}
          </h1>
          <p className="text-lg font-light max-w-2xl leading-relaxed">
            {"Ingénieur du son basé à Toulouse, avec une approche orientée sur les détails. Passionné par la création artistique."}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-light text-sm space-y-4 mt-8"
          >
            <div className="flex items-center gap-3 group hover:translate-x-1 transition-transform duration-200">
              <motion.div 
                className="anchor-dot"
                animate={{
                  backgroundColor: ['#000', '#0066ff', '#000'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0
                }}
              />
              <motion.span 
                className="tracking-wider relative"
                whileHover={{ 
                  x: 8,
                  opacity: 1,
                  scale: 1.02,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
                style={{ opacity: 0.85 }}
              >
                {"MIXAGE"}
              </motion.span>
            </div>
            <div className="flex items-center gap-3 group hover:translate-x-1 transition-transform duration-200">
              <motion.div 
                className="anchor-dot"
                animate={{
                  backgroundColor: ['#000', '#0066ff', '#000'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.span 
                className="tracking-wider relative"
                whileHover={{ 
                  x: 8,
                  opacity: 1,
                  scale: 1.02,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
                style={{ opacity: 0.85 }}
              >
                {"MASTERING"}
              </motion.span>
            </div>
            <div className="flex items-center gap-3 group hover:translate-x-1 transition-transform duration-200">
              <motion.div 
                className="anchor-dot"
                animate={{
                  backgroundColor: ['#000', '#0066ff', '#000'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.span 
                className="tracking-wider relative"
                whileHover={{ 
                  x: 8,
                  opacity: 1,
                  scale: 1.02,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
                style={{ opacity: 0.85 }}
              >
                {"PRODUCTION"}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Projets en vedette */}
      <motion.div 
        className="relative z-10 bg-white/95 backdrop-blur-md pt-24 pb-32 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-black/40" />
              <h2 className="text-2xl md:text-3xl font-light">PROJETS RÉCENTS</h2>
            </div>
            <p className="text-base md:text-lg font-light max-w-2xl">
              Une sélection de mes travaux récents de mastering et mixage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <Link href={`/projets`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    {project.hasVideo ? (
                      <video
                        src="/projects/sunburn_mal.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          priority
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-medium truncate max-w-[75%] group-hover:text-black transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="text-xs opacity-70">
                        {project.year}
                      </div>
                    </div>
                    <div className="text-sm text-black/70">
                      {project.artist}
                    </div>
                    <div className="text-xs text-black/60 mt-1">
                      {project.description}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href="/projets" className="group">
              <div className="flex items-center gap-3 py-2 px-4">
                <span className="text-base font-light tracking-wider group-hover:text-black/90 transition-colors">
                  VOIR TOUS LES PROJETS
                </span>
                <motion.div 
                  className="w-5 h-[1px] bg-black/50 group-hover:w-8 transition-all duration-300"
                  whileHover={{ width: 40 }}
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}