import { useSearchParams, Link, useNavigate } from 'react-router';
import { roles, Role } from '../data/roles';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, MapPin, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import Navigation from './Navigation';

export default function CompareRoles() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleIds = searchParams.get('roles')?.split(',') || [];
  
  const compareRoles = roleIds
    .map(id => roles.find(r => r.id === id))
    .filter(Boolean) as Role[];

  if (compareRoles.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-200 max-w-md">
          <h1 className="text-2xl font-bold mb-3 text-gray-900">Select at least 2 roles to compare</h1>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Head to the explore page and check the comparison box on 2 or 3 roles you want to evaluate side-by-side.
          </p>
          <Link 
            to="/explore" 
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-xs"
          >
            <span>Explore CS Labor Roles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const roleThemeColors = [
    {
      bg: 'bg-blue-600',
      dotBg: 'bg-blue-600',
      badge: 'bg-blue-50 text-blue-700',
      border: 'border-blue-200',
      pill: 'bg-blue-100 text-blue-800',
      dot: 'text-blue-600',
      headerText: 'text-blue-100',
    },
    {
      bg: 'bg-indigo-600',
      dotBg: 'bg-indigo-600',
      badge: 'bg-indigo-50 text-indigo-700',
      border: 'border-indigo-200',
      pill: 'bg-indigo-100 text-indigo-800',
      dot: 'text-indigo-600',
      headerText: 'text-indigo-100',
    },
    {
      bg: 'bg-purple-600',
      dotBg: 'bg-purple-600',
      badge: 'bg-purple-50 text-purple-700',
      border: 'border-purple-200',
      pill: 'bg-purple-100 text-purple-800',
      dot: 'text-purple-600',
      headerText: 'text-purple-100',
    }
  ];

  const colCount = compareRoles.length;
  const gridClass = colCount === 3 ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3';

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-28">
      <Navigation />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        {/* Top Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-all text-xs sm:text-sm font-semibold px-3.5 py-2 -ml-3 rounded-xl hover:bg-slate-200/60 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to previous page</span>
          </button>
          
          <Link
            to="/explore"
            className="text-sm text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            Choose different roles
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Compare Roles Side-by-Side</h1>
          <p className="text-gray-600 mt-2 text-base">
            Evaluate time commitments, prerequisites, resume skills, and internship trajectories across {compareRoles.length} positions.
          </p>
        </div>

        {/* Role Header Column Cards */}
        <div className={`grid ${gridClass} gap-6 mb-8`}>
          <div className="hidden md:flex flex-col justify-end p-4">
            <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Role Overview</span>
          </div>

          {compareRoles.map((role, idx) => {
            const theme = roleThemeColors[idx % roleThemeColors.length];
            return (
              <div key={role.id} className={`${theme.bg} text-white rounded-2xl p-7 shadow-sm flex flex-col justify-between`}>
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    {role.category}
                  </span>
                  <h2 className="text-xl font-bold mb-2.5 tracking-tight">{role.title}</h2>
                  <p className={`${theme.headerText} text-xs line-clamp-3 leading-relaxed mb-6`}>
                    {role.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-semibold">
                  <Link
                    to={`/role/${role.id}`}
                    className="inline-flex items-center gap-1.5 text-white hover:underline"
                  >
                    <span>View full details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={`https://berea.joinhandshake.com/stu/postings?query=${encodeURIComponent(role.handshakeQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/90 hover:text-white"
                  >
                    <span>Handshake</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Section 1: Overview & Logistics */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Logistics & Department
          </h3>

          {/* Row: Time Commitment */}
          <div className={`grid ${gridClass} gap-6 py-4 border-b border-gray-100 text-sm items-center`}>
            <div className="font-bold text-gray-500 text-xs uppercase tracking-wider">Time Commitment</div>
            {compareRoles.map((role) => (
              <div key={role.id} className="text-gray-900 font-semibold">{role.timeCommitment}</div>
            ))}
          </div>

          {/* Row: Hiring Cycle */}
          <div className={`grid ${gridClass} gap-6 py-4 border-b border-gray-100 text-sm items-center`}>
            <div className="font-bold text-gray-500 text-xs uppercase tracking-wider">Hiring Cycle</div>
            {compareRoles.map((role) => (
              <div key={role.id} className="text-emerald-900 font-medium text-xs flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{role.hiringCycle}</span>
              </div>
            ))}
          </div>

          {/* Row: Department & Location */}
          <div className={`grid ${gridClass} gap-6 py-4 border-b border-gray-100 text-sm`}>
            <div className="font-bold text-gray-500 text-xs uppercase tracking-wider">Department & Location</div>
            {compareRoles.map((role) => (
              <div key={role.id} className="text-gray-800 text-xs space-y-1">
                <p className="font-bold text-gray-900">{role.department}</p>
                <p className="text-gray-500">{role.location}</p>
              </div>
            ))}
          </div>

          {/* Row: Best For */}
          <div className={`grid ${gridClass} gap-6 py-4 text-sm`}>
            <div className="font-bold text-gray-500 text-xs uppercase tracking-wider">Target Students</div>
            {compareRoles.map((role) => (
              <div key={role.id} className="text-gray-700 text-xs leading-relaxed">
                {role.bestFor.join(' · ')}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section 2: Prerequisites & Readiness */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Prerequisites & Eligibility
          </h3>

          <div className={`grid ${gridClass} gap-6 py-2 text-sm`}>
            <div className="font-bold text-gray-500 text-xs uppercase tracking-wider">Requirements</div>
            {compareRoles.map((role, idx) => {
              const theme = roleThemeColors[idx % roleThemeColors.length];
              return (
                <div key={role.id} className="space-y-3">
                  <ul className="space-y-2.5">
                    {role.prerequisites.map((prereq, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-gray-700 leading-relaxed">
                        <span className={`${theme.dot} font-bold text-sm leading-none mt-0.5`}>✓</span>
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Section 3: Internship & Career Alignment */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-blue-950">Off-Campus Internship & Career Alignment</h3>
          </div>

          <div className={`grid ${gridClass} gap-6 py-2 text-sm`}>
            <div className="font-bold text-blue-900/80 text-xs uppercase tracking-wider">Resume Value</div>
            {compareRoles.map((role) => (
              <div key={role.id} className="bg-white p-5 rounded-2xl border border-blue-200/80 shadow-2xs space-y-3">
                <p className="text-xs text-gray-800 leading-relaxed">{role.internshipAlignment}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {role.skills.slice(0, 3).map((skill, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 bg-blue-50 text-blue-800 rounded-md text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section 4: What You'll Learn & Skills */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Core Learning Outcomes
          </h3>

          <div className={`grid ${gridClass} gap-6 py-2 text-sm`}>
            <div className="font-bold text-gray-500 text-xs uppercase tracking-wider">Key Takeaways</div>
            {compareRoles.map((role, idx) => {
              const theme = roleThemeColors[idx % roleThemeColors.length];
              return (
                <div key={role.id}>
                  <ul className="space-y-3">
                    {role.whatYouLearn.slice(0, 4).map((learn, lIdx) => (
                      <li key={lIdx} className="flex items-start text-xs text-gray-700 leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg} mt-1.5 mr-2.5 flex-shrink-0`} />
                        <span>{learn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Section 5: Common Next Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Progression & Next Roles
          </h3>

          <div className={`grid ${gridClass} gap-6 py-2 text-sm`}>
            <div className="font-bold text-gray-500 text-xs uppercase tracking-wider">Where Students Move</div>
            {compareRoles.map((role, idx) => {
              const theme = roleThemeColors[idx % roleThemeColors.length];
              return (
                <div key={role.id}>
                  <ul className="space-y-3">
                    {role.commonNextSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold leading-snug">
                        <ArrowRight className={`w-3.5 h-3.5 ${theme.dot} mt-0.5 flex-shrink-0`} />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <Link
            to="/explore"
            className="text-sm text-gray-600 hover:text-gray-900 font-semibold underline"
          >
            ← Back to Explore Roles
          </Link>
          <div className="flex flex-wrap gap-4">
            {compareRoles.map((role, idx) => {
              const theme = roleThemeColors[idx % roleThemeColors.length];
              return (
                <Link
                  key={role.id}
                  to={`/role/${role.id}`}
                  className={`px-6 py-3 ${theme.bg} text-white rounded-xl text-sm font-bold hover:opacity-95 shadow-sm transition-all`}
                >
                  View {role.title} Details
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
