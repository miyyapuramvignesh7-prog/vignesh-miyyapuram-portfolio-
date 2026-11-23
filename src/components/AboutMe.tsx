import React from 'react';
import { motion } from 'motion/react';
import {
  Gamepad2,
  Lightbulb,
  Puzzle,
  Target,
  Sparkles,
  Users,
  Compass,
  Zap,
  Quote,
  Layers,
  Heart,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { PageHeader } from './PageHeader';

interface AboutMeProps {
  onNavigate?: (pageId: string) => void;
}

export const AboutMe: React.FC<AboutMeProps> = ({ onNavigate }) => {
  return (
    <section id="about" className="py-12 sm:py-16 relative">
      {onNavigate && (
        <PageHeader
          currentPageTitle="About Me"
          currentPageId="about"
          onNavigate={onNavigate}
          badgeText="Developer Philosophy & Background"
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-purple-300 text-xs font-mono mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Story & Philosophy</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Curiosity-driven development, continuous exploration, and algorithmic problem-solving.
          </p>
        </motion.div>

        {/* Two-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Tech & Creative Illustration (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-md glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden shadow-xl">
              {/* Glow background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Stylized Developer & Gaming Setup Illustration */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Visual Canvas frame representing the workspace */}
                <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-b from-[#101017] to-[#08080c] border border-white/[0.08] p-4 relative flex flex-col justify-between overflow-hidden group">
                  {/* Decorative window header */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="text-[10px] font-mono text-purple-300/70">
                      workspace_matrix.svg
                    </span>
                  </div>

                  {/* Graphic Centerpiece: Interconnected hubs */}
                  <div className="relative my-auto flex items-center justify-center py-4">
                    {/* Concentric glowing rings */}
                    <div className="absolute w-36 h-36 rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: '24s' }} />
                    <div className="absolute w-48 h-48 rounded-full border border-dashed border-white/10" />

                    {/* Central Core */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/40 relative z-10 border border-white/10">
                      <Terminal className="w-8 h-8 text-white" />
                    </div>

                    {/* Orbiting Satellite Badges */}
                    <div className="absolute -top-1 left-4 px-2.5 py-1 rounded-lg bg-[#0c0c12] border border-white/[0.08] text-[11px] font-mono text-purple-300 flex items-center gap-1 shadow-md">
                      <Gamepad2 className="w-3.5 h-3.5 text-pink-400" />
                      <span>Gaming</span>
                    </div>

                    <div className="absolute -bottom-1 right-4 px-2.5 py-1 rounded-lg bg-[#0c0c12] border border-white/[0.08] text-[11px] font-mono text-blue-300 flex items-center gap-1 shadow-md">
                      <Puzzle className="w-3.5 h-3.5 text-blue-400" />
                      <span>Solving</span>
                    </div>

                    <div className="absolute top-1/2 -right-2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0c0c12] border border-white/[0.08] text-[11px] font-mono text-emerald-300 flex items-center gap-1 shadow-md">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>AI Code</span>
                    </div>

                    <div className="absolute top-1/2 -left-2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0c0c12] border border-white/[0.08] text-[11px] font-mono text-amber-300 flex items-center gap-1 shadow-md">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Curiosity</span>
                    </div>
                  </div>

                  {/* Terminal status bar */}
                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-emerald-400">● 100% Passion Driven</span>
                    <span>1st Year CSE Student</span>
                  </div>
                </div>

                {/* Subtitle / Caption for Illustration */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-purple-300 font-mono">
                    Intersection of Gaming, Code, & Machine Intelligence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Narrative & Work Style (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            {/* Primary narrative */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Hello! I am Vignesh, a 1st-year computer science engineering student who thrives at the
                crossroads of software engineering and exploratory research. Right from the start of my
                college journey, when I’m not in lectures or writing code, you’ll usually find me
                immersed in strategy games, experimenting with emerging AI libraries,
                or dissecting tricky algorithmic problems.
              </p>
            </div>

            {/* What I Enjoy: Playing Games, Learning Tech, Solving Problems */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-[#0f0f14]/80 border border-white/[0.08] hover:border-violet-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center text-pink-400 mb-2.5">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-semibold text-white text-sm">
                  Playing Games
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Sharpens reflexes, tactical reasoning, and deep puzzle appreciation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f0f14]/80 border border-white/[0.08] hover:border-violet-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 mb-2.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-semibold text-white text-sm">
                  Learning Tech
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Eager to learn modern frameworks, tools, and generative AI patterns.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f0f14]/80 border border-white/[0.08] hover:border-violet-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 mb-2.5">
                  <Puzzle className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-semibold text-white text-sm">
                  Solving Problems
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Turning ambiguity into clean, structured algorithmic solutions.
                </p>
              </div>
            </div>

            {/* Required Goal Quote Callout */}
            <div
              id="about-goal-quote"
              className="p-5 sm:p-6 rounded-2xl bg-[#0d0d12]/90 border border-white/[0.09] relative overflow-hidden shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider block mb-1">
                    My Core Ambition
                  </span>
                  <blockquote className="font-heading text-base sm:text-lg font-semibold text-white leading-snug">
                    “My goal is to become an AI Developer and create useful, intelligent applications.”
                  </blockquote>
                  <p className="text-xs text-slate-400 mt-2">
                    — Miyyapuram Vignesh, aspiring engineer aiming to bridge user value with deep learning.
                  </p>
                </div>
              </div>
            </div>

            {/* Work Style: Curious, Creative, Collaborative */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>My Work Style</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0c0c10]/90 border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Curious</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Driven to understand internals, exploring how models compute and scale.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0c0c10]/90 border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    <span>Creative</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Crafting fluid user experiences with thoughtful design and elegance.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0c0c10]/90 border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Collaborative</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Thriving in team hackathons, active git workflows, and peer reviews.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Page Forward Navigation Banner */}
        {onNavigate && (
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#09090e]/80 border border-white/[0.08] max-w-4xl mx-auto backdrop-blur-md">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Next Section</p>
                <p className="text-sm font-semibold text-white">Explore My Technical Skills & Stack</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono border border-white/[0.08] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Contact Page</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('skills')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-violet-600/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore Skills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
