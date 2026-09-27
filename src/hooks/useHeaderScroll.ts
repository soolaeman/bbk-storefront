'use client';

import { useState, useEffect, useRef } from 'react';

export interface HeaderScrollState {
  isVisible: boolean;
  isScrolled: boolean;
  scrollDirection: 'up' | 'down' | 'none';
}

export function useHeaderScroll(threshold = 8): HeaderScrollState {
  const [scrollState, setScrollState] = useState<HeaderScrollState>({
    isVisible: true,
    isScrolled: false,
    scrollDirection: 'none',
  });

  const lastScrollY = useRef(0);
  const currentState = useRef(scrollState);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      const nextScrolled = currentScrollY > 15;
      let nextVisible = currentState.current.isVisible;
      let nextDirection = currentState.current.scrollDirection;

      if (currentScrollY <= 15) {
        nextVisible = true;
        nextDirection = 'none';
      } else if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextVisible = false;
          nextDirection = 'down';
        } else {
          nextVisible = true;
          nextDirection = 'up';
        }
      }

      lastScrollY.current = Math.max(0, currentScrollY);

      // Only trigger React re-render when actual state changes
      if (
        nextVisible !== currentState.current.isVisible ||
        nextScrolled !== currentState.current.isScrolled ||
        nextDirection !== currentState.current.scrollDirection
      ) {
        const next = { isVisible: nextVisible, isScrolled: nextScrolled, scrollDirection: nextDirection };
        currentState.current = next;
        setScrollState(next);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
}
