import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Printer,
  FileText,
  User,
  GraduationCap,
  Code,
  Sparkles,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate simple clean text / markdown blob or trigger print to PDF
    const resumeText = `
MIYYAPURAM VIGNESH
1st Year B.Tech Computer Science and Engineering | Aspiring AI Developer
Email: miyyapuramvignesh7@gmail.com
Location: Telangana, India

EDUCATION
- Bachelor of Technology (B.Tech) in Computer Science & Engineering
  Status: 1st Year Undergraduate (Currently Enrolled / Pursuing)
  Coursework & Foundations: Programming Fundamentals, Problem Solving, Computer Science Basics, Web Technologies, Artificial Intelligence Exploration

TECHNICAL SKILLS
- Frontend: HTML5, CSS3, JavaScript (ES6+), React
- Backend: Node.js, Express.js, REST APIs
- Design & Version Control: Figma, Git & GitHub
- Soft Skills: Technical Communication, Collaborative Problem Solving

CAREER OBJECTIVE
"My goal is to become an AI Developer and create useful, intelligent applications."
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Miyyapuram_Vignesh_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div
        id="resume-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[#0a0a0f] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0e0e14]">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <h3 className="font-heading font-bold text-white text-lg">
                Curriculum Vitae Preview
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-purple-200 text-xs font-mono flex items-center gap-1.5 border border-white/[0.08] transition-colors cursor-pointer"
                title="Download CV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono hidden sm:flex items-center gap-1.5 border border-white/[0.06] transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body - Styled Clean Resume Sheet */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-200 text-sm">
            {/* Candidate Header */}
            <div className="border-b border-white/[0.08] pb-5">
              <h1 className="font-heading text-2xl font-bold text-white">
                Miyyapuram Vignesh
              </h1>
              <p className="text-purple-300 font-medium text-sm mt-0.5">
                1st Year B.Tech Computer Science & Engineering | Future AI Developer
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  <span>miyyapuramvignesh7@gmail.com</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>Telangana, India</span>
                </span>
              </div>
            </div>

            {/* Objective */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Career Objective</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#111118] p-3.5 rounded-xl border border-white/[0.08]">
                “My goal is to become an AI Developer and create useful, intelligent applications. Seeking opportunities to apply software development fundamentals, frontend engineering, and machine learning exploration in high-impact environments.”
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </h2>
              <div className="bg-[#111118] p-4 rounded-xl border border-white/[0.08]">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      Bachelor of Technology (B.Tech) in Computer Science & Engineering
                    </h3>
                    <p className="text-xs text-purple-300/90 mt-0.5">
                      1st Year Undergraduate • Engineering College, Telangana
                    </p>
                  </div>
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-purple-500/20 whitespace-nowrap">
                    1st Year (Pursuing)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Key Subjects & Focus: Programming Fundamentals, Problem Solving, Computer Science Basics, Web Technologies & Artificial Intelligence Foundations.
                </p>
              </div>
            </div>

            {/* Technical Toolkit */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2.5 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                <span>Technical Skillset</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#111118] border border-white/[0.08]">
                  <span className="font-semibold text-white block mb-1">
                    Frontend Engineering
                  </span>
                  <span className="text-slate-400">
                    HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React.js, Responsive UI
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#111118] border border-white/[0.08]">
                  <span className="font-semibold text-white block mb-1">
                    Backend & Runtime
                  </span>
                  <span className="text-slate-400">
                    Node.js, Express.js, RESTful Architecture, JSON APIs
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#111118] border border-white/[0.08]">
                  <span className="font-semibold text-white block mb-1">
                    Design & Version Control
                  </span>
                  <span className="text-slate-400">
                    Figma UI/UX Prototyping, Git, GitHub
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#111118] border border-white/[0.08]">
                  <span className="font-semibold text-white block mb-1">
                    Interpersonal & Soft Skills
                  </span>
                  <span className="text-slate-400">
                    Communication, Teamwork, Analytical Problem Solving, Agile Collaboration
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-[#0e0e14] border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Ready for internships & full-time roles
            </span>
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 border border-white/10 shadow-md shadow-violet-600/25"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Plain Text Resume</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
