
import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { SOSButton } from '@/components/ui/sos-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplaintCard } from '@/components/dashboard/complaint-card';
import { Button } from '@/components/ui/button';
import { mockUsers, getUserComplaints } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';
import { Bell, User, MessageSquare } from 'lucide-react';
import { Complaint } from '@/types';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userComplaints, setUserComplaints] = useState<Complaint[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const checkLoggedInUser = () => {
      try {
        const userEmail = localStorage.getItem('currentUserEmail');
        if (!userEmail) {
          navigate('/login');
          return;
        }
        
        const user = mockUsers.find(u => u.email === userEmail);
        if (user) {
          setCurrentUser(user);
          
          // If profile is not complete and user is a student, redirect to profile page
          if (user.role === 'student' && !user.isProfileComplete) {
            navigate('/profile');
            return;
          }
          
          // Get user complaints
          if (user.role === 'student') {
            const complaints = getUserComplaints(user.id);
            setUserComplaints(complaints);
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking logged in user:', error);
        navigate('/login');
      }
    };
    
    checkLoggedInUser();
  }, [navigate]);

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader user={currentUser} />
      
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {currentUser.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-shehelp-purple-light border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Safety Status
              </CardTitle>
              <CardDescription>Current campus safety alert level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium">Normal</span>
              </div>
              <p className="text-sm mt-2">No active campus alerts at this time.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-shehelp-pink-light border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <User className="mr-2 h-5 w-5" />
                My Profile
              </CardTitle>
              <CardDescription>Student information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Department:</span>
                  <span className="text-sm">{currentUser.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Year:</span>
                  <span className="text-sm">{currentUser.year}</span>
                </div>
                {currentUser.registerNumber && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Register No:</span>
                    <span className="text-sm">{currentUser.registerNumber}</span>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/profile')}
                  className="w-full mt-2"
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-shehelp-teal-light border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                My Complaints
              </CardTitle>
              <CardDescription>Submitted reports & status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="text-sm">{userComplaints.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Active:</span>
                  <span className="text-sm">
                    {userComplaints.filter(c => c.status !== 'resolved').length}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/my-complaints')}
                  className="w-full mt-2"
                >
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Complaints</h2>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/my-complaints')}
                >
                  View All
                </Button>
              </div>
              
              {userComplaints.length > 0 ? (
                <div className="space-y-4">
                  {userComplaints.slice(0, 3).map(complaint => (
                    <ComplaintCard 
                      key={complaint.id} 
                      complaint={complaint} 
                      mockUser={currentUser}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No complaints submitted yet</p>
                  <Button 
                    onClick={() => navigate('/submit-complaint')}
                    className="bg-shehelp-purple hover:bg-shehelp-purple-dark"
                  >
                    Submit a Complaint
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-shehelp-purple hover:bg-shehelp-purple-dark"
                  onClick={() => navigate('/submit-complaint')}
                >
                  Report Incident
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-shehelp-teal text-shehelp-teal hover:bg-shehelp-teal hover:text-white"
                  onClick={() => navigate('/resources')}
                >
                  Safety Resources
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/campus-map')}
                >
                  Campus Safety Map
                </Button>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-3">Emergency SOS</h3>
                <div className="flex justify-center">
                  <SOSButton 
                    onActivate={() => {
                      // Implement SOS activation with Google Maps
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            const { latitude, longitude } = position.coords;
                            console.log("Location:", { latitude, longitude });
                            
                            // In a real app, this would send the alert to campus security
                            // and show location on Google Maps
                          },
                          (error) => {
                            console.error("Error getting location:", error);
                          }
                        );
                      }
                    }} 
                    size="large"
                  />
                </div>
                <p className="text-xs text-center mt-3 text-gray-500">
                  Press and hold for 2 seconds to activate emergency assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
