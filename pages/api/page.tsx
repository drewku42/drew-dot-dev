'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { 
  Network, Cpu, Workflow, GitBranch, ArrowRight, 
  Database, Layers, Share2, Terminal
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- FONTS ---
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 3D NEURAL BACKGROUND COMPONENT ---
function ParticleField({ scrollY }: { scrollY: number }) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random particles
  const sphere = useMemo(() => {
    const temp = new Float32Array(3000); // 1000 particles * 3 coords
    for (let i = 0; i < 3000; i++) {
      temp[i] = (Math.random() - 0.5) * 15; // Spread items
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate the entire field
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;

      // "Breathing" effect based on mouse/time
      const time = state.clock.getElapsedTime();
      ref.current.position.y = Math.sin(time / 4) * 0.2;
    }
  });

  // Calculate color based on scroll (Blue -> Purple -> Pink)
  // This is a simplified logic for the demo; in production you'd bind this to the scroll hook better
  const color = new THREE.Color();
  color.setHSL((0.6 + (scrollY * 0.0002)) % 1, 0.8, 0.6);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6" // Starting Violet
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

const NeuralCanvas = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Ambient Light */}
        <ambientLight intensity={0.5} />
        {/* Floating Particles */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <ParticleField scrollY={scrollY} />
        </Float>
      </Canvas>
      {/* Overlay Gradient to fade bottom/top */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-[#0f172a] pointer-events-none" />
    </div>
  );
};

// --- UI COMPONENTS ---

const GlowingButton = ({ children, primary = false }: { children: React.ReactNode, primary?: boolean }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={cn(
      "relative px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide overflow-hidden group transition-all duration-300",
      primary 
        ? "text-white shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]" 
        : "text-gray-300 border border-white/10 hover:border-violet-500/50 hover:text-white"
    )}
  >
    {/* Background Gradient */}
    <div className={cn(
      "absolute inset-0 transition-opacity duration-300",
      primary 
        ? "bg-gradient-to-r from-violet-600 to-indigo-600 opacity-100" 
        : "bg-white/5 opacity-0 group-hover:opacity-100"
    )} />
    
    {/* Content */}
    <span className="relative flex items-center gap-2 z-10">
      {children}
    </span>
    
    {/* Shine Effect */}
    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
  </motion.button>
);

const NodeCard = ({ title, role, subtitle, tags, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-12 border-l border-violet-500/30 last:border-0"
    >
      {/* Connection Node */}
      <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
      
      <div className="p-6 rounded-2xl bg-[#0f172a]/50 backdrop-blur-md border border-white/5 hover:border-violet-500/30 transition-colors group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-violet-400 font-mono text-xs mb-1 tracking-wider">{role}</div>
            <h3 className="text-2xl font-bold text-white font-space mb-2">{title}</h3>
            <p className="text-gray-400 text-sm max-w-md">{subtitle}</p>
          </div>
          <ArrowRight className="text-violet-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-mono bg-violet-500/10 text-violet-300 border border-violet-500/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className={`min-h-[200vh] bg-[#02040a] text-white selection:bg-violet-500/30 ${space.variable} ${mono.variable} font-sans overflow-x-hidden`}>
      
      {/* 1. The Living Background */}
      <NeuralCanvas />

      {/* 2. Scroll Progress Bar (Top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32">
        
        {/* --- HERO SECTION --- */}
        <section className="min-h-[90vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="font-mono text-violet-300 text-sm tracking-[0.2em] uppercase">
                Systems. Intelligence. Architecture.
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight font-space mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              I Build Technical <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-pulse">
                Systems That Think.
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 font-light">
              AI/LLM engineering, agentic tooling, and full-pipeline architecture. 
              Bridging the gap between <span className="text-white font-medium">Research</span> and <span className="text-white font-medium">Production</span>.
            </p>

            <div className="flex flex-wrap gap-6">
              <GlowingButton primary>
                Initialize System <Workflow size={18} />
              </GlowingButton>
              <GlowingButton>
                View Architecture <Network size={18} />
              </GlowingButton>
            </div>
          </motion.div>
        </section>

        {/* --- SCROLLYTELLING SECTION (The "Beast Factor") --- */}
        <section className="py-32 grid md:grid-cols-2 gap-20">
          
          {/* Left: Sticky Visualization Context */}
          <div className="hidden md:block">
            <div className="sticky top-32">
              <h2 className="text-3xl font-bold font-space mb-6">The Neural Pipeline</h2>
              <p className="text-gray-400 mb-8 max-w-sm">
                From raw data ingestion to polished interface components, I architect the full lifecycle of intelligent applications.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Database className="text-violet-500" />
                    <span className="font-mono text-xs">DATA_INGEST</span>
                 </div>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Cpu className="text-fuchsia-500" />
                    <span className="font-mono text-xs">INFERENCE</span>
                 </div>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <GitBranch className="text-blue-500" />
                    <span className="font-mono text-xs">CI/CD OPS</span>
                 </div>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Layers className="text-emerald-500" />
                    <span className="font-mono text-xs">UI/UX</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: The Connected Nodes (Resume Data) */}
          <div className="space-y-8">
            <NodeCard 
              index={1}
              title="CarePilot"
              role="INTERFACE DESIGN ENGINEER"
              subtitle="Developing AI-driven clinical features (LLM scribing) and reusable UI component libraries for web & mobile."
              tags={['React Native', 'TypeScript', 'LLMs', 'Agentic Tooling']}
            />
            
            <NodeCard 
              index={2}
              title="ZeroEyes"
              role="MLOPS INTERN"
              subtitle="Built YOLO-based model training infrastructure and automated data pipelines for GPU clusters."
              tags={['Python', 'YOLOv8', 'Bash', 'Linux', 'GPU Infra']}
            />

            <NodeCard 
              index={3}
              title="KU Research"
              role="FELLOW"
              subtitle="Selected as 1 of 11 fellows for computer vision research in the School of Engineering."
              tags={['Computer Vision', 'PyTorch', 'Research']}
            />
          </div>

        </section>

        {/* --- SOCIAL PROOF FOOTER --- */}
        <section className="pb-32 border-t border-white/10 pt-16">
           <div className="flex justify-between items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex gap-8">
                 <Terminal size={24} />
                 <Share2 size={24} />
                 <Cpu size={24} />
              </div>
              <div className="font-mono text-xs text-gray-500">
                SYSTEM STATUS: <span className="text-green-500">OPERATIONAL</span>
              </div>
           </div>
        </section>

      </div>
    </main>
  );
}