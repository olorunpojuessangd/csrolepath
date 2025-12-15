import { useSearchParams, Link, useNavigate } from 'react-router';
import { roles } from '../data/roles';
import { ArrowLeft, Check, X, ArrowRight } from 'lucide-react';

export default function CompareRoles() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleIds = searchParams.get('roles')?.split(',') || [];
  
  const compareRoles = roleIds
    .map(id => roles.find(r => r.id === id))
    .filter(Boolean) as typeof roles;

  if (compareRoles.length !== 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-900">Please select 2 roles to compare</h1>
          <Link to="/explore" className="text-blue-600 hover:text-blue-700 underline">
            Go to explore roles
          </Link>
        </div>
      </div>
    );
  }

  const [role1, role2] = compareRoles;

  const ComparisonRow = ({ 
    label, 
    value1, 
    value2, 
    type = 'text' 
  }: { 
    label: string; 
    value1: any; 
    value2: any; 
    type?: 'text' | 'list' | 'tags';
  }) => (
    <div className="grid md:grid-cols-3 gap-4 py-4 border-b border-gray-200">
      <div className="text-gray-700 font-medium">{label}</div>
      <div className="text-gray-700">
        {type === 'text' && <span>{value1}</span>}
        {type === 'list' && (
          <ul className="space-y-1">
            {value1.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {type === 'tags' && (
          <div className="flex flex-wrap gap-2">
            {value1.map((item: string, idx: number) => (
              <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="text-gray-700">
        {type === 'text' && <span>{value2}</span>}
        {type === 'list' && (
          <ul className="space-y-1">
            {value2.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {type === 'tags' && (
          <div className="flex flex-wrap gap-2">
            {value2.map((item: string, idx: number) => (
              <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-sm">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to previous page
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2 text-gray-900">Compare Roles</h1>
          <p className="text-gray-600">Side-by-side comparison to help clarify your decision</p>
        </div>

        {/* Role Headers */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div></div>
          <div className="bg-blue-600 text-white rounded-lg p-6">
            <span className="inline-block px-2 py-1 bg-white/20 rounded text-sm mb-2">
              {role1.category}
            </span>
            <h2 className="text-2xl mb-2">{role1.title}</h2>
            <p className="text-blue-100 text-sm">{role1.description}</p>
            <Link
              to={`/role/${role1.id}`}
              className="inline-flex items-center gap-2 mt-4 text-sm text-white hover:text-blue-100 underline"
            >
              View full details
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-purple-600 text-white rounded-lg p-6">
            <span className="inline-block px-2 py-1 bg-white/20 rounded text-sm mb-2">
              {role2.category}
            </span>
            <h2 className="text-2xl mb-2">{role2.title}</h2>
            <p className="text-purple-100 text-sm">{role2.description}</p>
            <Link
              to={`/role/${role2.id}`}
              className="inline-flex items-center gap-2 mt-4 text-sm text-white hover:text-purple-100 underline"
            >
              View full details
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl mb-6 text-gray-900">At a glance</h2>
          
          <ComparisonRow 
            label="Time commitment" 
            value1={role1.timeCommitment} 
            value2={role2.timeCommitment} 
          />
          
          <ComparisonRow 
            label="Department" 
            value1={role1.department} 
            value2={role2.department} 
          />
          
          <ComparisonRow 
            label="Best for" 
            value1={role1.bestFor.join(', ')} 
            value2={role2.bestFor.join(', ')} 
          />
        </div>

        {/* Prerequisites Comparison */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl mb-6 text-gray-900">Prerequisites</h2>
          <ComparisonRow 
            label="Requirements" 
            value1={role1.prerequisites} 
            value2={role2.prerequisites}
            type="list"
          />
        </div>

        {/* Skills Comparison */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl mb-6 text-gray-900">Skills you'll develop</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="mb-3 text-gray-900">{role1.title}</h3>
              <div className="flex flex-wrap gap-2">
                {role1.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-gray-900">{role2.title}</h3>
              <div className="flex flex-wrap gap-2">
                {role2.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-50 text-purple-700 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl mb-6 text-gray-900">What you'll learn</h2>
          <ComparisonRow 
            label="Learning outcomes" 
            value1={role1.whatYouLearn} 
            value2={role2.whatYouLearn}
            type="list"
          />
        </div>

        {/* Typical Background */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl mb-6 text-gray-900">Who typically succeeds</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="mb-2 text-gray-900">{role1.title}</h3>
              <p className="text-gray-700">{role1.typicalBackground}</p>
            </div>
            <div>
              <h3 className="mb-2 text-gray-900">{role2.title}</h3>
              <p className="text-gray-700">{role2.typicalBackground}</p>
            </div>
          </div>
        </div>

        {/* Common Next Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl mb-6 text-gray-900">Common next steps</h2>
          <ComparisonRow 
            label="Career progression" 
            value1={role1.commonNextSteps} 
            value2={role2.commonNextSteps}
            type="list"
          />
        </div>

        {/* Decision Support */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl mb-4 text-gray-900">Making your decision</h2>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Consider your current situation:</strong> Which prerequisites do you already meet? Which time commitment fits your schedule?</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Think about your goals:</strong> Which skills and next steps align better with where you want to go?</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Talk to current students:</strong> Ask your advisor to connect you with students in these roles to learn about day-to-day experiences.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>You can pivot later:</strong> Many students move between roles as they learn what they enjoy. This isn't a permanent decision.</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            to="/explore"
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Explore more roles
          </Link>
          <div className="flex gap-3">
            <Link
              to={`/role/${role1.id}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View {role1.title} details
            </Link>
            <Link
              to={`/role/${role2.id}`}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              View {role2.title} details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
