
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SOSButton } from "@/components/ui/sos-button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSOSActivate = () => {
    // In a real app, this would require authentication or create an anonymous alert
    toast({
      title: "Emergency Alert",
      description: "Please sign in to use the full SOS features. Campus security has been notified of an anonymous alert.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-shehelp-purple">She</span>
            <span className="text-2xl font-bold text-shehelp-pink">Help</span>
            <span className="text-sm text-muted-foreground ml-2">SRM University</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="hidden sm:flex"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="bg-shehelp-purple hover:bg-shehelp-purple-dark"
            >
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-shehelp-purple-light to-shehelp-pink-light">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="flex flex-col gap-4 md:gap-6 md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold text-shehelp-purple-dark">
              Your Safety Matters at SRM University
            </h1>
            <p className="text-lg text-gray-700 max-w-prose">
              She Help provides a secure platform for reporting incidents, 
              getting immediate assistance, and accessing resources to ensure 
              your well-being on campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                onClick={() => navigate('/register')}
                className="bg-shehelp-purple hover:bg-shehelp-purple-dark text-white px-8 py-6"
                size="lg"
              >
                Create Account
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/learn-more')}
                className="border-shehelp-teal text-shehelp-teal hover:bg-shehelp-teal hover:text-white px-8 py-6"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-shehelp-purple">Emergency SOS</h2>
                <p className="text-gray-600 mt-2">
                  Press and hold for 2 seconds to activate emergency assistance
                </p>
              </div>
              <div className="flex justify-center my-8">
                <SOSButton size="large" onActivate={handleSOSActivate} />
              </div>
              <div className="text-center text-sm text-gray-500 mt-6">
                <p>
                  For immediate assistance even without logging in.
                  <br />
                  <span className="font-medium">Create an account for enhanced safety features.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How She Help Protects You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-shehelp-purple-light p-6 rounded-xl">
              <div className="rounded-full bg-shehelp-purple w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy-First Reporting</h3>
              <p className="text-gray-700">
                Submit complaints anonymously with identity protection. Only authorized administrators can view your personal information.
              </p>
            </div>
            
            <div className="bg-shehelp-pink-light p-6 rounded-xl">
              <div className="rounded-full bg-shehelp-pink w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Emergency SOS</h3>
              <p className="text-gray-700">
                One-touch SOS button shares your location with campus security in emergencies, ensuring help reaches you quickly.
              </p>
            </div>
            
            <div className="bg-shehelp-teal-light p-6 rounded-xl">
              <div className="rounded-full bg-shehelp-teal w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Status Tracking</h3>
              <p className="text-gray-700">
                Track the status of your reports and receive updates as action is taken, ensuring transparency throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 italic mb-4">
                "The anonymous reporting feature gave me the confidence to speak up about a difficult situation. The support I received was prompt and compassionate."
              </p>
              <p className="font-medium">— Computer Science Student, 3rd Year</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 italic mb-4">
                "Having the SOS button gives me peace of mind when I'm working late in the lab. It makes me feel safer knowing help is just a button press away."
              </p>
              <p className="font-medium">— Biotechnology Student, 2nd Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-shehelp-purple text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join SRM's Safety Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create your account today and take an active step towards your safety and well-being on campus.
          </p>
          <Button 
            onClick={() => navigate('/register')}
            className="bg-white text-shehelp-purple hover:bg-gray-100 px-8"
            size="lg"
          >
            Register Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">She Help</h3>
              <p>
                A safety initiative by SRM University to create a secure campus environment for all students.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/resources" className="hover:text-white">Safety Resources</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <p>SRM Campus Security: 044-2745-5666</p>
              <p>Women's Safety Cell: 044-2745-5777</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} She Help - SRM University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
