import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Mail,
  Sparkles,
  Terminal,
  Cpu,
  Code2,
  Brain,
  Download,
  CheckCircle2,
  Camera,
  User,
  Compass,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';

interface HeroProps {
  onViewWork: () => void;
  onContactClick: () => void;
  onResumeClick: () => void;
  onNavigate?: (pageId: string) => void;
  customAvatarUrl?: string | null;
  onOpenPhotoModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onViewWork,
  onContactClick,
  onResumeClick,
  onNavigate,
  customAvatarUrl = null,
  onOpenPhotoModal,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] pt-28 pb-16 flex items-center justify-center overflow-hidden hero-gradient"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs with Framer Motion stagger entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-purple-200/90 text-xs font-mono mb-6 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for internships & collaborations</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              id="hero-heading"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4"
            >
              Hi, I’m{' '}
              <span className="gradient-text">
                Miyyapuram Vignesh
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <div className="h-6 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
              <h2
                id="hero-subtitle"
                className="font-heading text-xl sm:text-2xl font-semibold text-purple-200/90 tracking-wide"
              >
                1st Year B.Tech CSE Student | Future AI Developer
              </h2>
            </motion.div>

            {/* Intro Paragraph */}
            <motion.p
              variants={itemVariants}
              id="hero-intro"
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal"
            >
              I’m a passionate 1st-year computer science student who enjoys building
              modern web experiences and exploring artificial intelligence.
              Dedicated to merging elegant frontend interfaces with intelligent
              systems right from the start of my engineering journey.
            </motion.p>

            {/* Buttons: “View My Work” and “Contact Me” */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
            >
              <button
                type="button"
                id="hero-view-work-btn"
                onClick={onViewWork}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer group border border-white/10"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                id="hero-contact-me-btn"
                onClick={onContactClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#121217]/85 hover:bg-[#181822] text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-white/[0.08] hover:border-violet-500/40 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Contact Me</span>
              </button>

              <button
                type="button"
                id="hero-resume-btn"
                onClick={onResumeClick}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/[0.05] text-purple-300 hover:text-purple-200 font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-transparent hover:border-white/[0.08]"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>
            </motion.div>

            {/* Quick Badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg pt-6 border-t border-white/[0.08]"
            >
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl sm:text-2xl text-white">
                  B.Tech
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Computer Science
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl sm:text-2xl text-purple-400">
                  AI & Web
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Core Exploration
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl sm:text-2xl text-sky-400">
                  1st Year
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Undergraduate
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Avatar & Interactive 3D Canvas with Framer Motion entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Glowing Backdrop Aura */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-purple-600/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Card Frame housing 3D Interactive AI Core and Avatar representation */}
            <div className="w-full max-w-md glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden border border-white/[0.08] shadow-2xl">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    ai_agent_vignesh.tsx
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono">
                  <Cpu className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span>Interactive 3D</span>
                </div>
              </div>

              {/* 3D Interactive Canvas */}
              <div className="relative w-full h-64 sm:h-72 rounded-xl bg-[#08080c]/80 overflow-hidden border border-white/[0.08] flex items-center justify-center">
                <Hero3DCanvas />

                {/* Floating Avatar Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#0a0a0f]/90 backdrop-blur-md border border-white/[0.08] flex items-center gap-3">
                  <div
                    onClick={onOpenPhotoModal}
                    title="Click to update photo"
                    className="relative w-11 h-11 rounded-lg bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 p-[1.5px] shrink-0 cursor-pointer group"
                  >
                    <div className="w-full h-full bg-[#111118] rounded-[7px] flex items-center justify-center overflow-hidden relative">
                      {customAvatarUrl ? (
                        <img
                          src={customAvatarUrl}
                          alt="Miyyapuram Vignesh"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center font-heading font-black text-sm text-purple-200">
                          MV
                        </div>
                      )}
                      {onOpenPhotoModal && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Camera className="w-3.5 h-3.5 text-purple-300" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p
                        onClick={() => onNavigate?.('profile')}
                        className="text-xs font-semibold text-white truncate hover:text-purple-300 cursor-pointer transition-colors"
                        title="Click to view Profile page"
                      >
                        Miyyapuram Vignesh
                      </p>
                      {onOpenPhotoModal && (
                        <button
                          type="button"
                          onClick={onOpenPhotoModal}
                          className="text-[10px] text-purple-400 hover:text-purple-200 font-mono cursor-pointer"
                          title="Change photo"
                        >
                          (edit)
                        </button>
                      )}
                    </div>
                    <p
                      onClick={() => onNavigate?.('profile')}
                      className="text-[11px] text-purple-300/80 truncate cursor-pointer hover:text-purple-200 transition-colors"
                      title="Click to view Profile page"
                    >
                      B.Tech CSE • Machine Learning & Web
                    </p>
                  </div>
                  <div
                    onClick={() => onNavigate?.('profile')}
                    className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0 cursor-pointer hover:bg-emerald-500/20 transition-colors"
                    title="View Profile"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active</span>
                  </div>
                </div>
              </div>

              {/* Interactive hint */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>3D Node: Hover / drag to interact</span>
                </span>
                <span className="text-purple-400/80">WebGL Active</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Explore Portfolio Pages Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 pt-12 border-t border-white/[0.08]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-purple-300 text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Portfolio Pages</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Discover My Work & Journey
              </h3>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md font-normal">
              Select a page to view full details, academic background, technical skills, or get in touch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Profile Page Card */}
            <div
              id="hero-card-profile"
              onClick={() => onNavigate?.('profile')}
              className="glass-card p-5 rounded-2xl border border-white/[0.08] hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-white text-base mb-1 group-hover:text-purple-300 transition-colors">
                  Profile Overview
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Academic credentials, university affiliation, career vision, and customizable photo.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-purple-400">
                <span>View Profile</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* About Me Page Card */}
            <div
              id="hero-card-about"
              onClick={() => onNavigate?.('about')}
              className="glass-card p-5 rounded-2xl border border-white/[0.08] hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-white text-base mb-1 group-hover:text-indigo-300 transition-colors">
                  About Me
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  My personal journey, algorithmic mindset, gaming interests, and tech philosophy.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-indigo-400">
                <span>Read Story</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Skills Page Card */}
            <div
              id="hero-card-skills"
              onClick={() => onNavigate?.('skills')}
              className="glass-card p-5 rounded-2xl border border-white/[0.08] hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-white text-base mb-1 group-hover:text-violet-300 transition-colors">
                  Skills & Stack
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Categorized technical proficiencies, frontend/backend tools, AI frameworks, and skill meters.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-violet-400">
                <span>Explore Skills</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Contact Page Card */}
            <div
              id="hero-card-contact"
              onClick={() => onNavigate?.('contact')}
              className="glass-card p-5 rounded-2xl border border-white/[0.08] hover:border-pink-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-white text-base mb-1 group-hover:text-pink-300 transition-colors">
                  Contact
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct message form, email contact, internship inquiries, and verified social channels.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-pink-400">
                <span>Get In Touch</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
