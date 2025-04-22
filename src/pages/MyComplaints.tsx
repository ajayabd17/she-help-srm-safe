
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Button } from '@/components/ui/button';
import { ComplaintCard } from '@/components/dashboard/complaint-card';
import { mockUsers, getUserComplaints } from '@/lib/mockData';
import { Complaint, User } from '@/types';
import { PlusCircle } from 'lucide-react';

const MyComplaints = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would come from an auth context
    // For now, we'll check localStorage to see if user is logged in
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
          
          // If profile is not complete, redirect to profile page
          if (!user.isProfileComplete) {
            navigate('/profile');
          }
          
          // Get user complaints
          const userComplaints = getUserComplaints(user.id);
          setComplaints(userComplaints);
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
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Complaints</h1>
            <Button 
              onClick={() => navigate('/submit-complaint')}
              className="bg-shehelp-purple hover:bg-shehelp-purple-dark"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit New Complaint
            </Button>
          </div>
          
          {complaints.length > 0 ? (
            <div className="space-y-4">
              {complaints.map(complaint => (
                <ComplaintCard 
                  key={complaint.id} 
                  complaint={complaint} 
                  mockUser={currentUser}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-lg shadow-sm text-center">
              <h2 className="text-xl font-semibold mb-2">No Complaints Submitted</h2>
              <p className="text-gray-500 mb-6">
                You haven't submitted any complaints yet. If you need to report an incident, 
                please use the button below.
              </p>
              <Button 
                onClick={() => navigate('/submit-complaint')}
                className="bg-shehelp-purple hover:bg-shehelp-purple-dark"
              >
                Submit a Complaint
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyComplaints;
