
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/register-form';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-shehelp-purple-light to-shehelp-pink-light flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold text-shehelp-purple">She</span>
          <span className="text-3xl font-bold text-shehelp-pink">Help</span>
        </div>
        <p className="mt-2 text-gray-600">Create your SRM University Safety Account</p>
      </div>
      
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <RegisterForm />
        <div className="text-center text-sm">
          <p>
            Already have an account?{" "}
            <Button 
              variant="link" 
              className="p-0 text-shehelp-purple hover:text-shehelp-purple-dark"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600 max-w-md">
        <p>By creating an account, you agree to SRM University's Privacy Policy and Terms of Service.</p>
      </div>
    </div>
  );
};

export default Register;

