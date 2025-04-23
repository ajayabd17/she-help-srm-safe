
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SOSButton } from '@/components/ui/sos-button';

const Index = () => {
  const navigate = useNavigate();

  const handleSOS = () => {
    console.log("SOS triggered from home page");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-shehelp-teal mb-2">SRM Safe</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-purple-800 mb-6">Your Campus Safety Companion</h2>
        
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Report incidents, access safety resources, and stay connected with campus security. 
          We're here to help create a safer environment for everyone.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="default" 
            onClick={() => navigate('/login')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6"
            size="lg"
          >
            Sign In
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/resources')}
            className="border-shehelp-teal text-shehelp-teal hover:bg-shehelp-teal hover:text-white px-8 py-6"
            size="lg"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-gray-600 mb-4">Emergency? Use the SOS button for immediate assistance</p>
          <div className="flex justify-center">
            <SOSButton onActivate={handleSOS} size="large" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
