// Colors
export const COLORS = {
  background: '#050816',
  backgroundDark: '#0a0f1e',
  violet: {
    400: 'rgba(139, 92, 246, 1)',
    500: 'rgba(139, 92, 246, 1)',
    600: 'rgba(139, 92, 246, 0.5)',
    trail: 'rgba(167, 139, 250, 1)',
  },
  blue: {
    400: 'rgba(96, 165, 250, 1)',
    600: 'rgba(37, 99, 235, 0.5)',
  },
  white: {
    base: 'rgba(255, 255, 255, 1)',
    overlay: 'rgba(255, 255, 255, 0.3)',
  },
} as const;

// Starfield Configuration
export const STARFIELD_CONFIG = {
  count: 400,
  depth: 1000,
  normalSpeed: 2,
  warpSpeed: 40,
  projectionConstant: 128.0,
} as const;

// Animation Delays & Durations
export const ANIMATION = {
  navTransition: { type: 'spring' as const, bounce: 0.2, duration: 0.6 },
  pageTransition: { duration: 0.5 },
  warpDelay: 600,
  warpStopDelay: 400,
  timelineItemDelay: 0.1,
} as const;

// Navigation Routes
export const ROUTES = {
  home: 'home',
  blog: 'blog',
  about: 'about',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];

