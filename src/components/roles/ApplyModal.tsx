import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { Role } from '../../types/role';
import { HoldToConfirmButton } from '../ui/HoldToConfirmButton';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role;
}

export function ApplyModal({ isOpen, onClose, role }: ApplyModalProps) {
  if (!isOpen) return null;

  const handshakeUrl = `https://berea.joinhandshake.com/stu/postings?query=${encodeURIComponent(role.handshakeQuery)}`;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full max-w-lg rounded-3xl overflow-hidden bg-white/95 dark:bg-zinc-900/95 border border-black/10 dark:border-white/10 shadow-2xl backdrop-blur-2xl text-zinc-900 dark:text-zinc-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-xs">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-950 dark:text-white text-sm">
                  How to Apply on Handshake
                </h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {role.title}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Search Term on Handshake */}
            <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 space-y-1.5">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 block">
                Search Term on Handshake
              </span>
              <code className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-800/90 border border-black/5 dark:border-white/10 font-mono text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 inline-block shadow-xs select-all">
                {role.handshakeQuery}
              </code>
            </div>

            {/* Application Steps */}
            <div className="space-y-3">
              {[
                'Log in to your Berea Handshake student portal.',
                <>Search for <strong className="text-zinc-900 dark:text-zinc-100">"{role.handshakeQuery}"</strong> in on-campus labor postings.</>,
                'Attach your updated labor resume listing completed CS/Math courses.',
                <>Contact the supervisor (<strong className="text-zinc-900 dark:text-zinc-100">{role.contactPerson}</strong>) early in the hiring cycle.</>,
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                  <span className="w-5 h-5 flex-shrink-0 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-semibold text-[11px] border border-blue-500/20 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-black/5 dark:border-white/10 flex items-center justify-end gap-3 bg-black/[0.01] dark:bg-white/[0.02]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
            <HoldToConfirmButton
              label="Hold to Open Handshake"
              confirmedLabel="Opening Handshake..."
              onConfirm={() => window.open(handshakeUrl, '_blank', 'noopener,noreferrer')}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
