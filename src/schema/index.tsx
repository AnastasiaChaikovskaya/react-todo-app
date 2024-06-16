import * as z from 'zod';

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, {
      message: 'Please enter your name',
    }),
    lastName: z.string().min(1, {
      message: 'Please enter your name',
    }),
    email: z.string().email({
      message: 'Please enter your email',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters long',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter your email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

export const AddTodoSchema = z.object({
  title: z.string().min(1, {
    message: 'title must be at least 1 characters long',
  }),
  description: z.string().min(1, {
    message: 'title must be at least 1 characters long',
  }),
});

export const EditTodoSchema = z.object({
  title: z.string().min(1, {
    message: 'title must be at least 1 characters long',
  }),
  description: z.string().min(1, {
    message: 'title must be at least 1 characters long',
  }),
  status: z.enum(['active', 'completed']),
});

export const UpdatePassWordSchema = z.object({
  password: z.string(),
  newPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});
