# 🎬 FaoDekho - Premium Vintage Streaming App

<div align="center">

![FaoDekho Banner](https://img.shields.io/badge/FaoDekho-Premium%20Streaming-f59e0b?style=for-the-badge&logo=film&logoColor=white)

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TMDB](https://img.shields.io/badge/TMDB-API-01d277?style=flat-square&logo=themoviedatabase)](https://www.themoviedb.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A premium movie streaming web app inspired by Vintage Cinema Aesthetic with Dark/Gold Color Palette**

[🌐 Live Demo](https://fao-dekho.netlify.app/) • [📂 Repository](https://github.com/Mohiuddin-Munna/FaoDekhoApp)

</div>

---

## ✨ Features

### 🎥 Streaming & Download
- **Multiple Streaming Sources** - AutoEmbed, VidSrc, Vidrock
- **Download Support** - dl.vidsrc.vip for Movies & TV Episodes
- **Source Switcher** - Easy dropdown to switch between sources
- **Ad Protection** - Play overlay to protect from ad redirects

### 🎬 Watch Experience
- **Cinema Frame Player** - Gold border with glow effect
- **Smart Fullscreen** - Auto-hide controls, hover to show
- **Episode Selector** - Thumbnail grid with season dropdown
- **Similar Content** - Recommendations below player

### 🏠 Homepage
- **Auto-Slideshow Hero** - Top 10 trending movies rotate every 8 seconds
- **12 Category Rows** - Trending, Top Rated, Popular, Genre-based
- **Perfect Card Fit** - No partial cards, responsive grid
- **Smooth Scroll Arrows** - Desktop navigation with gradient shadow

### 🎨 Design System
- **Vintage Cinema Aesthetic** - Dark theme with gold accents
- **Film Grain Effect** - Subtle animated overlay
- **Vignette Effect** - Radial gradient edges
- **Custom Scrollbar** - Gold accent on hover
- **Cinzel + Manrope** - Premium typography

### 📱 Responsive Design
- **Mobile First** - Optimized for all screen sizes
- **Touch Friendly** - Swipe to scroll on mobile
- **Adaptive Layout** - 2→3→4→5→6→7 cards responsive

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14+](https://nextjs.org/) | Framework (App Router, TypeScript) |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling with @theme directive |
| [Lucide React](https://lucide.dev/) | Icons |
| [TMDB API](https://www.themoviedb.org/) | Movie/TV Data |
| [AutoEmbed](https://autoembed.co/) | Primary Streaming |
| [VidSrc](https://vidsrc.xyz/) | Secondary Streaming |
| [Vidrock](https://vidrock.net/) | Alternative Streaming |
| [dl.vidsrc.vip](https://dl.vidsrc.vip/) | Download Support |

---

## 🎨 Color Palette

| Type | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | void | #0a0a0f | Main App Background |
| Background | deep | #0d0d14 | Secondary Sections/Footer |
| Background | surface | #141420 | Cards/Modals |
| Background | surface-light | #222235 | Hover States |
| Text | text-main | #f5f0e8 | Primary Text |
| Text | text-warm | #e8dcc8 | Body Text |
| Text | text-muted | #a89880 | Secondary/Muted Text |
| Accent | gold | #f59e0b | Primary Action Color |
| Accent | gold-light | #e8c675 | Hover States |
| Accent | gold-dark | #b8923f | Pressed States |
| Border | sepia | #2a2218 | Subtle Borders |
| Border | border-light | #3d352a | Visible Borders |

---

## 📁 Project Structure

| Path | Description |
|------|-------------|
| `app/globals.css` | Design System |
| `app/layout.tsx` | Root Layout |
| `app/page.tsx` | Homepage |
| `app/watch/[type]/[id]/page.tsx` | Watch Page |
| `components/Navbar.tsx` | Fixed Navbar |
| `components/MobileMenu.tsx` | Full Screen Menu |
| `components/Footer.tsx` | Footer |
| `components/Hero.tsx` | Auto-Slideshow Hero |
| `components/MovieRow.tsx` | Horizontal Scroll Row |
| `components/MovieCard.tsx` | Movie/TV Card |
| `components/WatchPlayer.tsx` | Cinema Frame Player |
| `components/EpisodeSelector.tsx` | Episode Grid |
| `lib/fonts.ts` | Google Fonts |
| `lib/types.ts` | TypeScript Interfaces |
| `lib/tmdb.ts` | TMDB API Functions |
| `public/images/` | Fallback Images |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository
2. Navigate to project directory
3. Install dependencies
4. Create `.env.local` file
5. Add your TMDB API Key: `TMDB_API_KEY=your_key_here`
6. Run `npm run dev`
7. Open `http://localhost:3000`

---

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with Hero + 12 Category Rows |
| `/watch/movie/[id]` | Watch Movie |
| `/watch/tv/[id]?s=1&e=1` | Watch TV Episode |
| `/movies` | Browse Movies (Coming Soon) |
| `/series` | Browse TV Series (Coming Soon) |
| `/movie/[id]` | Movie Details (Coming Soon) |
| `/tv/[id]` | TV Details (Coming Soon) |
| `/search` | Search (Coming Soon) |
| `/my-list` | Watchlist (Coming Soon) |

---

## 📺 Streaming Sources

| Source | Movie | TV | Type |
|--------|-------|-----|------|
| AutoEmbed | ✅ | ✅ | Streaming |
| VidSrc | ✅ | ✅ | Streaming |
| Vidrock | ✅ | ✅ | Streaming |
| dl.vidsrc.vip | ✅ | ✅ | Download |

---

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TMDB_API_KEY` | Your TMDB API Key | ✅ Yes |

---

## 🗺️ Roadmap

- [x] Step 1: Project Setup & Design System
- [x] Step 2: Navbar & Layout
- [x] Step 3: TMDB Data Service
- [x] Step 4: Homepage (Hero + Movie Rows)
- [x] Step 5: Watch Page (Player + Episodes)
- [ ] Step 6: Movie/TV Details Page
- [ ] Step 7: Browse Pages (Movies/Series)
- [ ] Step 8: Search Functionality
- [ ] Step 9: Watchlist (My List)
- [ ] Step 10: Static Pages

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This project is for **educational purposes only**. FaoDekho does not host any content. All movie/TV data is fetched from [TMDB](https://www.themoviedb.org/). Streaming links are provided by third-party services. We are not responsible for the content or availability of external sources.

---

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) - Movie & TV Database
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Lucide](https://lucide.dev/) - Icon Library
- [AutoEmbed](https://autoembed.co/) - Streaming Service
- [VidSrc](https://vidsrc.xyz/) - Streaming Service

---

<div align="center">

**Made with ❤️ for Movie Lovers**

🎬 **FaoDekho** - Watch Movies & TV Shows for Free

</div>