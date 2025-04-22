
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { ComplaintForm } from '@/components/complaint/complaint-form';
import { mockUsers } from '@/lib/mockData';
import { User } from '@/types';

const SubmitComplaint = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

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
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Submit a Complaint</h1>
            <p className="text-gray-600">
              Your report will be handled with care and confidentiality. 
              Only the Head of Student Affairs can view your identity if you choose to remain anonymous.
            </p>
          </div>
          
          <ComplaintForm />
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-lg font-semibold mb-2">What happens after I submit?</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>You'll receive a confirmation that your complaint has been received</li>
              <li>The Student Affairs office will review your complaint within 24-48 hours</li>
              <li>You can track the status of your complaint from your dashboard</li>
              <li>If additional information is needed, you'll be notified securely</li>
              <li>All information is kept confidential according to university policy</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmitComplaint;
