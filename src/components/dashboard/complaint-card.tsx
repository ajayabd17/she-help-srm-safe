
import { Complaint } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Flag } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  showIdentity?: boolean;
  mockUser?: { name: string };
}

export function ComplaintCard({ complaint, showIdentity = false, mockUser }: ComplaintCardProps) {
  const statusColors = {
    'pending': 'bg-amber-500',
    'in-progress': 'bg-blue-500',
    'resolved': 'bg-green-500'
  };
  
  const categoryColors = {
    'harassment': 'bg-red-500',
    'stalking': 'bg-purple-500',
    'bullying': 'bg-orange-500',
    'other': 'bg-gray-500'
  };

  const timeAgo = formatDistanceToNow(new Date(complaint.timestamp), { addSuffix: true });

  return (
    <Card className="overflow-hidden border-l-4 hover:shadow-md transition-shadow" 
          style={{ borderLeftColor: categoryColors[complaint.category].replace('bg-', '') }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{complaint.title}</CardTitle>
            {complaint.anonymous && !showIdentity && (
              <CardDescription>Anonymous Submission</CardDescription>
            )}
            {(showIdentity || !complaint.anonymous) && mockUser && (
              <CardDescription>Submitted by {mockUser.name}</CardDescription>
            )}
          </div>
          <Badge className={`${statusColors[complaint.status]} text-white`}>
            {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-600 line-clamp-3">{complaint.description}</p>
        {complaint.location && (
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <Flag className="h-3 w-3 mr-1" />
            <span>{complaint.location}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 text-xs text-gray-500">
        <p>Submitted {timeAgo}</p>
      </CardFooter>
    </Card>
  );
}
