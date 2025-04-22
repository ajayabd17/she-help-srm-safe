
import { User, Complaint, SOSAlert } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Admin user
export const mockUsers: User[] = [
  {
    id: 'admin1',
    name: 'Head of Directorate of Student Affairs',
    email: 'hod.studentaffairs@srmuniversity.edu.in',
    role: 'admin',
    department: 'Student Affairs',
    password: 'admin123', // For demo purposes only
    isProfileComplete: true
  }
];

// Empty complaints array - will be populated by user submissions
export const mockComplaints: Complaint[] = [];

// Empty SOS alerts array - will be populated as alerts are triggered
export const mockSOSAlerts: SOSAlert[] = [];

// Initialization function to ensure data is loaded from localStorage
export const initializeData = () => {
  try {
    // Load registered users
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Add any stored users that aren't already in mockUsers
    storedUsers.forEach((user: any) => {
      if (!mockUsers.some(u => u.email === user.email)) {
        mockUsers.push({
          id: user.id || `user-${uuidv4()}`,
          name: user.name,
          email: user.email,
          role: user.role || 'student',
          department: user.department || '',
          year: user.year || undefined,
          registerNumber: user.registerNumber || '',
          password: user.password,
          isProfileComplete: user.isProfileComplete || false
        });
      }
    });
    
    // Load complaints
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Add any stored complaints that aren't already in mockComplaints
    storedComplaints.forEach((complaint: Complaint) => {
      if (!mockComplaints.some(c => c.id === complaint.id)) {
        mockComplaints.push(complaint);
      }
    });
    
    // Load SOS alerts
    const storedAlerts = JSON.parse(localStorage.getItem('sosAlerts') || '[]');
    
    // Add any stored alerts that aren't already in mockSOSAlerts
    storedAlerts.forEach((alert: SOSAlert) => {
      if (!mockSOSAlerts.some(a => a.id === alert.id)) {
        mockSOSAlerts.push(alert);
      }
    });
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Call initialization function
initializeData();

// Mock authentication function
export const mockLogin = (email: string, password: string): User | null => {
  // First try to find user in mockUsers array
  const mockUser = mockUsers.find(u => u.email === email && u.password === password);
  if (mockUser) return mockUser;
  
  // If not found in mockUsers, check localStorage
  try {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const registeredUser = storedUsers.find((u: any) => 
      u.email === email && u.password === password
    );
    
    if (registeredUser) {
      // Check if this user already exists in mockUsers array
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        return existingUser;
      } else {
        // Create a new user entry and add to mockUsers
        const newUser: User = {
          id: `user-${uuidv4()}`,
          name: registeredUser.name,
          email: registeredUser.email,
          role: registeredUser.role || 'student',
          department: registeredUser.department || '',
          year: registeredUser.year || undefined,
          registerNumber: registeredUser.registerNumber || '',
          password: registeredUser.password,
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

// Function to register a new user
export const registerUser = (userData: Partial<User>): User | null => {
  try {
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) return null;
    
    // Create new user
    const newUser: User = {
      id: `user-${uuidv4()}`,
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'student',
      department: userData.department || '',
      year: userData.year,
      registerNumber: userData.registerNumber || '',
      password: userData.password,
      isProfileComplete: false
    };
    
    // Add to mockUsers
    mockUsers.push(newUser);
    
    // Store in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    storedUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
    
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
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
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Combine with mockComplaints
    const allComplaints = [...mockComplaints, ...storedComplaints];
    
    // Filter for user's complaints and remove duplicates
    const userComplaints = allComplaints.filter((complaint: Complaint) => complaint.userId === userId);
    
    // Remove duplicates by id
    const uniqueComplaints = userComplaints.filter((complaint, index, self) =>
      index === self.findIndex(c => c.id === complaint.id)
    );
    
    return uniqueComplaints;
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
