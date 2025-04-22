
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { mockUsers } from '@/lib/mockData';
import { User } from '@/types';

const CampusMap = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('currentUserEmail');
    if (userEmail) {
      const user = mockUsers.find(u => u.email === userEmail);
      if (user) {
        setCurrentUser(user);
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {currentUser ? (
        <DashboardHeader user={currentUser} />
      ) : (
        <header className="w-full bg-white border-b">
          <div className="container mx-auto flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-shehelp-purple">She</span>
              <span className="text-2xl font-bold text-shehelp-pink">Help</span>
              <span className="text-sm text-muted-foreground ml-2">SRM University</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                Back to Home
              </button>
            </div>
          </div>
        </header>
      )}
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Campus Safety Map</h1>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                This interactive map shows important safety locations across the SRM University campus, 
                including security posts, emergency phones, safe zones, and well-lit pathways.
              </p>
            </div>
            
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Campus Safety Map</p>
                <p className="text-sm text-gray-400">
                  (In a production app, an interactive Google Map would be displayed here)
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Emergency Phones</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Security Posts</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Safe Zones</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Well-lit Pathways</span>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Safety Notes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Always use well-lit pathways when walking at night</li>
                <li>Emergency phones connect directly to campus security</li>
                <li>Safe zones are available 24/7 and have security personnel</li>
                <li>Report any broken lights or safety concerns immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampusMap;
