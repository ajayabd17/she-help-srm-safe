
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Add your Index page content here */}
      <Button 
        variant="outline" 
        onClick={() => navigate('/resources')}
        className="border-shehelp-teal text-shehelp-teal hover:bg-shehelp-teal hover:text-white px-8 py-6"
        size="lg"
      >
        Learn More
      </Button>
    </div>
  );
};

export default Index;
