import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { roles } from '../data/roles';
import { Role } from '../types/role';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Badge } from '../components/common/Badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Building, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  Printer, 
  X, 
  Layers 
} from 'lucide-react';

export function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const roleIds = searchParams.get('roles')?.split(',').filter(Boolean) || [];

  const [readinessScores, setReadinessScores] = useState<Record<string, number>>({});
  const [userPreferences, setUserPreferences] = useState<any>(null);

  const compareRoles = roleIds
    .map(id => roles.find(r => r.id === id))
    .filter(Boolean) as Role[];

  useEffect(() => {
    // Load onboarding user preferences
    let prefs: any = null;
    const storedPrefs = sessionStorage.getItem('userPreferences');
    if (storedPrefs) {
      try {
        prefs = JSON.parse(storedPrefs);
        setUserPreferences(prefs);
      } catch (e) {
        console.error(e);
      }
    }

    const scores: Record<string, number> = {};
    compareRoles.forEach(role => {
      let checkedCount = 0;
      const storedChecks = localStorage.getItem(`prereq_checks_${role.id}`);
      if (storedChecks) {
        try {
          const checked = JSON.parse(storedChecks);
          if (Array.isArray(checked)) {
            checkedCount = checked.length;
          }
        } catch (e) {
          checkedCount = 0;
        }
      }

      // If the user has NOT answered any questions (no onboarding & no checklist items checked),
      // readiness must strictly be 0%.
      if (!prefs && checkedCount === 0) {
        scores[role.id] = 0;
        return;
      }

      // Calculate prerequisite ratio (0 to 1)
      const prereqRatio = role.prerequisiteChecklist.length > 0 
        ? checkedCount / role.prerequisiteChecklist.length 
        : 0;

      if (!prefs) {
        // No onboarding completed — readiness is strictly based on checked prereqs and capped at 50%
        scores[role.id] = Math.round(prereqRatio * 50);
      } else {
        // Onboarding completed: 60% weight on verified prereqs + 40% weight on profile match
        let profileMatch = 0.5; // Base 50% profile fit if answered
        if (role.bestFor.some(bf => bf.toLowerCase().includes(prefs.year?.toLowerCase() || ''))) {
          profileMatch += 0.3;
        }
        if (prefs.goals?.length > 0) {
          profileMatch += 0.2;
        }
        profileMatch = Math.min(profileMatch, 1.0);

        const totalScore = Math.round((prereqRatio * 60) + (profileMatch * 40));
        // 100% is only achievable if all prereqs are verified AND onboarding is completed
        scores[role.id] = prereqRatio === 1 && profileMatch === 1 ? 100 : Math.min(totalScore, 95);
      }
    });

    setReadinessScores(scores);
  }, [roleIds.join(',')]);

  const removeRoleFromCompare = (roleIdToRemove: string) => {
    const updated = roleIds.filter(id => id !== roleIdToRemove);
    if (updated.length > 0) {
      setSearchParams({ roles: updated.join(',') });
    } else {
      setSearchParams({});
    }
  };

  if (compareRoles.length < 2) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-200">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center liquid-card p-8 sm:p-10 rounded-3xl border border-black/5 dark:border-white/10 max-w-md w-full shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/20 shadow-xs">
              <Layers className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-semibold mb-2 text-zinc-950 dark:text-white tracking-tight">Select at least 2 roles to compare</h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
              Check the comparison box on 2 or 3 roles from the explore directory to evaluate them side-by-side.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const colCount = compareRoles.length;
  const gridClass = colCount === 3 ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3';

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-200">
      <Navbar />

      <main className="max-w-[1140px] mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        
        {/* Top Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/explore"
            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore Roles</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Summary</span>
            </button>
            <Link
              to="/explore"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              + Change roles
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Compare Roles Side-by-Side
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 mt-1 text-sm">
            Evaluate time commitments, prerequisites, skills, and trajectories across {compareRoles.length} positions.
          </p>

          {/* Unassessed / Personalization Context Banner */}
          {!userPreferences ? (
            <div className="mt-4 p-3.5 px-4 rounded-2xl liquid-card border border-blue-500/20 dark:border-blue-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-zinc-700 dark:text-zinc-200">
                  <strong className="text-blue-600 dark:text-blue-400">Readiness unassessed:</strong> You haven't answered any personalization questions yet. Complete onboarding for tailored readiness matching.
                </span>
              </div>
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors whitespace-nowrap shadow-xs"
              >
                <span>Personalize Pathway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="mt-4 p-3 px-4 rounded-2xl bg-blue-500/[0.04] border border-blue-500/15 flex items-center justify-between text-xs">
              <span className="text-zinc-600 dark:text-zinc-300">
                <strong className="text-blue-600 dark:text-blue-400">Personalized profile active:</strong> {userPreferences.year}
                {userPreferences.goals?.length > 0 && ` · ${userPreferences.goals.length} goal(s)`}
              </span>
              <Link to="/onboarding" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Edit
              </Link>
            </div>
          )}
        </div>

        {/* Role Header Column Cards */}
        <div className={`grid ${gridClass} gap-4 mb-6`}>
          <div className="hidden md:flex flex-col justify-end p-3">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">Role Matrix</span>
          </div>

          {compareRoles.map((role) => {
            const readiness = readinessScores[role.id] || 0;
            return (
              <div 
                key={role.id}
                className="liquid-card rounded-3xl p-5 flex flex-col justify-between specular-highlight border border-black/5 dark:border-white/10 relative shadow-md transition-all"
              >
                <button
                  type="button"
                  onClick={() => removeRoleFromCompare(role.id)}
                  className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-rose-500 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  title="Remove from compare"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <Badge variant="default" className="text-[10px] mb-2">{role.category}</Badge>
                  <h2 className="text-base font-semibold text-zinc-950 dark:text-white mb-1.5 tracking-tight leading-snug">
                    {role.title}
                  </h2>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed mb-4">
                    {role.description}
                  </p>

                  {/* Readiness bar */}
                  <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 mb-2 shadow-inner">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium">Readiness</span>
                      <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                        {readiness > 0 ? `${readiness}%` : '0% (Unassessed)'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${readiness === 100 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`}
                        style={{ width: `${readiness}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-medium">
                  <Link
                    to={`/role/${role.id}`}
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* MATRIX ROWS */}
        <div className="space-y-4">
          
          {/* Row: Department & Location */}
          <div className={`grid ${gridClass} gap-4 p-5 rounded-2xl liquid-card border border-black/5 dark:border-white/10 items-center shadow-xs`}>
            <div className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1.5 font-semibold">
              <Building className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>Department</span>
            </div>
            {compareRoles.map(role => (
              <div key={role.id} className="text-xs">
                <span className="font-semibold text-zinc-950 dark:text-white block">{role.department}</span>
                <span className="text-zinc-500 dark:text-zinc-400">{role.location}</span>
              </div>
            ))}
          </div>

          {/* Row: Time & Hiring */}
          <div className={`grid ${gridClass} gap-4 p-5 rounded-2xl liquid-card border border-black/5 dark:border-white/10 items-center shadow-xs`}>
            <div className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Hours & Window</span>
            </div>
            {compareRoles.map(role => (
              <div key={role.id} className="text-xs space-y-0.5">
                <div className="font-semibold text-zinc-950 dark:text-white">{role.timeCommitment}</div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{role.hiringCycle}</div>
              </div>
            ))}
          </div>

          {/* Row: Prerequisites */}
          <div className={`grid ${gridClass} gap-4 p-5 rounded-2xl liquid-card border border-black/5 dark:border-white/10 items-start shadow-xs`}>
            <div className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1.5 font-semibold pt-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Prerequisites</span>
            </div>
            {compareRoles.map(role => (
              <div key={role.id} className="space-y-1.5 text-xs">
                {role.prerequisiteChecklist.map(p => (
                  <div key={p.id} className="flex items-start gap-1.5 text-zinc-700 dark:text-zinc-300">
                    <span className="text-blue-500 dark:text-blue-400 font-bold">•</span>
                    <span>{p.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Row: Skills */}
          <div className={`grid ${gridClass} gap-4 p-5 rounded-2xl liquid-card border border-black/5 dark:border-white/10 items-start shadow-xs`}>
            <div className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1.5 font-semibold pt-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Skills Acquired</span>
            </div>
            {compareRoles.map(role => (
              <div key={role.id} className="flex flex-wrap gap-1.5">
                {role.skills.map((skill, idx) => (
                  <Badge key={idx} variant="default" className="text-[10px]">{skill}</Badge>
                ))}
              </div>
            ))}
          </div>

          {/* Row: Trajectory */}
          <div className={`grid ${gridClass} gap-4 p-6 rounded-3xl liquid-card border border-black/5 dark:border-white/10 items-start shadow-xs`}>
            <div className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1.5 font-semibold pt-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>Internship Trajectory</span>
            </div>
            {compareRoles.map(role => (
              <div key={role.id} className="text-xs text-zinc-700 dark:text-zinc-300 space-y-3.5">
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">{role.internshipAlignment}</p>
                <div className="flex flex-col gap-2 pt-1">
                  {role.commonNextSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-900 dark:text-emerald-300 text-xs font-medium shadow-2xs leading-snug"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
