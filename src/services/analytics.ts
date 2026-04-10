// src/services/analytics.ts
import { logEvent as firebaseLogEvent, setUserId as firebaseSetUserId } from 'firebase/analytics';
import { trace } from 'firebase/performance';
import { analytics, performance } from './firebase';

/**
 * Enhanced logEvent for Google I/O 2024 style analytics
 * Tracks interactions with high precision
 */
export const logEvent = (eventName: string, params?: Record<string, any>) => {
  if (!analytics) {
    // Analytics might not be initialized yet or not supported (e.g. Server Side)
    // We queue or just skip for now to avoid crashes
    if (typeof window !== 'undefined') {
       // Optional: Queue events if analytics is still null but window exists
       // For now, we'll just log to console in dev mode
       if (process.env.NODE_ENV === 'development') {
         console.log(`[Analytics Queue/Skip]: ${eventName}`, params);
       }
    }
    return;
  }

  try {
    // Check if user is in a "Post-Purchase" journey window (5 mins)
    let journey_context = 'default';
    if (typeof window !== 'undefined') {
      const purchaseTime = sessionStorage.getItem('wow_recent_purchase');
      if (purchaseTime) {
        const diff = Date.now() - parseInt(purchaseTime);
        if (diff < 300000) { // 5 minutes
          journey_context = 'post_purchase';
        } else {
          sessionStorage.removeItem('wow_recent_purchase');
        }
      }
    }

    firebaseLogEvent(analytics, eventName, {
      ...params,
      platform: 'web',
      page_path: window.location.pathname,
      page_title: document.title,
      journey_context,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics]: ${eventName}`, params);
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};

export const setAnalyticsUser = (userId: string | null) => {
  if (analytics) {
    try {
      firebaseSetUserId(analytics, userId, { global: true });
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics]: User ID set to ${userId}`);
      }
    } catch (e) {
      console.error('Failed to set analytics user ID:', e);
    }
  }
};

/**
 * Specialized loggers for common I/O patterns
 */
export const analyticsService = {
  // Navigation events
  trackNavigation: (target: string, location: string, url?: string) => {
    logEvent('navigation_click', {
      target,
      location,
      link_url: url,
    });
  },

  // CTA interactions
  trackCTA: (text: string, location: string, action: string = 'click') => {
    logEvent('cta_interaction', {
      cta_text: text,
      location,
      action,
    });
  },

  // Form interactions
  trackForm: (formId: string, fieldId: string, action: 'start' | 'complete' | 'error' | 'change', metadata?: any) => {
    logEvent('form_interaction', {
      form_id: formId,
      field_id: fieldId,
      action,
      ...metadata
    });
  },

  // UI Element interactions (checkboxes, toggles)
  trackUI: (elementName: string, state: any, location: string) => {
    logEvent('ui_interaction', {
      element: elementName,
      value: state,
      location,
    });
  },

  // Scrolling
  trackScroll: (depth: number) => {
    logEvent('scroll_depth', {
      depth, // 25, 50, 75, 100
    });
  },

  // Timing (Duration)
  trackTiming: (category: string, variable: string, valueInSeconds: number, label?: string) => {
    logEvent('timing_complete', {
      timing_category: category,
      timing_var: variable,
      timing_value: valueInSeconds,
      timing_label: label,
    });
  },

  // E-commerce/Checkout Activity Focus
  trackCheckoutActivity: (step: string, tier: string, status: string, durationInSeconds?: number, metadata?: any) => {
    logEvent('checkout_progress', {
      checkout_step: step,
      checkout_tier: tier,
      checkout_status: status, // 'initiated', 'abandoned', 'completed', 'failed'
      duration_seconds: durationInSeconds,
      ...metadata
    });
  },

  // Performance Monitoring Traces
  _activeTraces: {} as Record<string, any>,
  
  startTrace: (traceName: string) => {
    if (performance) {
      try {
        const t = trace(performance, traceName);
        t.start();
        analyticsService._activeTraces[traceName] = t;
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Performance]: Trace "${traceName}" started`);
        }
      } catch (e) {
        console.error('Failed to start trace:', e);
      }
    }
  },

  stopTrace: (traceName: string) => {
    const t = analyticsService._activeTraces[traceName];
    if (t) {
      try {
        t.stop();
        delete analyticsService._activeTraces[traceName];
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Performance]: Trace "${traceName}" stopped`);
        }
      } catch (e) {
        console.error('Failed to stop trace:', e);
      }
    }
  }
};
