import React, { useEffect, useState } from 'react';
import { getProfiles } from '../services/storageService';
import { Profile } from '../types';
import ProfileCard from '../components/ProfileCard';
import { Search, Filter, Heart, ChevronDown } from 'lucide-react';

const Home: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female'>('All');

  useEffect(() => {
    setProfiles(getProfiles());
  }, []);

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.caste.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = genderFilter === 'All' || profile.gender === genderFilter;
    
    return matchesSearch && matchesGender;
  });

  const scrollToProfiles = () => {
    const element = document.getElementById('profiles-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 text-white pt-20 pb-56 px-4 sm:px-6 lg:px-8 mb-4 text-center overflow-hidden shadow-xl">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-72 h-72 bg-rose-300 opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute top-[20%] right-[20%] w-20 h-20 bg-pink-200 opacity-10 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30 shadow-lg">
                <Heart className="h-8 w-8 text-white fill-current animate-bounce" />
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-extrabold mb-6 tracking-tight drop-shadow-md leading-tight">
            Find Your <span className="text-pink-200 italic">Perfect Match</span> Today
            </h1>
            
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium mb-10 drop-shadow-sm opacity-95">
            Connecting hearts with tradition and trust. A premium platform for families looking for respectable proposals.
            </p>

            <button 
                onClick={scrollToProfiles}
                className="group px-8 py-4 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:bg-pink-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
            >
                Browse Profiles
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block align-middle">
                <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
      </div>

      <div id="profiles-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Search & Filter Bar - Optimized for Mobile visibility */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-gray-200 mb-10 flex flex-col md:flex-row gap-4 md:gap-5 items-center -mt-8 relative z-30">
            <div className="relative flex-grow w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-pink-500" />
                </div>
                <input
                    type="text"
                    placeholder="Search Name, City, Caste..."
                    className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-base shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="flex items-center space-x-3 w-full md:w-auto bg-gray-50 p-2 rounded-xl border border-gray-200">
                <div className="flex items-center text-gray-700 font-bold px-2 whitespace-nowrap">
                    <Filter className="h-5 w-5 mr-2 text-pink-500" />
                    <span className="text-sm">Filter:</span>
                </div>
                <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value as any)}
                    className="block w-full md:w-48 pl-3 pr-8 py-2 text-base bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg shadow-sm font-medium text-gray-800"
                >
                    <option value="All">All Profiles</option>
                    <option value="Female">Bride (Female)</option>
                    <option value="Male">Groom (Male)</option>
                </select>
            </div>
        </div>

        {/* Results Grid */}
        {filteredProfiles.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl text-gray-500 font-medium">No profiles found matching your criteria.</h3>
                <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProfiles.map(profile => (
                    <ProfileCard key={profile.id} profile={profile} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Home;