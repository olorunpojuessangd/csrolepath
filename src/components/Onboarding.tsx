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
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navigation />

      {/* Vertically centered viewport container (Priority 1) */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-8">
        <div className="w-full max-w-[580px]">
          {/* Header */}
          <div className="mb-5 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold text-[#0A0E14] tracking-tight mb-1.5">
              Let's personalize your pathway
            </h1>
            <p className="text-[#3D4451] text-sm leading-relaxed">
              Answer 3 quick questions to prioritize the most relevant CS and IT labor roles.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5 text-xs text-[#6B7280]">
              <span className="font-medium uppercase tracking-wider">Step {step} of 3</span>
              <span className="font-medium text-[#4F46E5]">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-[#F3F4F6] rounded-[6px] overflow-hidden border border-[#D0D5DD]/40">
              <div 
                className="h-full bg-[#4F46E5] transition-all duration-200"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Card Container */}
          <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-5 sm:p-6 mb-5">
            {step === 1 && (
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-[#0A0E14] mb-1">
                  What academic year are you in?
                </h2>
                <p className="text-[#6B7280] text-xs sm:text-sm mb-4 leading-relaxed">
                  Matches your position in the Berea CS course progression.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {[
                    { year: 'First-year', desc: 'Beginning intro programming' },
                    { year: 'Sophomore', desc: 'Taking software design / data structures' },
                    { year: 'Junior', desc: 'Targeting summer internships' },
                    { year: 'Senior', desc: 'Preparing for post-grad roles' },
                  ].map(({ year, desc }) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => handleYearSelect(year)}
                      className={`p-3.5 rounded-[6px] border text-left flex flex-col justify-between transition-colors ${
                        answers.year === year
                          ? 'border-[#4F46E5] bg-[#EEF0FF] text-[#0A0E14]'
                          : 'border-[#D0D5DD] bg-[#FFFFFF] hover:bg-[#F3F4F6] text-[#3D4451]'
                      }`}
                    >
                      <span className="text-sm font-semibold text-[#0A0E14]">{year}</span>
                      <span className="text-xs text-[#6B7280] mt-0.5 leading-snug">{desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-[#0A0E14] mb-1">
                  What do you hope to get out of student labor?
                </h2>
                <p className="text-[#6B7280] text-xs sm:text-sm mb-4 leading-relaxed">
                  Select all that apply to adjust role recommendation weights.
                </p>
                
                <div className="space-y-2">
                  {[
                    { id: 'explore', label: 'Just exploring—not sure what I want yet', desc: 'Discover opportunities across CS & ITS' },
                    { id: 'skills', label: 'Build specific technical skills', desc: 'Web development, SQL databases, or Linux systems' },
                    { id: 'internship', label: 'Prepare for software internships', desc: 'Resume experience, version control, and code review' },
                    { id: 'grad', label: 'Explore grad school, teaching, or research', desc: 'Close mentorship with CS faculty and labs' },
                    { id: 'income', label: 'Flexible work that balances coursework', desc: 'Manageable weekly hours and study-friendly shifts' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => handleGoalToggle(goal.id)}
                      className={`w-full text-left p-3 rounded-[6px] border transition-colors ${
                        answers.goals.includes(goal.id)
                          ? 'border-[#4F46E5] bg-[#EEF0FF]'
                          : 'border-[#D0D5DD] bg-[#FFFFFF] hover:bg-[#F3F4F6]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-[4px] mt-0.5 border flex items-center justify-center flex-shrink-0 transition-colors ${
                          answers.goals.includes(goal.id)
                            ? 'border-[#4F46E5] bg-[#4F46E5] text-white'
                            : 'border-[#D0D5DD] bg-white'
                        }`}>
                          {answers.goals.includes(goal.id) && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="text-[#0A0E14] font-medium text-sm leading-snug">{goal.label}</div>
                          <div className="text-xs text-[#6B7280] leading-snug mt-0.5">{goal.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-[#0A0E14] mb-1">
                  Any timing or experience considerations?
                </h2>
                <p className="text-[#6B7280] text-xs sm:text-sm mb-4 leading-relaxed">
                  Select a constraint below to view your tailored roles.
                </p>
                
                <div className="space-y-2">
                  {[
                    { id: 'none', label: 'No specific constraints', desc: "Flexible with scheduling and weekly commitment" },
                    { id: 'course-heavy', label: 'Taking a heavy course load this term', desc: 'Prioritize lighter hours (6–8 hrs/week)' },
                    { id: 'first-job', label: 'This would be my first campus labor position', desc: 'Structured onboarding and peer mentors' },
                    { id: 'limited-experience', label: 'Limited CS coursework so far', desc: 'Roles with minimal or no course prerequisites' },
                  ].map((constraint) => (
                    <button
                      key={constraint.id}
                      type="button"
                      onClick={() => handleConstraintSelect(constraint.id)}
                      className={`w-full text-left p-3 rounded-[6px] border transition-colors ${
                        answers.constraints === constraint.id
                          ? 'border-[#4F46E5] bg-[#EEF0FF]'
                          : 'border-[#D0D5DD] bg-[#FFFFFF] hover:bg-[#F3F4F6]'
                      }`}
                    >
                      <div className="text-[#0A0E14] font-medium text-sm">{constraint.label}</div>
                      <div className="text-xs text-[#6B7280] mt-0.5">{constraint.desc}</div>
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
              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#0A0E14] transition-colors font-medium text-xs sm:text-sm px-2 py-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{step === 1 ? 'Back to Home' : 'Previous Step'}</span>
            </button>

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#4F46E5] text-white hover:bg-[#6366F1] rounded-[6px] font-medium text-xs sm:text-sm transition-colors shadow-xs"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#4F46E5] text-white hover:bg-[#6366F1] rounded-[6px] font-medium text-xs sm:text-sm transition-colors shadow-xs"
              >
                <span>Show Recommended Roles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Skip */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/explore')}
              className="text-xs text-[#6B7280] hover:text-[#0A0E14] underline font-normal"
            >
              Skip questionnaire and view all roles
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}