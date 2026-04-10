// src/components/AnalyticsProvider.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsService, logEvent, setAnalyticsUser } from '@/services/analytics';
import { useAuth } from '@/context/AuthContext';

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Track page views on route change
  useEffect(() => {
    logEvent('page_view', {
      page_path: pathname,
    });
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const currentScroll = window.scrollY;
      const scrollPercent = Math.round((currentScroll / scrollHeight) * 100);

      // Track 25%, 50%, 75%, 100%
      [25, 50, 75, 100].forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          analyticsService.trackScroll(depth);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { user } = useAuth();

  // Set user ID for analytics tracking
  useEffect(() => {
    if (user) {
      setAnalyticsUser(user.uid);
    } else {
      setAnalyticsUser(null);
    }
  }, [user]);

  // Track external link clicks globally
  useEffect(() => {
    const handleExternalLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        const isExternal = url.hostname !== window.location.hostname;
        
        if (isExternal) {
          analyticsService.trackNavigation(anchor.innerText || anchor.ariaLabel || 'External Link', 'Global', anchor.href);
        }
      }
    };

    document.addEventListener('click', handleExternalLink);
    return () => document.removeEventListener('click', handleExternalLink);
  }, []);
  
  // Track runtime crashes / exceptions
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      logEvent('exception', {
        description: error.message,
        fatal: true,
        source: error.filename,
        line: error.lineno,
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      logEvent('exception', {
        description: event.reason?.message || 'Unhandled Promise Rejection',
        fatal: false,
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return <>{children}</>;
};
