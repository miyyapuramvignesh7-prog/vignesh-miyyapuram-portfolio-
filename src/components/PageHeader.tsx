import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  currentPageTitle: string;
  currentPageId: string;
  onNavigate: (pageId: string) => void;
  badgeText?: string;
}

const ALL_PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const PageHeader: React.FC<PageHeaderProps> = ({
  currentPageTitle,
  currentPageId,
  onNavigate,
  badgeText,
}) => {
  return (
    <div className="pt-6 pb-2 mb-6 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Breadcrumbs & Back Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono border border-white/[0.08] hover:border-purple-500/30 transition-all cursor-pointer group"
              title="Return to Home Page"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-purple-400" />
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <span
                onClick={() => onNavigate('home')}
                className="hover:text-purple-300 cursor-pointer flex items-center gap-1"
              >
                <Home className="w-3 h-3 text-slate-400" />
                <span>Home</span>
              </span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-purple-300 font-semibold">{currentPageTitle}</span>
            </div>
          </div>

          {/* Quick Page Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-mono text-slate-400 mr-1 hidden md:inline">
              Jump to:
            </span>
            {ALL_PAGES.map((page) => {
              const isCurrent = page.id === currentPageId;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => onNavigate(page.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 font-semibold'
                      : 'bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-slate-200 border border-transparent hover:border-white/[0.06]'
                  }`}
                >
                  {page.label}
                </button>
              );
            })}
          </div>
        </div>

        {badgeText && (
          <div className="mt-4">
            <span className="inline-block text-[11px] text-purple-400/90 font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
              {badgeText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
