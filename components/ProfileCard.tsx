import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../types';
import { MapPin, BookOpen, Briefcase, Ruler } from 'lucide-react';

interface Props {
  profile: Profile;
}

const ProfileCard: React.FC<Props> = ({ profile }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 w-full h-64 relative bg-gray-200">
         <img 
            src={profile.imageUrl} 
            alt={profile.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
         />
         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white text-xl font-serif font-bold">{profile.name}, {profile.age}</h3>
            <p className="text-brand-100 text-sm">{profile.religion} • {profile.sect}</p>
         </div>
      </div>
      
      <div className="p-5 space-y-3">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 italic">
            "{profile.bio}"
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 pt-2 border-t border-gray-100">
            <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-brand-500" />
                {profile.city}
            </div>
            <div className="flex items-center">
                <Ruler className="w-4 h-4 mr-2 text-brand-500" />
                {profile.height}
            </div>
            <div className="flex items-center col-span-2">
                <BookOpen className="w-4 h-4 mr-2 text-brand-500" />
                {profile.education}
            </div>
             <div className="flex items-center col-span-2">
                <Briefcase className="w-4 h-4 mr-2 text-brand-500" />
                {profile.profession}
            </div>
        </div>
        
        <div className="mt-4 pt-3">
            <Link 
                to={`/profile/${profile.id}`}
                className="block w-full text-center py-2 bg-brand-50 text-brand-700 font-medium rounded-lg hover:bg-brand-100 transition border border-brand-200"
            >
                View Full Profile
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;