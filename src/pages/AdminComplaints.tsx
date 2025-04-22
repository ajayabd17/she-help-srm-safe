
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card } from '@/components/ui/card';
import { ComplaintCard } from '@/components/dashboard/complaint-card';
import { Button } from '@/components/ui/button';
import { mockUsers, mockComplaints } from '@/lib/mockData';
import { User, Complaint } from '@/types';

const AdminComplaints = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and is admin
    const checkAdmin = () => {
      const userEmail = localStorage.getItem('currentUserEmail');
      if (!userEmail) {
        navigate('/login');
        return;
      }
      
      const user = mockUsers.find(u => u.email === userEmail);
      if (user && user.role === 'admin') {
        setCurrentUser(user);
        
        // Get all complaints
        try {
          const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
          setComplaints([...mockComplaints, ...storedComplaints]);
        } catch (error) {
          console.error("Error loading complaints:", error);
          setComplaints(mockComplaints);
        }
      } else {
        navigate('/login');
      }
    };
    
    checkAdmin();
  }, [navigate]);

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader user={currentUser} />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Complaints</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
        
        <Card className="bg-white p-6 rounded-xl shadow-sm">
          {complaints.length > 0 ? (
            <div className="space-y-4">
              {complaints.map(complaint => {
                const user = mockUsers.find(u => u.id === complaint.userId);
                return (
                  <ComplaintCard 
                    key={complaint.id} 
                    complaint={complaint} 
                    showIdentity={true}
                    mockUser={user}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No complaints submitted yet</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminComplaints;
