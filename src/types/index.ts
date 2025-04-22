
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  year?: number;
}

export interface Complaint {
  id: string;
  userId: string;
  title: string;
  description: string;
  location?: string;
  timestamp: string;
  status: 'pending' | 'in-progress' | 'resolved';
  category: 'harassment' | 'stalking' | 'bullying' | 'other';
  anonymous: boolean;
}

export interface SOSAlert {
  id: string;
  userId: string;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  status: 'active' | 'resolved';
}
