// app/page.tsx
import { Suspense } from 'react';

// Components
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';

// TMDB API Functions
import {
  getTrendingMovies,
  getTopRatedMovies,
  getActionMovies,
  getHorrorMovies,
  getSciFiMovies,
  getPopularMovies,
  getTrendingTV,
  getTopRatedTV,
  getPopularTV,
  getComedyMovies,
  getDramaMovies,
  getThrillerMovies,
} from '@/lib/tmdb';

// ═══════════════════════════════════════════════════════════════════════════
// LOADING SKELETON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function MovieRowSkeleton() {
  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="h-6 sm:h-7 md:h-8 w-36 sm:w-44 md:w-48 bg-surface-light rounded-lg mb-4 sm:mb-5 md:mb-6 animate-pulse" />
        
        <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-hidden">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="
                shrink-0
                w-[calc(50%-6px)]
                sm:w-[calc(33.333%-11px)]
                md:w-[calc(25%-12px)]
                lg:w-[calc(20%-13px)]
                xl:w-[calc(16.666%-13px)]
                2xl:w-[calc(14.285%-14px)]
              "
            >
              <div className="bg-surface rounded-vintage overflow-hidden">
                <div className="aspect-2/3 bg-surface-light animate-pulse" />
                <div className="p-2 sm:p-3">
                  <div className="h-3 sm:h-4 bg-surface-light rounded animate-pulse mb-1.5 sm:mb-2" />
                  <div className="h-2.5 sm:h-3 w-12 sm:w-16 bg-surface-light rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA FETCHING FUNCTION
// ═══════════════════════════════════════════════════════════════════════════
async function getHomePageData() {
  try {
    const [
      trendingMoviesRes,
      topRatedMoviesRes,
      actionMoviesRes,
      horrorMoviesRes,
      sciFiMoviesRes,
      popularMoviesRes,
      comedyMoviesRes,
      dramaMoviesRes,
      thrillerMoviesRes,
      trendingTVRes,
      topRatedTVRes,
      popularTVRes,
    ] = await Promise.all([
      getTrendingMovies('week'),
      getTopRatedMovies(),
      getActionMovies(),
      getHorrorMovies(),
      getSciFiMovies(),
      getPopularMovies(),
      getComedyMovies(),
      getDramaMovies(),
      getThrillerMovies(),
      getTrendingTV('week'),
      getTopRatedTV(),
      getPopularTV(),
    ]);

    return {
      trendingMovies: trendingMoviesRes.results,
      topRatedMovies: topRatedMoviesRes.results,
      actionMovies: actionMoviesRes.results,
      horrorMovies: horrorMoviesRes.results,
      sciFiMovies: sciFiMoviesRes.results,
      popularMovies: popularMoviesRes.results,
      comedyMovies: comedyMoviesRes.results,
      dramaMovies: dramaMoviesRes.results,
      thrillerMovies: thrillerMoviesRes.results,
      trendingTV: trendingTVRes.results,
      topRatedTV: topRatedTVRes.results,
      popularTV: popularTVRes.results,
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      trendingMovies: [],
      topRatedMovies: [],
      actionMovies: [],
      horrorMovies: [],
      sciFiMovies: [],
      popularMovies: [],
      comedyMovies: [],
      dramaMovies: [],
      thrillerMovies: [],
      trendingTV: [],
      topRatedTV: [],
      popularTV: [],
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default async function HomePage() {
  const {
    trendingMovies,
    topRatedMovies,
    actionMovies,
    horrorMovies,
    sciFiMovies,
    popularMovies,
    comedyMovies,
    dramaMovies,
    thrillerMovies,
    trendingTV,
    topRatedTV,
    popularTV,
  } = await getHomePageData();

  return (
    <div className="relative">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Auto Slideshow with Trending Movies
          ═══════════════════════════════════════════════════════════════ */}
      <Hero items={trendingMovies} />

      {/* ═══════════════════════════════════════════════════════════════════
          MOVIE & TV ROWS
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24">
        
        {/* ───────────────────────────────────────────────────────────────
            TRENDING & POPULAR
            ─────────────────────────────────────────────────────────── */}
        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Trending Now"
            items={trendingMovies}
            iconName="trending"
            href="/movies?category=trending"
          />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Top Rated Movies"
            items={topRatedMovies}
            iconName="star"
            href="/movies?category=top-rated"
          />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Popular Movies"
            items={popularMovies}
            iconName="clapperboard"
            href="/movies?category=popular"
          />
        </Suspense>

        {/* ───────────────────────────────────────────────────────────────
            TV SHOWS / WEB SERIES
            ─────────────────────────────────────────────────────────── */}
        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Trending TV Shows"
            items={trendingTV}
            iconName="tv"
            href="/series?category=trending"
          />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Top Rated TV Shows"
            items={topRatedTV}
            iconName="star"
            href="/series?category=top-rated"
          />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Popular Web Series"
            items={popularTV}
            iconName="sparkles"
            href="/series?category=popular"
          />
        </Suspense>

        {/* ───────────────────────────────────────────────────────────────
            MOVIE GENRES
            ─────────────────────────────────────────────────────────── */}
        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Action Movies"
            items={actionMovies}
            iconName="flame"
            href="/movies?genre=action"
          />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Comedy Movies"
            items={comedyMovies}
            iconName="laugh"
            href="/movies?genre=comedy"
          />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Drama Movies"
            items={dramaMovies}
            iconName="drama"
            href="/movies?genre=drama"
          />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Horror Movies"
            items={horrorMovies}
            iconName="ghost"
            href="/movies?genre=horror"
          />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Sci-Fi Movies"
            items={sciFiMovies}
            iconName="rocket"
            href="/movies?genre=sci-fi"
          />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <MovieRow
            title="Thriller Movies"
            items={thrillerMovies}
            iconName="swords"
            href="/movies?genre=thriller"
          />
        </Suspense>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          DECORATIVE DIVIDER
          ═══════════════════════════════════════════════════════════════ */}
      <div className="py-8 sm:py-10 md:py-12">
        <div className="divider-gold mx-auto max-w-xs sm:max-w-sm md:max-w-md" />
      </div>
    </div>
  );
}