import { Link, useNavigate } from 'react-router';
import { ArrowRight, Compass, Users, Map, Lightbulb, ShieldCheck, Target } from 'lucide-react';
import Navigation from './Navigation';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0E14] flex flex-col justify-between">
      {/* Top Header Navigation */}
      <Navigation />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 sm:py-20 bg-[#FFFFFF] border-b border-[#D0D5DD]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 text-center">
            {/* Headline (tightened line-height, text-4xl display, font-semibold) */}
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#0A0E14] tracking-tight leading-tight mb-3">
              Demystifying CS & IT <br />
              <span className="text-[#4F46E5]">Student Labor Pathways</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#3D4451] max-w-2xl mx-auto mb-8 leading-relaxed">
              Make CS & IT labor pathways visible. Find roles that match where you are today and where you want to go in your career.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
              <button
                onClick={() => navigate('/onboarding')}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#4F46E5] text-white rounded-[6px] font-medium text-sm hover:bg-[#6366F1] transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Personalize My Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/explore"
                className="w-full sm:w-auto px-4 py-2.5 bg-[#FFFFFF] text-[#3D4451] rounded-[6px] font-medium text-sm hover:bg-[#F3F4F6] border border-[#D0D5DD] transition-colors flex items-center justify-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-[#6B7280]" />
                <span>Explore All Roles</span>
              </Link>
            </div>
          </div>
        </section>

        {/* MAIN BODY CONTENT (64px rhythm --space-16) */}
        <section className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16 space-y-12">
          {/* Why CS RolePath Exists */}
          <div className="bg-[#FFFFFF] rounded-[8px] p-6 sm:p-8 border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)]">
            <h2 className="text-xl font-semibold text-[#0A0E14] tracking-tight mb-4">
              Why CS RolePath exists
            </h2>

            <ul className="space-y-3.5 text-[#3D4451] text-sm leading-relaxed">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-2 mr-2.5 flex-shrink-0" />
                <span>
                  <strong className="text-[#0A0E14] font-semibold">You shouldn't have to guess.</strong> Labor roles at Berea aren't always explained clearly. We show you what each role involves, what you'll learn, and how each position connects to off-campus internships.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-2 mr-2.5 flex-shrink-0" />
                <span>
                  <strong className="text-[#0A0E14] font-semibold">No insider knowledge required.</strong> We make expectations, prerequisites, and hiring cycles explicit, so first-year, international, and first-generation students have the exact same opportunities.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-2 mr-2.5 flex-shrink-0" />
                <span>
                  <strong className="text-[#0A0E14] font-semibold">Real progression, not competition.</strong> We show you how roles connect to skills and future opportunities—without arbitrary rankings or algorithms deciding for you.
                </span>
              </li>
            </ul>
          </div>

          {/* 3 Audience Cards (Unified design tokens and clean icon chips) */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Card 1: First-year Students */}
            <div 
              onClick={() => navigate('/explore')}
              className="bg-[#FFFFFF] rounded-[8px] p-5 sm:p-6 border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] hover:shadow-[0_2px_8px_rgba(10,14,20,0.08)] hover:border-[#6366F1] flex flex-col justify-between cursor-pointer transition-all group"
            >
              <div>
                <div className="w-9 h-9 rounded-[6px] bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center mb-4">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#0A0E14] mb-1.5 group-hover:text-[#4F46E5] transition-colors">
                  First-year students
                </h3>
                <p className="text-[#3D4451] text-xs leading-relaxed">
                  Discover what labor roles exist and which ones welcome beginners with zero prior coursework.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D0D5DD]/40 flex items-center gap-1 text-xs font-medium text-[#4F46E5]">
                <span>Browse beginner roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2: Students Planning Ahead */}
            <div 
              onClick={() => navigate('/explore')}
              className="bg-[#FFFFFF] rounded-[8px] p-5 sm:p-6 border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] hover:shadow-[0_2px_8px_rgba(10,14,20,0.08)] hover:border-[#6366F1] flex flex-col justify-between cursor-pointer transition-all group"
            >
              <div>
                <div className="w-9 h-9 rounded-[6px] bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center mb-4">
                  <Map className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#0A0E14] mb-1.5 group-hover:text-[#4F46E5] transition-colors">
                  Students planning ahead
                </h3>
                <p className="text-[#3D4451] text-xs leading-relaxed">
                  See how labor roles connect directly to summer software internships, grad school, or career goals.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D0D5DD]/40 flex items-center gap-1 text-xs font-medium text-[#4F46E5]">
                <span>Explore career pathways</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: Students Seeking Clarity */}
            <div 
              onClick={() => navigate('/compare')}
              className="bg-[#FFFFFF] rounded-[8px] p-5 sm:p-6 border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] hover:shadow-[0_2px_8px_rgba(10,14,20,0.08)] hover:border-[#6366F1] flex flex-col justify-between cursor-pointer transition-all group"
            >
              <div>
                <div className="w-9 h-9 rounded-[6px] bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center mb-4">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#0A0E14] mb-1.5 group-hover:text-[#4F46E5] transition-colors">
                  Students seeking clarity
                </h3>
                <p className="text-[#3D4451] text-xs leading-relaxed">
                  Compare options side-by-side and evaluate your readiness against prerequisite checklists.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D0D5DD]/40 flex items-center gap-1 text-xs font-medium text-[#4F46E5]">
                <span>Compare roles side-by-side</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#D0D5DD] bg-[#FFFFFF] py-6">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <div>
            <span className="font-semibold text-[#0A0E14]">CS RolePath</span>
            <span className="mx-2">·</span>
            <span>Human-Centered Computing Prototype for Berea College</span>
          </div>
          <div>
            <a 
              href="https://sites.google.com/view/olorunpojuessangd335/final-blog-post"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4F46E5] hover:underline font-medium"
            >
              UX Research Case Study ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
