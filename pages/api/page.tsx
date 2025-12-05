import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Cpu, Zap, ArrowRight, 
  Activity, MapPin, BookOpen, User, 
  Clock, ExternalLink, Github, Linkedin, Mail
} from 'lucide-react';

// --- TYPES ---

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
}

interface StarfieldProps {
  isWarping: boolean;
}

interface NavProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
}

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  stack: string[];
  delay: number;
}

interface ProjectCardProps {
  title: string;
  desc: string;
  tags: string[];
}

interface HomePageProps {
  onNavigate: (route: string) => void;
}

// --- NATIVE CANVAS STARFIELD (STABILITY FIX) ---

const Starfield = ({ isWarping }: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Star properties
    const stars: Star[] = [];
    const count = 400; // Number of stars
    const depth = 1000; // Depth of field
    
    // Initialize stars
    for (let i = 0; i < count; i++) {
      stars.push({
        x: (Math.random() - 0.5) * window.innerWidth * 2,
        y: (Math.random() - 0.5) * window.innerHeight * 2,
        z: Math.random() * depth,
        prevZ: 0
      });
    }

    const render = () => {
      // Handle resize
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Clear screen
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center of screen
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Warp speed factor
      const speed = isWarping ? 40 : 2;

      // Draw stars
      stars.forEach(star => {
        // Move star closer
        star.z -= speed;

        // Reset if passed camera
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * window.innerWidth * 2;
          star.y = (Math.random() - 0.5) * window.innerHeight * 2;
          star.z = depth;
          star.prevZ = depth;
        }

        // Projection math
        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        // Draw
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / depth) * (isWarping ? 4 : 2.5);
          const shade = Math.floor((1 - star.z / depth) * 255);
          
          ctx.beginPath();
          
          if (isWarping) {
            // Trail effect
            const prevK = 128.0 / (star.z + speed * 2);
            const prevPx = star.x * prevK + cx;
            const prevPy = star.y * prevK + cy;
            
            ctx.moveTo(px, py);
            ctx.lineTo(prevPx, prevPy);
            ctx.strokeStyle = `rgba(167, 139, 250, ${shade/255})`; // Violet trail
            ctx.lineWidth = size;
            ctx.stroke();
          } else {
            // Dot
            ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
            ctx.arc(px, py, size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isWarping]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#050816' }}
    />
  );
};

// --- COMPONENTS ---

const Nav = ({ activeRoute, onNavigate }: NavProps) => {
  const links = [
    { id: 'home', label: 'Home', icon: Terminal },
    { id: 'blog', label: 'Logbook', icon: BookOpen },
    { id: 'about', label: 'About', icon: User },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // FIX: Use full-width flex container for perfect centering
      className="fixed top-6 left-0 right-0 flex justify-center z-50 pointer-events-none"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-2 px-4 shadow-2xl flex items-center gap-2 pointer-events-auto">
        {links.map((link) => {
          const isActive = activeRoute === link.id;
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
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <link.icon size={14} />
              <span className="relative z-10">{link.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

const TimelineItem = ({ year, title, company, description, stack, delay }: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative pl-8 pb-12 border-l border-white/10 last:border-0"
  >
    {/* Dot - Adjusted top to align with card content visually */}
    <div className="absolute left-[-5px] top-8 w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
    
    {/* Card Content Wrapper */}
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <span className="text-violet-400 font-mono text-sm">@ {company}</span>
        <span className="text-gray-400 text-sm font-mono ml-auto">{year}</span>
      </div>
      <p className="text-gray-300 text-base mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
            {stack.map((tech: string) => (
          <span key={tech} className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-gray-300">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ title, desc, tags }: ProjectCardProps) => (
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
            {tags.map((t: string) => (
          <span key={t} className="text-[10px] font-mono text-gray-500 border border-white/5 px-2 py-1 rounded-full group-hover:border-white/20 group-hover:text-gray-300 transition-colors">
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- PAGES ---

const HomePage = ({ onNavigate }: HomePageProps) => (
  <div className="max-w-5xl mx-auto px-6 pb-20">
    {/* Hero - Full viewport height and centered */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-10 bg-violet-500/50" />
        <span className="text-xs font-mono text-violet-400 tracking-[0.3em] uppercase">
          Systems · Intelligence · Architecture
        </span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-8 leading-[1.1]">
        I Build at the Edge of, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
          Intelligence, Computation, and the Internet
        </span>
      </h1>

      <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
        I’m <strong className="text-white">Drew Meyer</strong> - a software engineer deeply interested in AI, engineering, and blockchain technologies. This is my slice of the Internet, where I explore how these frontiers converge and shape what's possible in tech.
      </p>

      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => {
            const element = document.getElementById('journey');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="group relative px-8 py-3 bg-white/10 backdrop-blur-md rounded-full font-medium text-white overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-white/10 hover:border-violet-500/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/50 to-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2">
            View My Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </motion.div>

    {/* Timeline */}
    <div id="journey" className="scroll-mt-32 py-32 grid md:grid-cols-12 gap-16 border-t border-white/5">
      <div className="md:col-span-4">
        <div className="sticky top-32">
          <h2 className="text-3xl font-serif text-white mb-4">Journey</h2>
          <p className="text-gray-400 text-sm mb-8">
            From Computer Vision research to production-grade Clinical AI.
          </p>
          {/* Beast Mode Status Widget */}
          <div className="p-4 bg-[#0a0f1e] border border-white/10 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-gray-400 uppercase">Current Status</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                <Activity size={12} className="text-violet-400" />
                Building Agentic Tools
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                <MapPin size={12} className="text-blue-400" />
                Based in Kansas City
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-8 space-y-2">
        <TimelineItem 
          year="2025 - Present"
          title="Interface Design Engineer"
          company="CarePilot"
          description="Engineering cross-platform architecture for clinical AI features. Integrated LLM-based scribing and diagnosis generation tools directly into the provider workflow."
          stack={['React Native', 'TypeScript', 'Node.js', 'LLMs', 'Agentic Workflows']}
          delay={0.1}
        />
        <TimelineItem 
          year="2024"
          title="MLOps Intern"
          company="ZeroEyes"
          description="Built YOLO-based model training infrastructure and automated data ingestion pipelines. Developed CLI tools to help engineers run consistent training jobs on GPU clusters."
          stack={['Python', 'YOLOv8', 'Bash', 'Linux', 'GPU Infra']}
          delay={0.2}
        />
        <TimelineItem 
          year="2024"
          title="Undergraduate Research Fellow"
          company="Univ. of Kansas"
          description="Selected as 1 of 11 fellows. Conducted machine learning research with a focus on computer vision architectures."
          stack={['PyTorch', 'Computer Vision', 'Research']}
          delay={0.3}
        />
      </div>
    </div>

    {/* Selected Projects */}
    <div className="py-20 border-t border-white/5">
      <h2 className="text-3xl font-serif text-white mb-10">Selected Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard 
          title="Clinical Agent Swarm"
          desc="A multi-agent system designed to handle patient intake and preliminary diagnosis generation."
          tags={['LangChain', 'Python', 'React']}
        />
        <ProjectCard 
          title="Vision Pipeline CLI"
          desc="Command line interface for standardizing video frame extraction and annotation formatting."
          tags={['Rust', 'FFmpeg', 'CLI']}
        />
        <ProjectCard 
          title="Personal OS"
          desc="A unified dashboard for tracking health, finance, and learning metrics in real-time."
          tags={['Next.js', 'Postgres', 'Tailwind']}
        />
      </div>
    </div>
  </div>
);

const BlogPage = () => {
  const posts = [
    {
      title: "The Architecture of Agentic Tooling",
      excerpt: "Why traditional API integrations are failing AI agents, and how to build self-healing tool interfaces.",
      date: "Dec 02, 2024",
      readTime: "8 min read",
      tags: ["AI", "Systems"]
    },
    {
      title: "Scaling React Server Components",
      excerpt: "Lessons learned migrating a heavy client-side dashboard to RSCs. The good, the bad, and the hydration errors.",
      date: "Nov 15, 2024",
      readTime: "6 min read",
      tags: ["Frontend", "React"]
    },
    {
      title: "YOLOv8 on the Edge",
      excerpt: "Optimizing computer vision models for low-latency inference on mobile devices.",
      date: "Oct 28, 2024",
      readTime: "12 min read",
      tags: ["ML", "Computer Vision"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-5xl font-serif text-white mb-4">Neural Log</h1>
        <p className="text-xl text-gray-400">Thoughts on systems, intelligence, and software craftsmanship.</p>
      </motion.div>

      {/* Filter Mockup */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
        {['All', 'Engineering', 'AI/ML', 'Personal', 'Systems'].map((tag, i) => (
          <button key={tag} className={`px-4 py-1.5 rounded-full text-sm font-mono border transition-colors ${i === 0 ? 'bg-white/10 border-white/20 text-white' : 'border-white/5 text-gray-500 hover:text-white hover:border-white/20'}`}>
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
              <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">{post.title}</h2>
            <p className="text-gray-400 mb-6 max-w-2xl">{post.excerpt}</p>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2 py-1 rounded">#{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
    <div className="grid md:grid-cols-12 gap-12">
      
      {/* Left Column: Profile Card */}
      <div className="md:col-span-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-32 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-violet-500 to-blue-600 rounded-full mb-6 p-1">
            <div className="w-full h-full bg-[#0a0f1e] rounded-full flex items-center justify-center overflow-hidden">
              <User size={64} className="text-gray-600" />
              {/* Replace with <img src="/me.jpg" /> */}
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Drew Meyer</h2>
            <p className="text-violet-400 font-mono text-xs">Engineer · Builder · Neural Architect</p>
          </div>

          <div className="space-y-4 py-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MapPin size={16} /> Kansas City, MO
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Mail size={16} /> drewmeyer28@gmail.com
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Github size={16} /> github.com/drewku42
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Linkedin size={16} /> linkedin.com/in/drewmeyer28
            </div>
          </div>

          <button className="w-full py-2 mt-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium text-sm transition-colors border border-white/10">
            Download Resume
          </button>
        </motion.div>
      </div>

      {/* Right Column: Content */}
      <div className="md:col-span-8 space-y-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-serif text-white mb-6">About Me</h2>
          <div className="prose prose-invert text-gray-400 leading-relaxed">
            <p className="mb-4">
              I operate at the intersection of <strong>Machine Learning</strong> and <strong>Product Engineering</strong>. 
              While many engineers specialize in one or the other, I thrive in the gap between them—taking raw model outputs 
              and architecting the full-stack systems required to make them useful in the real world.
            </p>
            <p>
              Currently, I'm at <strong>CarePilot</strong>, building AI-driven clinical interfaces that help doctors spend less time 
              typing and more time caring. Before that, I was deep in the trenches of MLOps at <strong>ZeroEyes</strong>, managing 
              GPU clusters and training pipelines for computer vision models.
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
                {['TypeScript', 'Python', 'C++', 'SQL', 'Bash'].map(t => (
                  <span key={t} className="text-white text-sm font-medium">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <h3 className="text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider">Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['React Native', 'Next.js', 'PyTorch', 'YOLOv8', 'Postgres'].map(t => (
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
            {['Agentic Design Patterns', 'Local LLM Inference', 'Rust for Tooling', 'WebGL Shaders'].map(item => (
              <span key={item} className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300 hover:border-violet-500/50 hover:text-violet-300 transition-colors cursor-default">
                {item}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeRoute, setActiveRoute] = useState('home');
  const [isWarping, setIsWarping] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const handleNavigate = (route: string) => {
    if (route === activeRoute) return;
    
    // 1. Trigger Warp
    setIsWarping(true);
    
    // 2. Fade out content
    setShowContent(false);

    // 3. Switch route after "warp travel" time (reduced for snappier feel)
    setTimeout(() => {
      setActiveRoute(route);
      // 4. Fade content back in
      setShowContent(true);
      // 5. Stop warping (stop sooner so content fades in as warp ends)
      setTimeout(() => setIsWarping(false), 400); 
    }, 600); // reduced from 800
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-white font-sans selection:bg-violet-500/30 overflow-x-hidden">
      
      {/* NATIVE CANVAS Background */}
      <Starfield isWarping={isWarping} />
      
      {/* Overlay Gradient for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#050816]/20 to-[#050816] pointer-events-none z-0" />

      {/* Navbar */}
      <Nav activeRoute={activeRoute} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={activeRoute}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
            >
              {activeRoute === 'home' && <HomePage onNavigate={handleNavigate} />}
              {activeRoute === 'blog' && <BlogPage />}
              {activeRoute === 'about' && <AboutPage />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Warp Speed Overlay (Flash) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isWarping ? 0.3 : 0 }}
        className="fixed inset-0 bg-white pointer-events-none z-40 mix-blend-overlay"
      />
    </div>
  );
}