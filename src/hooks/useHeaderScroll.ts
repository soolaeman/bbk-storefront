'use client';

import { useState, useEffect, useRef } from 'react';

export interface HeaderScrollState {
  isVisible: boolean;
  isScrolled: boolean;
  scrollDirection: 'up' | 'down' | 'none';
}

export function useHeaderScroll(threshold = 8): HeaderScrollState {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 15);

      if (currentScrollY <= 15) {
        setIsVisible(true);
        setScrollDirection('none');
      } else if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Scrolling down -> hide header
          setIsVisible(false);
          setScrollDirection('down');
        } else {
          // Scrolling up -> show header
          setIsVisible(true);
          setScrollDirection('up');
        }
      }

      lastScrollY.current = Math.max(0, currentScrollY);
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

  return { isVisible, isScrolled, scrollDirection };
}
