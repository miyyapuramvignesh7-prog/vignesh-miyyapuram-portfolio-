import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Palette,
  Braces,
  Atom,
  Server,
  PenTool,
  GitBranch,
  MessageSquare,
  Sparkles,
  Layers,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Mail,
  Compass,
} from 'lucide-react';
import { SkillItem } from '../types';
import { PageHeader } from './PageHeader';

interface SkillsProps {
  onNavigate?: (pageId: string) => void;
  onContactClick?: () => void;
}

const SKILLS_DATA: SkillItem[] = [
  // Frontend
  {
    name: 'HTML',
    category: 'Frontend',
    level: 90,
    iconName: 'html',
    description: 'Semantic markup, accessibility (a11y), SEO standards & responsive structure.',
    tags: ['HTML5', 'Semantic', 'A11y'],
  },
  {
    name: 'CSS',
    category: 'Frontend',
    level: 88,
    iconName: 'css',
    description: 'Modern styling, Tailwind CSS, Flexbox, Grid, keyframe animations & responsive queries.',
    tags: ['CSS3', 'Tailwind', 'Flex/Grid'],
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    level: 85,
    iconName: 'javascript',
    description: 'ES6+ syntax, asynchronous programming, DOM manipulation, promises & event loops.',
    tags: ['ES6+', 'Async/Await', 'APIs'],
  },
  {
    name: 'React',
    category: 'Frontend',
    level: 82,
    iconName: 'react',
    description: 'Functional components, hooks, state management, component lifecycles & clean UI architecture.',
    tags: ['React 18/19', 'Hooks', 'Vite'],
  },
  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    level: 78,
    iconName: 'nodejs',
    description: 'Server-side runtime, Express API building, RESTful endpoints & middleware logic.',
    tags: ['Express', 'REST APIs', 'NPM'],
  },
  // Design Tools
  {
    name: 'Figma',
    category: 'Design Tools',
    level: 75,
    iconName: 'figma',
    description: 'Wireframing, interactive prototyping, design systems, vector editing & UI components.',
    tags: ['Prototyping', 'UI/UX', 'Design Systems'],
  },
  {
    name: 'Git',
    category: 'Design Tools',
    level: 84,
    iconName: 'git',
    description: 'Version control, branching strategies, commit hygiene, GitHub collaboration & PRs.',
    tags: ['Version Control', 'GitHub', 'CI/CD Basics'],
  },
  // Soft Skills
  {
    name: 'Communication',
    category: 'Soft Skills',
    level: 90,
    iconName: 'communication',
    description: 'Clear technical explanations, team collaboration, active listening & presentation skills.',
    tags: ['Teamwork', 'Presentations', 'Problem Solving'],
  },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Design Tools', 'Soft Skills'] as const;

export const Skills: React.FC<SkillsProps> = ({ onNavigate, onContactClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'bars'>('cards');

  const filteredSkills =
    selectedCategory === 'All'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'html':
        return <Code className="w-5 h-5 text-orange-400" />;
      case 'css':
        return <Palette className="w-5 h-5 text-blue-400" />;
      case 'javascript':
        return <Braces className="w-5 h-5 text-yellow-400" />;
      case 'react':
        return <Atom className="w-5 h-5 text-cyan-400" />;
      case 'nodejs':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'figma':
        return <PenTool className="w-5 h-5 text-pink-400" />;
      case 'git':
        return <GitBranch className="w-5 h-5 text-rose-400" />;
      case 'communication':
        return <MessageSquare className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 relative">
      {onNavigate && (
        <PageHeader
          currentPageTitle="Skills & Proficiencies"
          currentPageId="skills"
          onNavigate={onNavigate}
          badgeText="Frontend • Backend • Design & Soft Skills"
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-purple-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Proficiencies
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Categorized toolkit encompassing frontend development, backend services, design tools, and interpersonal communication.
          </p>
        </motion.div>

        {/* Controls: Category Filter Tabs & View Mode */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-white/[0.08]"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-[#0a0a0f]/80 border border-white/[0.08] backdrop-blur-md">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  id={`skill-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-md shadow-violet-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Layout:</span>
            <div className="flex items-center p-1 rounded-lg bg-[#0a0a0f]/80 border border-white/[0.08]">
              <button
                type="button"
                id="skill-view-cards"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-md text-xs transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white/[0.08] text-purple-200 font-semibold border border-white/[0.1]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cards View
              </button>
              <button
                type="button"
                id="skill-view-bars"
                onClick={() => setViewMode('bars')}
                className={`px-3 py-1 rounded-md text-xs transition-all cursor-pointer ${
                  viewMode === 'bars'
                    ? 'bg-white/[0.08] text-purple-200 font-semibold border border-white/[0.1]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Progress Bars
              </button>
            </div>
          </div>
        </motion.div>

        {/* Skills Display Area */}
        <AnimatePresence mode="wait">
          {viewMode === 'cards' ? (
            <motion.div
              key="cards-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="glass-card rounded-2xl p-5 border border-white/[0.08] hover:border-violet-500/35 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon + Level Percentage */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#0f0f14] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 group-hover:border-violet-400/40 transition-all duration-300">
                        {getSkillIcon(skill.iconName)}
                      </div>
                      <span className="font-mono text-xs font-semibold text-purple-300 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Skill Name & Category */}
                    <h3 className="font-heading text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-purple-400/80 block mb-2.5">
                      {skill.category}
                    </span>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {skill.description}
                    </p>
                  </div>

                  <div>
                    {/* Animated Progress Bar */}
                    <div className="w-full bg-[#0d0d12] rounded-full h-1.5 overflow-hidden mb-3 border border-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 + index * 0.05, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-400 rounded-full"
                      />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Progress Bars View */
            <motion.div
              key="bars-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6"
            >
              {filteredSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  id={`skill-bar-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0f0f14] border border-white/[0.08] flex items-center justify-center">
                        {getSkillIcon(skill.iconName)}
                      </div>
                      <div>
                        <span className="font-heading font-semibold text-sm sm:text-base text-white">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono text-purple-400/80 ml-2">
                          ({skill.category})
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs sm:text-sm font-bold text-purple-300">
                      {skill.level}%
                    </span>
                  </div>

                  {/* The bar */}
                  <div className="w-full bg-[#0d0d12] rounded-full h-2.5 overflow-hidden border border-white/[0.08] p-[1px]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-400 rounded-full"
                    />
                  </div>

                  <p className="text-xs text-slate-400 leading-normal pl-10">
                    {skill.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Commitment Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-mono">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Continuously expanding competencies in machine learning and scalable web systems.</span>
          </div>
        </div>

        {/* Page Forward Navigation Banner */}
        {onNavigate && (
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#09090e]/80 border border-white/[0.08] max-w-4xl mx-auto backdrop-blur-md">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-pink-500/15 flex items-center justify-center text-pink-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Next Section</p>
                <p className="text-sm font-semibold text-white">Have a project or internship opening?</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono border border-white/[0.08] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>About Story</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-pink-600/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Contact Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
