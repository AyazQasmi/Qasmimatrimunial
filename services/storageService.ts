import { Profile, INITIAL_PROFILES } from '../types';

const STORAGE_KEY = 'matrimony_profiles';

export const getProfiles = (): Profile[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with dummy data if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROFILES));
    return INITIAL_PROFILES;
  }
  return JSON.parse(stored);
};

export const saveProfile = (profile: Profile): void => {
  const profiles = getProfiles();
  const existingIndex = profiles.findIndex(p => p.id === profile.id);
  
  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

export const deleteProfile = (id: string): void => {
  const profiles = getProfiles();
  const newProfiles = profiles.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfiles));
};