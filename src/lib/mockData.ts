
import { User, Complaint, SOSAlert } from '@/types';

// Mock users (only admins)
export const mockUsers: User[] = [
  {
    id: 'admin1',
    name: 'Head of Directorate of Student Affairs',
    email: 'hod.studentaffairs@srmuniversity.edu.in',
    role: 'admin',
    department: 'Student Affairs',
    password: 'admin123' // For demo purposes only
  }
];

// Empty complaints array - will be populated by user submissions
export const mockComplaints: Complaint[] = [];

// Empty SOS alerts array - will be populated as alerts are triggered
export const mockSOSAlerts: SOSAlert[] = [];

// Mock authentication function
export const mockLogin = (email: string, password: string): User | null => {
  // Check predefined mock users first
  const user = mockUsers.find(u => u.email === email);
  
  // If user exists in mock data and password matches, return the user
  // This is just for testing purposes
  if (user && user.password === password) return user;
  
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
          year: registeredUser.year || 1,
          registerNumber: registeredUser.registerNumber,
          isProfileComplete: registeredUser.isProfileComplete || false
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

// Function to save complaint to localStorage
export const saveComplaint = (complaint: Complaint): void => {
  try {
    // Get existing complaints
    const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Add new complaint
    existingComplaints.push(complaint);
    
    // Save back to localStorage
    localStorage.setItem('complaints', JSON.stringify(existingComplaints));
    
    // Also add to mock complaints for current session
    mockComplaints.push(complaint);
  } catch (error) {
    console.error('Error saving complaint:', error);
  }
};

// Function to get user complaints
export const getUserComplaints = (userId: string): Complaint[] => {
  try {
    // Get complaints from localStorage
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Filter for user's complaints
    return complaints.filter((complaint: Complaint) => complaint.userId === userId);
  } catch (error) {
    console.error('Error getting user complaints:', error);
    return [];
  }
};

// Function to save SOS alert
export const saveSosAlert = (alert: SOSAlert): void => {
  try {
    // Get existing alerts
    const existingAlerts = JSON.parse(localStorage.getItem('sosAlerts') || '[]');
    
    // Add new alert
    existingAlerts.push(alert);
    
    // Save back to localStorage
    localStorage.setItem('sosAlerts', JSON.stringify(existingAlerts));
    
    // Also add to mock alerts for current session
    mockSOSAlerts.push(alert);
  } catch (error) {
    console.error('Error saving SOS alert:', error);
  }
};

// Function to update user profile
export const updateUserProfile = (userId: string, profileData: Partial<User>): User | null => {
  try {
    // Update in mockUsers array
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex >= 0) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...profileData, isProfileComplete: true };
      
      // Update in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const storedUserIndex = storedUsers.findIndex((u: any) => u.email === mockUsers[userIndex].email);
      
      if (storedUserIndex >= 0) {
        storedUsers[storedUserIndex] = { 
          ...storedUsers[storedUserIndex], 
          ...profileData, 
          isProfileComplete: true 
        };
        localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
      }
      
      return mockUsers[userIndex];
    }
    return null;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
};
