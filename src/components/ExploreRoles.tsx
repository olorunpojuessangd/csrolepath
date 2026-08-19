import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { roles, Role } from '../data/roles';
import { 
  Search, 
  Filter, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  X, 
  Clock, 
  Briefcase, 
  Calendar, 
  Layers, 
  GraduationCap,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import Navigation from './Navigation';

export default function ExploreRoles() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [savedRoleIds, setSavedRoleIds] = useState<string[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [justPoppedId, setJustPoppedId] = useState<string | null>(null);

  // Quick filters
  const [onlyBeginnerFriendly, setOnlyBeginnerFriendly] = useState(false);
  const [onlyInternshipAligned, setOnlyInternshipAligned] = useState(false);
  const [onlyLightHours, setOnlyLightHours] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);

  useEffect(() => {
    const prefs = sessionStorage.getItem('userPreferences');
    if (prefs) {
      try {
        setUserPreferences(JSON.parse(prefs));
      } catch (e) {
        console.error(e);
      }
    }

    const saved = localStorage.getItem('savedRoleIds');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSavedRoleIds(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleSaveRole = (roleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (savedRoleIds.includes(roleId)) {
      updated = savedRoleIds.filter(id => id !== roleId);
    } else {
      updated = [...savedRoleIds, roleId];
      // Trigger subtle pop animation
      setJustPoppedId(roleId);
      setTimeout(() => setJustPoppedId(null), 400);
    }
    setSavedRoleIds(updated);
    localStorage.setItem('savedRoleIds', JSON.stringify(updated));
  };

  const categories = Array.from(new Set(roles.map(r => r.category)));

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleCompareSelection = (roleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedForCompare(prev => {
      if (prev.includes(roleId)) {
        return prev.filter(id => id !== roleId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), roleId]; // Allow up to 3 roles
      }
      return [...prev, roleId];
    });
  };

  const handleCompare = () => {
    if (selectedForCompare.length >= 2) {
      navigate(`/compare?roles=${selectedForCompare.join(',')}`);
    }
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = 
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      role.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.handshakeQuery.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(role.category);

    const matchesBeginner = !onlyBeginnerFriendly || 
      role.bestFor.some(bf => bf.toLowerCase().includes('first-year') || bf.toLowerCase().includes('beginner')) ||
      role.prerequisites.some(p => p.toLowerCase().includes('none') || p.toLowerCase().includes('open'));

    const matchesInternship = !onlyInternshipAligned || 
      role.category === 'Development' || 
      role.category === 'Research & Analysis' || 
      role.commonNextSteps.some(s => s.toLowerCase().includes('internship') || s.toLowerCase().includes('engineer'));

    const matchesHours = !onlyLightHours || 
      role.timeCommitment.includes('6-8') || 
      role.timeCommitment.includes('8-10') || 
      role.timeCommitment.includes('6-10');

    const matchesSaved = !onlySaved || savedRoleIds.includes(role.id);

    return matchesSearch && matchesCategory && matchesBeginner && matchesInternship && matchesHours && matchesSaved;
  });

  // Sort to prioritize roles matching user preferences
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (!userPreferences) return 0;
    
    let scoreA = 0;
    let scoreB = 0;

    // Boost roles matching year level
    if (userPreferences.year === 'First-year' || userPreferences.year === 'Sophomore') {
      if (a.bestFor.some((bf: string) => bf.toLowerCase().includes('first-year'))) scoreA += 3;
      if (b.bestFor.some((bf: string) => bf.toLowerCase().includes('first-year'))) scoreB += 3;
    }

    // Boost based on goals
    if (userPreferences.goals?.includes('internship')) {
      if (a.id === 'software-dev-intern' || a.id === 'web-dev-assistant' || a.id === 'database-admin-assistant') scoreA += 4;
      if (b.id === 'software-dev-intern' || b.id === 'web-dev-assistant' || b.id === 'database-admin-assistant') scoreB += 4;
    }

    if (userPreferences.goals?.includes('grad')) {
      if (a.id === 'data-assistant' || a.id === 'teaching-assistant' || a.id === 'ux-research-assistant') scoreA += 4;
      if (b.id === 'data-assistant' || b.id === 'teaching-assistant' || b.id === 'ux-research-assistant') scoreB += 4;
    }

    // Boost based on constraints
    if (userPreferences.constraints === 'limited-experience' || userPreferences.constraints === 'first-job') {
      if (a.prerequisites.length <= 2) scoreA += 2;
      if (b.prerequisites.length <= 2) scoreB += 2;
    }

    return scoreB - scoreA;
  });

  const savedRolesList = roles.filter(r => savedRoleIds.includes(r.id));

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-28">
      <Navigation 
        savedCount={savedRoleIds.length} 
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)} 
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Berea CS Labor Ecosystem</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore CS & IT Labor Roles
              </h1>
              <p className="text-slate-600 mt-1.5 text-sm sm:text-base">
                {userPreferences 
                  ? `Showing ${sortedRoles.length} roles prioritized for your academic year and career goals.`
                  : `Browse all ${sortedRoles.length} transparent labor pathways at Berea College.`
                }
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSavedDrawerOpen(true)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all active:scale-95 shadow-xs ${
                  savedRoleIds.length > 0
                    ? 'bg-blue-600 border-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <BookmarkCheck className={`w-4 h-4 ${savedRoleIds.length > 0 ? 'text-white' : 'text-slate-400'}`} />
                <span>My Saved Pathway ({savedRoleIds.length})</span>
              </button>
            </div>
          </div>

          {/* User Preferences Banner */}
          {userPreferences && (
            <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-purple-50/90 border border-blue-200/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <p className="text-slate-900 text-xs sm:text-sm leading-relaxed">
                  <strong className="font-bold text-blue-950">Personalized for:</strong> {userPreferences.year} · {userPreferences.goals?.length || 0} goal(s) selected
                  {userPreferences.constraints && userPreferences.constraints !== 'none' && ` · ${userPreferences.constraints}`}
                </p>
              </div>
              <Link
                to="/onboarding"
                className="text-xs text-blue-700 font-bold hover:text-blue-950 px-3.5 py-1.5 bg-white rounded-xl border border-blue-200/80 shadow-2xs active:scale-95 transition-transform self-start sm:self-auto"
              >
                Edit Preferences
              </Link>
            </div>
          )}
        </div>

        {/* Search and Filters Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-7 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search by role title, skills (Python, SQL, HTML), department, or Handshake query..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-12 py-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm placeholder:text-slate-400 transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 px-2 py-1 bg-slate-200/70 rounded-lg active:scale-90 transition-transform"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <div className="flex items-center gap-1.5 text-slate-400 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Categories:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                  selectedCategories.includes(category)
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {category}
              </button>
            ))}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="text-xs text-blue-600 underline font-bold ml-1.5 hover:text-blue-800"
              >
                Reset
              </button>
            )}
          </div>

          {/* Quick Attribute Toggles */}
          <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1 text-slate-400 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider text-[11px]">Quick Filters:</span>
            </div>
            
            <button
              onClick={() => setOnlyBeginnerFriendly(!onlyBeginnerFriendly)}
              className={`px-3 py-1.5 rounded-xl border font-semibold transition-all active:scale-95 ${
                onlyBeginnerFriendly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              🌱 Beginner Friendly
            </button>

            <button
              onClick={() => setOnlyInternshipAligned(!onlyInternshipAligned)}
              className={`px-3 py-1.5 rounded-xl border font-semibold transition-all active:scale-95 ${
                onlyInternshipAligned
                  ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              💼 Internship Focused
            </button>

            <button
              onClick={() => setOnlyLightHours(!onlyLightHours)}
              className={`px-3 py-1.5 rounded-xl border font-semibold transition-all active:scale-95 ${
                onlyLightHours
                  ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ⏱️ Under 10 hrs/week
            </button>

            {savedRoleIds.length > 0 && (
              <button
                onClick={() => setOnlySaved(!onlySaved)}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition-all active:scale-95 ${
                  onlySaved
                    ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                ⭐ Saved ({savedRoleIds.length})
              </button>
            )}

            {(onlyBeginnerFriendly || onlyInternshipAligned || onlyLightHours || onlySaved) && (
              <button
                onClick={() => {
                  setOnlyBeginnerFriendly(false);
                  setOnlyInternshipAligned(false);
                  setOnlyLightHours(false);
                  setOnlySaved(false);
                }}
                className="text-xs text-slate-400 underline ml-2 hover:text-slate-700 font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Floating Glassmorphic Compare Bar */}
        {selectedForCompare.length > 0 && (
          <div className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 max-w-xl w-full">
            <div className="bg-slate-900/90 text-white rounded-2xl p-4 sm:p-4.5 shadow-2xl backdrop-blur-md border border-slate-700/80 flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Role Comparison</div>
                  <div className="text-sm font-semibold text-white">
                    {selectedForCompare.length} of 3 selected
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedForCompare([])}
                  className="text-xs text-slate-400 hover:text-white underline font-medium px-2 py-1"
                >
                  Clear
                </button>
                <button
                  onClick={handleCompare}
                  disabled={selectedForCompare.length < 2}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                    selectedForCompare.length >= 2
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Compare ({selectedForCompare.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {sortedRoles.map((role) => {
            const isSelectedForCompare = selectedForCompare.includes(role.id);
            const isRoleSaved = savedRoleIds.includes(role.id);
            const isPopping = justPoppedId === role.id;
            
            // Determine match badges
            const isBeginner = role.bestFor.some(bf => bf.toLowerCase().includes('first-year') || bf.toLowerCase().includes('beginner'));
            const isInternshipMatch = userPreferences?.goals?.includes('internship') && (role.category === 'Development' || role.category === 'Research & Analysis');
            const isGradMatch = userPreferences?.goals?.includes('grad') && (role.id === 'data-assistant' || role.id === 'teaching-assistant' || role.id === 'ux-research-assistant');

            return (
              <div
                key={role.id}
                onClick={() => navigate(`/role/${role.id}`)}
                className={`bg-white rounded-3xl shadow-xs border transition-all duration-200 cursor-pointer active:scale-[0.985] hover:shadow-xl hover:border-blue-300/80 flex flex-col justify-between group overflow-hidden ${
                  isSelectedForCompare ? 'border-blue-600 ring-4 ring-blue-100 shadow-md' : 'border-slate-200/80'
                }`}
              >
                <div className="p-6 sm:p-8">
                  {/* Card Top Badges & Actions */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100/80">
                        {role.category}
                      </span>
                      {isInternshipMatch && (
                        <span className="px-2.5 py-1 bg-purple-50 text-purple-800 rounded-full text-xs font-semibold flex items-center gap-1 border border-purple-100">
                          <Briefcase className="w-3 h-3 text-purple-600" />
                          Internship Match
                        </span>
                      )}
                      {isGradMatch && (
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-800 rounded-full text-xs font-semibold flex items-center gap-1 border border-indigo-100">
                          <GraduationCap className="w-3 h-3 text-indigo-600" />
                          Grad Prep
                        </span>
                      )}
                      {isBeginner && (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold border border-emerald-100">
                          🌱 Beginner Friendly
                        </span>
                      )}
                    </div>

                    {/* Action buttons (Bookmark & Compare) */}
                    <div className="flex items-center gap-1.5 -mr-1">
                      <button
                        onClick={(e) => toggleSaveRole(role.id, e)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-80 ${
                          isRoleSaved 
                            ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                            : 'bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-slate-100'
                        } ${isPopping ? 'animate-bookmark-pop' : ''}`}
                        title={isRoleSaved ? "Remove from saved pathway" : "Save to my pathway"}
                        aria-label="Save role"
                      >
                        {isRoleSaved ? (
                          <BookmarkCheck className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={(e) => toggleCompareSelection(role.id, e)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-80 ${
                          isSelectedForCompare
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                        aria-label="Select for comparison"
                        title={isSelectedForCompare ? "Remove from comparison" : "Add to comparison"}
                      >
                        {isSelectedForCompare ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 tracking-tight">
                    {role.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Skills Preview */}
                  <div className="mb-5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Skills you'll develop:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-100/80 text-slate-700 rounded-xl text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                      {role.skills.length > 4 && (
                        <span className="px-2 py-1 text-slate-400 text-xs font-medium self-center">
                          +{role.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prerequisites Preview */}
                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Prerequisites:</p>
                    <ul className="space-y-1.5">
                      {role.prerequisites.slice(0, 2).map((prereq, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-700 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2.5 flex-shrink-0" />
                          <span>{prereq}</span>
                        </li>
                      ))}
                      {role.prerequisites.length > 2 && (
                        <li className="text-slate-400 text-xs italic pl-4 pt-0.5">
                          +{role.prerequisites.length - 2} more in details
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Hiring Cycle & Department */}
                  <div className="flex items-center gap-2.5 text-xs text-emerald-900 leading-relaxed">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold truncate">Hiring Window: {role.hiringCycle}</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 px-6 sm:px-8 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-6 h-6 rounded-md bg-slate-200/70 text-slate-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-3 h-3" />
                    </div>
                    <span className="font-medium truncate">{role.timeCommitment}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700">
                    <span>View Role</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {sortedRoles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-2">No matching labor roles found</h3>
            <p className="text-sm text-slate-600 mb-5 max-w-md mx-auto leading-relaxed">
              We couldn't find roles matching your current search and filter combination.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategories([]);
                setOnlyBeginnerFriendly(false);
                setOnlyInternshipAligned(false);
                setOnlyLightHours(false);
                setOnlySaved(false);
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-xs active:scale-95"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* MY SAVED PATHWAY DRAWER */}
      {isSavedDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-6 sm:p-7 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <BookmarkCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">My Saved Pathway</h2>
                  <p className="text-xs text-slate-400">{savedRolesList.length} shortlisted role(s)</p>
                </div>
              </div>
              <button
                onClick={() => setIsSavedDrawerOpen(false)}
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Saved Roles List */}
            <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-4">
              {savedRolesList.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-300 flex items-center justify-center mx-auto mb-3">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <p className="text-base font-bold text-slate-800">No saved roles yet</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xs mx-auto">
                    Click the bookmark ribbon on any role card to curate your 4-year labor pathway!
                  </p>
                </div>
              ) : (
                <>
                  {savedRolesList.map((savedRole) => (
                    <div 
                      key={savedRole.id}
                      className="p-5 border border-slate-200/80 rounded-2xl hover:border-blue-300 bg-slate-50/50 flex flex-col justify-between shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{savedRole.category}</span>
                          <h4 className="font-bold text-slate-900 text-base mt-0.5">{savedRole.title}</h4>
                        </div>
                        <button
                          onClick={(e) => toggleSaveRole(savedRole.id, e)}
                          className="text-xs text-slate-400 hover:text-red-600 font-semibold px-2 py-1 rounded-lg hover:bg-red-50"
                          title="Remove from saved"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">{savedRole.description}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
                        <Link
                          to={`/role/${savedRole.id}`}
                          onClick={() => setIsSavedDrawerOpen(false)}
                          className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={(e) => {
                            toggleCompareSelection(savedRole.id, e);
                            setIsSavedDrawerOpen(false);
                          }}
                          className="text-slate-600 hover:text-slate-900 underline font-medium"
                        >
                          {selectedForCompare.includes(savedRole.id) ? "In Compare" : "Add to Compare"}
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-5 px-7 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              {savedRolesList.length >= 2 ? (
                <button
                  onClick={() => {
                    setIsSavedDrawerOpen(false);
                    navigate(`/compare?roles=${savedRolesList.slice(0, 3).map(r => r.id).join(',')}`);
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all text-center shadow-sm active:scale-95"
                >
                  Compare All Saved Roles ({savedRolesList.length})
                </button>
              ) : (
                <button
                  onClick={() => setIsSavedDrawerOpen(false)}
                  className="w-full py-2.5 bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold hover:bg-slate-300 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
