import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Navigation from './Navigation';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    year: 'First-year',
    goals: [] as string[],
    constraints: 'none',
  });

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
    // Directly finish and navigate to recommended roles
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

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between pb-24 sm:pb-12">
      <Navigation />

      <main className="max-w-2xl mx-auto px-6 sm:px-8 py-10 w-full flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Let's personalize your pathway
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Answer 3 quick questions so we can prioritize the most relevant CS and IT labor roles for your schedule and goals.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Step {step} of 3</span>
            <span className="text-xs font-bold text-blue-600">{Math.round((step / 3) * 100)}% Completed</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/80 p-6 sm:p-8 mb-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-1.5 text-slate-900">What academic year are you currently in?</h2>
              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                This helps us highlight roles that match where you are in the Berea CS course progression.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3.5">
                {[
                  { year: 'First-year', desc: 'Beginning intro programming & exploring CS' },
                  { year: 'Sophomore', desc: 'Taking core software design or data structures' },
                  { year: 'Junior', desc: 'Targeting off-campus summer internships' },
                  { year: 'Senior', desc: 'Preparing for post-grad roles & capstones' },
                ].map(({ year, desc }) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearSelect(year)}
                    className={`p-4 sm:p-5 rounded-xl border text-left flex flex-col justify-between transition-all active:scale-98 ${
                      answers.year === year
                        ? 'border-blue-600 bg-blue-50/70 text-slate-900 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-700'
                    }`}
                  >
                    <span className="text-base font-bold text-slate-900">{year}</span>
                    <span className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-1.5 text-slate-900">What are you hoping to get out of student labor?</h2>
              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                Select all that apply. This adjusts the match badges and recommendation scoring.
              </p>
              
              <div className="space-y-3">
                {[
                  { id: 'explore', label: 'Just exploring—not sure what I want yet', desc: 'Discover a broad range of labor opportunities across CS & ITS' },
                  { id: 'skills', label: 'Build specific technical skills', desc: 'Deepen skills in web development, SQL databases, or Linux systems' },
                  { id: 'internship', label: 'Prepare for software internships or industry jobs', desc: 'Gain resume experience, version control, and team code review practice' },
                  { id: 'grad', label: 'Explore grad school, teaching, or research paths', desc: 'Build close mentorship relationships with CS faculty and labs' },
                  { id: 'income', label: 'Flexible work that balances my course load', desc: 'Roles with manageable weekly hours and study-friendly shifts' },
                ].map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all active:scale-98 ${
                      answers.goals.includes(goal.id)
                        ? 'border-blue-600 bg-blue-50/70 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center flex-shrink-0 transition-colors ${
                        answers.goals.includes(goal.id)
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {answers.goals.includes(goal.id) && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-slate-900 font-bold text-sm leading-snug">{goal.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{goal.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-1.5 text-slate-900">Any timing or experience considerations?</h2>
              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                Click an option below to immediately view your tailored roles, or click the button below.
              </p>
              
              <div className="space-y-3">
                {[
                  { id: 'none', label: 'No specific constraints', desc: "I'm flexible with scheduling and weekly commitment" },
                  { id: 'course-heavy', label: 'Taking a heavy course load this term', desc: 'Highlight positions with lighter hours (6–8 hrs/week)' },
                  { id: 'first-job', label: 'This would be my first campus labor position', desc: 'Show roles with comprehensive onboarding and supportive mentors' },
                  { id: 'limited-experience', label: 'Limited CS coursework so far', desc: 'Focus on roles with minimal or no course prerequisites' },
                ].map((constraint) => (
                  <button
                    key={constraint.id}
                    type="button"
                    onClick={() => handleConstraintSelect(constraint.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all active:scale-98 ${
                      answers.constraints === constraint.id
                        ? 'border-blue-600 bg-blue-50/70 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="text-slate-900 font-bold text-sm mb-0.5">{constraint.label}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{constraint.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-medium text-xs sm:text-sm px-3.5 py-2 rounded-xl hover:bg-slate-200/60 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Back to Home' : 'Previous Step'}</span>
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-semibold text-xs sm:text-sm transition-all active:scale-95 shadow-xs"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-xs"
            >
              <span>Show Recommended Roles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Optional Skip */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/explore')}
            className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
          >
            Skip questionnaire and view all roles
          </button>
        </div>
      </main>
    </div>
  );
}