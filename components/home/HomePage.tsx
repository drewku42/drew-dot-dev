import { motion } from 'framer-motion';
import { Activity, MapPin, Rocket, ArrowDown } from 'lucide-react';
import { HomePageProps } from '@/types';
import { TimelineItem } from './TimelineItem';
import { ProjectCard } from './ProjectCard';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';

const timelineData = [
  {
    year: '2025 - Present',
    title: 'Interface Design Engineer',
    company: 'CarePilot',
    description: "I am currently building the UI/UX for CarePilot's clinical AI workflows. I ship new features quickly and efficiently, while maintaining a high level of quality and consistency.",
    stack: ['React Native', 'TypeScript', 'Automated Testing', 'CI/CD', 'Product Engineering'],
    delay: 0.1,
  },
  {
    year: '2024',
    title: 'Machine Learning Operations Intern',
    company: 'ZeroEyes',
    description: 'Built the infrastructure for model training and data ingestion. Developed internal tooling that standardized how machine learning models moved from development to production.',
    stack: ['Python', 'YOLOv8', 'Bash', 'Linux', 'Infrastructure'],
    delay: 0.2,
  },
  {
    year: '2024',
    title: 'Undergraduate Research Fellow',
    company: 'Univ. of Kansas',
    description: 'Selected as 1 of 11 fellows. Conducted machine learning research with a focus on computer vision architectures.',
    stack: ['PyTorch', 'Computer Vision', 'Research'],
    delay: 0.3,
  },
];

// const projectsData = [
//   {
//     title: 'Clinical Agent Swarm',
//     desc: 'A multi-agent system designed to handle patient intake and preliminary diagnosis generation.',
//     tags: ['LangChain', 'Python', 'React'],
//   },
//   {
//     title: 'Vision Pipeline CLI',
//     desc: 'Command line interface for standardizing video frame extraction and annotation formatting.',
//     tags: ['Rust', 'FFmpeg', 'CLI'],
//   },
//   {
//     title: 'Personal OS',
//     desc: 'A unified dashboard for tracking health, finance, and learning metrics in real-time.',
//     tags: ['Next.js', 'Postgres', 'Tailwind'],
//   },
// ];

export const HomePage = ({ onNavigate }: HomePageProps) => (
  <div className="max-w-5xl mx-auto px-6 pb-20">
    <motion.div 
      id="hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-10 bg-violet-500/50" />
        <span className="text-xs font-mono text-violet-400 tracking-[0.3em] uppercase">
          Engineering · Product · AI Systems
        </span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-8 leading-[1.1]">
        Building Interfaces for <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
          Intelligent Systems
        </span>
      </h1>

      <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
        I'm <strong className="text-white">Drew Meyer</strong>. I am a software engineer focused on building robust, scalable products. With a strong foundation in AI & machine learning, I specialize in bridging the gap between AI functionality and intuitive, human-centered experiences.
      </p>

      <div className="flex flex-wrap gap-4">
        <Button 
          icon={ArrowDown}
          onClick={() => {
            const heroElement = document.getElementById('hero');
            if (heroElement) {
              const heroRect = heroElement.getBoundingClientRect();
              const heroBottom = heroRect.bottom + window.pageYOffset;
              
              window.scrollTo({
                top: heroBottom,
                behavior: 'smooth'
              });
            }
          }}
        >
          My Journey
        </Button>
      </div>
    </motion.div>

    <div id="journey" className="scroll-mt-32 py-32 grid md:grid-cols-12 gap-16 border-t border-white/5">
      <div className="md:col-span-4">
        <div className="sticky top-32">
          <h2 className="text-3xl font-serif text-white mb-4">Journey</h2>
          <p className="text-gray-400 text-sm mb-8">
            My professional path and technical background.
          </p>
          <div className="p-4 bg-[#0a0f1e] border border-white/10 rounded-xl mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-gray-400 uppercase">Current Role</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                <Activity size={12} className="text-violet-400" />
                Engineering at CarePilot
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                <MapPin size={12} className="text-blue-400" />
                Kansas City, MO
              </div>
            </div>
          </div>
          <Button 
            icon={Rocket}
            onClick={() => onNavigate(ROUTES.about)}
          >
            About Drew
          </Button>
        </div>
      </div>
      
      <div className="md:col-span-8 space-y-2">
        {timelineData.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </div>

    {/* <div className="py-20 border-t border-white/5">
      <h2 className="text-3xl font-serif text-white mb-10">Selected Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div> */}
  </div>
);