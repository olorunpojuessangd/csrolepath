import { Link, useNavigate } from 'react-router';
import { ArrowRight, Compass, Users, Map, Lightbulb, ExternalLink } from 'lucide-react';
import Navigation from './Navigation';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      {/* Top Header Navigation */}
      <Navigation />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
            {/* Expansive Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.12] mb-4">
              Demystifying CS & IT <br />
              <span className="text-blue-600">Student Labor Pathways</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Make CS & IT labor pathways visible. Find roles that match where you are today and where you want to go in your career.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
              <button
                onClick={() => navigate('/onboarding')}
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-sm sm:text-base hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2.5"
              >
                <span>Personalize My Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/explore"
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-800 rounded-2xl font-bold text-sm sm:text-base hover:bg-slate-50 border border-slate-200 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>Explore All Roles</span>
              </Link>
            </div>
          </div>
        </section>

        {/* MAIN BODY CONTENT */}
        <section className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-16 space-y-10">
          {/* Why CS RolePath Exists Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-6">
              Why CS RolePath exists
            </h2>

            <ul className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0" />
                <span>
                  <strong className="text-slate-900 font-bold">You shouldn't have to guess.</strong> Labor roles at Berea aren't always explained clearly. We show you what each role involves, what you'll learn, and how each position connects to off-campus internships.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0" />
                <span>
                  <strong className="text-slate-900 font-bold">No insider knowledge required.</strong> We make expectations, prerequisites, and hiring cycles explicit, so first-year, international, and first-generation students have the exact same opportunities.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0" />
                <span>
                  <strong className="text-slate-900 font-bold">Real progression, not competition.</strong> We show you how roles connect to skills and future opportunities—without arbitrary rankings or algorithms deciding for you.
                </span>
              </li>
            </ul>
          </div>

          {/* 3 Color-Separated Audience Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Blue - First-year Students */}
            <div 
              onClick={() => navigate('/explore')}
              className="bg-blue-50/60 hover:bg-blue-50/90 rounded-3xl p-7 border border-blue-200/70 shadow-2xs flex flex-col justify-between cursor-pointer transition-all hover:shadow-md group"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  First-year students
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Discover what labor roles exist and which ones welcome beginners with zero prior coursework.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-200/50 flex items-center gap-1 text-xs font-bold text-blue-600">
                <span>Browse beginner roles</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Emerald - Students Planning Ahead */}
            <div 
              onClick={() => navigate('/explore')}
              className="bg-emerald-50/60 hover:bg-emerald-50/90 rounded-3xl p-7 border border-emerald-200/70 shadow-2xs flex flex-col justify-between cursor-pointer transition-all hover:shadow-md group"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                  <Map className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  Students planning ahead
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  See how labor roles connect directly to summer software internships, grad school, or career goals.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-200/50 flex items-center gap-1 text-xs font-bold text-emerald-700">
                <span>Explore career pathways</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Purple - Students Seeking Clarity */}
            <div 
              onClick={() => navigate('/compare')}
              className="bg-purple-50/60 hover:bg-purple-50/90 rounded-3xl p-7 border border-purple-200/70 shadow-2xs flex flex-col justify-between cursor-pointer transition-all hover:shadow-md group"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                  Students seeking clarity
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Compare options side-by-side and evaluate your readiness against prerequisite checklists.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-purple-200/50 flex items-center gap-1 text-xs font-bold text-purple-700">
                <span>Compare roles side-by-side</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-8">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">CS RolePath</span>
            <span className="mx-2">·</span>
            <span>Human-Centered Computing Prototype for Berea College</span>
          </div>
          <div>
            <a 
              href="https://sites.google.com/view/olorunpojuessangd335/final-blog-post"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>UX Research Case Study</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
