import React from 'react';
import {
  ArrowUp,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Heart,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTop,
  onNavigate,
}) => {
  return (
    <footer
      id="main-footer"
      className="relative bg-[#050505] border-t border-white/[0.08] pt-12 pb-8 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Brand and Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center font-heading font-extrabold text-sm text-white shadow-md shadow-violet-600/30 border border-white/10">
                V
              </div>
              <span className="font-heading font-bold text-lg text-white">
                Miyyapuram Vignesh
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              1st Year B.Tech CSE Student & Aspiring AI Developer
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-purple-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="hover:text-purple-300 transition-colors cursor-pointer"
            >
              Profile
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="hover:text-purple-300 transition-colors cursor-pointer"
            >
              About Me
            </button>
            <button
              type="button"
              onClick={() => onNavigate('skills')}
              className="hover:text-purple-300 transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-purple-300 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            {/* Social icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-github"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.08] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-linkedin"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-[#38bdf8] hover:border-white/[0.2] hover:bg-white/[0.08] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-instagram"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-[#ec4899] hover:border-white/[0.2] hover:bg-white/[0.08] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=miyyapuramvignesh7@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-email"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-purple-300 hover:border-white/[0.2] hover:bg-white/[0.08] transition-all"
                aria-label="Send via Gmail"
                title="Send Email via Gmail (miyyapuramvignesh7@gmail.com)"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              type="button"
              id="footer-back-to-top-btn"
              onClick={onScrollToTop}
              className="w-9 h-9 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-violet-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group border border-white/10"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-center gap-3">
          <p
            id="footer-copyright"
            className="text-xs text-slate-400 font-mono tracking-wide"
          >
            © 2026 Miyyapuram Vignesh. All rights reserved.
          </p>

          <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <span>Crafted with passion for AI & Modern Web</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
