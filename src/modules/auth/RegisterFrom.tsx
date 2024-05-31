import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RegisterSchema } from '@/schema/index';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardWrapper from './CardWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TRegisterFrom } from '@/types/registerForm';

function RegisterFrom() {
  const form = useForm<TRegisterFrom>({
    mode: 'onBlur',
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const hasErrors =
    !!form.formState.errors.confirmPassword ||
    !!form.formState.errors.password ||
    !!form.formState.errors.email ||
    !!form.formState.errors.userName;

  const handleSubmit = (fromData: TRegisterFrom) => {
    console.log(fromData);
  };

  return (
    <CardWrapper
      title="Sing up"
      label="Create an account"
      backButtonHref="/"
      backButtonLabel="Already have account? Login here."
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
                    <Input {...field} placeholder="Bob Smith" isErrored={!!form.formState.errors.userName} />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
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
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      isErrored={!!form.formState.errors.confirmPassword}
                      placeholder="Confirm your password"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full bg-black hover:bg-stone-900" disabled={hasErrors}>
            Sign in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default RegisterFrom;
