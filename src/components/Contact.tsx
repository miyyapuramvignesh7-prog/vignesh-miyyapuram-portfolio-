import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Github,
  Linkedin,
  Instagram,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Home,
  User,
  Layers,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactFormData } from '../types';
import { PageHeader } from './PageHeader';

interface ContactProps {
  onNavigate?: (pageId: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  // Target recipient email: miyyapuramvignesh7@gmail.com
  const displayEmail = 'miyyapuramvignesh7@gmail.com';

  const [formData, setFormData] = useState<ContactFormData>({
    name: 'Miyyapuram Vignesh',
    email: 'miyyapuramvignesh7@gmail.com',
    subject: 'Project Collaboration / Internship Opportunity',
    message: 'Hi Vignesh, I came across your portfolio and would like to connect regarding an exciting project opportunity.',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Generate web Gmail compose URL
  const getGmailComposeUrl = (): string => {
    const subject = encodeURIComponent(
      formData.subject.trim() || 'Portfolio Collaboration Inquiry'
    );
    const bodyContent = `Hi Vignesh,

${formData.message.trim()}

---
Sender Details:
Name: ${formData.name.trim()}
Email: ${formData.email.trim()}`;

    const body = encodeURIComponent(bodyContent);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      displayEmail
    )}&su=${subject}&body=${body}`;
  };

  // Generate fallback mailto link
  const getMailtoUrl = (): string => {
    const subject = encodeURIComponent(
      formData.subject.trim() || 'Portfolio Collaboration Inquiry'
    );
    const bodyContent = `Hi Vignesh,

${formData.message.trim()}

---
Sender Details:
Name: ${formData.name.trim()}
Email: ${formData.email.trim()}`;

    const body = encodeURIComponent(bodyContent);
    return `mailto:${displayEmail}?subject=${subject}&body=${body}`;
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const gmailUrl = getGmailComposeUrl();

    // Trigger Gmail window directly
    try {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback handled via UI buttons
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#a855f7', '#8b5cf6', '#38bdf8', '#c084fc'],
        });
      } catch {
        // Safe fallback
      }
    }, 600);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(displayEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch (err) {
      // Fallback
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-12 sm:py-16 relative">
      {onNavigate && (
        <PageHeader
          currentPageTitle="Contact"
          currentPageId="contact"
          onNavigate={onNavigate}
          badgeText="Direct Inquiries • Communication Portal"
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
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Let's Connect</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Have a project in mind, an internship opportunity, or want to discuss AI technology?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact details & Social Links (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            {/* Direct Email Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-white">
                    Direct Email
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Send a direct note
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0a0a0f] border border-white/[0.08] flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-mono text-purple-300 truncate">
                  {displayEmail}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(displayEmail)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-white border border-red-500/30 text-xs font-mono flex items-center gap-1 transition-all"
                    title="Open directly in Gmail"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Gmail</span>
                  </a>
                  <button
                    type="button"
                    id="contact-copy-email-btn"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-3 leading-normal">
                Directly opens Gmail Web or copies the address to your clipboard.
              </p>
            </div>

            {/* Location Placeholder Card */}
            <div
              id="contact-location-info"
              className="glass-card rounded-2xl p-6 border border-white/[0.08]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-white">
                    Location Placeholder
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Academic Campus & Residence
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-200 font-medium">
                Hyderabad, Telangana, India
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Timezone: IST (UTC +5:30) • Available for remote collaborations worldwide.
              </p>
            </div>

            {/* Social Media Links Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/[0.08]">
              <h3 className="font-heading text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Connect on Social Media</span>
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-social-github"
                  className="p-3 rounded-xl bg-[#0e0e13] border border-white/[0.08] hover:border-white/[0.2] text-center flex flex-col items-center justify-center gap-1.5 hover:bg-white/[0.04] transition-all group"
                >
                  <Github className="w-5 h-5 text-slate-300 group-hover:text-white group-hover:scale-110 transition-all" />
                  <span className="text-xs font-mono text-slate-300">GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-social-linkedin"
                  className="p-3 rounded-xl bg-[#0e0e13] border border-white/[0.08] hover:border-white/[0.2] text-center flex flex-col items-center justify-center gap-1.5 hover:bg-white/[0.04] transition-all group"
                >
                  <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-[#38bdf8] group-hover:scale-110 transition-all" />
                  <span className="text-xs font-mono text-slate-300">LinkedIn</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-social-instagram"
                  className="p-3 rounded-xl bg-[#0e0e13] border border-white/[0.08] hover:border-white/[0.2] text-center flex flex-col items-center justify-center gap-1.5 hover:bg-white/[0.04] transition-all group"
                >
                  <Instagram className="w-5 h-5 text-slate-300 group-hover:text-[#ec4899] group-hover:scale-110 transition-all" />
                  <span className="text-xs font-mono text-slate-300">Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Validation & Success State (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.09] relative shadow-2xl">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-8 flex flex-col items-center text-center space-y-4"
                    id="contact-success-state"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-500/20 via-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-500/20">
                      <Mail className="w-8 h-8 text-rose-400" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      Message Prepared for Gmail!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md">
                      Thank you, <span className="font-semibold text-purple-300">{formData.name}</span>!
                      Your drafted email has been addressed to{' '}
                      <span className="font-mono text-purple-300 font-medium">{displayEmail}</span>.
                    </p>

                    {/* Quick Gmail Web and Mail Client Buttons */}
                    <div className="w-full max-w-md pt-2 space-y-2.5">
                      <a
                        href={getGmailComposeUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Open in Gmail Web</span>
                        <ExternalLink className="w-4 h-4 opacity-80" />
                      </a>

                      <a
                        href={getMailtoUrl()}
                        className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-mono transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Open in Default Mail Client (Outlook / Apple Mail)</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      id="contact-send-another-btn"
                      onClick={handleResetForm}
                      className="mt-3 px-6 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/30 text-xs sm:text-sm font-medium transition-all cursor-pointer"
                    >
                      Write Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form
                    key="contact-form"
                    id="portfolio-contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div className="border-b border-white/[0.08] pb-3">
                      <h3 className="font-heading text-xl font-bold text-white">
                        Send a Message
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Fill in the fields below. Pre-filled with your details for your convenience.
                      </p>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Miyyapuram Vignesh"
                        className={`w-full px-4 py-3 rounded-xl bg-[#09090d] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                          errors.name
                            ? 'border-red-500/60 focus:border-red-400'
                            : 'border-white/[0.08] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="miyyapuramvignesh7@gmail.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#09090d] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                          errors.email
                            ? 'border-red-500/60 focus:border-red-400'
                            : 'border-white/[0.08] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder="What would you like to discuss?"
                        className={`w-full px-4 py-3 rounded-xl bg-[#09090d] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                          errors.subject
                            ? 'border-red-500/60 focus:border-red-400'
                            : 'border-white/[0.08] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30'
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.subject}</span>
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Write your message here..."
                        className={`w-full px-4 py-3 rounded-xl bg-[#09090d] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-none ${
                          errors.message
                            ? 'border-red-500/60 focus:border-red-400'
                            : 'border-white/[0.08] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-indigo-600 hover:from-red-500 hover:via-purple-500 hover:to-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-red-600/20 border border-white/10 hover:shadow-red-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Preparing Gmail Composer...</span>
                        </div>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 text-rose-300" />
                          <span>Send Message via Gmail</span>
                          <ExternalLink className="w-4 h-4 opacity-75" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-400 font-mono mt-2">
                      ✉️ Submitting directs your message to Gmail addressed to{' '}
                      <span className="text-purple-300 font-medium">{displayEmail}</span>
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Page Navigation Return Banner */}
        {onNavigate && (
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#09090e]/80 border border-white/[0.08] max-w-4xl mx-auto backdrop-blur-md">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Navigate</p>
                <p className="text-sm font-semibold text-white">Return to Home or Review Profile</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono border border-white/[0.08] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>Profile Page</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Back to Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
