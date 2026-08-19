import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { roles } from '../data/roles';
import { 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb, 
  Users, 
  TrendingUp, 
  Clock, 
  Building, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  MapPin, 
  FileText, 
  Sparkles, 
  X,
  Briefcase
} from 'lucide-react';
import Navigation from './Navigation';

export default function RoleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const role = roles.find(r => r.id === id);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [checkedPrereqs, setCheckedPrereqs] = useState<string[]>([]);

  useEffect(() => {
    if (!role) return;

    // Check saved status
    const saved = localStorage.getItem('savedRoleIds');
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        if (Array.isArray(ids) && ids.includes(role.id)) {
          setIsSaved(true);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Check prerequisite checklist progress
    const storedChecks = localStorage.getItem(`prereq_checks_${role.id}`);
    if (storedChecks) {
      try {
        const checked = JSON.parse(storedChecks);
        if (Array.isArray(checked)) {
          setCheckedPrereqs(checked);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [role]);

  if (!role) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center bg-[#FFFFFF] p-8 rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] max-w-md w-full">
            <h1 className="text-xl font-semibold mb-2 text-[#0A0E14]">Role not found</h1>
            <Link to="/explore" className="text-[#4F46E5] font-medium hover:underline text-sm">
              Back to explore roles
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const toggleSaveRole = () => {
    const saved = localStorage.getItem('savedRoleIds');
    let ids: string[] = [];
    if (saved) {
      try {
        ids = JSON.parse(saved);
      } catch (e) {
        ids = [];
      }
    }

    let updatedIds: string[];
    if (ids.includes(role.id)) {
      updatedIds = ids.filter(i => i !== role.id);
      setIsSaved(false);
    } else {
      updatedIds = [...ids, role.id];
      setIsSaved(true);
    }
    localStorage.setItem('savedRoleIds', JSON.stringify(updatedIds));
  };

  const togglePrereqCheck = (itemId: string) => {
    const next = checkedPrereqs.includes(itemId)
      ? checkedPrereqs.filter(id => id !== itemId)
      : [...checkedPrereqs, itemId];
    setCheckedPrereqs(next);
    localStorage.setItem(`prereq_checks_${role.id}`, JSON.stringify(next));
  };

  const totalPrereqs = role.prerequisiteChecklist.length;
  const completedPrereqs = checkedPrereqs.length;
  const isAllPrereqsMet = totalPrereqs > 0 && completedPrereqs === totalPrereqs;

  const otherRoles = roles.filter(r => r.id !== role.id).slice(0, 3);
  const handshakeUrl = `https://berea.joinhandshake.com/stu/postings?query=${encodeURIComponent(role.handshakeQuery)}`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <Navigation />

      {/* Global 1120px centered container */}
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Navigation & Actions Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#0A0E14] transition-colors font-medium text-xs sm:text-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to previous page</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleSaveRole}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border text-xs font-medium transition-colors ${
                isSaved
                  ? 'bg-[#EEF0FF] border-[#4F46E5] text-[#4F46E5]'
                  : 'bg-[#FFFFFF] border-[#D0D5DD] text-[#3D4451] hover:bg-[#F3F4F6]'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>Saved in My Pathway</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Save Role</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4F46E5] text-white rounded-[6px] text-xs font-medium hover:bg-[#6366F1] transition-colors shadow-xs"
            >
              <span>How to Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-6 sm:p-7 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#3D4451] rounded-[6px] text-xs font-medium">
              {role.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] rounded-[6px] text-xs font-medium">
              <Calendar className="w-3 h-3 text-[#15803D] flex-shrink-0" />
              <span>{role.hiringCycle}</span>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A0E14] mb-2 tracking-tight">{role.title}</h1>
              <p className="text-sm sm:text-base text-[#3D4451] max-w-3xl leading-relaxed">{role.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              className="lg:self-start inline-flex items-center gap-1.5 bg-[#4F46E5] text-white px-4 py-2 rounded-[6px] font-medium text-xs sm:text-sm hover:bg-[#6366F1] transition-colors shadow-xs flex-shrink-0"
            >
              <span>How to Apply</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Meta Grid */}
          <div className="grid sm:grid-cols-3 gap-4 pt-5 border-t border-[#D0D5DD]/40 text-xs">
            <div className="flex items-start gap-2.5 text-[#3D4451]">
              <div className="w-7 h-7 rounded-[6px] bg-[#F3F4F6] text-[#4F46E5] flex items-center justify-center flex-shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-medium text-[#6B7280] uppercase tracking-wider text-[10px]">Time Commitment</p>
                <p className="font-semibold text-[#0A0E14] mt-0.5 text-xs sm:text-sm">{role.timeCommitment}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-[#3D4451]">
              <div className="w-7 h-7 rounded-[6px] bg-[#F3F4F6] text-[#4F46E5] flex items-center justify-center flex-shrink-0">
                <Building className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-medium text-[#6B7280] uppercase tracking-wider text-[10px]">Department & Location</p>
                <p className="font-semibold text-[#0A0E14] mt-0.5 text-xs sm:text-sm">{role.department}</p>
                <p className="text-[#6B7280] mt-0.5">{role.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-[#3D4451]">
              <div className="w-7 h-7 rounded-[6px] bg-[#F3F4F6] text-[#4F46E5] flex items-center justify-center flex-shrink-0">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-medium text-[#6B7280] uppercase tracking-wider text-[10px]">Best Suited For</p>
                <p className="font-semibold text-[#0A0E14] mt-0.5 text-xs sm:text-sm">{role.bestFor[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Readiness Self-Check Card */}
        <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-6 sm:p-7 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#0A0E14]">Readiness & Prerequisite Self-Check</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Check off requirements you meet to evaluate your eligibility</p>
            </div>
            <span className="text-xs font-medium text-[#4F46E5] bg-[#EEF0FF] px-2.5 py-1 rounded-[6px] border border-[#D0D5DD]/40 w-fit">
              {completedPrereqs} of {totalPrereqs} completed
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#F3F4F6] h-1.5 rounded-[6px] overflow-hidden mb-5 border border-[#D0D5DD]/30">
            <div 
              className={`h-full transition-all duration-200 ${
                isAllPrereqsMet ? 'bg-[#15803D]' : 'bg-[#4F46E5]'
              }`}
              style={{ width: `${totalPrereqs > 0 ? (completedPrereqs / totalPrereqs) * 100 : 0}%` }}
            />
          </div>

          {/* Checklist items */}
          <div className="space-y-2 mb-4">
            {role.prerequisiteChecklist.map((item) => {
              const isChecked = checkedPrereqs.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePrereqCheck(item.id)}
                  className={`w-full text-left p-3 rounded-[6px] border transition-colors flex items-start gap-2.5 ${
                    isChecked
                      ? 'bg-[#EEF0FF] border-[#4F46E5] text-[#0A0E14]'
                      : 'bg-[#FAFAFA] border-[#D0D5DD] hover:bg-[#F3F4F6] text-[#3D4451]'
                  }`}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-[#4F46E5] mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                    <span className={isChecked ? 'font-medium text-[#0A0E14]' : 'text-[#3D4451]'}>
                      {item.label}
                    </span>
                    {item.courseCode && (
                      <span className="ml-2 inline-block px-1.5 py-0.5 bg-[#F3F4F6] text-[#0A0E14] text-[10px] rounded-[4px] font-mono border border-[#D0D5DD]/50">
                        {item.courseCode}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback banner */}
          <div className={`p-3.5 rounded-[6px] text-xs border ${
            isAllPrereqsMet
              ? 'bg-[#DCFCE7] border-[#15803D]/40 text-[#15803D]'
              : completedPrereqs > 0
              ? 'bg-[#EEF0FF] border-[#4F46E5]/40 text-[#4F46E5]'
              : 'bg-[#F3F4F6] border-[#D0D5DD] text-[#3D4451]'
          }`}>
            {isAllPrereqsMet ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="font-semibold text-xs sm:text-sm">🎉 You meet all prerequisites for this position!</p>
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="px-3 py-1 bg-[#15803D] text-white rounded-[6px] text-xs font-medium hover:bg-[#15803D]/90 transition-colors w-fit"
                >
                  View Application Steps
                </button>
              </div>
            ) : completedPrereqs > 0 ? (
              <p>
                <strong>Nice progress:</strong> You satisfy {completedPrereqs} of {totalPrereqs} prerequisites. Plan to fulfill the remainder next semester!
              </p>
            ) : (
              <p>
                Check the requirements above to track your course eligibility.
              </p>
            )}
          </div>
        </div>

        {/* Internship & Career Alignment */}
        <div className="bg-[#FFFFFF] border border-[#D0D5DD] rounded-[8px] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-6 sm:p-7 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-[#0A0E14] mb-1">
                  How This Prepares You for Off-Campus Internships
                </h2>
                <p className="text-[#3D4451] text-sm leading-relaxed">{role.internshipAlignment}</p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs font-medium uppercase tracking-wider text-[#6B7280] mr-1">Skills:</span>
                {role.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-[#F3F4F6] text-[#3D4451] rounded-[6px] text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column: Learning Outcomes & Skills */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {/* What You'll Learn */}
          <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-[6px] bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center">
                <Lightbulb className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-base font-semibold text-[#0A0E14]">What you'll learn</h2>
            </div>
            <ul className="space-y-2.5">
              {role.whatYouLearn.map((item, idx) => (
                <li key={idx} className="flex items-start text-[#3D4451] text-xs sm:text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-1.5 mr-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Developed & Audience */}
          <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-[6px] bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-base font-semibold text-[#0A0E14]">Skills you'll develop</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {role.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#F3F4F6] text-[#3D4451] rounded-[6px] text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D0D5DD]/40 text-xs">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280] mb-1">Target Audience</p>
              <p className="text-[#3D4451] leading-relaxed">{role.bestFor.join(' · ')}</p>
            </div>
          </div>
        </div>

        {/* Typical Background & Prerequisites */}
        <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-6 mb-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-[6px] bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-semibold text-[#0A0E14]">Who typically succeeds in this role</h2>
          </div>
          <p className="text-[#3D4451] leading-relaxed text-xs sm:text-sm mb-5">{role.typicalBackground}</p>
          
          <div className="grid sm:grid-cols-2 gap-5 pt-4 border-t border-[#D0D5DD]/40 text-xs">
            <div>
              <h3 className="uppercase font-medium text-[#6B7280] tracking-wider text-[10px] mb-2">Prerequisites checklist</h3>
              <ul className="space-y-1.5">
                {role.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[#3D4451]">
                    <span className="text-[#4F46E5] font-semibold">✓</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="uppercase font-medium text-[#6B7280] tracking-wider text-[10px] mb-2">Best suited for</h3>
              <p className="text-[#3D4451] leading-relaxed">{role.bestFor.join(' · ')}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-6 mb-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-[6px] bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-semibold text-[#0A0E14]">Common next steps & career progression</h2>
          </div>
          <p className="text-[#6B7280] text-xs mb-4">
            Students in this position frequently transition into:
          </p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {role.commonNextSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-[#FAFAFA] rounded-[6px] border border-[#D0D5DD]/40 text-xs font-medium text-[#0A0E14]">
                <ArrowRight className="w-3.5 h-3.5 text-[#4F46E5] mt-0.5 flex-shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why this role works */}
        <div className="bg-[#EEF0FF] border border-[#D0D5DD] rounded-[8px] p-5 sm:p-6 mb-6">
          <h2 className="text-base font-semibold text-[#0A0E14] mb-1.5">Why this role might work for you</h2>
          <p className="text-[#3D4451] leading-relaxed text-xs sm:text-sm">{role.whyGoodFit}</p>
        </div>

        {/* Explore Related Roles */}
        <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-6">
          <h2 className="text-base font-semibold text-[#0A0E14] mb-4">Explore related roles</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {otherRoles.map((otherRole) => (
              <Link
                key={otherRole.id}
                to={`/role/${otherRole.id}`}
                className="p-4 border border-[#D0D5DD] rounded-[8px] hover:border-[#4F46E5] hover:bg-[#FAFAFA] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] px-2 py-0.5 bg-[#F3F4F6] text-[#3D4451] rounded-[6px] font-medium mb-1.5 inline-block">
                    {otherRole.category}
                  </span>
                  <h3 className="font-semibold text-[#0A0E14] text-sm mb-1 leading-snug">
                    {otherRole.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">{otherRole.description}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#D0D5DD]/40 flex items-center justify-between text-xs text-[#4F46E5] font-medium">
                  <span>{otherRole.timeCommitment}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="pt-4 border-t border-[#D0D5DD]/40 flex items-center justify-between text-xs">
            <Link
              to="/explore"
              className="text-[#4F46E5] hover:underline font-medium"
            >
              ← Back to Explore Roles
            </Link>
            <button
              onClick={() => {
                const compareIds = [role.id, otherRoles[0]?.id].filter(Boolean);
                if (compareIds.length === 2) {
                  navigate(`/compare?roles=${compareIds.join(',')}`);
                }
              }}
              className="px-3 py-1.5 bg-[#4F46E5] text-white rounded-[6px] font-medium hover:bg-[#6366F1] transition-colors"
            >
              Compare with {otherRoles[0]?.title}
            </button>
          </div>
        </div>
      </div>

      {/* HOW TO APPLY MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] rounded-[12px] shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#D0D5DD]">
            <div className="p-5 border-b border-[#D0D5DD] flex items-start justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#4F46E5] tracking-wider">Application Guide</span>
                <h2 className="text-xl font-semibold text-[#0A0E14]">{role.title}</h2>
                <p className="text-xs text-[#6B7280]">{role.department} · {role.location}</p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 text-[#6B7280] hover:text-[#0A0E14] rounded-[6px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5 text-xs sm:text-sm">
              {/* Step 1 */}
              <div className="bg-[#EEF0FF] border border-[#D0D5DD] rounded-[8px] p-4">
                <h3 className="font-semibold text-[#0A0E14] mb-1">1. Check Berea Handshake Postings</h3>
                <p className="text-[#3D4451] text-xs leading-relaxed mb-3">
                  Berea College labor openings are officially posted on Handshake:
                </p>
                <a
                  href={handshakeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#4F46E5] text-white px-3.5 py-1.5 rounded-[6px] text-xs font-medium hover:bg-[#6366F1] transition-colors"
                >
                  <span>Search Handshake for "{role.handshakeQuery}"</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="font-semibold text-[#0A0E14] mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>2. Hiring Timeline & Cycles</span>
                </h3>
                <p className="text-[#3D4451] text-xs leading-relaxed bg-[#FAFAFA] p-3 rounded-[6px] border border-[#D0D5DD]/50">
                  <strong>Typical Cycle:</strong> {role.hiringCycle}
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="font-semibold text-[#0A0E14] mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>3. Prepare Required Materials</span>
                </h3>
                <ul className="space-y-1 text-xs text-[#3D4451] bg-[#FAFAFA] p-3 rounded-[6px] border border-[#D0D5DD]/50">
                  {role.applicationMaterials.map((material, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-1.5 mr-2 flex-shrink-0" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step 4 */}
              <div>
                <h3 className="font-semibold text-[#0A0E14] mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>4. Department Contact</span>
                </h3>
                <div className="p-3 bg-[#FAFAFA] rounded-[6px] border border-[#D0D5DD]/50 text-xs text-[#3D4451] space-y-1">
                  <p><strong>Contact:</strong> {role.contactPerson}</p>
                  <p><strong>Location:</strong> {role.location}</p>
                </div>
              </div>
            </div>

            <div className="p-4 px-5 border-t border-[#D0D5DD] bg-[#FAFAFA] flex items-center justify-between">
              <button
                type="button"
                onClick={toggleSaveRole}
                className="text-xs font-medium text-[#4F46E5] hover:underline"
              >
                {isSaved ? "Saved in My Pathway" : "Save Role"}
              </button>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="px-4 py-1.5 bg-[#FFFFFF] border border-[#D0D5DD] hover:bg-[#F3F4F6] text-[#0A0E14] text-xs font-medium rounded-[6px]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
