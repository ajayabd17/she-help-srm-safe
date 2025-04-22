
import { LoginForm } from '@/components/auth/login-form';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-shehelp-purple-light to-shehelp-pink-light flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold text-shehelp-purple">She</span>
          <span className="text-3xl font-bold text-shehelp-pink">Help</span>
        </div>
        <p className="mt-2 text-gray-600">SRM University Safety Portal</p>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Need assistance? Contact SRM Campus Security at 044-2745-5666</p>
      </div>
    </div>
  );
};

export default Login;
