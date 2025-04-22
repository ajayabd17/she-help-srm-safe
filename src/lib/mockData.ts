
import { User, Complaint, SOSAlert } from '@/types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Jane Doe',
    email: 'jane.doe@srmuniversity.edu.in',
    role: 'student',
    department: 'Computer Science',
    year: 3
  },
  {
    id: 'user2',
    name: 'Sarah Smith',
    email: 'sarah.smith@srmuniversity.edu.in',
    role: 'student',
    department: 'Electronics',
    year: 2
  },
  {
    id: 'admin1',
    name: 'Dr. Amanda Williams',
    email: 'amanda.williams@srmuniversity.edu.in',
    role: 'admin',
    department: 'Student Affairs'
  }
];

// Mock complaints
export const mockComplaints: Complaint[] = [
  {
    id: 'complaint1',
    userId: 'user1',
    title: 'Uncomfortable Behavior',
    description: 'Someone has been following me after evening classes.',
    location: 'Engineering Block',
    timestamp: '2023-11-15T14:30:00Z',
    status: 'in-progress',
    category: 'stalking',
    anonymous: true
  },
  {
    id: 'complaint2',
    userId: 'user2',
    title: 'Verbal Harassment',
    description: 'I faced repeated verbal harassment during lab sessions.',
    location: 'Science Lab',
    timestamp: '2023-11-10T10:15:00Z',
    status: 'pending',
    category: 'harassment',
    anonymous: false
  }
];

// Mock SOS alerts
export const mockSOSAlerts: SOSAlert[] = [
  {
    id: 'sos1',
    userId: 'user1',
    timestamp: '2023-11-16T18:45:00Z',
    location: {
      latitude: 12.823084,
      longitude: 80.044794,
      address: 'Near SRM University Main Gate'
    },
    status: 'resolved'
  }
];

// Mock authentication function
export const mockLogin = (email: string, password: string): User | null => {
  // Check predefined mock users first
  const user = mockUsers.find(u => u.email === email);
  
  // If user exists in mock data and there's no password provided, return the user
  // This is just for testing purposes
  if (user && !password) return user;
  
  // Check local storage for registered users
  try {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const registeredUser = storedUsers.find((u: any) => 
      u.email === email && u.password === password
    );
    
    if (registeredUser) {
      // Find if the user already exists in mockUsers array
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        return existingUser;
      } else {
        // Create a new user entry and add to mockUsers
        const newUser: User = {
          id: `user-${mockUsers.length + 1}`,
          name: registeredUser.name,
          email: registeredUser.email,
          role: registeredUser.role || 'student',
          department: registeredUser.department || 'General',
          year: registeredUser.year || 1
        };
        
        mockUsers.push(newUser);
        return newUser;
      }
    }
  } catch (error) {
    console.error('Error checking local storage for users:', error);
  }
  
  return null;
};
