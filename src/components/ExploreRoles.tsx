import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { roles } from '../data/roles';
import { Search, Filter, CheckSquare, Square, ArrowRight } from 'lucide-react';

export default function ExploreRoles() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  useEffect(() => {
    const prefs = sessionStorage.getItem('userPreferences');
    if (prefs) {
      setUserPreferences(JSON.parse(prefs));
    }
  }, []);

  const categories = Array.from(new Set(roles.map(r => r.category)));

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleCompareSelection = (roleId: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(roleId)) {
        return prev.filter(id => id !== roleId);
      }
      if (prev.length >= 2) {
        return [...prev.slice(1), roleId]; // Replace oldest selection
      }
      return [...prev, roleId];
    });
  };

  const handleCompare = () => {
    if (selectedForCompare.length === 2) {
      navigate(`/compare?roles=${selectedForCompare.join(',')}`);
    }
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = 
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(role.category);

    return matchesSearch && matchesCategory;
  });

  // Sort to prioritize roles matching user preferences
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (!userPreferences) return 0;
    
    let scoreA = 0;
    let scoreB = 0;

    // Boost roles matching year level
    if (userPreferences.year === 'First-year' || userPreferences.year === 'Sophomore') {
      if (a.bestFor.some((bf: string) => bf.toLowerCase().includes('first-year'))) scoreA += 2;
      if (b.bestFor.some((bf: string) => bf.toLowerCase().includes('first-year'))) scoreB += 2;
    }

    // Boost based on constraints
    if (userPreferences.constraints === 'limited-experience') {
      if (a.prerequisites.length <= 2) scoreA += 1;
      if (b.prerequisites.length <= 2) scoreB += 1;
    }

    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl mb-2 text-gray-900">Explore Roles</h1>
              <p className="text-gray-600">
                {userPreferences 
                  ? `Showing ${sortedRoles.length} roles. Results prioritized based on your preferences.`
                  : `Browse ${sortedRoles.length} available CS labor roles.`
                }
              </p>
            </div>
            <Link 
              to="/"
              className="text-gray-600 hover:text-gray-900 underline"
            >
              Back to home
            </Link>
          </div>

          {userPreferences && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-blue-900">
                <strong>Your preferences:</strong> {userPreferences.year} · {userPreferences.goals.length} goal(s) selected
                {userPreferences.constraints !== 'none' && ` · ${userPreferences.constraints}`}
              </p>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by role name, skills, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter by category:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="text-sm text-gray-600 underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Compare Bar (sticky when selections exist) */}
        {selectedForCompare.length > 0 && (
          <div className="bg-blue-600 text-white rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <span className="text-sm opacity-90">Selected for comparison:</span>
              <span className="ml-2">{selectedForCompare.length} of 2 roles</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedForCompare([])}
                className="text-sm underline opacity-90 hover:opacity-100"
              >
                Clear selection
              </button>
              <button
                onClick={handleCompare}
                disabled={selectedForCompare.length !== 2}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedForCompare.length === 2
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-700 text-blue-300 cursor-not-allowed'
                }`}
              >
                Compare roles
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {sortedRoles.map((role) => {
            const isSelected = selectedForCompare.includes(role.id);
            
            return (
              <div
                key={role.id}
                className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
                  isSelected ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl mb-1 text-gray-900">{role.title}</h3>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                        {role.category}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleCompareSelection(role.id)}
                      className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Select for comparison"
                      title={isSelected ? "Remove from comparison" : "Add to comparison"}
                    >
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4">{role.description}</p>

                  {/* Skills Preview */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Skills you'll develop:</p>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {role.skills.length > 4 && (
                        <span className="px-2 py-1 text-gray-600 text-sm">
                          +{role.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Best for:</p>
                    <p className="text-sm text-gray-700">{role.bestFor.join(' · ')}</p>
                  </div>

                  {/* Prerequisites */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Prerequisites:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {role.prerequisites.map((prereq, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5">•</span>
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{role.timeCommitment}</span>
                    <Link
                      to={`/role/${role.id}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sortedRoles.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            <p>No roles match your current filters. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
