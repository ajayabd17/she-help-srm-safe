
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

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
      onActivate();
      toast({
        title: "SOS Alert Activated",
        description: "Emergency contacts and campus security have been notified.",
        variant: "destructive"
      });
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
