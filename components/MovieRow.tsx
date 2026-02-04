// components/MovieRow.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp,
  Star,
  Flame,
  Ghost,
  Rocket,
  Clapperboard,
  Tv,
  Film,
  Heart,
  Laugh,
  Swords,
  Drama,
  Sparkles
} from 'lucide-react';
import { Movie, TVShow } from '@/lib/types';
import MovieCard from './MovieCard';

// ═══════════════════════════════════════════════════════════════════════════
// ICON MAPPING
// ═══════════════════════════════════════════════════════════════════════════
const iconMap = {
  'trending': TrendingUp,
  'star': Star,
  'flame': Flame,
  'ghost': Ghost,
  'rocket': Rocket,
  'clapperboard': Clapperboard,
  'tv': Tv,
  'film': Film,
  'heart': Heart,
  'laugh': Laugh,
  'swords': Swords,
  'drama': Drama,
  'sparkles': Sparkles,
} as const;

type IconName = keyof typeof iconMap;

interface MovieRowProps {
  title: string;
  items: (Movie | TVShow)[];
  iconName?: IconName;
  href?: string;
}

export default function MovieRow({ title, items, iconName, href }: MovieRowProps) {
  const Icon = iconName ? iconMap[iconName] : null;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12">
      {/* ═══════════════════════════════════════════════════════════════════
          CONTAINER
          ═══════════════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
          <h2 className="font-cinzel text-lg sm:text-xl md:text-2xl lg:text-heading-3 text-text-main flex items-center gap-2 sm:gap-3">
            {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gold" />}
            {title}
          </h2>
          
          {href && (
            <a 
              href={href}
              className="btn-ghost text-xs sm:text-sm hidden sm:inline-flex"
            >
              View All
            </a>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SCROLLABLE ROW
            ═══════════════════════════════════════════════════════════════ */}
        <div className="relative group/row">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`
              absolute left-0 top-0 bottom-0 z-20
              w-10 sm:w-12 md:w-14 lg:w-16
              bg-linear-to-r from-void via-void/80 to-transparent
              flex items-center justify-start pl-1 sm:pl-2
              transition-opacity duration-300
              ${canScrollLeft 
                ? 'opacity-0 group-hover/row:opacity-100' 
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
              SCROLL CONTAINER
              Gap: 16px (gap-4) consistent across all breakpoints
              Cards calculated for EXACT fit - no partial cards
              
              Calculations (with gap-4 = 16px):
              ─────────────────────────────────────────────────────────────────
              2 cards: (100% - 1×16px) / 2 = 50% - 8px
              3 cards: (100% - 2×16px) / 3 = 33.33% - 10.67px
              4 cards: (100% - 3×16px) / 4 = 25% - 12px
              5 cards: (100% - 4×16px) / 5 = 20% - 12.8px
              6 cards: (100% - 5×16px) / 6 = 16.67% - 13.33px
              7 cards: (100% - 6×16px) / 7 = 14.29% - 13.71px
              ───────────────────────────────────────────────────────────── */}
          <div
            ref={scrollContainerRef}
            className="
              flex gap-4
              overflow-x-auto scrollbar-hide
              scroll-smooth snap-x snap-mandatory
              pb-2 sm:pb-4
            "
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="
                  shrink-0 snap-start
                  w-[calc(50%-8px)]
                  sm:w-[calc(33.33%-10.67px)]
                  md:w-[calc(25%-12px)]
                  lg:w-[calc(20%-12.8px)]
                  xl:w-[calc(16.67%-13.33px)]
                  2xl:w-[calc(14.29%-13.71px)]
                "
              >
                <MovieCard 
                  item={item} 
                  priority={index < 7}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`
              absolute right-0 top-0 bottom-0 z-20
              w-10 sm:w-12 md:w-14 lg:w-16
              bg-linear-to-l from-void via-void/80 to-transparent
              flex items-center justify-end pr-1 sm:pr-2
              transition-opacity duration-300
              ${canScrollRight 
                ? 'opacity-0 group-hover/row:opacity-100' 
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
      </div>
    </section>
  );
}