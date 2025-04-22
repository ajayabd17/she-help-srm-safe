
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { saveSosAlert } from '@/lib/mockData';

interface SOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onActivate: () => void;
  size?: 'default' | 'large' | 'floating';
}

const SOSButton = React.forwardRef<HTMLButtonElement, SOSButtonProps>(
  ({ className, onActivate, size = 'default', ...props }, ref) => {
    const { toast } = useToast();
    const [isPressed, setIsPressed] = React.useState(false);
    const [holdTimer, setHoldTimer] = React.useState<NodeJS.Timeout | null>(null);
    
    const handleMouseDown = () => {
      setIsPressed(true);
      const timer = setTimeout(() => {
        handleActivate();
      }, 2000); // Hold for 2 seconds to activate
      setHoldTimer(timer);
    };
    
    const handleMouseUp = () => {
      setIsPressed(false);
      if (holdTimer) {
        clearTimeout(holdTimer);
        setHoldTimer(null);
      }
    };
    
    const handleActivate = () => {
      // Request permission and get user's location
      if (navigator.geolocation) {
        toast({
          title: "Requesting Location",
          description: "Please allow access to your location for emergency services.",
        });
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            
            // Create a Google Maps URL with the coordinates
            const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            
            // Get address from coordinates (reverse geocoding)
            // This is a simplified version - in a real app, you'd use the Google Maps Geocoding API
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
              .then(response => response.json())
              .then(data => {
                const address = data.display_name || 'Unknown location';
                
                // Create and save the SOS alert
                const userEmail = localStorage.getItem('currentUserEmail');
                if (userEmail) {
                  const userId = localStorage.getItem('currentUserId') || 'unknown';
                  
                  const alert = {
                    id: uuidv4(),
                    userId,
                    timestamp: new Date().toISOString(),
                    location: {
                      latitude,
                      longitude,
                      address
                    },
                    status: 'active' as const
                  };
                  
                  // Save the alert
                  saveSosAlert(alert);
                  
                  // Call the onActivate callback
                  onActivate();
                  
                  toast({
                    title: "SOS Alert Activated",
                    description: `Emergency contacts and campus security have been notified of your location: ${address}`,
                    variant: "destructive"
                  });
                }
              })
              .catch(error => {
                console.error("Error getting address:", error);
                
                // Still send the alert even if we can't get the address
                onActivate();
                
                toast({
                  title: "SOS Alert Activated",
                  description: "Emergency contacts and campus security have been notified of your location.",
                  variant: "destructive"
                });
              });
          },
          (error) => {
            console.error("Error getting location:", error);
            
            // Still send the alert even if we can't get the location
            onActivate();
            
            toast({
              title: "SOS Alert Activated",
              description: "Emergency contacts and campus security have been notified, but we couldn't access your location.",
              variant: "destructive"
            });
          }
        );
      } else {
        // Geolocation not supported
        onActivate();
        
        toast({
          title: "SOS Alert Activated",
          description: "Emergency contacts and campus security have been notified, but location sharing is not supported on your device.",
          variant: "destructive"
        });
      }
    };
    
    const sizeClasses = {
      default: "h-12 w-12 text-sm",
      large: "h-16 w-16 text-base",
      floating: "h-20 w-20 text-lg fixed bottom-8 right-8 shadow-lg"
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-full bg-shehelp-danger hover:bg-red-700 text-white font-bold flex items-center justify-center",
          "transition-all duration-300 transform active:scale-95", 
          sizeClasses[size],
          isPressed && "animate-pulse scale-110",
          className
        )}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        type="button"
        {...props}
      >
        <AlertCircle className="mr-1" />
        SOS
      </button>
    );
  }
);

SOSButton.displayName = "SOSButton";

export { SOSButton };
