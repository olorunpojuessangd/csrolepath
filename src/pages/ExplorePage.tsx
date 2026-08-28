import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roles } from '../data/roles';
import { CareerTrackId } from '../types/role';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { RoleCard } from '../components/roles/RoleCard';
import { RoleFilters } from '../components/roles/RoleFilters';
import { SavedRolesDrawer } from '../components/roles/SavedRolesDrawer';
import { Layers, Search } from 'lucide-react';
import { LiquidButton } from '../components/ui/liquid-glass-button';

export function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<CareerTrackId>('all');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [savedRoleIds, setSavedRoleIds] = useState<string[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState<any>(null);

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

  const toggleCompareSelection = (roleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const compareUrl = `/compare?roles=${selectedForCompare.join(',')}`;

  const filteredRoles = roles.filter(role => {
    const matchesSearch = 
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      role.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.handshakeQuery.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesTrack = true;
    if (selectedTrack === 'swe') {
      matchesTrack = role.id === 'software-dev-intern' || role.id === 'web-dev-assistant';
    } else if (selectedTrack === 'ai-data') {
      matchesTrack = role.id === 'data-assistant' || role.id === 'database-admin-assistant';
    } else if (selectedTrack === 'systems') {
      matchesTrack = role.id === 'it-support' || role.id === 'makerspace-lab-assistant' || role.id === 'database-admin-assistant';
    } else if (selectedTrack === 'teaching') {
      matchesTrack = role.id === 'teaching-assistant';
    } else if (selectedTrack === 'ux') {
      matchesTrack = role.id === 'ux-research-assistant' || role.id === 'web-dev-assistant';
    }

    const matchesBeginner = !onlyBeginnerFriendly || 
      role.bestFor.some(bf => bf.toLowerCase().includes('first-year') || bf.toLowerCase().includes('beginner')) ||
      role.prerequisites.some(p => p.toLowerCase().includes('none') || p.toLowerCase().includes('open'));

    const matchesInternship = !onlyInternshipAligned || 
      role.category === 'Development' || 
      role.category === 'Research & Analysis' || 
      role.commonNextSteps.some(s => s.toLowerCase().includes('internship') || s.toLowerCase().includes('engineer'));

    const matchesHours = !onlyLightHours || 
      role.secondaryEligible || 
      role.timeCommitment.includes('5 hrs') ||
      !role.isLeadStructure;

    const matchesSaved = !onlySaved || savedRoleIds.includes(role.id);

    return matchesSearch && matchesTrack && matchesBeginner && matchesInternship && matchesHours && matchesSaved;
  });

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTrack('all');
    setOnlyBeginnerFriendly(false);
    setOnlyInternshipAligned(false);
    setOnlyLightHours(false);
    setOnlySaved(false);
  };

  const savedRoles = roles.filter(r => savedRoleIds.includes(r.id));

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-200">
      <Navbar
        savedCount={savedRoleIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
      />

      <main className="max-w-[1140px] mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Explore CS & IT Roles
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 mt-1 text-sm">
            {userPreferences 
              ? `Showing ${filteredRoles.length} roles prioritized for your background.`
              : `Browse all ${filteredRoles.length} campus labor positions across CS and ITS.`
            }
          </p>

          {/* User Preferences Context Strip */}
          {userPreferences && (
            <div className="mt-3 p-3.5 px-4 rounded-2xl liquid-card border border-blue-500/20 dark:border-blue-400/30 flex items-center justify-between text-xs shadow-xs">
              <span className="text-zinc-700 dark:text-zinc-200">
                <strong className="text-blue-600 dark:text-blue-400">Personalized for:</strong> {userPreferences.year}
                {userPreferences.goals?.length > 0 && ` · ${userPreferences.goals.length} goal(s)`}
              </span>
              <Link to="/onboarding" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Edit
              </Link>
            </div>
          )}
        </div>

        {/* Filters */}
        <RoleFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTrack={selectedTrack}
          onTrackChange={setSelectedTrack}
          onlyBeginnerFriendly={onlyBeginnerFriendly}
          onToggleBeginner={() => setOnlyBeginnerFriendly(!onlyBeginnerFriendly)}
          onlyInternshipAligned={onlyInternshipAligned}
          onToggleInternship={() => setOnlyInternshipAligned(!onlyInternshipAligned)}
          onlyLightHours={onlyLightHours}
          onToggleLightHours={() => setOnlyLightHours(!onlyLightHours)}
          onlySaved={onlySaved}
          onToggleSaved={() => setOnlySaved(!onlySaved)}
          savedCount={savedRoleIds.length}
          onClearAllFilters={clearAllFilters}
        />

        {/* Floating Compare Bar */}
        {selectedForCompare.length > 0 && (
          <div className="sticky top-20 z-30 mb-8 p-3.5 px-5 rounded-3xl bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-100 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.08),0_0_20px_rgba(59,130,246,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.25)] flex items-center justify-between gap-4 transition-all duration-200">
            <div className="flex items-center gap-2.5 text-xs">
              <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-zinc-950 dark:text-white">Compare Roles:</span>
              <span className="text-zinc-500 dark:text-zinc-400">{selectedForCompare.length} of 3 selected</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedForCompare([])}
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white underline cursor-pointer font-medium"
              >
                Clear
              </button>

              {selectedForCompare.length >= 2 ? (
                <Link
                  to={compareUrl}
                  className="inline-flex items-center justify-center h-8 px-3.5 text-xs rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20"
                >
                  Compare ({selectedForCompare.length})
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="px-4 py-1.5 rounded-xl text-xs font-medium bg-black/5 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed border border-black/5 dark:border-white/5"
                >
                  Select 2+ to compare
                </button>
              )}
            </div>
          </div>
        )}

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role, idx) => (
            <RoleCard
              key={role.id}
              role={role}
              index={idx}
              isSaved={savedRoleIds.includes(role.id)}
              isSelectedForCompare={selectedForCompare.includes(role.id)}
              onToggleSave={toggleSaveRole}
              onToggleCompare={toggleCompareSelection}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredRoles.length === 0 && (
          <div className="text-center py-16 liquid-card rounded-3xl p-8 border border-black/5 dark:border-white/10 max-w-md mx-auto shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 border border-blue-500/20 shadow-xs">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-1">No matching roles found</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Try resetting your search query or track filters.</p>
            
            <LiquidButton
              variant="default"
              size="sm"
              onClick={clearAllFilters}
              className="text-blue-600 dark:text-blue-400 font-medium"
            >
              Reset Filters
            </LiquidButton>
          </div>
        )}

      </main>

      <SavedRolesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedRoles={savedRoles}
        onRemoveRole={toggleSaveRole}
      />

      <Footer />
    </div>
  );
}
