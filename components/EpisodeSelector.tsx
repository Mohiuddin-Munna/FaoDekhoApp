// components/EpisodeSelector.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, Play, Check, Layers, ListVideo } from 'lucide-react';
import { Season, Episode } from '@/lib/types';
import { getStillUrl } from '@/lib/tmdb';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════
interface EpisodeSelectorProps {
  seasons: Season[];
  episodes: Episode[];
  currentSeason: number;
  currentEpisode: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function EpisodeSelector({
  seasons,
  episodes,
  currentSeason,
  currentEpisode,
}: EpisodeSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const episodesContainerRef = useRef<HTMLDivElement>(null);

  // Navigate to a specific episode
  const navigateToEpisode = (season: number, episode: number) => {
    router.push(`${pathname}?s=${season}&e=${episode}`);
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
    }
  }, [currentEpisode]);

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
          EPISODES GRID
          ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={episodesContainerRef}
        className="
          flex gap-3 sm:gap-4
          overflow-x-auto scrollbar-hide
          scroll-smooth snap-x snap-mandatory
          pb-2
          -mx-4 px-4 sm:mx-0 sm:px-0
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
                w-56 sm:w-64
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
                    sizes="256px"
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

      {/* ═══════════════════════════════════════════════════════════════════
          EPISODE COUNT INFO
          ═══════════════════════════════════════════════════════════════ */}
      <div className="text-xs text-text-muted text-center sm:text-left">
        Episode {currentEpisode} of {episodes.length} in Season {currentSeason}
      </div>
    </div>
  );
}