import { motion } from 'framer-motion';
import { TimelineItemProps } from '@/types';
import { Tag } from '@/components/ui/Tag';

export const TimelineItem = ({ year, title, company, description, stack, delay }: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative pl-8 pb-12 border-l border-white/10 last:border-0"
  >
    <div className="absolute left-[-5px] top-8 w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
    
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <span className="text-violet-400 font-mono text-sm">@ {company}</span>
        <span className="text-gray-400 text-sm font-mono ml-auto">{year}</span>
      </div>
      <p className="text-gray-300 text-base mb-4 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <Tag key={tech} variant="tech">
            {tech}
          </Tag>
        ))}
      </div>
    </div>
  </motion.div>
);

