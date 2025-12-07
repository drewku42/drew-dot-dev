import { motion } from 'framer-motion';
import { Terminal, BookOpen, User } from 'lucide-react';
import { NavProps } from '@/types';
import { ANIMATION } from '@/constants';

const links = [
  { id: 'home', label: 'Home', icon: Terminal },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'about', label: 'About', icon: User },
];

export const Nav = ({ activeRoute, onNavigate }: NavProps) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-0 right-0 flex justify-center z-50 pointer-events-none"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-2 px-4 shadow-2xl flex items-center gap-2 pointer-events-auto">
        {links.map((link) => {
          const isActive = activeRoute === link.id;
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  transition={ANIMATION.navTransition}
                />
              )}
              <Icon size={14} />
              <span className="relative z-10">{link.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

