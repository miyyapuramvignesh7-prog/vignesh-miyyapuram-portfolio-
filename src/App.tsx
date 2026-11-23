import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Background3D } from './components/Background3D';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { AboutMe } from './components/AboutMe';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PhotoModal } from './components/PhotoModal';

const STORAGE_AVATAR_KEY = 'vignesh_portfolio_avatar_url';

type PageId = 'home' | 'profile' | 'about' | 'skills' | 'contact';

const VALID_PAGES: PageId[] = ['home', 'profile', 'about', 'skills', 'contact'];

const getInitialPage = (): PageId => {
  try {
    const hash = window.location.hash.replace('#', '').trim().toLowerCase();
    if (VALID_PAGES.includes(hash as PageId)) {
      return hash as PageId;
    }
  } catch {
    // fallback
  }
  return 'home';
};

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(getInitialPage);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_AVATAR_KEY);
    } catch {
      return null;
    }
  });

  const handleSavePhoto = (newPhotoUrl: string | null) => {
    setCustomAvatarUrl(newPhotoUrl);
    try {
      if (newPhotoUrl) {
        localStorage.setItem(STORAGE_AVATAR_KEY, newPhotoUrl);
      } else {
        localStorage.removeItem(STORAGE_AVATAR_KEY);
      }
    } catch (e) {
      console.warn('Failed to save avatar to localStorage:', e);
    }
  };

  // Navigate to a specific page
  const navigateToPage = (pageId: string) => {
    const targetPage = VALID_PAGES.includes(pageId as PageId)
      ? (pageId as PageId)
      : 'home';

    setActivePage(targetPage);
    window.location.hash = `#${targetPage}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state with URL hash on browser forward/back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      if (VALID_PAGES.includes(hash as PageId)) {
        setActivePage(hash as PageId);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e0e0e0] selection:bg-purple-500/30 selection:text-purple-200 flex flex-col justify-between">
      {/* Three.js Interactive 3D Background */}
      <Background3D />

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Navbar */}
        <Navbar
          activeSection={activePage}
          onNavigate={navigateToPage}
          onResumeClick={() => setIsResumeModalOpen(true)}
          customAvatarUrl={customAvatarUrl}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        />

        {/* Dynamic Page Router with AnimatePresence */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <Hero
                  onViewWork={() => navigateToPage('skills')}
                  onContactClick={() => navigateToPage('contact')}
                  onResumeClick={() => setIsResumeModalOpen(true)}
                  onNavigate={navigateToPage}
                  customAvatarUrl={customAvatarUrl}
                  onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
                />
              </motion.div>
            )}

            {activePage === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <Profile
                  onResumeClick={() => setIsResumeModalOpen(true)}
                  onContactClick={() => navigateToPage('contact')}
                  customAvatarUrl={customAvatarUrl}
                  onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
                  onNavigate={navigateToPage}
                />
              </motion.div>
            )}

            {activePage === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <AboutMe onNavigate={navigateToPage} />
              </motion.div>
            )}

            {activePage === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <Skills
                  onNavigate={navigateToPage}
                  onContactClick={() => navigateToPage('contact')}
                />
              </motion.div>
            )}

            {activePage === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <Contact onNavigate={navigateToPage} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer
          onScrollToTop={scrollToTop}
          onNavigate={navigateToPage}
        />
      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Profile Photo Customization Modal */}
      <PhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhoto={customAvatarUrl}
        onSavePhoto={handleSavePhoto}
      />
    </div>
  );
}
