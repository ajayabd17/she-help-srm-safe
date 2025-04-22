
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DashboardHeader } from '@/components/layout/dashboard-header';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { mockUsers, updateUserProfile } from '@/lib/mockData';
import { User } from '@/types';

const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  registerNumber: z.string().min(5, 'Register number must be at least 5 characters'),
  department: z.string().min(1, 'Please select a department'),
  year: z.string().min(1, 'Please select a year'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would come from an auth context
    // For now, we'll check localStorage to see if user is logged in
    const checkLoggedInUser = () => {
      try {
        const userEmail = localStorage.getItem('currentUserEmail');
        if (!userEmail) {
          navigate('/login');
          return;
        }
        
        const user = mockUsers.find(u => u.email === userEmail);
        if (user) {
          setCurrentUser(user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking logged in user:', error);
        navigate('/login');
      }
    };
    
    checkLoggedInUser();
  }, [navigate]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUser?.name || '',
      registerNumber: currentUser?.registerNumber || '',
      department: currentUser?.department || '',
      year: currentUser?.year?.toString() || '',
    },
  });

  // Update form values when currentUser changes
  useEffect(() => {
    if (currentUser) {
      form.reset({
        name: currentUser.name || '',
        registerNumber: currentUser?.registerNumber || '',
        department: currentUser?.department || '',
        year: currentUser?.year?.toString() || '',
      });
    }
  }, [currentUser, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'User not found. Please log in again.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    try {
      const updatedUser = updateUserProfile(currentUser.id, {
        name: values.name,
        registerNumber: values.registerNumber,
        department: values.department,
        year: parseInt(values.year),
      });
      
      if (updatedUser) {
        setCurrentUser(updatedUser);
        
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully.',
        });
        
        // If this was a first-time profile completion, redirect to dashboard
        if (!currentUser.isProfileComplete) {
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        }
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: 'Update failed',
        description: 'An error occurred while updating your profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader user={currentUser} />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {currentUser.isProfileComplete ? 'Edit Profile' : 'Complete Your Profile'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    name="registerNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Register Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your SRM register number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your university register number for verification purposes
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
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-2 bg-shehelp-purple hover:bg-shehelp-purple-dark"
                  >
                    {currentUser.isProfileComplete ? 'Update Profile' : 'Complete Profile'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
