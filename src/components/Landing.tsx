import { Link } from 'react-router';
import { ArrowRight, MapIcon, Users, Lightbulb, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Top Case Study Banner */}
        <div className="flex justify-center mb-8">
          <a
            href="https://sites.google.com/view/olorunpojuessangd335/final-blog-post"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100/80 hover:bg-blue-100 text-blue-800 rounded-full text-xs font-semibold tracking-wide transition-all shadow-2xs border border-blue-200"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read the Berea College Student Labor UX Case Study</span>
            <ExternalLink className="w-3 h-3 text-blue-600" />
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 text-blue-900 tracking-tight">CS RolePath</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Make CS & IT labor pathways visible. Find roles that match where you are today and where you want to go in your career.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Why CS RolePath exists</h2>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span><strong>You shouldn't have to guess.</strong> Labor roles at Berea aren't always explained clearly. We show you what each role involves, what you'll learn, and how each position connects to off-campus internships.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span><strong>No insider knowledge required.</strong> We make expectations, prerequisites, and hiring cycles explicit, so first-year, international, and first-generation students have the exact same opportunities.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span><strong>Real progression, not competition.</strong> We show you how roles connect to skills and future opportunities—without arbitrary rankings or algorithms deciding for you.</span>
            </p>
          </div>
        </div>

        {/* Who This Helps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50/80 rounded-xl p-6 border border-blue-100">
            <Users className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-bold mb-2 text-gray-900">First-year students</h3>
            <p className="text-gray-700 text-sm leading-relaxed">Discover what labor roles exist and which ones welcome beginners with zero prior coursework.</p>
          </div>

          <div className="bg-green-50/80 rounded-xl p-6 border border-green-100">
            <MapIcon className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-bold mb-2 text-gray-900">Students planning ahead</h3>
            <p className="text-gray-700 text-sm leading-relaxed">See how labor roles connect directly to summer software internships, grad school, or career goals.</p>
          </div>

          <div className="bg-purple-50/80 rounded-xl p-6 border border-purple-100">
            <Lightbulb className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-bold mb-2 text-gray-900">Students seeking clarity</h3>
            <p className="text-gray-700 text-sm leading-relaxed">Compare options side-by-side and evaluate your readiness against prerequisite checklists.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <Link 
            to="/onboarding" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all text-base"
          >
            <span>Personalize My Pathway</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <div className="text-sm text-gray-600">
            <Link to="/explore" className="underline hover:text-blue-600 font-medium">
              Or skip directly to browsing all 8 roles
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs text-gray-500 border-t border-gray-200 pt-8 space-y-1">
          <p>CS RolePath is an independent decision-support tool designed for Berea College students.</p>
          <p>Role requirements and timelines are aligned with CS Department and ITS labor guidelines.</p>
        </div>
      </div>
    </div>
  );
}
