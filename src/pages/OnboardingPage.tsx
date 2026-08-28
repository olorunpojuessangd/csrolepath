import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/liquid-glass-button';

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    year: '',
    goals: [] as string[],
    constraints: 'none',
  });

  // Determine if current step has a valid selection
  const canContinue = (): boolean => {
    if (step === 1) return answers.year !== '';
    if (step === 2) return answers.goals.length > 0;
    return true;
  };

  const handleYearSelect = (year: string) => {
    setAnswers(prev => ({ ...prev, year }));
  };

  const handleGoalToggle = (goal: string) => {
    setAnswers(prev => {
      const goals = prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal];
      return { ...prev, goals };
    });
  };

  const handleConstraintSelect = (constraint: string) => {
    const updated = { ...answers, constraints: constraint };
    setAnswers(updated);
    sessionStorage.setItem('userPreferences', JSON.stringify(updated));
    navigate('/explore');
  };

  const handleFinish = () => {
    const finalAnswers = {
      ...answers,
      constraints: answers.constraints || 'none',
      goals: answers.goals.length > 0 ? answers.goals : ['explore'],
      year: answers.year || 'First-year'
    };
    sessionStorage.setItem('userPreferences', JSON.stringify(finalAnswers));
    navigate('/explore');
  };

  const nextStep = () => {
    setStep(s => Math.min(s + 1, 3));
  };

  const prevStep = () => {
    setStep(s => Math.max(s - 1, 1));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12">
        <div className="w-full max-w-[620px]">
          
          {/* Header */}
          <div className="mb-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full frosted-badge-accent text-xs font-mono font-medium mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 animate-pulse" />
              <span>Personalized Discovery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-2">
              Personalize Your Pathway
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Answer 3 quick questions to prioritize the most relevant CS and IT labor roles.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
              <span>Step {step} of 3</span>
              <span className="text-blue-600 dark:text-blue-400">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="h-2 bg-black/[0.04] dark:bg-white/[0.06] rounded-full overflow-hidden p-0.5 border border-black/5 dark:border-white/10 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Card Container */}
          <div className="liquid-card rounded-3xl border border-black/5 dark:border-white/10 p-6 sm:p-8 mb-6 specular-highlight overflow-hidden shadow-xl">
            {step === 1 && (
              <div className="space-y-4 transition-all">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-zinc-950 dark:text-white mb-1">
                    What academic year are you in at Berea?
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                    Matches your position in the CS core course progression.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
                  {[
                    { year: 'First-year', desc: 'Starting introductory CS courses' },
                    { year: 'Sophomore', desc: 'Taking Software Design or Data Structures' },
                    { year: 'Junior', desc: 'Targeting summer industry internships' },
                    { year: 'Senior', desc: 'Preparing for post-graduation tech careers' },
                  ].map(({ year, desc }) => {
                    const isSelected = answers.year === year;
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => handleYearSelect(year)}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                          isSelected
                            ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500/80 ring-2 ring-blue-500/30 shadow-[0_0_16px_rgba(59,130,246,0.2)]'
                            : 'bg-white/80 dark:bg-zinc-900/80 border-black/5 dark:border-white/10 hover:border-blue-500/30 hover:shadow-md'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                              {year}
                            </span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            {desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 transition-all">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-zinc-950 dark:text-white mb-1">
                    What are your primary goals for student labor?
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                    Select all that apply to highlight relevant positions.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {[
                    { id: 'internship', title: 'Prepare for summer software engineering internships', desc: 'Gain production Git, code review, and full-stack development experience.' },
                    { id: 'deepen', title: 'Deepen core CS fundamentals & algorithms', desc: 'Reinforce theoretical concepts by teaching and peer mentoring.' },
                    { id: 'grad', title: 'Pursue academic research / graduate school', desc: 'Work with faculty on data analysis, research methodologies, and publications.' },
                    { id: 'breadth', title: 'Explore hardware, makerspace, or IT support', desc: 'Build hands-on diagnostic, 3D prototyping, and enterprise IT abilities.' },
                  ].map(({ id, title, desc }) => {
                    const isSelected = answers.goals.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleGoalToggle(id)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-200 cursor-pointer active:scale-[0.985] ${
                          isSelected
                            ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500/80 ring-2 ring-blue-500/30 shadow-[0_0_16px_rgba(59,130,246,0.2)]'
                            : 'bg-white/80 dark:bg-zinc-900/80 border-black/5 dark:border-white/10 hover:border-blue-500/30 hover:shadow-md'
                        }`}
                      >
                        <div className="mt-0.5">
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-xs' : 'border-zinc-400 bg-white/50 dark:bg-zinc-800/50'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                        <div>
                          <span className={`text-xs sm:text-sm font-semibold block ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                            {title}
                          </span>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                            {desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 transition-all">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-zinc-950 dark:text-white mb-1">
                    Any specific considerations?
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                    We will prioritize roles according to your schedule and background.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {[
                    { id: 'none', title: 'No specific constraints', desc: 'Show all roles matching my background and goals. Standard contract is 10 hrs/week.' },
                    { id: 'first-job', title: 'Looking for my first on-campus labor role', desc: 'Prioritize positions with comprehensive peer training and zero prerequisites. First-year students can hold one primary position (10 hrs/week).' },
                    { id: 'secondary', title: 'Looking for a secondary position (5 hrs/week)', desc: 'Only the Teaching Assistant role is available as a 5 hr/week secondary alongside your primary 10 hr/week contract. Requires primary supervisor approval.' },
                  ].map(({ id, title, desc }) => {
                    const isSelected = answers.constraints === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleConstraintSelect(id)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-200 cursor-pointer active:scale-[0.985] ${
                          isSelected
                            ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500/80 ring-2 ring-blue-500/30 shadow-[0_0_16px_rgba(59,130,246,0.2)]'
                            : 'bg-white/80 dark:bg-zinc-900/80 border-black/5 dark:border-white/10 hover:border-blue-500/30 hover:shadow-md'
                        }`}
                      >
                        <div className="mt-0.5">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-xs' : 'border-zinc-400 bg-white/50 dark:bg-zinc-800/50'
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                        <div>
                          <span className={`text-xs sm:text-sm font-semibold block ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                            {title}
                          </span>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                            {desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            {step > 1 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Button>
            ) : (
              <Link
                to="/explore"
                className="text-xs text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Skip personalization
              </Link>
            )}

            {step < 3 ? (
              <Button
                variant="default"
                size="default"
                onClick={nextStep}
                disabled={!canContinue()}
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="default"
                onClick={handleFinish}
              >
                <span>View Recommended Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
