
import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplaintCard } from '@/components/dashboard/complaint-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers, mockComplaints, mockSOSAlerts } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';
import { Users, Bell, MessageSquare, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { User, SOSAlert } from '@/types';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeAlerts, setActiveAlerts] = useState<SOSAlert[]>([]);
  const [campusSafetyStatus, setCampusSafetyStatus] = useState('normal');
  
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
        
        // Get active SOS alerts
        try {
          const storedAlerts = JSON.parse(localStorage.getItem('sosAlerts') || '[]');
          const allAlerts = [...mockSOSAlerts, ...storedAlerts];
          setActiveAlerts(allAlerts.filter(alert => alert.status === 'active'));
        } catch (error) {
          console.error("Error loading SOS alerts:", error);
          setActiveAlerts(mockSOSAlerts.filter(alert => alert.status === 'active'));
        }
        
        // Get campus safety status
        const savedStatus = localStorage.getItem('campusSafetyStatus');
        if (savedStatus) {
          setCampusSafetyStatus(savedStatus);
        }
      } else {
        navigate('/login');
      }
    };
    
    checkAdmin();
  }, [navigate]);

  // Get the name of a complaint submitter
  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'caution': return 'bg-yellow-500';
      case 'alert': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader user={currentUser} />
      
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-shehelp-purple-light border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Students
              </CardTitle>
              <CardDescription>Registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockUsers.filter(user => user.role === 'student').length}
              </div>
              <p className="text-sm mt-2">Total active students in the system</p>
            </CardContent>
          </Card>
          
          <Card className="bg-shehelp-pink-light border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Complaints
              </CardTitle>
              <CardDescription>Total reported incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockComplaints.length}</div>
              <div className="text-sm mt-2">
                <span className="font-medium">{mockComplaints.filter(c => c.status === 'pending').length}</span> pending,{' '}
                <span className="font-medium">{mockComplaints.filter(c => c.status === 'in-progress').length}</span> in progress
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-100 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Active Alerts
              </CardTitle>
              <CardDescription>Current SOS alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeAlerts.length}</div>
              <p className="text-sm mt-2">
                {activeAlerts.length === 0 
                  ? "No active emergency alerts" 
                  : "Immediate attention required!"}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-shehelp-teal-light border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Safety Status
              </CardTitle>
              <CardDescription>Campus alert level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(campusSafetyStatus)}`}></div>
                <span className="font-medium capitalize">{campusSafetyStatus}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => navigate('/admin/safety-status')}
              >
                Update Status
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="recent">Recent Complaints</TabsTrigger>
            <TabsTrigger value="anonymous">Anonymous Reports</TabsTrigger>
            <TabsTrigger value="alerts">SOS Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Complaints</h2>
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/complaints')}
              >
                View All
              </Button>
            </div>
            
            {mockComplaints.length > 0 ? (
              <div className="space-y-4">
                {mockComplaints.slice(0, 5).map(complaint => {
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
          </TabsContent>
          
          <TabsContent value="anonymous" className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Anonymous Reports</h2>
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/anonymous-complaints')}
              >
                View All
              </Button>
            </div>
            
            {mockComplaints.filter(c => c.anonymous).length > 0 ? (
              <div className="space-y-4">
                {mockComplaints.filter(c => c.anonymous).map(complaint => {
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
                <p className="text-gray-500">No anonymous complaints submitted yet</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="alerts" className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">SOS Alerts History</h2>
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/alerts')}
              >
                View All
              </Button>
            </div>
            
            {mockSOSAlerts.length > 0 ? (
              <div className="space-y-4">
                {mockSOSAlerts.map(alert => (
                  <Card key={alert.id} className="border-l-4 border-red-500">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            Emergency Alert
                          </CardTitle>
                          <CardDescription>
                            From: {getUserName(alert.userId)}
                          </CardDescription>
                        </div>
                        <Badge className={`${alert.status === 'active' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                          {alert.status === 'active' ? 'Active' : 'Resolved'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">
                        <span className="font-medium">Time:</span> {new Date(alert.timestamp).toLocaleString()}
                      </p>
                      <p className="text-sm mb-2">
                        <span className="font-medium">Location:</span> {alert.location.address || 'Unknown location'}
                      </p>
                      <div className="mt-3">
                        <Button 
                          size="sm" 
                          className={alert.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300'}
                          disabled={alert.status !== 'active'}
                          onClick={() => {
                            // In a real app, this would open Google Maps with the location
                            window.open(`https://www.google.com/maps?q=${alert.location.latitude},${alert.location.longitude}`, '_blank');
                          }}
                        >
                          View on Map
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="ml-2"
                          disabled={alert.status !== 'active'}
                          onClick={() => {
                            // In a real app, this would update the alert status
                            alert.status = 'resolved';
                            
                            // Update in localStorage
                            try {
                              const storedAlerts = JSON.parse(localStorage.getItem('sosAlerts') || '[]');
                              const updatedAlerts = storedAlerts.map((a: SOSAlert) => 
                                a.id === alert.id ? { ...a, status: 'resolved' as const } : a
                              );
                              localStorage.setItem('sosAlerts', JSON.stringify(updatedAlerts));
                              
                              // Update active alerts
                              setActiveAlerts(activeAlerts.filter(a => a.id !== alert.id));
                            } catch (error) {
                              console.error("Error updating SOS alerts:", error);
                            }
                          }}
                        >
                          Mark as Resolved
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No SOS alerts reported</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
