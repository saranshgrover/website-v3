import { track, init } from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = 'b60a0093f9616847e57c3c71a021c19e';

// Initialize Amplitude with session replay
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    init(AMPLITUDE_API_KEY, {
      defaultTracking: true,
      autocapture: {
        elementInteractions: true,
      },
    });
  }
};

// Utility function to track events
export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  track(eventName, eventProperties);
};
