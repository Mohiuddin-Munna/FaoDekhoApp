// components/MovieCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Star, Film } from 'lucide-react';
import { Movie, TVShow } from '@/lib/types';
import { getPosterUrl, formatYear, formatVoteAverage } from '@/lib/tmdb';

interface MovieCardProps {
  item: Movie | TVShow;
  priority?: boolean;
}

export default function MovieCard({ item, priority = false }: MovieCardProps) {
  // ─────────────────────────────────────────────────────────────────────
  // Determine if it's a Movie or TV Show
  // ─────────────────────────────────────────────────────────────────────
  const isMovie = 'title' in item;
  
  const title = isMovie ? item.title : item.name;
  const releaseDate = isMovie ? item.release_date : item.first_air_date;
  const year = formatYear(releaseDate);
  const rating = formatVoteAverage(item.vote_average);
  
  const mediaType = isMovie ? 'movie' : 'tv';
  const href = `/watch/${mediaType}/${item.id}`;

  return (
    <Link href={href} className="card group cursor-pointer block">
      {/* ═══════════════════════════════════════════════════════════════════
          POSTER IMAGE
          ═══════════════════════════════════════════════════════════════ */}
      <div className="movie-poster bg-surface-light relative">
        {item.poster_path ? (
          <Image
            src={getPosterUrl(item.poster_path, 'w342')}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <Film className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-text-muted" />
          </div>
        )}
        
        {/* ─────────────────────────────────────────────────────────────────
            HOVER OVERLAY with Play Button
            ───────────────────────────────────────────────────────────── */}
        <div className="movie-poster-overlay">
          <div className="btn-icon w-10 h-10 sm:w-12 sm:h-12 bg-gold/90 hover:bg-gold text-void border-0">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          </div>
        </div>
        
        {/* ─────────────────────────────────────────────────────────────────
            RATING BADGE (Top Right)
            ───────────────────────────────────────────────────────────── */}
        {item.vote_average > 0 && (
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-void/80 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold fill-gold" />
            <span className="text-[10px] sm:text-xs font-medium text-text-main">{rating}</span>
          </div>
        )}
      </div>
      
      {/* ═══════════════════════════════════════════════════════════════════
          MOVIE INFO
          ═══════════════════════════════════════════════════════════════ */}
      <div className="p-2 sm:p-3">
        <h3 className="font-cinzel text-xs sm:text-sm text-text-main line-clamp-1 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5 text-[10px] sm:text-xs text-text-muted">
          <span>{year}</span>
          {!isMovie && (
            <>
              <span>•</span>
              <span className="text-gold-dark">TV</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}