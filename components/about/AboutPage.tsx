import { motion } from 'framer-motion';
import { User, MapPin, Mail, Github, Linkedin, Cpu, Zap } from 'lucide-react';
import Image from 'next/image';

const languages = [
  'TypeScript',
  'Python',
  'C++',
  'SQL',
  'Bash'

];

const coreStack = [
  'React',
  'JavaScript',
  'TypeScript',
  'CSS/SCSS',
  'NextJS',
  //'Tailwind',
  // 'Node.js',
  // 'Express',
  // 'MongoDB',
  // 'PostgreSQL',
  // 'MySQL',
  // 'Python',

];

const exploring = [
  'Agentic Systems',
  'AI-powered Tooling',
  'Blockchain',
  'Cryptocurrency'
];

export const AboutPage = () => (
  <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
    <div className="grid md:grid-cols-12 gap-12">
      <div className="md:col-span-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-32 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-violet-500 to-blue-600 rounded-full mb-6 p-1">
            <div className="w-full h-full bg-[#0a0f1e] rounded-full flex items-center justify-center overflow-hidden relative">
              <Image
                src="/headshot.png"
                alt="Headshot of Drew Meyer"
                width={128}
                height={128}
                className="rounded-full object-cover w-full h-full"
                unoptimized
              />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Drew Meyer</h2>
            <p className="text-violet-400 font-mono text-xs">Engineer · Builder · Web Designer</p>
          </div>

          <div className="space-y-4 py-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MapPin size={16} /> Kansas City, MO
            </div>
            <a 
              href="mailto:drewmeyer28@gmail.com"
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={16} /> drewmeyer28@gmail.com
            </a>
            <a 
              href="https://github.com/drewku42"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Github size={16} /> github.com/drewku42
            </a>
            <a 
              href="https://linkedin.com/in/drewmeyer28"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={16} /> linkedin.com/in/drewmeyer28
            </a>
          </div>

          <a 
            href="/DrewMeyerResume.pdf"
            download
            className="w-full py-2 mt-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium text-sm transition-colors border border-white/10 flex items-center justify-center"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      <div className="md:col-span-8 space-y-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-serif text-white mb-6">About Me</h2>
          <div className="prose prose-invert text-gray-400 leading-relaxed">
            <p className="mb-4">
                My journey with technology began around age 13, when I built my first personal computer. What started as a simple desire to play my favorite video games quickly turned
                into an obsession with hardware architecture, performance optimization, and the art of budgeting. That early experience of turning individual components into a cohesive,
                high-performance machine led me to study computer science at the University of Kansas.
            </p>
            <p className="mb-4">
              The defining moment of my career happened during my sophomore year when I first used ChatGPT. It was a genuine "holy sh*t" moment. I realized that the barrier between having an
              idea and building a product had collapsed. Since then, I have been enamored by the speed of creation. I view software engineering not just as a technical trade, but as a highly
              creative process, and I am incredibly grateful to be building during this technological renaissance.
            </p>
            <p className="mb-4">
              Today, that same curiosity drives me to look beyond the immediate horizon. I am constantly exploring emerging technologies 
              like quantum computing,blockchain and cryptocurrency, looking for the next generation of tools that will reshape how we interact with the digital world.
            </p>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Cpu size={20} className="text-violet-500" /> Technical Arsenal
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h3 className="text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map(t => (
                  <span key={t} className="text-white text-sm font-medium">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h3 className="text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider">Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {coreStack.map(t => (
                  <span key={t} className="text-white text-sm font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap size={20} className="text-yellow-500" /> Currently Exploring
          </h2>
          <div className="flex flex-wrap gap-3">
            {exploring.map(item => (
              <span 
                key={item} 
                className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300 hover:border-violet-500/50 hover:text-violet-300 transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  </div>
);

