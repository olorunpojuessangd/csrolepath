import { Link } from 'react-router';
import { ArrowRight, MapIcon, Users, Lightbulb } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-4 text-blue-900">CS RolePath</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Make CS labor pathways visible. Find roles that match where you are and where you want to go.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl mb-6 text-gray-900">Why CS RolePath exists</h2>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>You shouldn't have to guess.</strong> Labor roles at Berea aren't always explained clearly. We show you what each role involves, what you'll learn, and what comes next.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>No insider knowledge required.</strong> We make expectations and pathways explicit, so first-year, international, and first-generation students have the same information as everyone else.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Real progression, not rankings.</strong> We show you how roles connect to skills and opportunities—without competitive language or algorithms deciding for you.</span>
            </p>
          </div>
        </div>

        {/* Who This Helps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <Users className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg mb-2 text-gray-900">First-year students</h3>
            <p className="text-gray-700">Discover what labor roles exist and which ones welcome beginners.</p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-100">
            <MapIcon className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg mb-2 text-gray-900">Students planning ahead</h3>
            <p className="text-gray-700">See how roles connect to internships, grad school, or career goals.</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
            <Lightbulb className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg mb-2 text-gray-900">Students seeking clarity</h3>
            <p className="text-gray-700">Compare options side-by-side to make informed decisions.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <Link 
            to="/onboarding" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <div className="text-sm text-gray-600">
            <Link to="/explore" className="underline hover:text-blue-600">
              Skip to exploring roles
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-sm text-gray-500 border-t border-gray-200 pt-8">
          <p>CS RolePath is a decision-support tool, not an application system.</p>
          <p className="mt-1">Information is curated from faculty, labor supervisors, and student experiences.</p>
        </div>
      </div>
    </div>
  );
}
