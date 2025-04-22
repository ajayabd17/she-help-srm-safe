
import { Link } from "react-router-dom";
import { UserNav } from "./user-nav";
import { SOSButton } from "../ui/sos-button";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const { toast } = useToast();
  
  const handleSOSActivate = () => {
    // In a real app, this would send an SOS alert to campus security
    // and potentially emergency contacts
    
    // Check for geolocation permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would send this location to the API
          console.log("Location shared:", position.coords);
          
          toast({
            title: "SOS Alert Activated",
            description: "Your location has been shared with campus security. Help is on the way.",
            variant: "destructive",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          
          toast({
            title: "SOS Alert Activated",
            description: "Campus security has been notified, but we couldn't access your location.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "SOS Alert Activated",
        description: "Campus security has been notified, but location sharing is not supported on your device.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-shehelp-purple">She</span>
            <span className="text-xl font-bold text-shehelp-pink">Help</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link 
              to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"} 
              className="text-sm font-medium transition-colors hover:text-shehelp-purple"
            >
              Dashboard
            </Link>
            
            {user.role === 'student' && (
              <>
                <Link 
                  to="/submit-complaint" 
                  className="text-sm font-medium transition-colors hover:text-shehelp-purple"
                >
                  Submit Complaint
                </Link>
                <Link 
                  to="/my-complaints" 
                  className="text-sm font-medium transition-colors hover:text-shehelp-purple"
                >
                  My Complaints
                </Link>
                <Link 
                  to="/resources" 
                  className="text-sm font-medium transition-colors hover:text-shehelp-purple"
                >
                  Resources
                </Link>
              </>
            )}
            
            {user.role === 'admin' && (
              <>
                <Link 
                  to="/admin/complaints" 
                  className="text-sm font-medium transition-colors hover:text-shehelp-purple"
                >
                  All Complaints
                </Link>
                <Link 
                  to="/admin/alerts" 
                  className="text-sm font-medium transition-colors hover:text-shehelp-purple"
                >
                  SOS Alerts
                </Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user.role === 'student' && (
            <SOSButton onActivate={handleSOSActivate} />
          )}
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
}
