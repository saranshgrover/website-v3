'use client';

import { useEffect } from 'react';
import { initializeAnalytics } from '@/analytics';

export function AmplitudeAnalytics() {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return null;
}
