import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RegisterSchema } from '@/schema/index';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardWrapper from './CardWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TRegisterFrom } from '@/types/registerForm';
import { useRegisterMutation } from '@/quaries/auth';
import { Loader } from 'lucide-react';

function RegisterFrom() {
  const { isPending, mutate } = useRegisterMutation();
  const form = useForm<TRegisterFrom>({
    mode: 'onBlur',
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const hasErrors = Object.keys(form.formState.errors).length !== 0;

  const handleSubmit = async (formData: TRegisterFrom) => {
    const { firstName, lastName, email, password } = formData;
    mutate({ firstName, lastName, email, password });
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
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Bob Smith"
                      isErrored={!!form.formState.errors.firstName}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Bob Smith"
                      isErrored={!!form.formState.errors.lastName}
                    />
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                      disabled={isPending}
                      isErrored={!!form.formState.errors.confirmPassword}
                      placeholder="Confirm your password"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full bg-black hover:bg-stone-900" disabled={hasErrors || isPending}>
            {isPending && <Loader className="w-4 h-4 animate-spin" />} Sign in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default RegisterFrom;
