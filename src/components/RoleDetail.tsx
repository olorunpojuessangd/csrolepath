import { useParams, Link, useNavigate } from 'react-router';
import { roles } from '../data/roles';
import { ArrowLeft, ArrowRight, Lightbulb, Users, TrendingUp, Clock, Building } from 'lucide-react';

export default function RoleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const role = roles.find(r => r.id === id);

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-900">Role not found</h1>
          <Link to="/explore" className="text-blue-600 hover:text-blue-700 underline">
            Back to explore
          </Link>
        </div>
      </div>
    );
  }

  const otherRoles = roles.filter(r => r.id !== role.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm mb-3">
              {role.category}
            </span>
            <div className="grid grid-cols-2 items-start gap-4">
              <h1 className="min-w-0 text-4xl text-gray-900">{role.title}</h1>
              <button
                type="button"
                className="inline-flex items-center justify-center justify-self-end rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
            </div>
            <p className="text-xl text-gray-700 mt-4">{role.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Time commitment</p>
                <p>{role.timeCommitment}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Building className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p>{role.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Best for</p>
                <p>{role.bestFor[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* What You'll Learn */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl text-gray-900">What you'll learn</h2>
            </div>
            <ul className="space-y-2">
              {role.whatYouLearn.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Gained */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl mb-4 text-gray-900">Skills you'll develop</h2>
            <div className="flex flex-wrap gap-2">
              {role.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Typical Background */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl text-gray-900">Who typically succeeds in this role</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{role.typicalBackground}</p>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg mb-2 text-gray-900">Prerequisites</h3>
            <ul className="space-y-1">
              {role.prerequisites.map((prereq, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg mb-2 text-gray-900">Best suited for</h3>
            <p className="text-gray-700">{role.bestFor.join(' · ')}</p>
          </div>
        </div>

        {/* Common Next Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl text-gray-900">Common next steps</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Students who have worked in this role often move to:
          </p>
          <ul className="space-y-2">
            {role.commonNextSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <ArrowRight className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why This Might Be a Good Fit */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl mb-3 text-gray-900">Why this role might work for you</h2>
          <p className="text-gray-700 leading-relaxed">{role.whyGoodFit}</p>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl mb-4 text-gray-900">What should I do next?</h2>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>If this role interests you:</strong>
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Check Handshake or contact {role.department} about current openings</li>
                <li>• Talk to students who currently hold this role (ask your advisor for connections)</li>
                <li>• Review the prerequisites and plan which courses/skills to focus on</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>If you're still exploring:</strong>
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Compare this with other roles to see what fits your goals</li>
                <li>• Look at "Common next steps" to see where this could lead</li>
                <li>• Consider whether the time commitment works with your schedule</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compare With Similar Roles */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl mb-4 text-gray-900">Explore related roles</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {otherRoles.map((otherRole) => (
              <Link
                key={otherRole.id}
                to={`/role/${otherRole.id}`}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <h3 className="mb-2 text-gray-900">{otherRole.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{otherRole.category}</p>
                <p className="text-sm text-gray-700 line-clamp-2">{otherRole.description}</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
            <Link
              to="/explore"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Browse all roles
            </Link>
            <button
              onClick={() => {
                // Add current role to comparison
                const compareIds = [role.id, otherRoles[0]?.id].filter(Boolean);
                if (compareIds.length === 2) {
                  navigate(`/compare?roles=${compareIds.join(',')}`);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compare with another role
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
