export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  height: string;
  maritalStatus: 'Single' | 'Divorced' | 'Widowed';
  religion: string;
  sect: string; // Maslak
  caste: string;
  city: string;
  education: string;
  profession: string;
  income: string;
  bio: string;
  imageUrl: string;
  contactNumber: string; // Visible only to admin usually, but we'll store it
}

export const INITIAL_PROFILES: Profile[] = [
  {
    id: '1',
    name: 'Zaid Ahmed',
    age: 28,
    gender: 'Male',
    height: "5'10\"",
    maritalStatus: 'Single',
    religion: 'Islam',
    sect: 'Sunni',
    caste: 'Sheikh',
    city: 'Karachi',
    education: 'MBA Marketing',
    profession: 'Senior Manager at MNC',
    income: '200k+',
    bio: 'A purely professional and religious individual looking for a pious partner. Family values are very important to me.',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    contactNumber: '0300-1234567'
  },
  {
    id: '2',
    name: 'Fatima Noor',
    age: 24,
    gender: 'Female',
    height: "5'4\"",
    maritalStatus: 'Single',
    religion: 'Islam',
    sect: 'Sunni',
    caste: 'Syed',
    city: 'Lahore',
    education: 'MBBS',
    profession: 'Doctor (House Job)',
    income: 'N/A',
    bio: 'Soft-spoken, educated, and belongs to a respectable Syed family. Looking for an educated and well-settled partner.',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    contactNumber: '0321-7654321'
  }
];