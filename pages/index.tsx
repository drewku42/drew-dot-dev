import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Starfield } from '@/components/shared/Starfield';
import { Nav } from '@/components/shared/Nav';
import { HomePage } from '@/components/home/HomePage';
import { BlogPage } from '@/components/blog/BlogPage';
import { AboutPage } from '@/components/about/AboutPage';
import { ANIMATION, ROUTES } from '@/constants';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<typeof ROUTES.home | typeof ROUTES.blog | typeof ROUTES.about>(ROUTES.home);
  const [isWarping, setIsWarping] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const handleNavigate = (route: string) => {
    if (route === activeRoute) return;
    
    // Trigger warp animation
    setIsWarping(true);
    setShowContent(false);

    // Switch route after warp travel time
    setTimeout(() => {
      setActiveRoute(route as typeof ROUTES.home | typeof ROUTES.blog | typeof ROUTES.about);
      setShowContent(true);
      // Stop warping
      setTimeout(() => setIsWarping(false), ANIMATION.warpStopDelay); 
    }, ANIMATION.warpDelay);
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-white font-sans selection:bg-violet-500/30 overflow-x-hidden">
      <Starfield isWarping={isWarping} />
      
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#050816]/20 to-[#050816] pointer-events-none z-0" />

      <Nav activeRoute={activeRoute} onNavigate={handleNavigate} />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={activeRoute}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={ANIMATION.pageTransition}
            >
              {activeRoute === ROUTES.home && <HomePage onNavigate={handleNavigate} />}
              {activeRoute === ROUTES.blog && <BlogPage />}
              {activeRoute === ROUTES.about && <AboutPage />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isWarping ? 0.3 : 0 }}
        className="fixed inset-0 bg-white pointer-events-none z-40 mix-blend-overlay"
      />
    </div>
  );
}
