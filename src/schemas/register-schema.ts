
import { z } from 'zod';

export const registerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string()
    .email('Invalid email address')
    .refine(
      (email) => 
        email.endsWith('@srmist.edu.in') || 
        email.endsWith('@srmuniversity.edu.in'), 
      'Must be an SRM University email (srmist.edu.in or srmuniversity.edu.in)'
    ),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  department: z.string().min(1, 'Please select your department'),
  year: z.string().min(1, 'Please select your year'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

