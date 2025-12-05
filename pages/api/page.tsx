'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { 
  Terminal, Cpu, Zap, GitBranch, ArrowRight, 
  Layers, Activity, Code2, Server, Eye 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- CONFIGURATION ---
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- COMPONENTS ---

const GridBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0a]">
    {/* 1. The Technical Grid */}
    <div 
      className="absolute inset-0 opacity-[0.2]" 
      style={{
        backgroundImage: `linear-gradient(#262626 1px, transparent 1px), linear-gradient(90deg, #262626 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
      }} 
    />
    
    {/* 2. The Vector Field Glow (Animated) */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{ duration: 10, repeat: Infinity, delay: 1, ease: "easeInOut" }}
      className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px]" 
    />
  </div>
);

// The "Beast" Project Card
const ProjectCard = ({ title, role, stack, stats, description, icon: Icon }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[320px] group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Glass Container */}
      <div className="absolute inset-0 bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.15)]">
        
        {/* Layer 1: The Polish (Visible Default) */}
        <motion.div 
          animate={{ opacity: isHovered ? 0 : 1, filter: isHovered ? "blur(10px)" : "blur(0px)" }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 p-8 flex flex-col justify-between z-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-blue-400">
                <Icon size={20} />
              </div>
              <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">{role}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3 font-sans tracking-tight">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {stack.map((tech: string) => (
              <span key={tech} className="px-3 py-1.5 text-[10px] font-mono font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Layer 2: The Beast (Visible on Hover) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="absolute inset-0 p-8 z-20 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <span className="text-xs font-mono text-gray-500">SYSTEM_METRICS</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-green-500">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat: any, i: number) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ delay: 0.1 + (i * 0.1) }}
                className="bg-white/5 border border-white/5 p-3 rounded-lg"
              >
                <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">{stat.label}</div>
                <div className="text-sm text-blue-200 font-mono">{stat.value}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400">
              <span>View Architecture</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </motion.div>

        {/* Decorative Grid Overlay inside card */}
        <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
            style={{
                backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
            }} 
        />
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <main className={`min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 ${inter.variable} ${mono.variable} font-sans overflow-x-hidden`}>
      <GridBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        
        {/* --- HERO SECTION --- */}
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-blue-500" />
            <span className="font-mono text-blue-400 tracking-widest text-sm uppercase">
              Engineer. Builder. System Designer.
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9]"
          >
            I Build Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
              Into Interfaces.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-12"
          >
            From MLOps pipelines to cross-platform architectures—I'm a startup-hungry, 
            technical beast who turns raw data into polished experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden transition-all hover:bg-white/10">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative font-mono font-medium text-white flex items-center gap-2">
                View Work <ArrowRight size={16} />
              </span>
            </button>
            <button className="px-8 py-4 rounded-full border border-white/10 font-mono text-gray-400 hover:text-white hover:border-white/30 transition-colors">
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* --- PROJECTS / BEAST CARDS --- */}
        <div className="mt-32 grid md:grid-cols-2 gap-8">
            
            {/* Card 1: CarePilot (Based on Resume [cite: 16, 22, 25]) */}
            <ProjectCard 
              title="CarePilot"
              role="Interface Design Engineer"
              description="Engineered cross-platform architecture for clinical AI features. Integrated LLM-based scribing and diagnosis generation."
              icon={Activity}
              stack={['React Native', 'TypeScript', 'Node.js', 'LLMs']}
              stats={[
                { label: 'Latency', value: '24ms' },
                { label: 'Platform', value: 'Web + Mobile' },
                { label: 'AI Model', value: 'LLM Scribing' },
                { label: 'Components', value: '50+ Reusable' },
              ]}
            />

            {/* Card 2: ZeroEyes (Based on Resume [cite: 27, 28, 30]) */}
            <ProjectCard 
              title="ZeroEyes"
              role="MLOps Intern"
              description="Built YOLO-based model training infrastructure and automated data ingestion pipelines for GPU servers."
              icon={Eye}
              stack={['Python', 'YOLOv8', 'Bash', 'Linux']}
              stats={[
                { label: 'Pipeline', value: 'Automated' },
                { label: 'Data', value: 'Video Ingestion' },
                { label: 'Infra', value: 'GPU Cluster' },
                { label: 'Optimization', value: 'Scripted' },
              ]}
            />
        </div>

        {/* --- MARQUEE --- */}
        <div className="mt-32 pt-10 border-t border-white/5">
            <div className="flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholder logos - replace with SVGs */}
                <span className="text-xl font-bold font-mono">REACT</span>
                <span className="text-xl font-bold font-mono">TYPESCRIPT</span>
                <span className="text-xl font-bold font-mono">PYTHON</span>
                <span className="text-xl font-bold font-mono">PYTORCH</span>
                <span className="text-xl font-bold font-mono">NEXT.JS</span>
            </div>
        </div>
      </div>
    </main>
  );
}