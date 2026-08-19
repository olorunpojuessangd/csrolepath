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
  Clock, 
  Calendar, 
  Layers,
  X
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
        return [...prev.slice(1), roleId];
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

  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (!userPreferences) return 0;
    
    let scoreA = 0;
    let scoreB = 0;

    if (userPreferences.year === 'First-year' || userPreferences.year === 'Sophomore') {
      if (a.bestFor.some((bf: string) => bf.toLowerCase().includes('first-year'))) scoreA += 3;
      if (b.bestFor.some((bf: string) => bf.toLowerCase().includes('first-year'))) scoreB += 3;
    }

    if (userPreferences.goals?.includes('internship')) {
      if (a.id === 'software-dev-intern' || a.id === 'web-dev-assistant' || a.id === 'database-admin-assistant') scoreA += 4;
      if (b.id === 'software-dev-intern' || b.id === 'web-dev-assistant' || b.id === 'database-admin-assistant') scoreB += 4;
    }

    if (userPreferences.goals?.includes('grad')) {
      if (a.id === 'data-assistant' || a.id === 'teaching-assistant' || a.id === 'ux-research-assistant') scoreA += 4;
      if (b.id === 'data-assistant' || b.id === 'teaching-assistant' || b.id === 'ux-research-assistant') scoreB += 4;
    }

    if (userPreferences.constraints === 'limited-experience' || userPreferences.constraints === 'first-job') {
      if (a.prerequisites.length <= 2) scoreA += 2;
      if (b.prerequisites.length <= 2) scoreB += 2;
    }

    return scoreB - scoreA;
  });

  const savedRolesList = roles.filter(r => savedRoleIds.includes(r.id));

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <Navigation 
        savedCount={savedRoleIds.length} 
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)} 
      />

      {/* Global 1120px centered container (Priority 3 & Layout Rule) */}
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header (No duplicate My Saved Pathway button - Priority 5) */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-2xl font-semibold text-[#0A0E14] tracking-tight">
            Explore CS & IT Labor Roles
          </h1>
          <p className="text-[#6B7280] mt-1 text-sm">
            {userPreferences 
              ? `Showing ${sortedRoles.length} roles prioritized for your profile.`
              : `Browse all ${sortedRoles.length} student labor positions in the CS and IT departments.`
            }
          </p>

          {/* User Preferences Context Strip */}
          {userPreferences && (
            <div className="mt-3 bg-[#EEF0FF] border border-[#D0D5DD] rounded-[6px] px-3.5 py-2 flex items-center justify-between gap-3 text-xs text-[#3D4451]">
              <p>
                <strong className="font-semibold text-[#4F46E5]">Personalized for:</strong> {userPreferences.year}
                {userPreferences.goals?.length > 0 && ` · ${userPreferences.goals.length} goal(s)`}
                {userPreferences.constraints && userPreferences.constraints !== 'none' && ` · ${userPreferences.constraints}`}
              </p>
              <Link
                to="/onboarding"
                className="text-[#4F46E5] font-medium hover:underline flex-shrink-0"
              >
                Edit
              </Link>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] shadow-[0_1px_2px_rgba(10,14,20,0.04)] p-4 sm:p-5 mb-6">
          {/* Search bar */}
          <div className="relative mb-3.5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] w-4 h-4" />
            <input
              type="text"
              placeholder="Search by role title, skill (Python, SQL), or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-10 py-2 border border-[#D0D5DD] rounded-[6px] text-sm text-[#0A0E14] placeholder-[#6B7280] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] bg-[#FFFFFF] transition-colors"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#6B7280] hover:text-[#0A0E14]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#6B7280] mr-1">
              Category:
            </span>
            {categories.map(category => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-[#EEF0FF] text-[#4F46E5] border border-[#4F46E5]'
                      : 'bg-[#F3F4F6] text-[#3D4451] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="text-xs text-[#4F46E5] hover:underline font-medium ml-1"
              >
                Reset
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-[#D0D5DD]/50 text-xs">
            <span className="font-medium uppercase tracking-wider text-[#6B7280] mr-1">
              Filter:
            </span>
            
            <button
              onClick={() => setOnlyBeginnerFriendly(!onlyBeginnerFriendly)}
              className={`px-2.5 py-1 rounded-[6px] font-medium transition-colors ${
                onlyBeginnerFriendly
                  ? 'bg-[#DCFCE7] text-[#15803D] border border-[#15803D]'
                  : 'bg-[#F3F4F6] text-[#3D4451] hover:bg-[#E5E7EB]'
              }`}
            >
              Beginner Friendly
            </button>

            <button
              onClick={() => setOnlyInternshipAligned(!onlyInternshipAligned)}
              className={`px-2.5 py-1 rounded-[6px] font-medium transition-colors ${
                onlyInternshipAligned
                  ? 'bg-[#EEF0FF] text-[#4F46E5] border border-[#4F46E5]'
                  : 'bg-[#F3F4F6] text-[#3D4451] hover:bg-[#E5E7EB]'
              }`}
            >
              Internship Focused
            </button>

            <button
              onClick={() => setOnlyLightHours(!onlyLightHours)}
              className={`px-2.5 py-1 rounded-[6px] font-medium transition-colors ${
                onlyLightHours
                  ? 'bg-[#EEF0FF] text-[#4F46E5] border border-[#4F46E5]'
                  : 'bg-[#F3F4F6] text-[#3D4451] hover:bg-[#E5E7EB]'
              }`}
            >
              Under 10 hrs/week
            </button>

            {savedRoleIds.length > 0 && (
              <button
                onClick={() => setOnlySaved(!onlySaved)}
                className={`px-2.5 py-1 rounded-[6px] font-medium transition-colors ${
                  onlySaved
                    ? 'bg-[#EEF0FF] text-[#4F46E5] border border-[#4F46E5]'
                    : 'bg-[#F3F4F6] text-[#3D4451] hover:bg-[#E5E7EB]'
                }`}
              >
                Saved ({savedRoleIds.length})
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
                className="text-xs text-[#6B7280] hover:text-[#0A0E14] underline ml-1 font-normal"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Sticky Compare Bar */}
        {selectedForCompare.length > 0 && (
          <div className="sticky top-16 z-30 mb-6 bg-[#0A0E14] text-white rounded-[8px] p-3.5 px-4 shadow-[0_2px_8px_rgba(10,14,20,0.08)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <Layers className="w-4 h-4 text-[#EEF0FF]" />
              <span className="font-semibold text-white">Compare Roles:</span>
              <span className="text-[#D0D5DD]">{selectedForCompare.length} of 3 selected</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedForCompare([])}
                className="text-xs text-[#D0D5DD] hover:text-white underline"
              >
                Clear
              </button>
              <button
                onClick={handleCompare}
                disabled={selectedForCompare.length < 2}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors ${
                  selectedForCompare.length >= 2
                    ? 'bg-[#4F46E5] text-white hover:bg-[#6366F1]'
                    : 'bg-[#3D4451] text-[#6B7280] cursor-not-allowed'
                }`}
              >
                Compare ({selectedForCompare.length})
              </button>
            </div>
          </div>
        )}

        {/* Responsive Role Cards Grid (Section 2 & Priority 2) */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-5">
          {sortedRoles.map((role) => {
            const isSelectedForCompare = selectedForCompare.includes(role.id);
            const isRoleSaved = savedRoleIds.includes(role.id);
            const isBeginner = role.bestFor.some(bf => bf.toLowerCase().includes('first-year') || bf.toLowerCase().includes('beginner'));

            return (
              <div
                key={role.id}
                onClick={() => navigate(`/role/${role.id}`)}
                className={`bg-[#FFFFFF] rounded-[8px] border transition-all duration-150 cursor-pointer flex flex-col justify-between overflow-hidden shadow-[0_1px_2px_rgba(10,14,20,0.04)] hover:shadow-[0_2px_8px_rgba(10,14,20,0.08)] hover:border-[#6366F1] ${
                  isSelectedForCompare ? 'border-[#4F46E5] ring-2 ring-[#EEF0FF]' : 'border-[#D0D5DD]'
                }`}
              >
                {/* Internal padding 20px (--space-5) */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  {/* TIER 1: Category, status badge, quiet icons */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#3D4451] rounded-[6px] text-xs font-medium">
                          {role.category}
                        </span>
                        {isBeginner && (
                          <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] rounded-[6px] text-xs font-medium">
                            Beginner
                          </span>
                        )}
                      </div>

                      {/* Quiet Top-Right Action Icons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => toggleSaveRole(role.id, e)}
                          className="p-1 text-[#6B7280] hover:text-[#4F46E5] rounded-[4px] hover:bg-[#F3F4F6] transition-colors"
                          title={isRoleSaved ? "Remove from saved" : "Save role"}
                          aria-label="Save role"
                        >
                          {isRoleSaved ? (
                            <BookmarkCheck className="w-4 h-4 text-[#4F46E5]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={(e) => toggleCompareSelection(role.id, e)}
                          className="p-1 text-[#6B7280] hover:text-[#0A0E14] rounded-[4px] hover:bg-[#F3F4F6] transition-colors"
                          aria-label="Select for comparison"
                          title={isSelectedForCompare ? "Remove from comparison" : "Add to comparison"}
                        >
                          {isSelectedForCompare ? (
                            <CheckSquare className="w-4 h-4 text-[#4F46E5]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* TIER 1: Title & Hours */}
                    <h2 className="text-lg font-semibold text-[#0A0E14] tracking-tight leading-snug mb-1">
                      {role.title}
                    </h2>
                    
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-3">
                      <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                      <span className="font-normal text-[#3D4451]">{role.timeCommitment}</span>
                    </div>

                    {/* TIER 2: Truncated description */}
                    <p className="text-sm text-[#3D4451] line-clamp-2 leading-relaxed mb-3">
                      {role.description}
                    </p>

                    {/* TIER 2: 2–3 skill pills max (no +N clutter) */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {role.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#F3F4F6] text-[#3D4451] rounded-[6px] text-xs font-normal"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* TIER 3: Hiring window meta row */}
                  <div className="pt-2.5 border-t border-[#D0D5DD]/40 flex items-center justify-between text-xs text-[#6B7280]">
                    <div className="flex items-center gap-1.5 truncate">
                      <Calendar className="w-3.5 h-3.5 text-[#6B7280] flex-shrink-0" />
                      <span className="truncate">{role.hiringCycle}</span>
                    </div>
                    <span className="text-[11px] text-[#6B7280] flex-shrink-0">
                      {role.prerequisiteChecklist.length} prereq{role.prerequisiteChecklist.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>

                {/* FULL-WIDTH BOTTOM CTA STRIP (Section 2) */}
                <div className="px-5 py-2.5 bg-[#F3F4F6] border-t border-[#D0D5DD] flex items-center justify-end text-xs font-medium text-[#4F46E5]">
                  <span className="flex items-center gap-1">
                    <span>View Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {sortedRoles.length === 0 && (
          <div className="text-center py-12 bg-[#FFFFFF] rounded-[8px] border border-[#D0D5DD] p-6">
            <p className="text-sm font-semibold text-[#0A0E14] mb-1">No matching roles found</p>
            <p className="text-xs text-[#6B7280] mb-4">Try clearing your search query or filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategories([]);
                setOnlyBeginnerFriendly(false);
                setOnlyInternshipAligned(false);
                setOnlyLightHours(false);
                setOnlySaved(false);
              }}
              className="px-3.5 py-1.5 bg-[#4F46E5] text-white rounded-[6px] text-xs font-medium hover:bg-[#6366F1] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* MY SAVED PATHWAY DRAWER */}
      {isSavedDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] w-full max-w-md h-full shadow-lg flex flex-col justify-between border-l border-[#D0D5DD]">
            <div className="p-4 px-5 border-b border-[#D0D5DD] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-[#4F46E5]" />
                <h2 className="text-base font-semibold text-[#0A0E14]">My Saved Pathway</h2>
              </div>
              <button
                onClick={() => setIsSavedDrawerOpen(false)}
                className="p-1 text-[#6B7280] hover:text-[#0A0E14] rounded-[6px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-3">
              {savedRolesList.length === 0 ? (
                <div className="text-center py-16 text-[#6B7280]">
                  <Bookmark className="w-8 h-8 text-[#D0D5DD] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#0A0E14]">No saved roles yet</p>
                  <p className="text-xs text-[#6B7280] mt-1 max-w-xs mx-auto">
                    Click the bookmark icon on any card to save it to your pathway.
                  </p>
                </div>
              ) : (
                savedRolesList.map((savedRole) => (
                  <div 
                    key={savedRole.id}
                    className="p-4 border border-[#D0D5DD] rounded-[8px] bg-[#FFFFFF] flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <span className="text-[10px] font-medium text-[#6B7280] uppercase tracking-wider">{savedRole.category}</span>
                        <h3 className="font-semibold text-[#0A0E14] text-sm mt-0.5">{savedRole.title}</h3>
                      </div>
                      <button
                        onClick={(e) => toggleSaveRole(savedRole.id, e)}
                        className="text-xs text-[#6B7280] hover:text-red-600 font-normal"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-[#3D4451] line-clamp-2 mb-3">{savedRole.description}</p>
                    
                    <div className="flex items-center justify-between pt-2.5 border-t border-[#D0D5DD]/40 text-xs">
                      <Link
                        to={`/role/${savedRole.id}`}
                        onClick={() => setIsSavedDrawerOpen(false)}
                        className="text-[#4F46E5] font-medium hover:underline"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={(e) => {
                          toggleCompareSelection(savedRole.id, e);
                          setIsSavedDrawerOpen(false);
                        }}
                        className="text-[#6B7280] hover:text-[#0A0E14] font-normal"
                      >
                        {selectedForCompare.includes(savedRole.id) ? "In Compare" : "+ Compare"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-[#D0D5DD] bg-[#FAFAFA]">
              {savedRolesList.length >= 2 ? (
                <button
                  onClick={() => {
                    setIsSavedDrawerOpen(false);
                    navigate(`/compare?roles=${savedRolesList.slice(0, 3).map(r => r.id).join(',')}`);
                  }}
                  className="w-full py-2 bg-[#4F46E5] text-white rounded-[6px] text-xs font-medium hover:bg-[#6366F1] transition-colors"
                >
                  Compare Saved Roles ({savedRolesList.length})
                </button>
              ) : (
                <button
                  onClick={() => setIsSavedDrawerOpen(false)}
                  className="w-full py-2 bg-[#FFFFFF] border border-[#D0D5DD] text-[#3D4451] rounded-[6px] text-xs font-medium hover:bg-[#F3F4F6]"
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
