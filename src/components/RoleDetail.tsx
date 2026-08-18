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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-200 max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Role not found</h1>
          <Link to="/explore" className="text-blue-600 hover:text-blue-700 font-semibold underline">
            Back to explore roles
          </Link>
        </div>
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
    <div className="min-h-screen bg-gray-50/70 pb-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10">
        {/* Navigation & Actions Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2.5 px-3 py-2 -ml-3 text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm rounded-lg hover:bg-gray-100/80 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to previous page</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleSaveRole}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                isSaved
                  ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-2xs hover:bg-blue-100'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              title={isSaved ? "Saved to your pathway" : "Save role for later"}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-blue-600" />
                  <span>Saved in My Pathway</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-gray-500" />
                  <span>Save Role</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="flex items-center gap-3 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm hover:shadow transition-all"
            >
              <span>How to Apply & Next Steps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10 mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-block px-3.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {role.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-medium border border-emerald-100">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{role.hiringCycle}</span>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">{role.title}</h1>
              <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">{role.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              className="lg:self-start inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all shadow-sm flex-shrink-0"
            >
              <span>How to Apply</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Meta Grid */}
          <div className="grid sm:grid-cols-3 gap-6 pt-6 mt-6 border-t border-gray-100">
            <div className="flex items-start gap-3.5 text-gray-700">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-0.5 flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Time Commitment</p>
                <p className="text-sm font-semibold text-gray-900 leading-snug">{role.timeCommitment}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-gray-700">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-0.5 flex-shrink-0">
                <Building className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Department & Location</p>
                <p className="text-sm font-semibold text-gray-900 leading-snug">{role.department}</p>
                <p className="text-xs text-gray-600 leading-normal">{role.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-gray-700">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-0.5 flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Best Suited For</p>
                <p className="text-sm font-semibold text-gray-900 leading-snug">{role.bestFor[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Prerequisite Readiness Assessment */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-200 p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Readiness & Prerequisite Self-Check</h2>
                <p className="text-sm text-gray-600 mt-0.5">Check off what you have completed so far to evaluate your eligibility</p>
              </div>
            </div>
            <div className="sm:text-right pl-11 sm:pl-0">
              <span className="text-sm font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {completedPrereqs} of {totalPrereqs} completed
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-6">
            <div 
              className={`h-full transition-all duration-300 ${
                isAllPrereqsMet ? 'bg-emerald-500' : 'bg-blue-600'
              }`}
              style={{ width: `${totalPrereqs > 0 ? (completedPrereqs / totalPrereqs) * 100 : 0}%` }}
            />
          </div>

          {/* Checklist items */}
          <div className="space-y-3 mb-6">
            {role.prerequisiteChecklist.map((item) => {
              const isChecked = checkedPrereqs.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePrereqCheck(item.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-50/80 border-emerald-300 text-gray-900'
                      : 'bg-gray-50/70 border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 text-sm leading-relaxed">
                    <span className={isChecked ? 'font-semibold text-emerald-950' : 'text-gray-800'}>
                      {item.label}
                    </span>
                    {item.courseCode && (
                      <span className="ml-2.5 inline-block px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-md font-semibold">
                        {item.courseCode}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic feedback banner */}
          <div className={`p-5 rounded-xl text-sm border leading-relaxed ${
            isAllPrereqsMet
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : completedPrereqs > 0
              ? 'bg-blue-50 border-blue-200 text-blue-950'
              : 'bg-gray-50 border-gray-200 text-gray-700'
          }`}>
            {isAllPrereqsMet ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-emerald-950 text-base">🎉 You meet all prerequisites for this position!</p>
                  <p className="text-xs text-emerald-800 mt-1">You are in an optimal position to apply on Handshake during the upcoming labor hiring cycle.</p>
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex-shrink-0 text-center shadow-xs"
                >
                  View Application Steps
                </button>
              </div>
            ) : completedPrereqs > 0 ? (
              <p>
                <strong>Nice progress!</strong> You have satisfied {completedPrereqs} out of {totalPrereqs} prerequisites. Plan to complete your remaining requirements next semester to qualify!
              </p>
            ) : (
              <p>
                <strong>Starting your path:</strong> Check the boxes above as you enroll in courses or gain experience. You can also explore roles with fewer prerequisites.
              </p>
            )}
          </div>
        </div>

        {/* Internship & Career Impact Highlight */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600 text-white rounded-xl flex-shrink-0 mt-0.5 shadow-2xs">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-blue-950 mb-1">How This Prepares You for Off-Campus Internships</h2>
                <p className="text-gray-800 text-sm leading-relaxed">{role.internshipAlignment}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider mr-1">Key Resume Skills:</span>
                {role.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white text-blue-800 rounded-lg text-xs font-semibold border border-blue-200/80 shadow-2xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Learning Outcomes & Skills */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* What You'll Learn */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">What you'll learn</h2>
            </div>
            <ul className="space-y-4">
              {role.whatYouLearn.map((item, idx) => (
                <li key={idx} className="flex items-start text-gray-700 text-sm leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Developed */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Skills you'll develop</h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {role.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 bg-purple-50 text-purple-700 font-semibold rounded-xl text-sm border border-purple-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5">Target Audience</p>
              <p className="text-sm text-gray-800 leading-relaxed font-medium">{role.bestFor.join(' · ')}</p>
            </div>
          </div>
        </div>

        {/* Who Typically Succeeds & Prerequisites Narrative */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Who typically succeeds in this role</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm mb-6">{role.typicalBackground}</p>
          
          <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            <div>
              <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-3">Prerequisites checklist</h3>
              <ul className="space-y-2.5">
                {role.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="text-emerald-600 font-bold text-base leading-none mt-0.5">✓</span>
                    <span className="leading-snug">{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-3">Best suited for</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{role.bestFor.join(' · ')}</p>
            </div>
          </div>
        </div>

        {/* Common Next Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Common next steps & career progression</h2>
          </div>
          <p className="text-gray-600 text-sm mb-5 leading-relaxed">
            Students who have worked in this labor position often move to:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {role.commonNextSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-4 bg-gray-50/80 rounded-xl border border-gray-100">
                <ArrowRight className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-800 leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why This Might Be a Good Fit */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-blue-950 mb-2">Why this role might work for you</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{role.whyGoodFit}</p>
        </div>

        {/* Explore Related Roles Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore related roles</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {otherRoles.map((otherRole) => (
              <Link
                key={otherRole.id}
                to={`/role/${otherRole.id}`}
                className="p-5 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-md font-semibold mb-2.5 inline-block">
                    {otherRole.category}
                  </span>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5 leading-snug">
                    {otherRole.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{otherRole.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                  <span>{otherRole.timeCommitment}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/explore"
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm underline"
            >
              Browse all 8 roles
            </Link>
            <button
              onClick={() => {
                const compareIds = [role.id, otherRoles[0]?.id].filter(Boolean);
                if (compareIds.length === 2) {
                  navigate(`/compare?roles=${compareIds.join(',')}`);
                }
              }}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-2xs"
            >
              <span>Compare with {otherRoles[0]?.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* HOW TO APPLY / NEXT STEPS MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-7 border-b border-gray-100 flex items-start justify-between sticky top-0 bg-white z-10">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">Application Guide & Next Steps</span>
                <h2 className="text-2xl font-extrabold text-gray-900">{role.title}</h2>
                <p className="text-sm text-gray-600">{role.department} · {role.location}</p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-7 space-y-7">
              {/* Step 1: Handshake Portal Box */}
              <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-6">
                <div>
                  <h3 className="font-bold text-blue-950 flex items-center gap-2 text-base">
                    <span>1. Check Berea Handshake Postings</span>
                  </h3>
                  <p className="text-sm text-blue-900 mt-1.5 leading-relaxed">
                    Berea College student labor openings are officially hosted on Handshake. Search with the pre-filtered term below:
                  </p>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href={handshakeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-sm transition-all text-center"
                  >
                    <span>Search Handshake for "{role.handshakeQuery}"</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <span className="text-xs text-gray-500 sm:text-left text-center leading-normal">
                    Requires Berea single sign-on (SSO)
                  </span>
                </div>
              </div>

              {/* Step 2: Hiring Timeline & Application Cycle */}
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>2. Hiring Timeline & Cycles</span>
                </h3>
                <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-sm text-emerald-950 space-y-1.5">
                  <p className="font-bold text-base">Typical Hiring Window: {role.hiringCycle}</p>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Departmental labor positions finalize rosters during registration week for the upcoming term. Submitting your interest early increases your placement chance.
                  </p>
                </div>
              </div>

              {/* Step 3: Required Materials */}
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>3. Prepare Required Materials</span>
                </h3>
                <ul className="space-y-3 text-sm text-gray-700 bg-gray-50/80 p-5 rounded-2xl border border-gray-200">
                  {role.applicationMaterials.map((material, idx) => (
                    <li key={idx} className="flex items-start text-sm leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step 4: Supervisor Contact & Department Outreach */}
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>4. Department Contact & Location</span>
                </h3>
                <div className="p-5 bg-gray-50/80 rounded-2xl border border-gray-200 text-sm text-gray-800 space-y-2">
                  <p><strong>Primary Contact:</strong> {role.contactPerson}</p>
                  <p><strong>Office / Facility:</strong> {role.location}</p>
                  <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200/60 leading-relaxed">
                    💡 <em>Pro-tip: If you don't see an active Handshake posting, visit or email the supervisor directly to inquire about future semester openings.</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 px-7 border-t border-gray-100 bg-gray-50 flex items-center justify-between rounded-b-3xl">
              <button
                type="button"
                onClick={toggleSaveRole}
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-blue-600" />
                    <span>Saved in My Pathway</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-gray-500" />
                    <span>Save to My Pathway</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="px-8 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-bold rounded-xl transition-all shadow-2xs min-w-[100px] text-center"
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
