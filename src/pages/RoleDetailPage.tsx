import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { roles } from '../data/roles';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PrereqChecklist } from '../components/roles/PrereqChecklist';
import { ApplyModal } from '../components/roles/ApplyModal';
import { Badge } from '../components/common/Badge';
import { LiquidButton, MetalButton } from '../components/ui/liquid-glass-button';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  TrendingUp, 
  FileText, 
  Lightbulb,
  Check,
  Share2
} from 'lucide-react';

export function RoleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const role = roles.find(r => r.id === id);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [checkedPrereqs, setCheckedPrereqs] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!role) return;

    const saved = localStorage.getItem('savedRoleIds');
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        if (Array.isArray(ids) && ids.includes(role.id)) {
          setIsSaved(true);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const storedChecks = localStorage.getItem(`prereq_checks_${role.id}`);
    if (storedChecks) {
      try {
        const checked = JSON.parse(storedChecks);
        if (Array.isArray(checked)) {
          setCheckedPrereqs(checked);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [role]);

  if (!role) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-200">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center liquid-card p-8 sm:p-10 rounded-3xl border border-black/5 dark:border-white/10 max-w-md w-full shadow-xl">
            <h1 className="text-xl font-semibold mb-2 text-zinc-950 dark:text-white">Role not found</h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">The requested position could not be located in the labor directory.</p>
            <Link to="/explore" className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20">
              Back to Explore Roles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const toggleSaveRole = () => {
    const saved = localStorage.getItem('savedRoleIds');
    let ids: string[] = [];
    if (saved) {
      try {
        ids = JSON.parse(saved);
      } catch (e) {
        ids = [];
      }
    }

    let updated: string[];
    if (ids.includes(role.id)) {
      updated = ids.filter(i => i !== role.id);
      setIsSaved(false);
    } else {
      updated = [...ids, role.id];
      setIsSaved(true);
    }
    localStorage.setItem('savedRoleIds', JSON.stringify(updated));
  };

  const togglePrereqCheck = (itemId: string) => {
    const next = checkedPrereqs.includes(itemId)
      ? checkedPrereqs.filter(i => i !== itemId)
      : [...checkedPrereqs, itemId];

    setCheckedPrereqs(next);
    localStorage.setItem(`prereq_checks_${role.id}`, JSON.stringify(next));

    if (next.length === role.prerequisiteChecklist.length && role.prerequisiteChecklist.length > 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#2563eb', '#3b82f6', '#60a5fa', '#818cf8', '#34d399']
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const otherRoles = roles.filter(r => r.id !== role.id).slice(0, 3);
  const handshakeUrl = `https://berea.joinhandshake.com/stu/postings?query=${encodeURIComponent(role.handshakeQuery)}`;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-200">
      <Navbar />

      <main className="max-w-[1140px] mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        
        {/* Breadcrumb & Quick Actions */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/explore"
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to explore roles</span>
          </Link>

          <div className="flex items-center gap-2">
            <LiquidButton
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="text-xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? "Link Copied" : "Share"}</span>
            </LiquidButton>

            <LiquidButton
              variant={isSaved ? "primary" : "outline"}
              size="sm"
              onClick={toggleSaveRole}
              className="text-xs"
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-white" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? "Saved" : "Save"}</span>
            </LiquidButton>
          </div>
        </div>

        {/* HERO CARD */}
        <section className="liquid-card rounded-3xl p-6 sm:p-8 mb-8 specular-highlight border border-black/5 dark:border-white/10 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="accent">{role.category}</Badge>
                <span className="text-zinc-400">·</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{role.department}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-3">
                {role.title}
              </h1>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mb-6 font-normal">
                {role.description}
              </p>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                    <span>Commitment</span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{role.timeCommitment}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    <span>Hiring Cycle</span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate block">{role.hiringCycle.split('·')[0]}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>Location</span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate block">{role.location.split('/')[0]}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <Users className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span>Supervisor</span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate block">{role.contactPerson.split('&')[0]}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:min-w-[200px]">
              <MetalButton
                variant="primary"
                size="default"
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full"
              >
                <span>How to Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MetalButton>

              <LiquidButton
                variant="outline"
                size="default"
                onClick={() => window.open(handshakeUrl, '_blank', 'noopener,noreferrer')}
                className="w-full text-xs"
              >
                <span>Handshake Search</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </LiquidButton>

              <Link
                to={`/compare?roles=${role.id},software-dev-intern`}
                className="w-full py-2 px-3 text-center text-xs text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                + Compare role
              </Link>
            </div>
          </div>
        </section>

        {/* 2-COLUMN MAIN BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Prereqs & Trajectory */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Prereq Checklist */}
            <PrereqChecklist
              items={role.prerequisiteChecklist}
              checkedIds={checkedPrereqs}
              onToggleCheck={togglePrereqCheck}
            />

            {/* Career Pipeline */}
            <div className="liquid-card rounded-3xl p-6 sm:p-7 border border-black/5 dark:border-white/10 specular-highlight shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Career Trajectory & Industry Pipelines
                </h2>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                How this position strengthens your technical resume for summer internships.
              </p>

              {/* 3 Steps */}
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-blue-500/20">
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-semibold shadow-xs">
                    1
                  </div>
                  <div className="flex-1 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 shadow-xs">
                    <span className="text-[10px] uppercase font-mono text-blue-600 dark:text-blue-400 font-semibold">Academic Entry</span>
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 mb-1">
                      {role.typicalBackground}
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-mono font-semibold shadow-xs">
                    2
                  </div>
                  <div className="flex-1 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 shadow-xs">
                    <span className="text-[10px] uppercase font-mono text-indigo-600 dark:text-indigo-400 font-semibold">Labor Growth</span>
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 mb-1">
                      {role.whyGoodFit}
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-semibold shadow-xs">
                    3
                  </div>
                  <div className="flex-1 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-xs">
                    <span className="text-[10px] uppercase font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Industry Horizon</span>
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 mt-0.5 leading-relaxed">
                      {role.internshipAlignment}
                    </p>

                    <div className="mt-3 pt-2 border-t border-emerald-500/30 flex flex-wrap gap-1.5">
                      {role.commonNextSteps.map((step, idx) => (
                        <Badge key={idx} variant="success" className="text-[10px]">{step}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What You Learn */}
            <div className="liquid-card rounded-3xl p-6 sm:p-7 border border-black/5 dark:border-white/10 specular-highlight shadow-md">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Skills & Knowledge Acquired</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {role.whatYouLearn.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 flex items-start gap-2.5 shadow-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Skills, Applications & Related */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Skills Card */}
            <div className="liquid-card rounded-3xl p-6 border border-black/5 dark:border-white/10 specular-highlight shadow-md space-y-5">
              <div>
                <h3 className="text-xs font-mono uppercase text-zinc-400 mb-2.5 font-semibold">Key Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {role.skills.map((skill, idx) => (
                    <Badge key={idx} variant="default">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/10">
                <h3 className="text-xs font-mono uppercase text-zinc-400 mb-2.5 font-semibold">Ideal Candidate</h3>
                <div className="space-y-2">
                  {role.bestFor.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Materials */}
            <div className="liquid-card rounded-3xl p-6 border border-black/5 dark:border-white/10 specular-highlight shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Required Application Materials
                </h3>
              </div>

              <ul className="space-y-2 mb-5">
                {role.applicationMaterials.map((mat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                    <span className="text-blue-500 dark:text-blue-400 font-bold">✓</span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>

              <LiquidButton
                variant="primary"
                size="default"
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full text-xs font-semibold"
              >
                View Handshake Application Guide
              </LiquidButton>
            </div>

            {/* Related Roles */}
            <div>
              <h3 className="text-xs font-mono uppercase text-zinc-400 mb-3 px-1 font-semibold">Other Roles to Consider</h3>
              <div className="space-y-3">
                {otherRoles.map(other => (
                  <Link
                    key={other.id}
                    to={`/role/${other.id}`}
                    className="liquid-card-interactive rounded-2xl p-4 border border-black/5 dark:border-white/10 block group shadow-xs hover:border-blue-500/30"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Badge variant="accent" className="text-[10px]">{other.category}</Badge>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{other.title}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{other.timeCommitment}</p>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        role={role}
      />

      <Footer />
    </div>
  );
}
