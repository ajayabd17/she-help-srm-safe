
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { registerFormSchema, type RegisterFormValues } from '@/schemas/register-schema';
import { PasswordInput } from './password-input';
import { mockUsers } from '@/lib/mockData';
import { v4 as uuidv4 } from 'uuid';

export function RegisterForm() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      department: '',
      year: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      // Create a new user object from form values
      const newUser = {
        id: uuidv4(),
        name: values.name,
        email: values.email,
        role: 'student' as const,
        department: values.department,
        year: parseInt(values.year) || 1,
        // Store the password in localStorage for the mock authentication
        password: values.password
      };
      
      // Add the new user to mockUsers array
      mockUsers.push({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        year: newUser.year
      });
      
      // Store user login info in localStorage for the mock authentication
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      storedUsers.push({
        email: values.email,
        password: values.password,
        name: values.name,
        role: 'student'
      });
      localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
      
      console.log('Registration successful', newUser);
      console.log('Current mockUsers:', mockUsers);
      
      toast({
        title: 'Registration successful',
        description: 'Your account has been created. You can now log in.',
      });
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'An error occurred during registration. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="your.email@srmuniversity.edu.in" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Must be your SRM University email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Civil">Civil Engineering</SelectItem>
                    <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Arts">Arts & Humanities</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="5">5th Year</SelectItem>
                    <SelectItem value="pg">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <PasswordInput 
          form={form} 
          name="password" 
          label="Password"
          description="Must be at least 8 characters with uppercase, lowercase, and numbers"
        />
        
        <PasswordInput 
          form={form} 
          name="confirmPassword" 
          label="Confirm Password"
        />
        
        <Button 
          type="submit" 
          className="w-full mt-2 bg-shehelp-purple hover:bg-shehelp-purple-dark"
        >
          Create Account
        </Button>
      </form>
    </Form>
  );
}
