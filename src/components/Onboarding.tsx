import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    year: '',
    goals: [] as string[],
    constraints: '',
  });

  const handleYearSelect = (year: string) => {
    setAnswers({ ...answers, year });
  };

  const handleGoalToggle = (goal: string) => {
    const newGoals = answers.goals.includes(goal)
      ? answers.goals.filter(g => g !== goal)
      : [...answers.goals, goal];
    setAnswers({ ...answers, goals: newGoals });
  };

  const handleConstraintSelect = (constraint: string) => {
    setAnswers({ ...answers, constraints: constraint });
  };

  const handleFinish = () => {
    // Store preferences in sessionStorage for use in other screens
    sessionStorage.setItem('userPreferences', JSON.stringify(answers));
    navigate('/explore');
  };

  const canProceed = () => {
    if (step === 1) return answers.year !== '';
    if (step === 2) return answers.goals.length > 0;
    if (step === 3) return answers.constraints !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50/70 pb-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Let's personalize your pathway
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Answer 3 quick questions so we can prioritize the most relevant CS and IT labor roles for your schedule and goals.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">Step {step} of 3</span>
            <span className="text-xs font-semibold text-blue-600">{Math.round((step / 3) * 100)}% Completed</span>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Cards */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 sm:p-10 mb-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">What academic year are you currently in?</h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                This helps us highlight roles that match where you are in the Berea CS course progression.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {['First-year', 'Sophomore', 'Junior', 'Senior'].map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left flex flex-col justify-between ${
                      answers.year === year
                        ? 'border-blue-600 bg-blue-50/80 shadow-2xs'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <span className="text-lg font-bold text-gray-900">{year}</span>
                    <span className="text-xs text-gray-500 mt-1">
                      {year === 'First-year' && 'Beginning intro programming & exploring CS'}
                      {year === 'Sophomore' && 'Taking core data structures & software design'}
                      {year === 'Junior' && 'Targeting off-campus summer internships'}
                      {year === 'Senior' && 'Preparing for post-grad roles & capstones'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">What are you hoping to get out of student labor?</h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Select all that apply. This directly adjusts the badges and recommendations on the Explore page.
              </p>
              
              <div className="space-y-3.5">
                {[
                  { id: 'explore', label: 'Just exploring—not sure what I want yet', desc: 'Discover a broad range of labor opportunities across CS & ITS' },
                  { id: 'skills', label: 'Build specific technical skills', desc: 'Deepen skills in web development, SQL databases, or systems troubleshooting' },
                  { id: 'internship', label: 'Prepare for software internships or industry jobs', desc: 'Gain resume experience, version control, and code review practice' },
                  { id: 'grad', label: 'Explore grad school, teaching, or research paths', desc: 'Build close relationships with CS faculty and research labs' },
                  { id: 'income', label: 'Flexible work that balances my course load', desc: 'Roles with manageable weekly hours and study-friendly shifts' },
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                      answers.goals.includes(goal.id)
                        ? 'border-blue-600 bg-blue-50/80 shadow-2xs'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-5 h-5 rounded-md border-2 mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                        answers.goals.includes(goal.id)
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}>
                        {answers.goals.includes(goal.id) && (
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-gray-900 font-bold text-base leading-snug">{goal.label}</div>
                        <div className="text-xs text-gray-600 mt-1 leading-relaxed">{goal.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Any timing or experience considerations?</h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                This helps us highlight roles with the right prerequisite level and weekly hour commitments.
              </p>
              
              <div className="space-y-3.5">
                {[
                  { id: 'none', label: 'No specific constraints', desc: "I'm flexible with scheduling and weekly commitment" },
                  { id: 'course-heavy', label: 'Taking a heavy course load this term', desc: 'Highlight positions with lighter hours (6–8 hrs/week)' },
                  { id: 'first-job', label: 'This would be my first campus labor position', desc: 'Show roles with comprehensive onboarding and supportive peer mentors' },
                  { id: 'limited-experience', label: 'Limited CS coursework so far', desc: 'Focus on roles with zero or minimal course prerequisites' },
                ].map((constraint) => (
                  <button
                    key={constraint.id}
                    onClick={() => handleConstraintSelect(constraint.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                      answers.constraints === constraint.id
                        ? 'border-blue-600 bg-blue-50/80 shadow-2xs'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="text-gray-900 font-bold text-base mb-1">{constraint.label}</div>
                    <div className="text-xs text-gray-600 leading-relaxed">{constraint.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-100/80"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Back to Landing' : 'Previous Step'}</span>
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={`flex items-center gap-2.5 px-7 py-3 rounded-xl font-bold text-sm transition-all ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!canProceed()}
              className={`flex items-center gap-2.5 px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Show My Recommended Roles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Skip Option */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/explore')}
            className="text-xs text-gray-500 underline hover:text-gray-800 font-medium"
          >
            Skip questionnaire and see all 8 roles
          </button>
        </div>
      </div>
    </div>
  );
}