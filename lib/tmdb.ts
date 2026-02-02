// lib/tmdb.ts

import {
  Movie,
  MovieDetails,
  TVShow,
  TVShowDetails,
  SeasonDetails,
  MultiSearchResult,
  TMDBResponse,
  PosterSize,
  BackdropSize,
  ProfileSize,
  StillSize,
  MediaType,
  TimeWindow,
  GENRE_IDS,
} from './types';

// ===== Configuration =====
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// ===== Error Handling =====
class TMDBError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'TMDBError';
  }
}

// ===== Image URL Builders =====
export function getPosterUrl(
  path: string | null,
  size: PosterSize = 'w500'
): string {
  if (!path) return '/images/no-poster.png';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null,
  size: BackdropSize = 'original'
): string {
  if (!path) return '/images/no-backdrop.png';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getProfileUrl(
  path: string | null,
  size: ProfileSize = 'w185'
): string {
  if (!path) return '/images/no-profile.png';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getStillUrl(
  path: string | null,
  size: StillSize = 'w300'
): string {
  if (!path) return '/images/no-still.png';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// ===== Base Fetch Function =====
async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  if (!TMDB_API_KEY) {
    throw new TMDBError('TMDB_API_KEY is not defined in environment variables');
  }

  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ),
  });

  const url = `${TMDB_BASE_URL}${endpoint}?${searchParams}`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new TMDBError(
        errorData.status_message || `HTTP error! status: ${response.status}`,
        response.status,
        endpoint
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof TMDBError) {
      throw error;
    }
    throw new TMDBError(
      `Failed to fetch from TMDB: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      endpoint
    );
  }
}

// ===== Trending =====
export async function getTrending(
  mediaType: MediaType | 'all' = 'all',
  timeWindow: TimeWindow = 'week',
  page: number = 1
): Promise<TMDBResponse<Movie | TVShow>> {
  return fetchTMDB<TMDBResponse<Movie | TVShow>>(
    `/trending/${mediaType}/${timeWindow}`,
    { page }
  );
}

export async function getTrendingMovies(
  timeWindow: TimeWindow = 'week',
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>(`/trending/movie/${timeWindow}`, {
    page,
  });
}

export async function getTrendingTV(
  timeWindow: TimeWindow = 'week',
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB<TMDBResponse<TVShow>>(`/trending/tv/${timeWindow}`, {
    page,
  });
}

// ===== Movies =====
export async function getTopRatedMovies(
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>('/movie/top_rated', {
    page,
    language: 'en-US',
  });
}

export async function getPopularMovies(
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>('/movie/popular', {
    page,
    language: 'en-US',
  });
}

export async function getNowPlayingMovies(
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>('/movie/now_playing', {
    page,
    language: 'en-US',
  });
}

export async function getUpcomingMovies(
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>('/movie/upcoming', {
    page,
    language: 'en-US',
  });
}

export async function getMoviesByGenre(
  genreId: number,
  page: number = 1,
  sortBy: string = 'popularity.desc'
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>('/discover/movie', {
    page,
    with_genres: genreId,
    sort_by: sortBy,
    language: 'en-US',
    include_adult: false,
  });
}

// ===== Genre Specific Functions =====
export async function getActionMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return getMoviesByGenre(GENRE_IDS.ACTION, page);
}

export async function getHorrorMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return getMoviesByGenre(GENRE_IDS.HORROR, page);
}

export async function getSciFiMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return getMoviesByGenre(GENRE_IDS.SCIENCE_FICTION, page);
}

export async function getComedyMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return getMoviesByGenre(GENRE_IDS.COMEDY, page);
}

export async function getDramaMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return getMoviesByGenre(GENRE_IDS.DRAMA, page);
}

export async function getThrillerMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return getMoviesByGenre(GENRE_IDS.THRILLER, page);
}

export async function getAnimationMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return getMoviesByGenre(GENRE_IDS.ANIMATION, page);
}

// ===== Movie Details =====
export async function getMovieDetails(
  movieId: number,
  appendToResponse: string[] = ['credits', 'videos', 'similar', 'recommendations']
): Promise<MovieDetails> {
  return fetchTMDB<MovieDetails>(`/movie/${movieId}`, {
    language: 'en-US',
    append_to_response: appendToResponse.join(','),
  });
}

// ===== TV Shows =====
export async function getTopRatedTV(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB<TMDBResponse<TVShow>>('/tv/top_rated', {
    page,
    language: 'en-US',
  });
}

export async function getPopularTV(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB<TMDBResponse<TVShow>>('/tv/popular', {
    page,
    language: 'en-US',
  });
}

export async function getOnTheAirTV(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB<TMDBResponse<TVShow>>('/tv/on_the_air', {
    page,
    language: 'en-US',
  });
}

export async function getAiringTodayTV(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB<TMDBResponse<TVShow>>('/tv/airing_today', {
    page,
    language: 'en-US',
  });
}

export async function getTVByGenre(
  genreId: number,
  page: number = 1,
  sortBy: string = 'popularity.desc'
): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB<TMDBResponse<TVShow>>('/discover/tv', {
    page,
    with_genres: genreId,
    sort_by: sortBy,
    language: 'en-US',
    include_adult: false,
  });
}

// ===== TV Show Details =====
export async function getTVDetails(
  tvId: number,
  appendToResponse: string[] = ['credits', 'videos', 'similar', 'recommendations']
): Promise<TVShowDetails> {
  return fetchTMDB<TVShowDetails>(`/tv/${tvId}`, {
    language: 'en-US',
    append_to_response: appendToResponse.join(','),
  });
}

// ===== Season Details =====
export async function getSeasonDetails(
  tvId: number,
  seasonNumber: number
): Promise<SeasonDetails> {
  return fetchTMDB<SeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`, {
    language: 'en-US',
  });
}

// ===== Search =====
export async function searchMulti(
  query: string,
  page: number = 1
): Promise<TMDBResponse<MultiSearchResult>> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  return fetchTMDB<TMDBResponse<MultiSearchResult>>('/search/multi', {
    query: encodeURIComponent(query),
    page,
    language: 'en-US',
    include_adult: false,
  });
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  return fetchTMDB<TMDBResponse<Movie>>('/search/movie', {
    query: encodeURIComponent(query),
    page,
    language: 'en-US',
    include_adult: false,
  });
}

export async function searchTV(
  query: string,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  return fetchTMDB<TMDBResponse<TVShow>>('/search/tv', {
    query: encodeURIComponent(query),
    page,
    language: 'en-US',
    include_adult: false,
  });
}

// ===== Utility Functions =====
export function getYouTubeTrailerUrl(
  videos: { results: { key: string; site: string; type: string }[] } | undefined
): string | null {
  if (!videos?.results?.length) return null;
  const trailer = videos.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const teaser = videos.results.find((v) => v.site === 'YouTube' && v.type === 'Teaser');
  const video = trailer || teaser || videos.results[0];
  return video?.site === 'YouTube' ? `https://www.youtube.com/watch?v=${video.key}` : null;
}

export function getYouTubeEmbedUrl(
  videos: { results: { key: string; site: string; type: string }[] } | undefined
): string | null {
  if (!videos?.results?.length) return null;
  const trailer = videos.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const teaser = videos.results.find((v) => v.site === 'YouTube' && v.type === 'Teaser');
  const video = trailer || teaser || videos.results[0];
  return video?.site === 'YouTube' ? `https://www.youtube.com/embed/${video.key}` : null;
}

export function formatRuntime(minutes: number): string {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'TBA';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatYear(dateString: string): string {
  if (!dateString) return 'TBA';
  return new Date(dateString).getFullYear().toString();
}

export function formatVoteAverage(vote: number): string {
  if (!vote) return 'N/A';
  return vote.toFixed(1);
}

// ===== Streaming URL Builders =====
export function getAutoEmbedMovieUrl(tmdbId: number): string {
  return `https://autoembed.co/movie/tmdb/${tmdbId}`;
}

export function getAutoEmbedTVUrl(tmdbId: number, season: number = 1, episode: number = 1): string {
  return `https://autoembed.co/tv/tmdb/${tmdbId}-${season}-${episode}`;
}

export function getVidSrcMovieUrl(tmdbId: number): string {
  return `https://vidsrc.xyz/embed/movie/${tmdbId}`;
}

export function getVidSrcTVUrl(tmdbId: number, season: number = 1, episode: number = 1): string {
  return `https://vidsrc.xyz/embed/tv/${tmdbId}/${season}/${episode}`;
}

// ===== Export Genre IDs =====
export { GENRE_IDS };