import * as z from 'zod';

export const RegisterSchema = z
  .object({
    userName: z.string().min(1, {
      message: 'Please enter your name',
    }),
    email: z.string().email({
      message: 'Please enter your email',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters long',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Password do not match',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
