// Type pour un projet
export type Project = {
  id: number
  title: string
  artist: string
  year: string
  category: 'MIXING' | 'MASTERING' | 'SOUND DESIGN' | 'PRODUCTION'
  imageUrl: string
  description: string
  genre?: string
  youtubeUrl?: string
  spotifyUrl?: string
  longDescription?: string
  mixingEngineer?: string
  masteringEngineer?: string
  coverArtist?: string
  hasVideo?: boolean
}

// Données des projets
export const projects: Project[] = [
  {
    id: 1,
    title: "POCHE BLEUE PILLS ROSE",
    artist: "MOT",
    year: "2024",
    category: "MASTERING",
    imageUrl: "/projects/cover_poche_bleu_pills_rose_VF.png",
    description: "Album - Rap/Trap",
    genre: "Rap/Trap",
    youtubeUrl: "https://www.youtube.com/watch?v=yRHxdduiw1E",
    longDescription: "Un single qui mélange des sonorités trap modernes avec une approche créative unique. Le mastering a été réalisé de telle sorte à préserver la dynamique tout en apportant la puissance nécessaire aux basses et la clarté aux voix.",
    mixingEngineer: "@melfe.2",
    masteringEngineer: "Jérémy Mastering",
    coverArtist: "MOT"
  },
  {
    id: 2,
    title: "Onze",
    artist: "Priilick",
    year: "2024",
    category: "MASTERING",
    imageUrl: "/projects/priilick_11.jpg",
    description: "Album - Hip Hop",
    genre: "Hip Hop",
    youtubeUrl: "https://www.youtube.com/watch?v=LK0Wez06CJ8",
    longDescription: "Allez voir le court métrage, c'est des cracks.",
    mixingEngineer: "Priilick",
    masteringEngineer: "Jérémy Mastering",
    coverArtist: "Priilick"
  },
  {
    id: 3,
    title: "À LA FAVEUR DE MON MAL",
    artist: "SUNBURN ft. SHEN G",
    year: "2025",
    category: "MASTERING",
    imageUrl: "/projects/sunburn_mal.jpg",
    description: "Single - Electronic/Rap",
    genre: "Electronic/Rap",
    spotifyUrl: "https://open.spotify.com/intl-fr/album/23cpDFlNG2Ey8T9VMqy51a?si=nmBbECjyQ9KaBeuhpi5uwA",
    longDescription: "",
    mixingEngineer: "Lyre",
    masteringEngineer: "Jérémy Mastering",
    coverArtist: "SUNBURN",
    hasVideo: true
  },
  {
    id: 4,
    title: "MALADE",
    artist: "SASSO",
    year: "2025",
    category: "MASTERING",
    imageUrl: "/projects/sasso_malade.jpeg",
    description: "EP - Rap",
    genre: "Rap",
    youtubeUrl: "https://www.youtube.com/watch?v=e5wXRWin-to",
    longDescription: "",
    mixingEngineer: "Meikyu",
    masteringEngineer: "Jérémy Mastering & Meikyu",
    coverArtist: "Recsa"
  },
  {
    id: 5,
    title: "JOURNAL DE BORD",
    artist: "SUNBURN",
    year: "2024",
    category: "MASTERING",
    imageUrl: "/projects/sunburn_jdb.jpg",
    description: "EP - Electronic",
    genre: "Electronic",
    spotifyUrl: "https://open.spotify.com/intl-fr/album/6EJAFVBVPwCrrMNDKmp3hV?si=0eb2d-9CR0elwhqMgNS0CQ",
    mixingEngineer: "SUNBURN",
    masteringEngineer: "Jérémy Mastering",
    coverArtist: "SUNBURN"
  },
  {
    id: 6,
    title: "MA FAUTE",
    artist: "PRIILICK",
    year: "2025",
    category: "MASTERING",
    imageUrl: "/projects/cover_mafaute.jpg",
    description: "Single - Rap",
    genre: "Rap",
    spotifyUrl: "https://open.spotify.com/intl-fr/track/5dLIkvAeWD7uWCAh0VzhjV?si=158ff23997724a83",
    masteringEngineer: "Jérémy Mastering",
    coverArtist: "PRIILICK"
  },
  {
    id: 7,
    title: "LE RESTE ON VERRA",
    artist: "SOVAJON",
    year: "2025",
    category: "MASTERING",
    imageUrl: "/projects/cover_lacuisson.png",
    description: "EP - Rap",
    genre: "Rap/Electronic",
    spotifyUrl: "https://open.spotify.com/intl-fr/track/3HijXRiGcof2IB4nA8WUji?si=30cfc317f53c4551",
    masteringEngineer: "Jérémy Mastering",
    coverArtist: "MAX DACHEUX"
  },
  {
    id: 8,
    title: "VANJA SIG",
    artist: "INGMAR",
    year: "2025",
    category: "MASTERING",
    imageUrl: "/projects/COVER_VANJASIG.png",
    description: "Single - Rap",
    genre: "Rap",
    spotifyUrl: "https://open.spotify.com/intl-fr/track/1pyoJIQAO98VCoYPYT6o8p?si=2093c8af134f4412",
    masteringEngineer: "Jérémy Mastering"
  },
  {
    id: 9,
    title: "IN TROUBLE",
    artist: "JY",
    year: "2025",
    category: "MASTERING",
    imageUrl: "/projects/COVER_INTROUBLE.jpg",
    description: "Single - Rap",
    genre: "Rap",
    youtubeUrl: "https://www.youtube.com/watch?v=wiI00MgMk1c",
    masteringEngineer: "Jérémy Mastering",
    coverArtist: "JY"
  }
]

// Projets mis en avant sur la page d'accueil
export const featuredProjects: Project[] = [
  projects[5],  // MA FAUTE
  projects[4],  // JOURNAL DE BORD
  projects[2],  // À LA FAVEUR DE MON MAL
  projects[0]   // POCHE BLEUE PILLS ROSE
]