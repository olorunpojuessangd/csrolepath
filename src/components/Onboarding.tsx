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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2 text-gray-900">Let's personalize your experience</h1>
          <p className="text-gray-600">Answer a few questions so we can show you the most relevant roles.</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {step} of 3</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Cards */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl mb-2 text-gray-900">What year are you in?</h2>
              <p className="text-gray-600 mb-6">This helps us show roles that typically match your experience level.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {['First-year', 'Sophomore', 'Junior', 'Senior'].map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      answers.year === year
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg">{year}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl mb-2 text-gray-900">What are you exploring?</h2>
              <p className="text-gray-600 mb-6">Select all that interest you. You can change this later.</p>
              
              <div className="space-y-3">
                {[
                  { id: 'explore', label: 'Just exploring—not sure what I want yet', desc: 'See a broad range of options' },
                  { id: 'skills', label: 'Build specific technical skills', desc: 'Like web dev, databases, or research' },
                  { id: 'internship', label: 'Prepare for internships or industry jobs', desc: 'Gain experience for off-campus work' },
                  { id: 'grad', label: 'Explore grad school or research paths', desc: 'Build research skills and relationships' },
                  { id: 'income', label: 'Flexible work that fits my schedule', desc: 'Balance work and coursework' },
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers.goals.includes(goal.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                        answers.goals.includes(goal.id)
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}>
                        {answers.goals.includes(goal.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-gray-900">{goal.label}</div>
                        <div className="text-sm text-gray-600">{goal.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl mb-2 text-gray-900">Any timing considerations?</h2>
              <p className="text-gray-600 mb-6">This helps us highlight roles that fit your situation.</p>
              
              <div className="space-y-3">
                {[
                  { id: 'none', label: 'No specific constraints', desc: "I'm flexible with timing and commitment" },
                  { id: 'course-heavy', label: 'Taking a heavy course load', desc: 'Show me roles with lighter time commitments' },
                  { id: 'first-job', label: 'This would be my first campus job', desc: 'Prefer roles that welcome beginners' },
                  { id: 'limited-experience', label: 'Limited CS coursework so far', desc: 'Focus on roles with fewer prerequisites' },
                ].map((constraint) => (
                  <button
                    key={constraint.id}
                    onClick={() => handleConstraintSelect(constraint.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers.constraints === constraint.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-gray-900 mb-1">{constraint.label}</div>
                    <div className="text-sm text-gray-600">{constraint.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 1 ? 'Back to landing' : 'Previous'}
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Show me roles
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/explore')}
            className="text-sm text-gray-600 underline hover:text-gray-900"
          >
            Skip and see all roles
          </button>
        </div>
      </div>
    </div>
  );
}