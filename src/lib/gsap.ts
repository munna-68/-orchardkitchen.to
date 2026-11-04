'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)';

/** Event fired ~0.6s before the preloader finishes, so the hero can start its entrance. */
export const PRELOADER_DONE = 'ok:preloader-done';

export function preloaderWillRun() {
  if (typeof document === 'undefined') return false;
  return !document.documentElement.classList.contains('preloaded');
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
