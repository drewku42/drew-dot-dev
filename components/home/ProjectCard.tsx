import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ProjectCardProps } from '@/types';
import { Tag } from '@/components/ui/Tag';

export const ProjectCard = ({ title, desc, tags }: ProjectCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-violet-500/50 transition-colors"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">{title}</h3>
        <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
      </div>
      <p className="text-sm text-gray-400 mb-6">{desc}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((t) => (
          <span 
            key={t} 
            className="text-[10px] font-mono text-gray-500 border border-white/5 px-2 py-1 rounded-full group-hover:border-white/20 group-hover:text-gray-300 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

