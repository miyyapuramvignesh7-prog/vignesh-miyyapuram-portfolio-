import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  GraduationCap,
  Download,
  FileText,
  User,
  Sparkles,
  Award,
  Calendar,
  Code,
  BookOpen,
  Camera,
  ExternalLink,
  ArrowRight,
  Compass,
  Layers,
} from 'lucide-react';
import { PageHeader } from './PageHeader';

interface ProfileProps {
  onResumeClick: () => void;
  onContactClick: () => void;
  customAvatarUrl?: string | null;
  onOpenPhotoModal?: () => void;
  onNavigate?: (pageId: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  onResumeClick,
  onContactClick,
  customAvatarUrl = null,
  onOpenPhotoModal,
  onNavigate,
}) => {
  const handleAvatarClick = () => {
    if (onOpenPhotoModal) {
      onOpenPhotoModal();
    }
  };

  return (
    <section id="profile" className="py-12 sm:py-16 relative">
      {onNavigate && (
        <PageHeader
          currentPageTitle="Profile Overview"
          currentPageId="profile"
          onNavigate={onNavigate}
          badgeText="1st Year Student Credentials • Academic Journey"
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Framer Motion scroll entrance */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-purple-300 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Profile Overview</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Academic & Professional Identity
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Get to know my 1st-year educational background, career aspirations, and current focus areas.
          </p>
        </motion.div>

        {/* Main Glass-style Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto glass-panel rounded-2xl p-6 sm:p-10 border border-white/[0.09] relative overflow-hidden shadow-2xl"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Profile Photo Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-4 flex flex-col items-center text-center"
            >
              <div
                id="profile-photo-container"
                className="relative group cursor-pointer"
                onClick={handleAvatarClick}
                title="Click to update your photo"
              >
                {/* Glowing border ring */}
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-purple-500 p-[2px] shadow-xl shadow-violet-600/20 group-hover:shadow-violet-600/40 transition-all duration-300">
                  <div className="w-full h-full bg-[#08080c] rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
                    {customAvatarUrl ? (
                      <img
                        src={customAvatarUrl}
                        alt="Miyyapuram Vignesh"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4">
                        <div className="w-20 h-20 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                          <User className="w-10 h-10 text-purple-300" />
                        </div>
                        <span className="text-xs font-semibold text-white tracking-wide">
                          Miyyapuram Vignesh
                        </span>
                        <span className="text-[10px] text-purple-400 font-mono mt-0.5">
                          Click to Add Photo
                        </span>
                      </div>
                    )}

                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-violet-950/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs gap-1.5">
                      <Camera className="w-5 h-5 text-purple-300" />
                      <span className="font-medium">Change Photo</span>
                      <span className="text-[10px] text-purple-300/80 font-mono">Upload or Presets</span>
                    </div>
                  </div>
                </div>

                {/* Status chip */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#08080c] border border-white/[0.12] text-[11px] font-mono text-purple-200 whitespace-nowrap shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Student & Builder</span>
                </div>
              </div>

              {/* Direct Change Photo Action Button */}
              {onOpenPhotoModal && (
                <button
                  type="button"
                  id="profile-change-photo-btn"
                  onClick={onOpenPhotoModal}
                  className="mt-4 px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-purple-200 text-xs font-mono flex items-center gap-1.5 border border-white/[0.08] hover:border-violet-500/40 transition-all cursor-pointer shadow-sm"
                  title="Upload from device or choose an avatar preset"
                >
                  <Camera className="w-3.5 h-3.5 text-purple-400" />
                  <span>Change Photo</span>
                </button>
              )}

              {/* Action: Resume Download Button */}
              <button
                type="button"
                id="profile-resume-download-btn"
                onClick={onResumeClick}
                className="mt-4 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25 border border-white/10 hover:shadow-violet-600/40 transition-all cursor-pointer group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </button>
            </motion.div>

            {/* Right: Detailed Identity Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="md:col-span-8 flex flex-col"
            >
              {/* Name & Role */}
              <div className="border-b border-white/[0.08] pb-5 mb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3
                    id="profile-name"
                    className="font-heading text-2xl sm:text-3xl font-extrabold text-white"
                  >
                    Miyyapuram Vignesh
                  </h3>
                  <span className="px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-mono font-medium">
                    1st Year Undergraduate (Pursuing)
                  </span>
                </div>
                <p
                  id="profile-role"
                  className="text-base sm:text-lg font-medium text-purple-300 mt-1 flex items-center gap-2"
                >
                  <Code className="w-4 h-4 text-purple-400" />
                  <span>1st Year B.Tech CSE Student</span>
                </p>
              </div>

              {/* Short Bio */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400/80 mb-2">
                  About My Journey
                </h4>
                <p
                  id="profile-bio"
                  className="text-slate-300 text-sm sm:text-base leading-relaxed"
                >
                  First-year Computer Science & Engineering undergraduate passionate about learning, coding, and technology. Focused on building rock-solid foundations in programming, algorithmic problem solving, modern web applications, and artificial intelligence early in my college journey.
                </p>
              </div>

              {/* Placeholders Grid: Location, College, Education, Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {/* College Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  id="profile-college-placeholder"
                  className="p-3.5 rounded-xl bg-[#0e0e13]/80 border border-white/[0.08] flex items-start gap-3 hover:border-violet-500/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Academic Status & Program
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block truncate">
                      B.Tech in Computer Science (1st Year)
                    </span>
                    <span className="text-[11px] text-purple-300/80">
                      Currently Enrolled • Telangana, India
                    </span>
                  </div>
                </motion.div>

                {/* Location Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.28 }}
                  id="profile-location-placeholder"
                  className="p-3.5 rounded-xl bg-[#0e0e13]/80 border border-white/[0.08] flex items-start gap-3 hover:border-blue-500/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Current Location
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      Telangana, India
                    </span>
                    <span className="text-[11px] text-blue-300/80">
                      Open to Relocation & Remote Work
                    </span>
                  </div>
                </motion.div>

                {/* Focus Areas */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.36 }}
                  className="p-3.5 rounded-xl bg-[#0e0e13]/80 border border-white/[0.08] flex items-start gap-3 hover:border-violet-500/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Core Subjects
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      DSA, DBMS, OS & AI
                    </span>
                    <span className="text-[11px] text-violet-300/80">
                      Theory & Practical Labs
                    </span>
                  </div>
                </motion.div>

                {/* Ambition */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.44 }}
                  className="p-3.5 rounded-xl bg-[#0e0e13]/80 border border-white/[0.08] flex items-start gap-3 hover:border-sky-500/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Career Vision
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      AI & Full-Stack Engineer
                    </span>
                    <span className="text-[11px] text-sky-300/80">
                      Scalable Intelligent Systems
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Quick Action */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Actively building new projects</span>
                </span>
                <button
                  type="button"
                  onClick={onContactClick}
                  className="text-purple-300 hover:text-white flex items-center gap-1 underline underline-offset-4 cursor-pointer"
                >
                  <span>Get in touch</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Page Forward Navigation Banner */}
        {onNavigate && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#09090e]/80 border border-white/[0.08] max-w-4xl mx-auto backdrop-blur-md">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Continue Exploring</p>
                <p className="text-sm font-semibold text-white">Read My Developer Story & Philosophy</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => onNavigate('skills')}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono border border-white/[0.08] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Skills Stack</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>About Me Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
