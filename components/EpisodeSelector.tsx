// components/EpisodeSelector.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, ChevronLeft, ChevronRight, Play, Check, Layers, ListVideo, Download } from 'lucide-react';
import { Season, Episode } from '@/lib/types';
import { getStillUrl, getDownloadTVUrl } from '@/lib/tmdb';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════
interface EpisodeSelectorProps {
  seasons: Season[];
  episodes: Episode[];
  currentSeason: number;
  currentEpisode: number;
  tmdbId: number; // Added for download URL
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function EpisodeSelector({
  seasons,
  episodes,
  currentSeason,
  currentEpisode,
  tmdbId,
}: EpisodeSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const episodesContainerRef = useRef<HTMLDivElement>(null);

  // Navigate to a specific episode
  const navigateToEpisode = (season: number, episode: number) => {
    router.push(`${pathname}?s=${season}&e=${episode}`);
  };

  // Open download link in new tab
  const handleDownload = (e: React.MouseEvent, episodeNumber: number) => {
    e.stopPropagation(); // Prevent card click
    const downloadUrl = getDownloadTVUrl(tmdbId, currentSeason, episodeNumber);
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };

  // Check scroll position to show/hide arrows
  const checkScrollPosition = useCallback(() => {
    const container = episodesContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // Scroll function
  const scroll = (direction: 'left' | 'right') => {
    const container = episodesContainerRef.current;
    if (!container) return;

    // Scroll 75% of container width (same as MovieRow)
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Scroll to current episode on mount
  useEffect(() => {
    if (episodesContainerRef.current) {
      const currentEpisodeElement = episodesContainerRef.current.querySelector(
        `[data-episode="${currentEpisode}"]`
      );
      if (currentEpisodeElement) {
        currentEpisodeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
      
      // Check scroll position after scrolling to current episode
      setTimeout(checkScrollPosition, 500);
    }
  }, [currentEpisode, checkScrollPosition]);

  // Check scroll position on mount and resize
  useEffect(() => {
    checkScrollPosition();
    
    const container = episodesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
    }
    
    window.addEventListener('resize', checkScrollPosition);
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition, episodes]);

  // Get current season info
  const currentSeasonInfo = seasons.find((s) => s.season_number === currentSeason);

  return (
    <div className="space-y-4">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-cinzel text-lg text-text-main flex items-center gap-2">
          <ListVideo className="w-5 h-5 text-gold" />
          Episodes
        </h3>

        {/* Season Selector */}
        <div className="relative">
          <button
            onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
            className="
              flex items-center gap-2
              bg-surface hover:bg-surface-light
              border border-sepia hover:border-gold/50
              rounded-vintage px-4 py-2
              text-sm text-text-main
              transition-all duration-300
              w-full sm:w-auto justify-between sm:justify-start
            "
          >
            <Layers className="w-4 h-4 text-gold" />
            <span>Season {currentSeason}</span>
            {currentSeasonInfo && (
              <span className="text-text-muted ml-1">
                ({currentSeasonInfo.episode_count} episodes)
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 ml-auto sm:ml-2 transition-transform duration-300 ${
                isSeasonDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Season Dropdown */}
          {isSeasonDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsSeasonDropdownOpen(false)}
              />
              <div
                className="
                  absolute right-0 sm:left-0 top-full mt-2 z-50
                  w-full sm:w-64
                  max-h-64 overflow-y-auto
                  bg-surface border border-sepia
                  rounded-vintage
                  shadow-cinema
                  animate-scale-in origin-top
                "
              >
                {seasons.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => {
                      navigateToEpisode(season.season_number, 1);
                      setIsSeasonDropdownOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3
                      text-sm text-left
                      transition-colors duration-200
                      ${
                        currentSeason === season.season_number
                          ? 'bg-gold/10 text-gold'
                          : 'text-text-warm hover:bg-surface-light hover:text-text-main'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {currentSeason === season.season_number && (
                        <Check className="w-4 h-4" />
                      )}
                      <span>{season.name}</span>
                    </div>
                    <span className="text-text-muted text-xs">
                      {season.episode_count} eps
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          EPISODES GRID WITH ARROWS (MovieRow Style)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative group/episodes">
        {/* ─────────────────────────────────────────────────────────────────
            LEFT ARROW - Full Height with Gradient Shadow
            ───────────────────────────────────────────────────────────── */}
        <button
          onClick={() => scroll('left')}
          className={`
            absolute left-0 top-0 bottom-0 z-20
            w-10 sm:w-12 md:w-14 lg:w-16
            bg-linear-to-r from-void via-void/80 to-transparent
            hidden md:flex items-center justify-start pl-1 sm:pl-2
            transition-opacity duration-300
            ${canScrollLeft 
              ? 'opacity-0 group-hover/episodes:opacity-100' 
              : 'opacity-0 pointer-events-none'
            }
          `}
          aria-label="Scroll left"
        >
          <div className="btn-icon w-8 h-8 sm:w-10 sm:h-10 bg-surface/90 hover:bg-gold hover:text-void border-sepia">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </button>

        {/* ─────────────────────────────────────────────────────────────────
            EPISODES SCROLL CONTAINER
            ───────────────────────────────────────────────────────────── */}
        <div
          ref={episodesContainerRef}
          className="
            flex gap-4
            overflow-x-auto scrollbar-hide
            scroll-smooth snap-x snap-mandatory
            pb-2
          "
        >
          {episodes.map((episode) => {
            const isCurrentEpisode = episode.episode_number === currentEpisode;
            
            return (
              <button
                key={episode.id}
                data-episode={episode.episode_number}
                onClick={() => navigateToEpisode(currentSeason, episode.episode_number)}
                className={`
                  shrink-0 snap-start
                  w-full
                  sm:w-[calc(50%-8px)]
                  md:w-[calc(33.33%-10.67px)]
                  lg:w-[calc(25%-12px)]
                  bg-surface hover:bg-surface-light
                  border rounded-vintage overflow-hidden
                  transition-all duration-300
                  group
                  ${
                    isCurrentEpisode
                      ? 'border-gold shadow-gold-sm'
                      : 'border-sepia hover:border-gold/50'
                  }
                `}
              >
                {/* Episode Thumbnail */}
                <div className="relative aspect-video bg-deep">
                  {episode.still_path ? (
                    <Image
                      src={getStillUrl(episode.still_path, 'w300')}
                      alt={episode.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-text-muted" />
                    </div>
                  )}

                  {/* Play Overlay */}
                  <div
                    className={`
                      absolute inset-0 
                      bg-void/60 backdrop-blur-[2px]
                      flex items-center justify-center
                      transition-opacity duration-300
                      ${isCurrentEpisode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    `}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-full
                        flex items-center justify-center
                        transition-transform duration-300
                        ${isCurrentEpisode ? 'bg-gold' : 'bg-gold/80 group-hover:scale-110'}
                      `}
                    >
                      {isCurrentEpisode ? (
                        <span className="text-void text-xs font-bold">NOW</span>
                      ) : (
                        <Play className="w-5 h-5 text-void fill-void ml-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Episode Number Badge */}
                  <div
                    className={`
                      absolute top-2 left-2
                      px-2 py-0.5 rounded-full
                      text-xs font-medium
                      ${
                        isCurrentEpisode
                          ? 'bg-gold text-void'
                          : 'bg-void/70 text-text-warm'
                      }
                    `}
                  >
                    E{episode.episode_number}
                  </div>

                  {/* Download Button - Top Right */}
                  <div
                    onClick={(e) => handleDownload(e, episode.episode_number)}
                    className={`
                      absolute top-2 right-2
                      w-7 h-7 rounded-full
                      bg-void/80 hover:bg-gold
                      flex items-center justify-center
                      cursor-pointer
                      transition-all duration-300
                      opacity-0 group-hover:opacity-100
                      ${isCurrentEpisode ? 'opacity-100' : ''}
                    `}
                    title="Download Episode"
                  >
                    <Download className="w-3.5 h-3.5 text-text-warm hover:text-void" />
                  </div>
                </div>

                {/* Episode Info */}
                <div className="p-3">
                  <p
                    className={`
                      text-sm font-medium line-clamp-1
                      ${isCurrentEpisode ? 'text-gold' : 'text-text-main'}
                    `}
                  >
                    {episode.name}
                  </p>
                  {episode.runtime && (
                    <p className="text-xs text-text-muted mt-1">
                      {episode.runtime} min
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            RIGHT ARROW - Full Height with Gradient Shadow
            ───────────────────────────────────────────────────────────── */}
        <button
          onClick={() => scroll('right')}
          className={`
            absolute right-0 top-0 bottom-0 z-20
            w-10 sm:w-12 md:w-14 lg:w-16
            bg-linear-to-l from-void via-void/80 to-transparent
            hidden md:flex items-center justify-end pr-1 sm:pr-2
            transition-opacity duration-300
            ${canScrollRight 
              ? 'opacity-0 group-hover/episodes:opacity-100' 
              : 'opacity-0 pointer-events-none'
            }
          `}
          aria-label="Scroll right"
        >
          <div className="btn-icon w-8 h-8 sm:w-10 sm:h-10 bg-surface/90 hover:bg-gold hover:text-void border-sepia">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          EPISODE COUNT INFO
          ═══════════════════════════════════════════════════════════════ */}
      <div className="text-xs text-text-muted text-center sm:text-left">
        Episode {currentEpisode} of {episodes.length} in Season {currentSeason}
      </div>
    </div>
  );
}