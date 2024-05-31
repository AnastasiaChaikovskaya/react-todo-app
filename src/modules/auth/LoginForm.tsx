import React from 'react';
import CardWrapper from './CardWrapper';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TLoginFrom } from '@/types/loginSchema';
import { LoginSchema } from '@/schema';

function LoginForm() {
  const form = useForm<TLoginFrom>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  const hasErrors =
    !!form.formState.errors.password || !!form.formState.errors.email || !!form.formState.errors.userName;

  const handleSubmit = (formData: TLoginFrom) => {
    console.log(formData);
  };

  return (
    <CardWrapper
      title="Login"
      label="Login in account"
      backButtonLabel="Don`t have an account? Sing up here."
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <FormField
              name="userName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Bob Smith"
                      className="hover:shadow-md"
                      isErrored={!!form.formState.errors.userName}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="bob_smith@gmail.com"
                      className="hover:shadow-md"
                      isErrored={!!form.formState.errors.email}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="You password"
                      isErrored={!!form.formState.errors.password}
                      className="hover:shadow-md"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full bg-black hover:bg-stone-900" disabled={hasErrors}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
