// app/watch/[type]/[id]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Star, Tv, Film } from 'lucide-react';

// Components
import WatchPlayer from '@/components/WatchPlayer';
import EpisodeSelector from '@/components/EpisodeSelector';
import MovieRow from '@/components/MovieRow';

// TMDB Functions
import {
  getMovieDetails,
  getTVDetails,
  getSeasonDetails,
  getPosterUrl,
  formatRuntime,
  formatYear,
  formatVoteAverage,
} from '@/lib/tmdb';

// Types
import { SeasonDetails } from '@/lib/types';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════
interface WatchPageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
  searchParams: Promise<{
    s?: string;
    e?: string;
  }>;
}

// ═══════════════════════════════════════════════════════════════════════════
// LOADING SKELETON
// ═══════════════════════════════════════════════════════════════════════════
function PlayerSkeleton() {
  return (
    <div className="w-full aspect-video bg-surface rounded-vintage animate-pulse border-2 border-gold/20" />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const { type, id } = await params;
  const { s, e } = await searchParams;

  // Validate type
  if (type !== 'movie' && type !== 'tv') {
    notFound();
  }

  // Parse ID
  const mediaId = parseInt(id, 10);
  if (isNaN(mediaId)) {
    notFound();
  }

  // Parse season and episode for TV (default to 1)
  const seasonNumber = parseInt(s || '1', 10);
  const episodeNumber = parseInt(e || '1', 10);

  try {
    // ═══════════════════════════════════════════════════════════════════════
    // MOVIE WATCH PAGE
    // ═══════════════════════════════════════════════════════════════════════
    if (type === 'movie') {
      const movie = await getMovieDetails(mediaId);

      if (!movie || !movie.id) {
        notFound();
      }

      // Get similar movies for the row
      const similarMovies = movie.similar?.results || [];

      return (
        <div className="min-h-screen bg-void">
          {/* ═══════════════════════════════════════════════════════════════
              HEADER WITH BACK BUTTON
              ═══════════════════════════════════════════════════════════ */}
          <div className="pt-20 sm:pt-24 pb-4 sm:pb-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <Link
                href={`/movie/${movie.id}`}
                className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Back to Details</span>
              </Link>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              PLAYER SECTION
              ═══════════════════════════════════════════════════════════ */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-6xl mx-auto">
              <Suspense fallback={<PlayerSkeleton />}>
                <WatchPlayer
                  type="movie"
                  tmdbId={movie.id}
                  title={movie.title}
                />
              </Suspense>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              METADATA SECTION
              ═══════════════════════════════════════════════════════════ */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Poster - Hidden on mobile, shown on lg+ */}
                <div className="hidden lg:block w-48 shrink-0">
                  <div className="aspect-2/3 rounded-vintage overflow-hidden border border-sepia relative">
                    <Image
                      src={getPosterUrl(movie.poster_path, 'w342')}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4">
                  {/* Title */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium uppercase tracking-wide rounded-full bg-gold/15 text-gold border border-gold/30">
                        <Film className="w-3 h-3 shrink-0" />
                        <span>Movie</span>
                      </span>
                    </div>
                    <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-text-main">
                      {movie.title}
                    </h1>
                    {movie.tagline && (
                      <p className="text-text-muted italic mt-2">&quot;{movie.tagline}&quot;</p>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-text-warm">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-gold shrink-0" />
                      <span>{formatVoteAverage(movie.vote_average)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-text-muted shrink-0" />
                      <span>{formatYear(movie.release_date)}</span>
                    </div>
                    {movie.runtime > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-text-muted shrink-0" />
                        <span>{formatRuntime(movie.runtime)}</span>
                      </div>
                    )}
                  </div>

                  {/* Genres */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span 
                          key={genre.id} 
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-surface-light text-text-warm border border-border-light"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Overview */}
                  <div>
                    <h3 className="font-cinzel text-lg text-text-main mb-2">Overview</h3>
                    <p className="text-text-muted leading-relaxed">
                      {movie.overview || 'No overview available.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              SIMILAR MOVIES
              ═══════════════════════════════════════════════════════════ */}
          {similarMovies.length > 0 && (
            <MovieRow
              title="You May Also Like"
              items={similarMovies}
              iconName="sparkles"
            />
          )}

          {/* Bottom Spacing */}
          <div className="h-8 sm:h-12" />
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════════════════════
    // TV SHOW WATCH PAGE
    // ═══════════════════════════════════════════════════════════════════════
    const tvShow = await getTVDetails(mediaId);

    if (!tvShow || !tvShow.id) {
      notFound();
    }

    // Filter out specials (season 0) and get valid seasons
    const validSeasons = tvShow.seasons?.filter((s) => s.season_number > 0) || [];

    // Validate season number
    const currentSeasonNumber = Math.min(
      Math.max(1, seasonNumber),
      validSeasons.length > 0 ? Math.max(...validSeasons.map((s) => s.season_number)) : 1
    );

    // Fetch current season details
    let seasonDetails: SeasonDetails | null = null;
    try {
      seasonDetails = await getSeasonDetails(mediaId, currentSeasonNumber);
    } catch (error) {
      console.error('Error fetching season details:', error);
    }

    // Validate episode number
    const episodes = seasonDetails?.episodes || [];
    const currentEpisodeNumber = Math.min(
      Math.max(1, episodeNumber),
      episodes.length > 0 ? episodes.length : 1
    );

    // Get current episode info
    const currentEpisode = episodes.find((ep) => ep.episode_number === currentEpisodeNumber);

    // Get similar TV shows
    const similarShows = tvShow.similar?.results || [];

    return (
      <div className="min-h-screen bg-void">
        {/* ═══════════════════════════════════════════════════════════════
            HEADER WITH BACK BUTTON
            ═══════════════════════════════════════════════════════════ */}
        <div className="pt-20 sm:pt-24 pb-4 sm:pb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <Link
              href={`/tv/${tvShow.id}`}
              className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back to Details</span>
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PLAYER SECTION
            ═══════════════════════════════════════════════════════════ */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <Suspense fallback={<PlayerSkeleton />}>
              <WatchPlayer
                type="tv"
                tmdbId={tvShow.id}
                title={tvShow.name}
                season={currentSeasonNumber}
                episode={currentEpisodeNumber}
                episodeTitle={currentEpisode?.name}
              />
            </Suspense>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            EPISODE SELECTOR
            ═══════════════════════════════════════════════════════════ */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <div className="max-w-6xl mx-auto">
            <EpisodeSelector
              seasons={validSeasons}
              episodes={episodes}
              currentSeason={currentSeasonNumber}
              currentEpisode={currentEpisodeNumber}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            METADATA SECTION
            ═══════════════════════════════════════════════════════════ */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Poster - Hidden on mobile */}
              <div className="hidden lg:block w-48 shrink-0">
                <div className="aspect-2/3 rounded-vintage overflow-hidden border border-sepia relative">
                  <Image
                    src={getPosterUrl(tvShow.poster_path, 'w342')}
                    alt={tvShow.name}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                {/* Title */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium uppercase tracking-wide rounded-full bg-gold/15 text-gold border border-gold/30">
                      <Tv className="w-3 h-3 shrink-0" />
                      <span>TV Series</span>
                    </span>
                  </div>
                  <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-text-main">
                    {tvShow.name}
                  </h1>
                  {tvShow.tagline && (
                    <p className="text-text-muted italic mt-2">&quot;{tvShow.tagline}&quot;</p>
                  )}
                </div>

                {/* Current Episode Info */}
                {currentEpisode && (
                  <div className="bg-surface border border-sepia rounded-vintage p-4">
                    <p className="text-gold text-sm font-medium mb-1">
                      Season {currentSeasonNumber} · Episode {currentEpisodeNumber}
                    </p>
                    <h3 className="font-cinzel text-lg text-text-main">
                      {currentEpisode.name}
                    </h3>
                    {currentEpisode.overview && (
                      <p className="text-text-muted text-sm mt-2 line-clamp-3">
                        {currentEpisode.overview}
                      </p>
                    )}
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-text-warm">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-gold shrink-0" />
                    <span>{formatVoteAverage(tvShow.vote_average)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-text-muted shrink-0" />
                    <span>{formatYear(tvShow.first_air_date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-text-muted shrink-0" />
                    <span>{tvShow.number_of_seasons} Season{tvShow.number_of_seasons !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Genres */}
                {tvShow.genres && tvShow.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tvShow.genres.map((genre) => (
                      <span 
                        key={genre.id} 
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-surface-light text-text-warm border border-border-light"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <div>
                  <h3 className="font-cinzel text-lg text-text-main mb-2">About the Show</h3>
                  <p className="text-text-muted leading-relaxed">
                    {tvShow.overview || 'No overview available.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SIMILAR SHOWS
            ═══════════════════════════════════════════════════════════ */}
        {similarShows.length > 0 && (
          <MovieRow
            title="You May Also Like"
            items={similarShows}
            iconName="sparkles"
          />
        )}

        {/* Bottom Spacing */}
        <div className="h-8 sm:h-12" />
      </div>
    );
  } catch (error) {
    console.error('Error in WatchPage:', error);
    notFound();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════════════════════
export async function generateMetadata({ params }: WatchPageProps) {
  const { type, id } = await params;
  const mediaId = parseInt(id, 10);

  try {
    if (type === 'movie') {
      const movie = await getMovieDetails(mediaId);
      return {
        title: `Watch ${movie.title} - FaoDekho`,
        description: movie.overview,
      };
    } else if (type === 'tv') {
      const tvShow = await getTVDetails(mediaId);
      return {
        title: `Watch ${tvShow.name} - FaoDekho`,
        description: tvShow.overview,
      };
    }
  } catch {
    return {
      title: 'Watch - FaoDekho',
    };
  }

  return {
    title: 'Watch - FaoDekho',
  };
}