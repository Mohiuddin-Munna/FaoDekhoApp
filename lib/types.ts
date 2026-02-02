// lib/types.ts

// ===== Base Types =====
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// ===== Movie Types =====
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: Genre[];
  adult: boolean;
  original_language: string;
  video: boolean;
  media_type?: 'movie';
}

export interface MovieDetails extends Movie {
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  genres: Genre[];
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  videos?: {
    results: Video[];
  };
  similar?: {
    results: Movie[];
  };
  recommendations?: {
    results: Movie[];
  };
}

// ===== TV Show Types =====
export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: Genre[];
  origin_country: string[];
  original_language: string;
  media_type?: 'tv';
}

export interface TVShowDetails extends TVShow {
  created_by: Creator[];
  episode_run_time: number[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode | null;
  next_episode_to_air: Episode | null;
  networks: ProductionCompany[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  seasons: Season[];
  status: string;
  tagline: string;
  type: string;
  genres: Genre[];
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  videos?: {
    results: Video[];
  };
  similar?: {
    results: TVShow[];
  };
  recommendations?: {
    results: TVShow[];
  };
}

export interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

// ===== Season & Episode Types =====
export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
  vote_average: number;
}

export interface SeasonDetails extends Season {
  episodes: Episode[];
  _id: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  air_date: string;
  episode_number: number;
  season_number: number;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  production_code: string;
  show_id?: number;
  crew?: Crew[];
  guest_stars?: Cast[];
}

// ===== Cast & Crew Types =====
export interface Cast {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  gender: number;
  known_for_department: string;
  popularity: number;
  cast_id?: number;
  credit_id: string;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  gender: number;
  known_for_department: string;
  department: string;
  job: string;
  credit_id: string;
  popularity: number;
}

// ===== Video Types =====
export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers';
  official: boolean;
  published_at: string;
}

// ===== Search & Multi Types =====
export interface MultiSearchResult {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  title?: string;
  original_title?: string;
  release_date?: string;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  overview?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  profile_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  popularity: number;
  genre_ids?: number[];
  adult?: boolean;
  original_language?: string;
  known_for_department?: string;
  known_for?: (Movie | TVShow)[];
}

// ===== API Response Types =====
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// ===== Genre IDs =====
export const GENRE_IDS = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  TV_MOVIE: 10770,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37,
} as const;

// ===== Image Size Types =====
export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';
export type ProfileSize = 'w45' | 'w185' | 'h632' | 'original';
export type StillSize = 'w92' | 'w185' | 'w300' | 'original';

// ===== Utility Types =====
export type MediaType = 'movie' | 'tv';
export type TimeWindow = 'day' | 'week';