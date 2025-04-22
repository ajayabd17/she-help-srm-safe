
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/lib/mockData';
import { User } from '@/types';
import { Phone, Shield, User as UserIcon, MapPin } from 'lucide-react';

const Resources = () => {
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

  const resourceCards = [
    {
      title: "Emergency Contacts",
      icon: Phone,
      color: "bg-red-100",
      iconColor: "text-red-500",
      content: [
        { title: "Campus Security", value: "044-2745-5666" },
        { title: "Women's Safety Cell", value: "044-2745-5777" },
        { title: "Health Center", value: "044-2745-5888" },
        { title: "Counseling Services", value: "044-2745-5999" }
      ]
    },
    {
      title: "Safety Guidelines",
      icon: Shield,
      color: "bg-blue-100",
      iconColor: "text-blue-500",
      content: [
        { title: "Always travel in groups after dark" },
        { title: "Keep your family/friends informed of your whereabouts" },
        { title: "Use well-lit, populated pathways on campus" },
        { title: "Report suspicious activities immediately" }
      ]
    },
    {
      title: "Support Services",
      icon: UserIcon,
      color: "bg-green-100",
      iconColor: "text-green-500",
      content: [
        { title: "Peer Support Group", value: "Every Wednesday, 5 PM" },
        { title: "Counseling Hours", value: "Mon-Fri, 9 AM - 5 PM" },
        { title: "Women's Cell", value: "Room 204, Main Building" },
        { title: "Legal Aid", value: "By appointment" }
      ]
    },
    {
      title: "Safe Zones",
      icon: MapPin,
      color: "bg-purple-100",
      iconColor: "text-purple-500",
      content: [
        { title: "Library", value: "Open 24/7" },
        { title: "Student Center", value: "8 AM - 10 PM" },
        { title: "Security Posts", value: "All entrances" },
        { title: "Help Points", value: "Located across campus" }
      ]
    }
  ];
  
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
          <h1 className="text-3xl font-bold mb-8">Safety Resources</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceCards.map((card, index) => (
              <Card key={index} className={`${card.color} border-none`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <card.icon className={`mr-2 h-5 w-5 ${card.iconColor}`} />
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {card.content.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span className="font-medium">{item.title}</span>
                        {item.value && <span>{item.value}</span>}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Important Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">University Safety Policy</h3>
                  <p className="text-sm text-gray-600 mb-4">Comprehensive guidelines for campus safety procedures.</p>
                  <button className="text-shehelp-purple underline">Download PDF</button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Complaint Resolution Process</h3>
                  <p className="text-sm text-gray-600 mb-4">Step-by-step guide to how complaints are handled.</p>
                  <button className="text-shehelp-purple underline">Download PDF</button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Support Services Directory</h3>
                  <p className="text-sm text-gray-600 mb-4">Contact information for all support services.</p>
                  <button className="text-shehelp-purple underline">Download PDF</button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resources;
