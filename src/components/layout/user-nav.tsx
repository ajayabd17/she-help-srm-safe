
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserNavProps {
  user: {
    name: string;
    email: string;
    role: 'student' | 'admin';
  };
}

export function UserNav({ user }: UserNavProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // Clear the current user from localStorage
    localStorage.removeItem('currentUserEmail');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    
    // Redirect to login page
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt={user.name} />
            <AvatarFallback className="bg-shehelp-purple text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}>
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile Settings</Link>
        </DropdownMenuItem>
        {user.role === 'student' && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/submit-complaint">Submit a Complaint</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/my-complaints">My Complaints</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
