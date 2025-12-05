'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { 
  ArrowUpRight, Terminal, Activity, Zap, 
  GitCommit, Server, Cpu, CheckCircle2, AlertCircle, Clock 
} from 'lucide-react';

// --- CONFIGURATION ---
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = IBM_Plex_Mono({ 
  weight: ['400', '500', '600'], 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

// --- DATA FROM RESUME ---
// Mapping your resume data into "Trading Assets" format
const TICKER_ITEMS = [
  "REACT NATIVE", "TYPESCRIPT", "YOLOV8", "AGENTIC SYSTEMS", 
  "LEAN SIX SIGMA", "AWS", "PYTHON", "NEXT.JS", "LLM INTEGRATION"
];

const PROJECTS = [
  {
    id: "CP-01",
    name: "CarePilot",
    role: "INTERFACE ENG",
    status: "LIVE", // Green
    delta: "+ACTIVE",
    metric: "24ms Latency",
    desc: "Cross-platform architecture for clinical AI features. LLM-based scribing.",
    stack: ["React Native", "TypeScript"]
  },
  {
    id: "ZE-02",
    name: "ZeroEyes",
    role: "MLOPS INTERN",
    status: "EXECUTED", // Gray/White
    delta: "100%",
    metric: "Auto-Pipeline",
    desc: "YOLO-based model training infra & automated data ingestion on GPU servers.",
    stack: ["Python", "YOLOv8"]
  },
  {
    id: "KU-03",
    name: "Univ. of Kansas",
    role: "RESEARCH",
    status: "CLOSED", 
    delta: "FELLOW",
    metric: "CV Research",
    desc: "Undergraduate Research Fellow focusing on Computer Vision architectures.",
    stack: ["PyTorch", "Research"]
  }
];

// --- COMPONENTS ---

const Ticker = () => (
  <div className="w-full bg-white text-black overflow-hidden py-2 border-b border-white select-none">
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      className="whitespace-nowrap flex gap-8 font-mono font-bold text-sm tracking-widest"
    >
      {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
        <span key={i} className="flex items-center gap-4">
          {item} <span className="text-[10px] opacity-40">//</span>
        </span>
      ))}
    </motion.div>
  </div>
);

const StatusTerminal = () => {
  const states = [
    { text: "TRAINING MODELS...", color: "text-amber-500", icon: Activity },
    { text: "SCALING INFRA...", color: "text-blue-500", icon: Server },
    { text: "DEBUGGING PIPELINES...", color: "text-red-500", icon: AlertCircle },
    { text: "SHIPPING FEATURES...", color: "text-green-500", icon: CheckCircle2 },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % states.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const CurrentState = states[index];
  const Icon = CurrentState.icon;

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-[#0a0a0a] border border-white/20">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">System Status</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-800"/>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Icon size={18} className={CurrentState.color} />
          <AnimatePresence mode="wait">
            <motion.span 
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.1 }} // Ultra-fast transition
              className={`font-mono font-bold text-sm ${CurrentState.color}`}
            >
              {CurrentState.text}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="font-mono text-[10px] text-gray-600">
          LAST_UPDATE: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

const ExecutionLog = () => (
  <div className="border border-white/20 bg-[#0a0a0a]">
    <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/5">
      <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest">Execution Log (Recent)</h3>
      <div className="text-[10px] font-mono text-gray-600">SOURCE: RESUME_V1.PDF</div>
    </div>
    <div className="divide-y divide-white/10">
      {PROJECTS.map((p) => (
        <div key={p.id} className="group flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-white/5 transition-colors duration-75 cursor-default">
          <div className="flex items-center gap-4 mb-2 md:mb-0 w-full md:w-1/3">
            <span className="font-mono text-[10px] text-gray-600 w-12">{p.id}</span>
            <div>
              <div className="font-bold text-white text-sm font-mono flex items-center gap-2">
                {p.name}
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400"/>
              </div>
              <div className="text-[10px] text-gray-500 uppercase">{p.role}</div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 mb-2 md:mb-0">
            <p className="text-xs text-gray-400 font-mono line-clamp-1">{p.desc}</p>
          </div>

          <div className="w-full md:w-1/3 flex items-center justify-end gap-6">
            <div className="text-right">
              <div className={`text-[10px] font-bold font-mono ${
                p.status === 'LIVE' ? 'text-green-500' : 'text-white'
              }`}>{p.status}</div>
              <div className="text-[10px] text-gray-600">{p.metric}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  return (
    <main className={`min-h-screen bg-black text-white ${inter.variable} ${mono.variable} font-sans selection:bg-white selection:text-black`}>
      
      {/* 1. TOP TICKER */}
      <Ticker />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8">
        
        {/* 2. BENTO GRID HERO */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          
          {/* Main Headline Block */}
          <div className="col-span-1 md:col-span-8 border border-white/20 bg-[#050505] p-8 md:p-12 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="inline-block px-2 py-1 mb-6 border border-green-900 bg-green-900/10">
                <span className="text-[10px] font-mono text-green-500 tracking-widest uppercase">
                  ● Velocity Is a Feature
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-6 text-white">
                I BUILD SYSTEMS <br/>
                THAT MOVE AT <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                  STARTUP SPEED.
                </span>
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <p className="max-w-md text-gray-400 font-mono text-sm leading-relaxed">
                Full-stack engineer obsessed with efficiency, throughput, and high-leverage automation. 
                Currently engineering interfaces at CarePilot.
              </p>
              
              <div className="flex gap-4">
                 <button className="group px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-2">
                    Start Dialogue
                    <ArrowUpRight size={14} />
                 </button>
                 <button className="px-6 py-3 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:border-white transition-colors">
                    View Docs
                 </button>
              </div>
            </div>
          </div>

          {/* Right Column: Status & Metrics */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            
            {/* Status Terminal */}
            <div className="flex-1">
              <StatusTerminal />
            </div>

            {/* Metrics Block */}
            <div className="h-1/3 bg-[#0a0a0a] border border-white/20 p-6 flex flex-col justify-center">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Architecture</div>
                    <div className="text-xl font-bold font-mono">Mobile + Web</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Est. 2021</div>
                    <div className="text-xl font-bold font-mono">BS CompSci</div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* 3. EXECUTION LOG (Projects) */}
        <ExecutionLog />
        
        {/* 4. FOOTER GRID LINES */}
        <div className="mt-4 grid grid-cols-4 border-t border-white/20 pt-4 opacity-50">
            <div className="font-mono text-[10px] text-gray-600">KANSAS CITY, MO</div>
            <div className="font-mono text-[10px] text-gray-600 text-center">LOCAL TIME: {new Date().toLocaleTimeString()}</div>
            <div className="font-mono text-[10px] text-gray-600 text-center">LAT: 39.0997° N</div>
            <div className="font-mono text-[10px] text-gray-600 text-right">SYSTEM_READY</div>
        </div>

      </div>
    </main>
  );
}