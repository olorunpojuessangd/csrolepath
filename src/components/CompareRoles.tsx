import { useSearchParams, Link, useNavigate } from 'react-router';
import { roles, Role } from '../data/roles';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, MapPin, Briefcase } from 'lucide-react';
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
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center bg-[#FFFFFF] p-8 rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] max-w-md w-full">
            <h1 className="text-xl font-semibold mb-2 text-[#0A0E14]">Select at least 2 roles to compare</h1>
            <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
              Check the comparison box on 2 or 3 roles from the explore page to evaluate them side-by-side.
            </p>
            <Link 
              to="/explore" 
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-[6px] font-medium text-sm hover:bg-[#6366F1] transition-colors"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const colCount = compareRoles.length;
  const gridClass = colCount === 3 ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3';

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <Navigation />

      {/* Global 1120px centered container (Priority 4 & Layout Rule) */}
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Top Navigation */}
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#0A0E14] transition-colors text-xs sm:text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to previous page</span>
          </button>
          
          <Link
            to="/explore"
            className="text-xs sm:text-sm text-[#4F46E5] hover:underline font-medium"
          >
            Change roles
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#0A0E14] tracking-tight">Compare Roles Side-by-Side</h1>
          <p className="text-[#6B7280] mt-1 text-sm">
            Evaluate time commitments, prerequisites, skills, and internship trajectories across {compareRoles.length} positions.
          </p>
        </div>

        {/* Role Header Column Cards */}
        <div className={`grid ${gridClass} gap-4 mb-6`}>
          <div className="hidden md:flex flex-col justify-end p-2">
            <span className="text-xs uppercase font-medium text-[#6B7280] tracking-wider">Role Overview</span>
          </div>

          {compareRoles.map((role) => (
            <div 
              key={role.id} 
              className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-5 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2 py-0.5 bg-[#F3F4F6] text-[#3D4451] rounded-[6px] text-xs font-medium mb-2">
                  {role.category}
                </span>
                <h2 className="text-base font-semibold text-[#0A0E14] mb-1.5 tracking-tight leading-snug">{role.title}</h2>
                <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
                  {role.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D0D5DD]/40 flex items-center justify-between text-xs font-medium">
                <Link
                  to={`/role/${role.id}`}
                  className="inline-flex items-center gap-1 text-[#4F46E5] hover:underline"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <a
                  href={`https://berea.joinhandshake.com/stu/postings?query=${encodeURIComponent(role.handshakeQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#6B7280] hover:text-[#0A0E14]"
                >
                  <span>Handshake</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table Section (Flattened Single-Level Layout - Priority 4) */}
        <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-5 sm:p-6 space-y-6">
          {/* Section: Logistics & Department */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A0E14] uppercase tracking-wider mb-4 pb-2 border-b border-[#D0D5DD]/50">
              Logistics & Department
            </h3>

            {/* Row: Time Commitment */}
            <div className={`grid ${gridClass} gap-4 py-3 border-b border-[#D0D5DD]/30 text-xs items-center`}>
              <div className="font-medium text-[#6B7280] uppercase tracking-wider">Time Commitment</div>
              {compareRoles.map((role) => (
                <div key={role.id} className="text-[#0A0E14] font-medium">{role.timeCommitment}</div>
              ))}
            </div>

            {/* Row: Hiring Cycle */}
            <div className={`grid ${gridClass} gap-4 py-3 border-b border-[#D0D5DD]/30 text-xs items-center`}>
              <div className="font-medium text-[#6B7280] uppercase tracking-wider">Hiring Cycle</div>
              {compareRoles.map((role) => (
                <div key={role.id} className="text-[#3D4451] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#6B7280] flex-shrink-0" />
                  <span>{role.hiringCycle}</span>
                </div>
              ))}
            </div>

            {/* Row: Department & Location */}
            <div className={`grid ${gridClass} gap-4 py-3 border-b border-[#D0D5DD]/30 text-xs`}>
              <div className="font-medium text-[#6B7280] uppercase tracking-wider">Department & Location</div>
              {compareRoles.map((role) => (
                <div key={role.id} className="text-[#3D4451] space-y-0.5">
                  <p className="font-medium text-[#0A0E14]">{role.department}</p>
                  <p className="text-[#6B7280]">{role.location}</p>
                </div>
              ))}
            </div>

            {/* Row: Best For */}
            <div className={`grid ${gridClass} gap-4 py-3 text-xs`}>
              <div className="font-medium text-[#6B7280] uppercase tracking-wider">Target Students</div>
              {compareRoles.map((role) => (
                <div key={role.id} className="text-[#3D4451] leading-relaxed">
                  {role.bestFor.join(' · ')}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Prerequisites */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A0E14] uppercase tracking-wider mb-4 pb-2 border-b border-[#D0D5DD]/50">
              Prerequisites & Eligibility
            </h3>

            <div className={`grid ${gridClass} gap-4 text-xs`}>
              <div className="font-medium text-[#6B7280] uppercase tracking-wider">Requirements</div>
              {compareRoles.map((role) => (
                <div key={role.id}>
                  <ul className="space-y-2">
                    {role.prerequisites.map((prereq, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-[#3D4451] leading-relaxed">
                        <span className="text-[#4F46E5] font-semibold mt-0.5">✓</span>
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Internship & Career Alignment (Flattened - Priority 4) */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A0E14] uppercase tracking-wider mb-4 pb-2 border-b border-[#D0D5DD]/50">
              Off-Campus Internship Alignment
            </h3>

            <div className={`grid ${gridClass} gap-4 text-xs`}>
              <div className="font-medium text-[#6B7280] uppercase tracking-wider">Resume Value</div>
              {compareRoles.map((role) => (
                <div key={role.id} className="space-y-2.5">
                  <p className="text-[#3D4451] leading-relaxed">{role.internshipAlignment}</p>
                  <div className="flex flex-wrap gap-1">
                    {role.skills.slice(0, 3).map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 bg-[#F3F4F6] text-[#3D4451] rounded-[6px] text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Key Learning Outcomes */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A0E14] uppercase tracking-wider mb-4 pb-2 border-b border-[#D0D5DD]/50">
              Core Learning Outcomes
            </h3>

            <div className={`grid ${gridClass} gap-4 text-xs`}>
              <div className="font-medium text-[#6B7280] uppercase tracking-wider">Takeaways</div>
              {compareRoles.map((role) => (
                <div key={role.id}>
                  <ul className="space-y-2">
                    {role.whatYouLearn.slice(0, 4).map((learn, lIdx) => (
                      <li key={lIdx} className="flex items-start text-[#3D4451] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-1.5 mr-2 flex-shrink-0" />
                        <span>{learn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-5 text-xs">
          <Link
            to="/explore"
            className="text-[#6B7280] hover:text-[#0A0E14] font-medium"
          >
            ← Back to Explore Roles
          </Link>
          <div className="flex gap-2">
            {compareRoles.map((role) => (
              <Link
                key={role.id}
                to={`/role/${role.id}`}
                className="px-3.5 py-1.5 bg-[#4F46E5] text-white rounded-[6px] font-medium hover:bg-[#6366F1] transition-colors"
              >
                View {role.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
