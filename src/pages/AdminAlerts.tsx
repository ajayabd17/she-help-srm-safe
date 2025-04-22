
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockUsers, mockSOSAlerts } from '@/lib/mockData';
import { User, SOSAlert } from '@/types';

const AdminAlerts = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [alerts, setAlerts] = useState<SOSAlert[]>([]);
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
        
        // Get all SOS alerts
        try {
          const storedAlerts = JSON.parse(localStorage.getItem('sosAlerts') || '[]');
          setAlerts([...mockSOSAlerts, ...storedAlerts]);
        } catch (error) {
          console.error("Error loading SOS alerts:", error);
          setAlerts(mockSOSAlerts);
        }
      } else {
        navigate('/login');
      }
    };
    
    checkAdmin();
  }, [navigate]);

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const handleResolveAlert = (alertId: string) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
    );
    
    // Update local state
    setAlerts(updatedAlerts);
    
    // Update in localStorage
    try {
      localStorage.setItem('sosAlerts', JSON.stringify(updatedAlerts));
    } catch (error) {
      console.error("Error updating SOS alerts:", error);
    }
  };

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader user={currentUser} />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">SOS Alerts</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white p-6 rounded-xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>These alerts require immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.filter(alert => alert.status === 'active').length > 0 ? (
                <div className="space-y-4">
                  {alerts.filter(alert => alert.status === 'active').map(alert => (
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
                          <Badge className="bg-red-500 text-white">
                            Active
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
                        <p className="text-sm mb-4">
                          <span className="font-medium">Coordinates:</span> {alert.location.latitude.toFixed(6)}, {alert.location.longitude.toFixed(6)}
                        </p>
                        <div className="mt-3">
                          <Button 
                            size="sm" 
                            className="bg-red-500 hover:bg-red-600 mr-2"
                            onClick={() => {
                              // Open Google Maps with the location coordinates
                              window.open(`https://www.google.com/maps?q=${alert.location.latitude},${alert.location.longitude}`, '_blank');
                            }}
                          >
                            View on Map
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            Mark as Resolved
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No active alerts at this time</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-white p-6 rounded-xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Resolved Alerts</CardTitle>
              <CardDescription>Previous alerts that have been resolved</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.filter(alert => alert.status === 'resolved').length > 0 ? (
                <div className="space-y-4">
                  {alerts.filter(alert => alert.status === 'resolved').map(alert => (
                    <Card key={alert.id} className="border-l-4 border-green-500">
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
                          <Badge className="bg-green-500 text-white">
                            Resolved
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
                        <p className="text-sm mb-4">
                          <span className="font-medium">Coordinates:</span> {alert.location.latitude.toFixed(6)}, {alert.location.longitude.toFixed(6)}
                        </p>
                        <div className="mt-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              // Open Google Maps with the location coordinates
                              window.open(`https://www.google.com/maps?q=${alert.location.latitude},${alert.location.longitude}`, '_blank');
                            }}
                          >
                            View on Map
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No resolved alerts</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminAlerts;
