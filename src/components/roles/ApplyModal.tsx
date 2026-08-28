import React from 'react';
import { X, FileText, ExternalLink } from 'lucide-react';
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.12) 50%, rgba(0,0,0,0.55) 100%)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(239,246,255,0.97) 100%)',
          boxShadow: '0 0 0 1px rgba(59,130,246,0.2), 0 25px 60px rgba(0,0,0,0.18), 0 0 80px rgba(59,130,246,0.12)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colorful top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-sm">How to Apply on Handshake</h3>
              <span className="text-[11px] text-blue-600 font-mono font-semibold">{role.title}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Search term highlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <span className="font-semibold text-blue-700 block mb-1.5 text-xs">Search Term on Handshake:</span>
            <code className="px-3 py-2 rounded-xl bg-white border border-blue-200 font-mono text-[12px] font-bold text-blue-900 inline-block shadow-sm select-all">
              {role.handshakeQuery}
            </code>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {[
              'Log in to your Berea Handshake student portal.',
              <>Search for <strong>"{role.handshakeQuery}"</strong> in on-campus labor postings.</>,
              'Attach your updated labor resume listing completed CS/Math courses.',
              <>Contact the supervisor (<strong>{role.contactPerson}</strong>) early in the hiring cycle.</>,
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-xs text-zinc-700">
                <span className="w-6 h-6 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-mono font-bold text-[10px] shadow-md shadow-blue-500/20">
                  {i + 1}
                </span>
                <span className="leading-relaxed pt-0.5">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          <HoldToConfirmButton
            label="Hold to Open Handshake"
            confirmedLabel="Opening Handshake..."
            onConfirm={() => window.open(handshakeUrl, '_blank', 'noopener,noreferrer')}
          />
        </div>
      </div>
    </div>
  );
}
