
import React, { useEffect, useState } from 'react';
import { getProfiles, saveProfile, deleteProfile } from '../services/storageService';
import { generateProfileBio } from '../services/geminiService';
import { updateCredentials, getCredentials } from '../services/authService';
import { Profile } from '../types';
import { Plus, Trash2, Edit2, X, Sparkles, Upload, Settings, Save, CheckCircle, Eye, EyeOff } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Settings Modal State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  // Form State for Profile
  const [formData, setFormData] = useState<Partial<Profile>>({
    gender: 'Male',
    maritalStatus: 'Single',
    religion: 'Islam',
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  // Form State for Settings (Credentials)
  const [settingsData, setSettingsData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    setProfiles(getProfiles());
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(id);
      loadProfiles();
      showToast('Profile deleted successfully');
    }
  };

  const openModal = (profile?: Profile) => {
    if (profile) {
      setEditingId(profile.id);
      setFormData(profile);
      setImagePreview(profile.imageUrl);
    } else {
      setEditingId(null);
      setFormData({
        gender: 'Male',
        maritalStatus: 'Single',
        religion: 'Islam',
        sect: 'Sunni',
      });
      setImagePreview('');
    }
    setIsModalOpen(true);
  };

  const openSettings = () => {
    const creds = getCredentials();
    setSettingsData(creds);
    setShowPassword(false);
    setIsSettingsOpen(true);
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCredentials(settingsData.username, settingsData.password);
    setIsSettingsOpen(false);
    showToast('Admin credentials updated successfully');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateBio = async () => {
    if (!formData.name || !formData.profession) {
      alert("Please enter Name and Profession first to generate a bio.");
      return;
    }
    
    setIsGenerating(true);
    const bio = await generateProfileBio(
      formData.name || '',
      formData.education || 'Educated',
      formData.profession || 'Professional',
      formData.city || 'Pakistan',
      formData.sect || ''
    );
    setFormData(prev => ({ ...prev, bio }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProfile: Profile = {
      id: editingId || Date.now().toString(),
      name: formData.name || '',
      age: Number(formData.age) || 18,
      gender: formData.gender as 'Male' | 'Female',
      height: formData.height || '',
      maritalStatus: formData.maritalStatus as any,
      religion: formData.religion || 'Islam',
      sect: formData.sect || '',
      caste: formData.caste || '',
      city: formData.city || '',
      education: formData.education || '',
      profession: formData.profession || '',
      income: formData.income || '',
      bio: formData.bio || '',
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image',
      contactNumber: formData.contactNumber || ''
    };

    saveProfile(newProfile);
    setIsModalOpen(false);
    loadProfiles();
    showToast('Profile saved successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 right-5 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center animate-bounce z-50">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            {toastMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage profiles and application settings</p>
        </div>
        <div className="flex gap-3">
            <button
            onClick={openSettings}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition font-medium"
            >
            <Settings className="w-5 h-5 mr-2" />
            Account Settings
            </button>
            <button
            onClick={() => openModal()}
            className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-medium shadow-md hover:shadow-lg"
            >
            <Plus className="w-5 h-5 mr-2" />
            Add Profile
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.map(profile => (
              <tr key={profile.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0">
                      <img className="h-12 w-12 rounded-full object-cover border-2 border-brand-100" src={profile.imageUrl} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-900">{profile.name}</div>
                      <div className="text-sm text-gray-500">{profile.city}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900"><span className="font-semibold">{profile.age} Yrs</span>, {profile.gender}</div>
                  <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-brand-50 text-brand-700 rounded-full mt-1">
                    {profile.maritalStatus}
                  </div>
                </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">{profile.contactNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openModal(profile)} className="text-brand-600 hover:text-brand-900 mr-4 p-2 hover:bg-brand-50 rounded-full transition">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(profile.id)} className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {profiles.length === 0 && (
            <div className="p-10 text-center text-gray-500">
                No profiles found. Click "Add Profile" to create one.
            </div>
        )}
      </div>

      {/* Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold font-serif text-gray-800">{editingId ? 'Edit Profile' : 'Add New Profile'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div className="flex items-center space-x-6">
                <div className="shrink-0 relative group">
                    {imagePreview ? (
                         <img className="h-28 w-28 object-cover rounded-full border-4 border-brand-100 shadow-sm" src={imagePreview} alt="Preview" />
                    ) : (
                        <div className="h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                            <Upload className="w-8 h-8" />
                        </div>
                    )}
                </div>
                <label className="block flex-1">
                    <span className="sr-only">Choose profile photo</span>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2.5 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-brand-50 file:text-brand-700
                        hover:file:bg-brand-100
                        cursor-pointer
                        "
                    />
                    <p className="mt-2 text-xs text-gray-500">Recommended: Square JPG/PNG, max 2MB.</p>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div>
                    <label className="label">Full Name</label>
                    <input required type="text" className="input-field" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                    <label className="label">Age</label>
                    <input required type="number" className="input-field" value={formData.age || ''} onChange={e => setFormData({...formData, age: Number(e.target.value)})} />
                </div>
                <div>
                    <label className="label">Gender</label>
                    <select className="input-field" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as any})}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="label">Height</label>
                    <input type="text" placeholder="e.g., 5'10&quot;" className="input-field" value={formData.height || ''} onChange={e => setFormData({...formData, height: e.target.value})} />
                </div>
                 <div>
                    <label className="label">Marital Status</label>
                    <select className="input-field" value={formData.maritalStatus} onChange={e => setFormData({...formData, maritalStatus: e.target.value as any})}>
                        <option value="Single">Single</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>
                <div>
                    <label className="label">City</label>
                    <input required type="text" className="input-field" value={formData.city || ''} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>

                {/* Religious & Social */}
                <div>
                    <label className="label">Religion</label>
                    <input type="text" className="input-field" value={formData.religion || ''} onChange={e => setFormData({...formData, religion: e.target.value})} />
                </div>
                <div>
                    <label className="label">Sect (Maslak)</label>
                    <input type="text" className="input-field" value={formData.sect || ''} onChange={e => setFormData({...formData, sect: e.target.value})} />
                </div>
                <div>
                    <label className="label">Caste/Baradri</label>
                    <input type="text" className="input-field" value={formData.caste || ''} onChange={e => setFormData({...formData, caste: e.target.value})} />
                </div>

                {/* Professional */}
                <div>
                    <label className="label">Education</label>
                    <input required type="text" className="input-field" value={formData.education || ''} onChange={e => setFormData({...formData, education: e.target.value})} />
                </div>
                <div>
                    <label className="label">Profession</label>
                    <input required type="text" className="input-field" value={formData.profession || ''} onChange={e => setFormData({...formData, profession: e.target.value})} />
                </div>
                 <div>
                    <label className="label">Contact Number (Admin Only)</label>
                    <input required type="text" className="input-field" value={formData.contactNumber || ''} onChange={e => setFormData({...formData, contactNumber: e.target.value})} />
                </div>
              </div>

              {/* Bio Section with AI */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="label mb-0">Bio / Description</label>
                    <button 
                        type="button"
                        onClick={handleGenerateBio}
                        disabled={isGenerating}
                        className="text-xs flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition font-medium"
                    >
                        <Sparkles className="w-3 h-3 mr-1" />
                        {isGenerating ? 'Generating...' : 'Auto-Generate with AI'}
                    </button>
                </div>
                <textarea 
                    className="input-field h-32" 
                    value={formData.bio || ''} 
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    placeholder="Describe family background, values, and partner expectations..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t bg-gray-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 font-medium shadow-md transition flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal (Change Credentials) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold font-serif text-gray-800">Account Settings</h2>
                    <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSettingsSubmit} className="p-6 space-y-5">
                    <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100 flex gap-2">
                        <div className="shrink-0 pt-0.5">ℹ️</div>
                        <div>Update your login credentials. These changes apply immediately.</div>
                    </div>
                    <div>
                        <label className="label">Update Username</label>
                        <input 
                            required 
                            type="text" 
                            className="input-field" 
                            value={settingsData.username} 
                            onChange={e => setSettingsData({...settingsData, username: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="label">Update Password</label>
                        <div className="relative">
                            <input 
                                required 
                                type={showPassword ? "text" : "password"}
                                className="input-field pr-10" 
                                value={settingsData.password} 
                                onChange={e => setSettingsData({...settingsData, password: e.target.value})} 
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="w-full px-6 py-3 bg-brand-900 text-white rounded-xl hover:bg-brand-800 font-medium transition shadow-lg flex justify-center items-center">
                            <Save className="w-4 h-4 mr-2" />
                            Update Credentials
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      <style>{`
        .label {
            @apply block text-sm font-bold text-gray-700 mb-1.5;
        }
        .input-field {
            @apply block w-full rounded-xl border-gray-300 border px-4 py-2.5 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm bg-gray-50 focus:bg-white transition-colors;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
