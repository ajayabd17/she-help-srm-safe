
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockUsers } from '@/lib/mockData';
import { User } from '@/types';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SafetyStatus = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentStatus, setCurrentStatus] = useState('normal'); // normal, caution, alert
  const navigate = useNavigate();
  const { toast } = useToast();

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
        
        // Load current safety status
        const savedStatus = localStorage.getItem('campusSafetyStatus');
        if (savedStatus) {
          setCurrentStatus(savedStatus);
        }
      } else {
        navigate('/login');
      }
    };
    
    checkAdmin();
  }, [navigate]);

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
    localStorage.setItem('campusSafetyStatus', status);
    
    // Show toast notification
    toast({
      title: "Safety Status Updated",
      description: `Campus safety status has been set to ${status.toUpperCase()}`,
      variant: status === 'normal' ? 'default' : (status === 'caution' ? 'default' : 'destructive')
    });
  };

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader user={currentUser} />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Campus Safety Status</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
        
        <Card className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-6">
              <div className={`w-4 h-4 rounded-full ${
                currentStatus === 'normal' ? 'bg-green-500' : 
                currentStatus === 'caution' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="font-medium capitalize">{currentStatus}</span>
            </div>
            
            <p className="text-sm mb-6">
              {currentStatus === 'normal' ? 
                'No active campus alerts at this time. All systems normal.' : 
                currentStatus === 'caution' ? 
                'Exercise caution on campus. Security personnel have been notified of a potential concern.' : 
                'High alert status. Emergency protocols are active. Follow security instructions.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className={`${currentStatus === 'normal' ? 'bg-green-500 hover:bg-green-600 ring-2 ring-green-300' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => handleStatusChange('normal')}
              >
                Normal
              </Button>
              <Button 
                className={`${currentStatus === 'caution' ? 'bg-yellow-500 hover:bg-yellow-600 ring-2 ring-yellow-300' : 'bg-yellow-500 hover:bg-yellow-600'}`}
                onClick={() => handleStatusChange('caution')}
              >
                Caution
              </Button>
              <Button 
                className={`${currentStatus === 'alert' ? 'bg-red-500 hover:bg-red-600 ring-2 ring-red-300' : 'bg-red-500 hover:bg-red-600'}`}
                onClick={() => handleStatusChange('alert')}
              >
                Alert
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    Normal
                  </h3>
                  <p className="text-sm text-gray-600 ml-5">
                    Regular campus operations. No known threats or concerns.
                    Standard security procedures in place.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    Caution
                  </h3>
                  <p className="text-sm text-gray-600 ml-5">
                    Elevated awareness due to a potential concern. Increased security presence.
                    Students should be vigilant and travel in groups.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    Alert
                  </h3>
                  <p className="text-sm text-gray-600 ml-5">
                    Serious safety concern. Emergency protocols active.
                    All students receive immediate notifications. Follow security instructions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Automatic Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Changing the status will automatically trigger the following notifications:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>SMS alerts to all registered students</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Email notifications to faculty and staff</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Push notifications through the SheHelp app</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Campus security staff mobilization (Alert status only)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SafetyStatus;
