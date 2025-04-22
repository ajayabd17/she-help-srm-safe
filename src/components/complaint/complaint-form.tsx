
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { saveComplaint, mockUsers } from '@/lib/mockData';

// Create form schema
const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['harassment', 'stalking', 'bullying', 'other'], {
    required_error: 'Please select a category',
  }),
  location: z.string().optional(),
  anonymous: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export function ComplaintForm() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: undefined,
      location: '',
      anonymous: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Get the current user from localStorage
      const userEmail = localStorage.getItem('currentUserEmail');
      if (!userEmail) {
        toast({
          title: 'Not logged in',
          description: 'You need to be logged in to submit a complaint.',
          variant: 'destructive',
        });
        navigate('/login');
        return;
      }
      
      const currentUser = mockUsers.find(user => user.email === userEmail);
      if (!currentUser) {
        toast({
          title: 'User not found',
          description: 'Please log in again.',
          variant: 'destructive',
        });
        navigate('/login');
        return;
      }

      // Create a complaint object
      const complaint = {
        id: uuidv4(),
        userId: currentUser.id,
        title: values.title,
        description: values.description,
        category: values.category,
        location: values.location || undefined,
        timestamp: new Date().toISOString(),
        status: 'pending' as const,
        anonymous: values.anonymous,
      };

      // Save complaint to localStorage
      saveComplaint(complaint);

      // Show success message
      toast({
        title: 'Complaint Submitted',
        description: 'Your complaint has been successfully submitted.',
      });

      // Redirect to the dashboard or my complaints page
      setTimeout(() => {
        navigate('/my-complaints');
      }, 1500);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your complaint. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complaint Title</FormLabel>
              <FormControl>
                <Input placeholder="Brief title of your complaint" {...field} />
              </FormControl>
              <FormDescription>
                A short title that describes the main issue
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="stalking">Stalking</SelectItem>
                  <SelectItem value="bullying">Bullying</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the category that best fits your complaint
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please provide details of the incident"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include important details like when, where, and what happened
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Where did this happen?" {...field} />
              </FormControl>
              <FormDescription>
                E.g., Main Campus, Engineering Block, Hostel
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Submit Anonymously</FormLabel>
                <FormDescription>
                  If checked, your name will only be visible to the Head of Student Affairs
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
          <Button type="submit" className="bg-shehelp-purple hover:bg-shehelp-purple-dark">
            Submit Complaint
          </Button>
        </div>
      </form>
    </Form>
  );
}
