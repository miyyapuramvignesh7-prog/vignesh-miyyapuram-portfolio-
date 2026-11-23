import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Instagram,
  Sparkles,
  ExternalLink,
  Camera,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onResumeClick: () => void;
  customAvatarUrl?: string | null;
  onOpenPhotoModal?: () => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onResumeClick,
  customAvatarUrl = null,
  onOpenPhotoModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.7)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          id="navbar-brand-logo"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="Vignesh Portfolio Home"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center p-[1px] shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#08080a] rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
              <span className="font-heading font-extrabold text-lg text-white group-hover:scale-110 transition-transform duration-300">
                V
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Vignesh
            </span>
            <span className="text-[10px] text-purple-300/70 font-mono -mt-1 hidden sm:block">
              CSE • AI Aspirant
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          id="desktop-nav-links"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#101015]/80 border border-white/[0.08] backdrop-blur-md shadow-inner"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                id={`nav-link-${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-blue-600/40 border border-purple-400/30 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Desktop Social Icons & Action */}
        <div className="hidden md:flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 border-r border-purple-500/20 pr-3 mr-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-social-github"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-500/10 hover:border hover:border-purple-500/30 transition-all"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-social-linkedin"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#38bdf8] hover:bg-blue-500/10 hover:border hover:border-blue-500/30 transition-all"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-social-instagram"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#ec4899] hover:bg-pink-500/10 hover:border hover:border-pink-500/30 transition-all"
              aria-label="Instagram Profile"
              title="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {/* Profile Photo Quick Access */}
          {onOpenPhotoModal && (
            <button
              type="button"
              id="navbar-photo-btn"
              onClick={onOpenPhotoModal}
              title="Change or view profile photo"
              className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 p-[1.5px] hover:scale-105 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-full h-full bg-[#0b0b10] rounded-[6.5px] overflow-hidden flex items-center justify-center relative">
                {customAvatarUrl ? (
                  <img
                    src={customAvatarUrl}
                    alt="Vignesh"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-heading font-extrabold text-[11px] text-purple-200">
                    V
                  </span>
                )}
                <div className="absolute inset-0 bg-violet-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Camera className="w-3.5 h-3.5 text-purple-300" />
                </div>
              </div>
            </button>
          )}

          <button
            type="button"
            id="navbar-resume-btn"
            onClick={onResumeClick}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-500 hover:to-blue-500 text-white shadow-md shadow-purple-700/20 transition-all active:scale-95 flex items-center gap-1.5 border border-purple-400/20 cursor-pointer"
          >
            <span>Resume</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            id="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-[#121217] border border-white/[0.08] text-slate-200 flex items-center justify-center hover:bg-white/[0.05] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#08080c]/98 border-b border-white/[0.08] backdrop-blur-2xl px-6 py-5 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left font-medium transition-all ${
                      isActive
                        ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 text-purple-400" />}
                  </button>
                );
              })}

              {onOpenPhotoModal && (
                <button
                  type="button"
                  id="mobile-nav-photo-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPhotoModal();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-purple-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors cursor-pointer mt-1"
                >
                  <span className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-purple-400" />
                    <span>Change Profile Photo</span>
                  </span>
                  {customAvatarUrl ? (
                    <img
                      src={customAvatarUrl}
                      alt="Thumbnail"
                      className="w-6 h-6 rounded-md object-cover border border-purple-500/40"
                    />
                  ) : (
                    <span className="text-xs font-mono text-purple-400">Default</span>
                  )}
                </button>
              )}

              <div className="pt-4 mt-2 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-blue-400"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-pink-400"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onResumeClick();
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md cursor-pointer"
                >
                  View Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
