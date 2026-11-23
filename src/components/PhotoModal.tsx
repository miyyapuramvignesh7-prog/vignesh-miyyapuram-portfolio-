import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  Upload,
  Link as LinkIcon,
  Sparkles,
  X,
  Check,
  RotateCcw,
  User,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhoto: string | null;
  onSavePhoto: (photoUrl: string | null) => void;
}

// Curated avatar presets suitable for a modern AI & CS developer portfolio
const PRESET_AVATARS = [
  {
    id: 'tech-dev-1',
    label: 'Modern Coder',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'tech-dev-2',
    label: 'Young Builder',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'tech-dev-3',
    label: 'Creative Engineer',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'tech-dev-4',
    label: 'Software Scholar',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'tech-ai-mesh',
    label: 'AI Digital Concept',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'tech-neural-orb',
    label: 'Neural Matrix',
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
  },
];

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  currentPhoto,
  onSavePhoto,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(currentPhoto);
  const [urlInput, setUrlInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setPreviewPhoto(currentPhoto);
      setErrorMsg(null);
    }
  }, [isOpen, currentPhoto]);

  // Compress / resize image using canvas to ensure it fits comfortably in localStorage
  const processImageFile = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPEG, PNG, WEBP, GIF)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) return;

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 400; // Optimal 400x400 square for profile avatar
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setPreviewPhoto(compressedDataUrl);
        } else {
          setPreviewPhoto(result);
        }
      };
      img.onerror = () => {
        setErrorMsg('Failed to process image file. Please try another image.');
      };
      img.src = result;
    };
    reader.onerror = () => {
      setErrorMsg('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleApplyUrl = () => {
    setErrorMsg(null);
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setErrorMsg('Please paste an image URL');
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('data:image/')) {
      setErrorMsg('Please enter a valid URL starting with https://');
      return;
    }
    setPreviewPhoto(trimmed);
  };

  const handleSave = () => {
    onSavePhoto(previewPhoto);
    onClose();
  };

  const handleResetToDefault = () => {
    setPreviewPhoto(null);
    onSavePhoto(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="photo-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-[#0a0a0f] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden my-6"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0e0e14]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-purple-300">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">
                  Update Profile Photo
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Personalize your portfolio avatar
                </p>
              </div>
            </div>
            <button
              type="button"
              id="photo-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close photo modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Live Avatar Preview Section */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-[#0e0e13]/80 border border-white/[0.08]">
              {/* Avatar ring */}
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-500 p-[2px] shadow-lg shadow-violet-600/20 shrink-0">
                <div className="w-full h-full bg-[#08080c] rounded-[14px] flex items-center justify-center overflow-hidden">
                  {previewPhoto ? (
                    <img
                      src={previewPhoto}
                      alt="Avatar Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={() => setErrorMsg('Could not load image from this source. Please check the URL or try uploading a file.')}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <User className="w-9 h-9 text-purple-300 mb-1" />
                      <span className="font-heading font-bold text-xs text-white">MV</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Information */}
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-purple-300 mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Live Preview</span>
                </div>
                <h4 className="font-heading font-semibold text-sm text-white">
                  Miyyapuram Vignesh
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {previewPhoto ? 'Custom photo selected and ready to apply' : 'Default stylized placeholder active'}
                </p>
                {previewPhoto && (
                  <button
                    type="button"
                    onClick={() => setPreviewPhoto(null)}
                    className="mt-2 text-[11px] text-pink-400 hover:text-pink-300 font-mono inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Revert to default monogram</span>
                  </button>
                )}
              </div>
            </div>

            {/* Selection Method Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#0e0e14] border border-white/[0.08]">
              <button
                type="button"
                id="photo-tab-upload"
                onClick={() => setActiveTab('upload')}
                className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-white/[0.08] text-white border border-white/[0.1] shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>
              <button
                type="button"
                id="photo-tab-url"
                onClick={() => setActiveTab('url')}
                className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'url'
                    ? 'bg-white/[0.08] text-white border border-white/[0.1] shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Image URL</span>
              </button>
              <button
                type="button"
                id="photo-tab-presets"
                onClick={() => setActiveTab('presets')}
                className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'presets'
                    ? 'bg-white/[0.08] text-white border border-white/[0.1] shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Presets</span>
              </button>
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Tab 1: Upload File from Device */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    isDragOver
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-white/[0.12] hover:border-violet-500/40 bg-[#08080c]/60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-purple-300 mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Click to browse or drag & drop your photo
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports PNG, JPG, WEBP or GIF (automatically optimized)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-file-input"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Client-side secure processing</span>
                  <span>Instant preview</span>
                </div>
              </div>
            )}

            {/* Tab 2: Web Image URL */}
            {activeTab === 'url' && (
              <div className="space-y-3">
                <label
                  htmlFor="photo-url-input"
                  className="block text-xs font-mono text-slate-300"
                >
                  Paste direct image address (GitHub avatar, Google Drive, Unsplash, etc.):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="photo-url-input"
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#09090d] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-medium border border-white/[0.1] transition-all cursor-pointer shrink-0"
                  >
                    Apply URL
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Tip: You can use your GitHub profile picture via URL:{' '}
                  <code className="text-purple-300 font-mono">https://github.com/[username].png</code>
                </p>
              </div>
            )}

            {/* Tab 3: Curated Presets */}
            {activeTab === 'presets' && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 mb-3">
                  Select any high-resolution curated tech avatar with 1 click:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {PRESET_AVATARS.map((preset) => {
                    const isSelected = previewPhoto === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setErrorMsg(null);
                          setPreviewPhoto(preset.url);
                        }}
                        className={`p-2 rounded-xl border text-center flex flex-col items-center gap-2 transition-all cursor-pointer group ${
                          isSelected
                            ? 'border-violet-500 bg-violet-500/15 ring-1 ring-violet-500/40'
                            : 'border-white/[0.08] bg-[#0c0c12] hover:border-white/[0.2] hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/[0.08]">
                          <img
                            src={preset.url}
                            alt={preset.label}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-violet-900/60 flex items-center justify-center text-white">
                              <Check className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-300 truncate w-full">
                          {preset.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-[#0e0e14] border-t border-white/[0.08] flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs text-slate-400 hover:text-red-400 font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-slate-300 font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                id="photo-modal-save-btn"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-violet-600/25 border border-white/10 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Photo</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
