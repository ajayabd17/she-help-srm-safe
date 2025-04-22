
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { mockComplaints } from '@/lib/mockData';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Please provide more details (at least 20 characters)'),
  location: z.string().optional(),
  category: z.enum(['harassment', 'stalking', 'bullying', 'other']),
  anonymous: z.boolean().default(false),
});

type ComplaintFormValues = z.infer<typeof formSchema>;

export function ComplaintForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      category: 'harassment',
      anonymous: false,
    },
  });

  function onSubmit(values: ComplaintFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would make an API call to submit the complaint
      const newComplaint = {
        ...values,
        id: `complaint${mockComplaints.length + 1}`,
        userId: 'user1', // In a real app, this would come from auth context
        timestamp: new Date().toISOString(),
        status: 'pending' as const,
      };
      
      toast({
        title: 'Complaint submitted',
        description: values.anonymous 
          ? 'Your anonymous complaint has been received' 
          : 'Your complaint has been received',
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit a Complaint</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Brief title of your complaint" {...field} />
                </FormControl>
                <FormDescription>
                  A concise title that describes the issue
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
                  Select the category that best describes your complaint
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
                    placeholder="Please provide detailed information about the incident" 
                    className="min-h-32" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Include relevant details like date, time, and specifics of what happened
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
                  <Input placeholder="Where did this incident occur?" {...field} />
                </FormControl>
                <FormDescription>
                  Specify where the incident took place (e.g., "Engineering Block", "Hostel Area")
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="anonymous"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Submit Anonymously</FormLabel>
                  <FormDescription>
                    Your identity will be hidden from everyone except the Head of Student Affairs
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-shehelp-purple hover:bg-shehelp-purple-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
