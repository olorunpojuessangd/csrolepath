import React from 'react';
import { X, FileText, ExternalLink } from 'lucide-react';
import { Role } from '../../types/role';
import { LiquidButton, MetalButton } from '../ui/liquid-glass-button';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role;
}

export function ApplyModal({ isOpen, onClose, role }: ApplyModalProps) {
  if (!isOpen) return null;

  const handshakeUrl = `https://berea.joinhandshake.com/stu/postings?query=${encodeURIComponent(role.handshakeQuery)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity">
      <div
        className="liquid-card bg-white/95 dark:bg-zinc-900/95 w-full max-w-lg rounded-3xl shadow-2xl border border-black/10 dark:border-white/15 overflow-hidden specular-highlight transition-all"
      >
        <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">How to Apply on Handshake</h3>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">{role.title}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-zinc-800 dark:text-zinc-200 shadow-inner">
            <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1.5">Search Term on Handshake:</span>
            <code className="px-2.5 py-1.5 rounded-xl bg-white/80 dark:bg-black/40 border border-black/5 dark:border-white/10 font-mono text-[11px] font-bold select-all inline-block text-zinc-900 dark:text-zinc-100">
              {role.handshakeQuery}
            </code>
          </div>

          <div className="space-y-3 text-zinc-600 dark:text-zinc-300">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-center font-mono font-bold text-[10px] leading-5 flex-shrink-0 border border-blue-500/20">1</span>
              <span>Log in to your Berea Handshake student portal.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-center font-mono font-bold text-[10px] leading-5 flex-shrink-0 border border-blue-500/20">2</span>
              <span>Search for <strong>"{role.handshakeQuery}"</strong> in on-campus labor postings.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-center font-mono font-bold text-[10px] leading-5 flex-shrink-0 border border-blue-500/20">3</span>
              <span>Attach your updated labor resume listing completed CS/Math courses.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-center font-mono font-bold text-[10px] leading-5 flex-shrink-0 border border-blue-500/20">4</span>
              <span>Contact the supervisor ({role.contactPerson}) early in the hiring cycle.</span>
            </div>
          </div>
        </div>

        <div className="p-4 px-6 border-t border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-end gap-3">
          <LiquidButton
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            Close
          </LiquidButton>
          <MetalButton
            variant="primary"
            size="sm"
            onClick={() => window.open(handshakeUrl, '_blank', 'noopener,noreferrer')}
          >
            <span>Open Handshake</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </MetalButton>
        </div>
      </div>
    </div>
  );
}
