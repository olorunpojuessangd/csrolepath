import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Map, Lightbulb, Sparkles, ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Badge } from '../components/common/Badge';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-200">
      <Navbar />

      <main className="flex-1 pb-16">
        
        {/* HERO SECTION */}
        <section className="pt-16 sm:pt-24 pb-16 px-6">
          <div className="max-w-[1000px] mx-auto text-center">
            
            {/* Top Pill Chip — Centered */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 text-xs font-medium text-zinc-600 dark:text-zinc-300 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Berea College CS &amp; IT Labor Ecosystem</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[42px] sm:text-6xl md:text-7xl lg:text-[80px] font-semibold tracking-tight text-zinc-950 dark:text-white leading-[1.08] mb-8">
              Demystifying CS &amp; IT <br />
              <span className="shimmer-text">
                Student Labor Pathways
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Make CS &amp; IT campus labor roles crystal clear. Discover positions matching where you are today and unlock direct trajectories to summer software and tech internships.
            </p>

            {/* Single Primary CTA — "Personalize My Pathway" centered */}
            <div className="flex justify-center">
              <Link
                to="/onboarding"
                className="inline-flex items-center justify-center gap-2 h-11 px-7 text-sm font-semibold rounded-2xl text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
              >
                <span>Personalize My Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* 3 CORE PILLARS SECTION */}
        <section className="max-w-[1120px] mx-auto px-6">
          <div className="liquid-card p-6 sm:p-8 rounded-3xl specular-highlight border border-black/5 dark:border-white/10 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-blue-600 dark:text-blue-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Core Mission</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
              Why CS RolePath exists at Berea
            </h2>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-sm">
              <div className="p-3.5 sm:p-4 rounded-2xl transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] flex flex-col">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-semibold text-xs border border-blue-500/20 shadow-xs mb-4">
                  01
                </div>
                <h3 className="font-semibold text-zinc-950 dark:text-white mb-2">No guesswork</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                  Labor roles at Berea aren't always explained clearly. We make expectations, prerequisites, and hiring windows explicit.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] flex flex-col">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-semibold text-xs border border-blue-500/20 shadow-xs mb-4">
                  02
                </div>
                <h3 className="font-semibold text-zinc-950 dark:text-white mb-2">Zero gatekeeping</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                  First-year, international, and first-generation students have the exact same roadmap to build credentials without insider connections.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] flex flex-col">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-semibold text-xs border border-blue-500/20 shadow-xs mb-4">
                  03
                </div>
                <h3 className="font-semibold text-zinc-950 dark:text-white mb-2">Direct career pipelines</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                  Every on-campus labor role bridges directly to industry careers: software engineering, data analytics, product design, and IT systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 AUDIENCE CARDS SECTION (With Equidistant Spacing) */}
        <section className="max-w-[1120px] mx-auto px-6 mb-16">
          <div className="text-center py-14 sm:py-16">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight">
              Designed for your stage of the journey
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
              Find the right starting point based on where you are in your CS studies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <Link
              to="/onboarding"
              className="liquid-card-interactive rounded-3xl p-6 flex flex-col justify-between specular-highlight border border-black/5 dark:border-white/10 group transition-all duration-200 hover:-translate-y-1 active:scale-[0.985]"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20 shadow-xs group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <Badge variant="accent" className="text-[10px] mb-2">First-Year Track</Badge>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-2">
                  First-year students
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                  Discover campus roles welcoming beginners with zero prior CS coursework, like IT Support, CMIT Makerspace, and Student Software Developer.
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-medium text-blue-600 dark:text-blue-400">
                <span>Browse beginner roles</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2 */}
            <Link
              to="/onboarding"
              className="liquid-card-interactive rounded-3xl p-6 flex flex-col justify-between specular-highlight border border-black/5 dark:border-white/10 group transition-all duration-200 hover:-translate-y-1 active:scale-[0.985]"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20 shadow-xs group-hover:scale-110 transition-transform">
                  <Map className="w-5 h-5" />
                </div>
                <Badge variant="default" className="text-[10px] mb-2">Career Horizons</Badge>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-2">
                  Students planning ahead
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                  Connect labor experience to Big Tech internships, NSF REU research programs, and competitive post-grad opportunities.
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-medium text-indigo-600 dark:text-indigo-400">
                <span>Explore career pathways</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3 */}
            <Link
              to="/compare"
              className="liquid-card-interactive rounded-3xl p-6 flex flex-col justify-between specular-highlight border border-black/5 dark:border-white/10 group transition-all duration-200 hover:-translate-y-1 active:scale-[0.985]"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 shadow-xs group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <Badge variant="success" className="text-[10px] mb-2">Comparison Matrix</Badge>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-2">
                  Students seeking clarity
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                  Compare roles side-by-side on hours, prerequisite requirements, skills acquired, and department hiring deadlines.
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span>Compare roles side-by-side</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
