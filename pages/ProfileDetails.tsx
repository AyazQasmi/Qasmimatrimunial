import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProfiles } from '../services/storageService';
import { Profile } from '../types';
import { 
  MapPin, BookOpen, Briefcase, Ruler, Heart, Phone, ArrowLeft, 
  User, Shield, GraduationCap, Banknote, Mail, MessageCircle
} from 'lucide-react';

const ProfileDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const profiles = getProfiles();
    const found = profiles.find(p => p.id === id);
    setProfile(found || null);
    window.scrollTo(0, 0);
  }, [id]);

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-4">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-serif text-gray-800 mb-2">Profile Not Found</h2>
        <p className="text-gray-500 mb-6">The profile you are looking for does not exist or has been removed.</p>
        <Link to="/" className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans">
      {/* Extended Pink Header */}
      <div className="bg-gradient-to-r from-brand-700 via-rose-600 to-pink-600 pb-32 pt-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center text-pink-100 hover:text-white transition mb-4 group">
                <div className="bg-white/20 p-1.5 rounded-full mr-2 group-hover:bg-white/30 transition">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="font-medium tracking-wide">Back to Search</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-sm">
                Candidate Profile
            </h1>
            <p className="text-pink-100 mt-2 text-sm md:text-base opacity-90 max-w-2xl">
                View detailed information about background, education, and family values.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Image & Quick Info */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 sticky top-24">
                    <div className="aspect-w-3 aspect-h-4 bg-gray-200 relative">
                        <img 
                            src={profile.imageUrl} 
                            alt={profile.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                             <div className="bg-brand-600/90 backdrop-blur-sm inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
                                {profile.maritalStatus}
                             </div>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">{profile.name}</h1>
                        <p className="text-gray-500 flex items-center mb-6">
                            <MapPin className="w-4 h-4 mr-1 text-pink-500" /> {profile.city}, Pakistan
                        </p>

                        <div className="space-y-4">
                            {isAdmin ? (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <h3 className="text-green-800 font-semibold flex items-center mb-1">
                                        <Shield className="w-4 h-4 mr-2" /> Admin Access
                                    </h3>
                                    <div className="flex items-center text-green-700 text-lg font-mono">
                                        <Phone className="w-5 h-5 mr-2" />
                                        {profile.contactNumber}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white border border-pink-100 rounded-xl p-5 text-center shadow-lg shadow-pink-500/5 ring-1 ring-pink-50">
                                    <h3 className="text-brand-800 font-serif font-bold text-lg mb-2">Interested in this Proposal?</h3>
                                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                        To connect with this family, please contact our administration.
                                    </p>
                                    
                                    <div className="space-y-3">
                                        <a 
                                            href="https://wa.me/923118957225" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-bold group"
                                        >
                                            <MessageCircle className="w-5 h-5 mr-2 fill-current" />
                                            WhatsApp Admin
                                        </a>
                                        
                                        <a 
                                            href="mailto:ayazqasimi@gmail.com"
                                            className="flex items-center justify-center w-full py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:border-brand-200 hover:text-brand-600 transition-all duration-300 font-medium shadow-sm"
                                        >
                                            <Mail className="w-5 h-5 mr-2" />
                                            Email Support
                                        </a>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <Phone className="w-3 h-3" />
                                            <span className="font-mono text-gray-600">+92 311 8957225</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <Mail className="w-3 h-3" />
                                            <span className="font-mono text-gray-600">ayazqasimi@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Detailed Info */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Bio Section */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Heart className="w-40 h-40 text-pink-600 transform rotate-12" />
                    </div>
                    <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center">
                        <User className="w-5 h-5 mr-2 text-brand-500" />
                        About {profile.name.split(' ')[0]}
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg italic bg-gray-50/50 p-4 rounded-xl border border-gray-50/50">
                        "{profile.bio}"
                    </p>
                </div>

                {/* Personal & Religious Info */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                    <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-brand-500" />
                        Personal & Religious Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <DetailRow label="Age" value={`${profile.age} Years`} />
                        <DetailRow label="Gender" value={profile.gender} />
                        <DetailRow label="Height" value={profile.height} />
                        <DetailRow label="Marital Status" value={profile.maritalStatus} />
                        <DetailRow label="Religion" value={profile.religion} />
                        <DetailRow label="Sect (Maslak)" value={profile.sect} />
                        <DetailRow label="Caste / Baradri" value={profile.caste} />
                        <DetailRow label="City" value={profile.city} />
                    </div>
                </div>

                {/* Education & Career */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                    <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2 text-brand-500" />
                        Education & Career
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="col-span-2 md:col-span-1">
                             <DetailRow label="Education" value={profile.education} icon={<BookOpen className="w-4 h-4" />} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <DetailRow label="Profession" value={profile.profession} icon={<Briefcase className="w-4 h-4" />} />
                        </div>
                        <div className="col-span-2 border-t border-gray-50 pt-4 mt-2">
                            <DetailRow label="Monthly Income" value={profile.income} icon={<Banknote className="w-4 h-4" />} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string; icon?: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="border-b border-gray-100 pb-2 last:border-0 hover:bg-gray-50/50 transition-colors rounded-sm px-1">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center">
            {icon && <span className="mr-1.5 text-brand-400">{icon}</span>}
            {label}
        </p>
        <p className="text-gray-900 font-medium text-lg">{value || 'N/A'}</p>
    </div>
);

export default ProfileDetails;