'use client'

import { FaYoutube, FaPlay, FaSpotify } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { Project } from '../../data/projects'

type ProjectModalProps = {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const YouTubeThumbnail = ({ videoId, title, onPlay }: { videoId: string, title: string, onPlay: () => void }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const img = document.createElement('img')
    img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    img.onload = () => setIsLoading(false)
    img.onerror = () => setIsLoading(false)

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [videoId])

  return (
    <div className="relative w-full h-full group">
      <div 
        className="absolute inset-0 bg-black/80"
        style={{ 
          opacity: isLoading ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }} 
      />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
      <button
        onClick={onPlay}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div 
          className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-transform duration-200 hover:scale-110"
        >
          <FaPlay className="w-8 h-8 text-white ml-1" />
        </div>
      </button>
    </div>
  )
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(false)
  const [selectedImage, setSelectedImage] = useState<'first' | 'second'>('first')
  
  useEffect(() => {
    if (!isOpen) {
      setIsVideoPlaying(false)
      setThumbnailError(false)
      setSelectedImage('first')
    }

    // Empêcher le défilement du body quand le modal est ouvert
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!project) return null
  if (!isOpen) return null

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVideoPlaying(false)
      onClose()
    }
  }

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const videoId = project.youtubeUrl ? getYoutubeId(project.youtubeUrl) : null
  const hasVideo = Boolean(videoId)
  const hasSecondImage = Boolean(project.secondImageUrl)
  
  const getThumbnailUrl = () => {
    if (!videoId) return project.imageUrl
    if (thumbnailError) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  const handleThumbnailError = () => {
    setThumbnailError(true)
  }

  const getSpotifyEmbedUrl = (url: string) => {
    const albumMatch = url.match(/album\/(.*?)(\?|$)/)
    if (albumMatch) {
      return `https://open.spotify.com/embed/album/${albumMatch[1]}`
    }
    
    const trackMatch = url.match(/track\/(.*?)(\?|$)/)
    if (trackMatch) {
      return `https://open.spotify.com/embed/track/${trackMatch[1]}`
    }
    
    return null
  }

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 opacity-100 transition-opacity duration-300"
        onClick={handleBackgroundClick}
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto opacity-100 transition-opacity duration-300"
        onClick={handleBackgroundClick}
      >
        <div 
          className={`w-full my-auto ${hasVideo ? 'max-w-[95vw] lg:max-w-[1400px]' : 'max-w-2xl'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={() => {
                setIsVideoPlaying(false)
                onClose()
              }}
              className="absolute -top-12 right-0 text-white/60 hover:text-white text-xl font-light z-50 transition-colors duration-200"
            >
              ✕
            </button>

            <div className={`flex flex-col ${hasVideo ? 'lg:flex-row gap-4 lg:gap-8' : ''}`}>
              {/* Image/Video Section */}
              {hasVideo ? (
                <div className="flex-1 min-h-[200px]">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-background/80 backdrop-blur-xl">
                    {!isVideoPlaying ? (
                      <YouTubeThumbnail
                        videoId={videoId!}
                        title={project.title}
                        onPlay={() => setIsVideoPlaying(true)}
                      />
                    ) : (
                      <div className="w-full h-full aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                          title={`${project.title} - ${project.artist}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 min-h-[200px] mb-4 lg:mb-0">
                  <div className="relative aspect-square sm:aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-lg bg-background/80 backdrop-blur-xl">
                    <div className="w-full h-full relative">
                      <Image 
                        src={selectedImage === 'first' ? project.imageUrl : project.secondImageUrl || project.imageUrl}
                        alt={`${project.title} - ${project.artist}`}
                        fill
                        className="object-contain rounded-lg transition-opacity duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  
                  {/* Image selector buttons - only show if there's a second image */}
                  {hasSecondImage && (
                    <div className="flex justify-center mt-4 space-x-4">
                      <button 
                        onClick={() => setSelectedImage('first')}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedImage === 'first' ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                        aria-label="View first image"
                      />
                      <button 
                        onClick={() => setSelectedImage('second')}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedImage === 'second' ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                        aria-label="View second image"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Info Section */}
              <div 
                className={`
                  ${hasVideo ? 'lg:w-1/3' : 'w-full max-w-2xl'} 
                  bg-background/30 backdrop-blur-lg 
                  p-4 sm:p-6 lg:p-8 rounded-2xl 
                  ${!hasVideo ? 'mx-auto' : ''} 
                  border border-white/5 
                  shadow-2xl shadow-black/10
                  opacity-100 transition-opacity duration-500
                `}
              >
                <div className="space-y-4 lg:space-y-8">
                  {/* Titre et Artiste */}
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-light tracking-wide text-white mb-2 lg:mb-3 glow-text-modal">
                      {project.title}
                    </h2>
                    <p className="text-sm lg:text-base text-white/70 font-light tracking-wider">{project.artist}</p>
                  </div>

                  {/* Description */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-sm lg:text-base text-white/80 font-light leading-relaxed tracking-wide">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Credits */}
                  <div className="space-y-3 lg:space-y-4 border-t border-white/10 pt-4 lg:pt-6">
                    {project.mixingEngineer && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs lg:text-sm text-white/50 uppercase tracking-wider">Mixing</span>
                        <span className="text-xs lg:text-sm font-light text-white tracking-wide">{project.mixingEngineer}</span>
                      </div>
                    )}
                    
                    {project.masteringEngineer && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs lg:text-sm text-white/50 uppercase tracking-wider">Mastering</span>
                        <span className="text-xs lg:text-sm font-light text-white tracking-wide">{project.masteringEngineer}</span>
                      </div>
                    )}
                    
                    {project.coverArtist && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs lg:text-sm text-white/50 uppercase tracking-wider">Cover</span>
                        <span className="text-xs lg:text-sm font-light text-white tracking-wide">{project.coverArtist}</span>
                      </div>
                    )}
                  </div>

                  {/* Section média */}
                  <div className="mt-4 lg:mt-8">
                    {project.youtubeUrl ? (
                      <a
                        href={project.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-3 text-white/60 hover:text-white transition-all group"
                      >
                        <FaYoutube className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="text-xs lg:text-sm font-light tracking-wider group-hover:tracking-widest transition-all">
                          Watch on YouTube
                        </span>
                      </a>
                    ) : project.spotifyUrl ? (
                      <div className="relative w-full h-[300px] lg:h-[380px] overflow-hidden rounded-lg bg-black/5">
                        <iframe
                          src={`${getSpotifyEmbedUrl(project.spotifyUrl)}?theme=0`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          title={`${project.title} - ${project.artist} on Spotify`}
                          style={{ borderRadius: '12px', border: 'none' }}
                          className="w-full bg-transparent"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}