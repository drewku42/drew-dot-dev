import { motion } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import { BlogPost } from '@/types';
import { Tag } from '@/components/ui/Tag';

const comingSoon = true;

const posts: BlogPost[] = [
  {
    title: 'The Architecture of Agentic Tooling',
    excerpt: 'Why traditional API integrations are failing AI agents, and how to build self-healing tool interfaces.',
    date: 'Dec 02, 2024',
    readTime: '8 min read',
    tags: ['AI', 'Systems'],
  },
  {
    title: 'Scaling React Server Components',
    excerpt: 'Lessons learned migrating a heavy client-side dashboard to RSCs. The good, the bad, and the hydration errors.',
    date: 'Nov 15, 2024',
    readTime: '6 min read',
    tags: ['Frontend', 'React'],
  },
  {
    title: 'YOLOv8 on the Edge',
    excerpt: 'Optimizing computer vision models for low-latency inference on mobile devices.',
    date: 'Oct 28, 2024',
    readTime: '12 min read',
    tags: ['ML', 'Computer Vision'],
  },
];

const filterTags = ['All', 'Engineering', 'AI/ML', 'Personal', 'Systems'];

export const BlogPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      {!comingSoon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-serif text-white mb-4">Blog</h1>
          <p className="text-xl text-gray-400">Sharing my thoughts on software and technology.</p>
        </motion.div>
      )}

      {comingSoon ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center min-h-[60vh]"
        >
          <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center max-w-md">
            <BookOpen size={48} className="mx-auto mb-6 text-gray-500" />
            <h2 className="text-2xl font-bold text-white mb-3">Coming Soon</h2>
            <p className="text-gray-400">
              I'm working on some exciting content about systems, intelligence, and software craftsmanship. 
              Check back soon!
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {filterTags.map((tag, i) => (
              <button 
                key={tag} 
                className={`px-4 py-1.5 rounded-full text-sm font-mono border transition-colors ${
                  i === 0 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'border-white/5 text-gray-500 hover:text-white hover:border-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/[0.07] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-6 max-w-2xl">{post.excerpt}</p>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <Tag key={tag} variant="blog">
                      #{tag}
                    </Tag>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

