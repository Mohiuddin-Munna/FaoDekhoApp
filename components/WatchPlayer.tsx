// components/WatchPlayer.tsx
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Server, AlertCircle, Play, Maximize2, Minimize2 } from 'lucide-react';
import {
  getAutoEmbedMovieUrl,
  getAutoEmbedTVUrl,
  getVidSrcMovieUrl,
  getVidSrcTVUrl,
} from '@/lib/tmdb';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════
interface WatchPlayerProps {
  type: 'movie' | 'tv';
  tmdbId: number;
  title: string;
  season?: number;
  episode?: number;
  episodeTitle?: string;
}

type SourceType = 'autoembed' | 'vidsrc';

interface Source {
  id: SourceType;
  name: string;
  getUrl: () => string;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function WatchPlayer({
  type,
  tmdbId,
  title,
  season = 1,
  episode = 1,
  episodeTitle,
}: WatchPlayerProps) {
  const [currentSource, setCurrentSource] = useState<SourceType>('autoembed');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(false);
  
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define sources based on type
  const sources: Source[] =
    type === 'movie'
      ? [
          {
            id: 'autoembed',
            name: 'AutoEmbed',
            getUrl: () => getAutoEmbedMovieUrl(tmdbId),
          },
          {
            id: 'vidsrc',
            name: 'VidSrc',
            getUrl: () => getVidSrcMovieUrl(tmdbId),
          },
        ]
      : [
          {
            id: 'autoembed',
            name: 'AutoEmbed',
            getUrl: () => getAutoEmbedTVUrl(tmdbId, season, episode),
          },
          {
            id: 'vidsrc',
            name: 'VidSrc',
            getUrl: () => getVidSrcTVUrl(tmdbId, season, episode),
          },
        ];

  const currentSourceData = sources.find((s) => s.id === currentSource);
  const playerUrl = currentSourceData?.getUrl() || '';

  const handleSourceChange = (sourceId: SourceType) => {
    setCurrentSource(sourceId);
    setHasError(false);
    setIsPlayerActive(false);
    setIsDropdownOpen(false);
  };

  const activatePlayer = () => {
    setIsPlayerActive(true);
  };

  // Start hide timer
  const startHideTimer = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    
    hideTimeoutRef.current = setTimeout(() => {
      setShowFullscreenButton(false);
    }, 3000);
  }, []);

  // Show button and start timer
  const showButton = useCallback(() => {
    setShowFullscreenButton(true);
    startHideTimer();
  }, [startHideTimer]);

  // Fullscreen toggle function
  const toggleFullscreen = async () => {
    if (!playerContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await playerContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
        setShowFullscreenButton(true);
        startHideTimer();
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
        setShowFullscreenButton(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFS = !!document.fullscreenElement;
      setIsFullscreen(isFS);
      
      if (isFS) {
        setShowFullscreenButton(true);
        startHideTimer();
      } else {
        setShowFullscreenButton(false);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [startHideTimer]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════════════════════════════════════════════════════
          PLAYER HEADER
          ═══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Title */}
        <div className="flex-1 min-w-0">
          <h2 className="font-cinzel text-lg sm:text-xl text-text-main truncate">
            {title}
          </h2>
          {type === 'tv' && (
            <p className="text-text-muted text-sm mt-0.5">
              S{season} E{episode}
              {episodeTitle && ` · ${episodeTitle}`}
            </p>
          )}
        </div>

        {/* Source Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="
              flex items-center gap-2 
              bg-surface hover:bg-surface-light
              border border-sepia hover:border-gold/50
              rounded-vintage px-4 py-2
              text-sm text-gold
              transition-all duration-300
              w-full sm:w-auto justify-between sm:justify-start
            "
          >
            <Server className="w-4 h-4" />
            <span>{currentSourceData?.name || 'Select Source'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* Menu */}
              <div
                className="
                  absolute right-0 top-full mt-2 z-50
                  w-full sm:w-48
                  bg-surface border border-sepia
                  rounded-vintage overflow-hidden
                  shadow-cinema
                  animate-scale-in origin-top-right
                "
              >
                {sources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => handleSourceChange(source.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3
                      text-sm text-left
                      transition-colors duration-200
                      ${
                        currentSource === source.id
                          ? 'bg-gold/10 text-gold border-l-2 border-gold'
                          : 'text-text-warm hover:bg-surface-light hover:text-text-main border-l-2 border-transparent'
                      }
                    `}
                  >
                    <Server className="w-4 h-4" />
                    {source.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CINEMA FRAME PLAYER
          ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={playerContainerRef}
        className={`
          relative
          rounded-vintage
          border-2 border-gold/30 hover:border-gold/60
          shadow-cinema
          transition-all duration-500
          overflow-hidden
          ${isFullscreen ? 'rounded-none border-0' : ''}
        `}
      >
        {/* Gold Glow Effect */}
        {!isFullscreen && (
          <div
            className="
              absolute -inset-0.5 rounded-vintage
              bg-linear-to-r from-gold/20 via-gold/10 to-gold/20
              opacity-0 hover:opacity-100
              blur-sm transition-opacity duration-500
              pointer-events-none
              -z-10
            "
          />
        )}

        {/* Player Container */}
        <div className={`relative bg-deep overflow-hidden ${isFullscreen ? 'h-screen' : 'aspect-video'}`}>
          {hasError ? (
            /* Error State */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 z-10">
              <AlertCircle className="w-12 h-12 text-gold/50" />
              <div className="text-center">
                <p className="text-text-main font-medium mb-1">
                  Unable to load video
                </p>
                <p className="text-text-muted text-sm">
                  Try switching to a different source
                </p>
              </div>
              <button
                onClick={() => {
                  const nextSource = sources.find((s) => s.id !== currentSource);
                  if (nextSource) handleSourceChange(nextSource.id);
                }}
                className="btn-secondary text-sm"
              >
                Try {sources.find((s) => s.id !== currentSource)?.name}
              </button>
            </div>
          ) : (
            <>
              {/* Iframe Player */}
              <iframe
                key={`${currentSource}-${season}-${episode}`}
                src={playerUrl}
                className="absolute inset-0 w-full h-full border-0"
                style={{ overflow: 'hidden' }}
                allowFullScreen
                scrolling="no"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="origin"
                onError={() => setHasError(true)}
              />

              {/* ═══════════════════════════════════════════════════════════
                  PLAY OVERLAY - Click to Activate Player
                  Protects from ad redirects on first click
                  ═══════════════════════════════════════════════════════ */}
              {!isPlayerActive && (
                <div
                  onClick={activatePlayer}
                  className="
                    absolute inset-0 z-20
                    bg-void/80 backdrop-blur-sm
                    flex flex-col items-center justify-center gap-4
                    cursor-pointer
                    transition-all duration-300
                    hover:bg-void/70
                    group/overlay
                  "
                >
                  {/* Play Button */}
                  <div
                    className="
                      w-20 h-20 sm:w-24 sm:h-24
                      rounded-full
                      bg-gold/90 hover:bg-gold
                      flex items-center justify-center
                      shadow-gold-glow
                      transition-all duration-300
                      group-hover/overlay:scale-110
                    "
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-void fill-void ml-1" />
                  </div>

                  {/* Text */}
                  <div className="text-center px-4">
                    <p className="text-text-main font-medium text-lg">
                      Click to Watch
                    </p>
                    <p className="text-text-muted text-sm mt-1">
                      {title}
                      {type === 'tv' && ` · S${season} E${episode}`}
                    </p>
                  </div>

                  {/* Note */}
                  <p className="text-text-muted/70 text-xs mt-2 px-4 text-center max-w-sm">
                    After clicking, press the play button inside the player to start
                  </p>
                </div>
              )}

              {/* ═══════════════════════════════════════════════════════════
                  HOVER ZONES - Desktop Only
                  
                  Layout Design:
                  ┌────────────────────────────────────────┐
                  │                              ┌───────┐ │
                  │                              │ RIGHT │ │
                  │                              │ ZONE  │ │
                  │      [VIDEO CONTENT]         │ (40%) │ │
                  │                              │       │ │
                  │                              └───────┘ │
                  ├────────────────────────────────────────┤
                  │  [Native Controls - Leave Free 15%]    │
                  └────────────────────────────────────────┘
                  
                  - Right zone: Right 40% width, top 85% height
                  - Bottom 15% is left free for native player controls
                  ═══════════════════════════════════════════════════════ */}
              {isPlayerActive && (
                <div
                  onMouseEnter={showButton}
                  onMouseLeave={() => startHideTimer()}
                  className={`
                    absolute z-25
                    hidden md:block
                    top-0 right-0
                    w-2/5
                    ${isFullscreen ? 'h-[85%]' : 'h-[85%]'}
                  `}
                />
              )}

              {/* ═══════════════════════════════════════════════════════════
                  FULLSCREEN BUTTON
                  
                  Desktop (md+):
                  - Hidden by default
                  - Shows when mouse enters hover zone
                  - Auto-hides after 3 seconds
                  - Position: Above native controls (bottom-16)
                  
                  Mobile (<md):
                  - Hidden in normal mode (use button below player)
                  - In fullscreen: Shows at TOP-right (native controls at bottom)
                  - Semi-transparent, always visible in fullscreen
                  ═══════════════════════════════════════════════════════ */}
              {isPlayerActive && (
                <button
                  onClick={toggleFullscreen}
                  onMouseEnter={() => {
                    setShowFullscreenButton(true);
                    if (hideTimeoutRef.current) {
                      clearTimeout(hideTimeoutRef.current);
                    }
                  }}
                  onMouseLeave={() => {
                    startHideTimer();
                  }}
                  className={`
                    absolute z-30
                    items-center gap-2
                    bg-void/90 hover:bg-gold
                    backdrop-blur-sm
                    border border-gold/30 hover:border-gold
                    rounded-lg px-3 py-2
                    text-text-main hover:text-void
                    transition-all duration-300
                    ${isFullscreen 
                      ? `
                          flex
                          top-4 right-4
                          md:top-auto md:bottom-20 md:right-6
                          opacity-70 hover:opacity-100
                          md:transition-opacity md:duration-300
                          ${showFullscreenButton ? 'md:opacity-100' : 'md:opacity-0 md:pointer-events-none'}
                        ` 
                      : `
                          hidden md:flex
                          bottom-20 right-3
                          ${showFullscreenButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        `
                    }
                  `}
                  title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      <span className="text-xs font-medium">Exit</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4" />
                      <span className="text-xs font-medium hidden sm:inline">Fullscreen</span>
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SOURCE INFO & CONTROLS
          ═══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-text-muted">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <p>
            If video doesn&apos;t play, try switching the source above.
          </p>
          {/* Clickable Fullscreen Button - Always visible, good for mobile */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 text-gold hover:text-gold-light transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>
        </div>
        
        <p className="hidden sm:block">
          Current: <span className="text-gold">{currentSourceData?.name}</span>
        </p>
      </div>
    </div>
  );
}