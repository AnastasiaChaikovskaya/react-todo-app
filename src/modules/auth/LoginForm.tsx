import React from 'react';
import CardWrapper from './CardWrapper';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TLoginFrom } from '@/types/loginSchema';
import { LoginSchema } from '@/schema';
import { useLoginMutation } from '@/quaries/auth';
import { Loader } from 'lucide-react';

function LoginForm() {
  const { isPending, mutate } = useLoginMutation();

  const form = useForm<TLoginFrom>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const hasErrors = Object.keys(form.formState.errors).length !== 0;

  const handleSubmit = async (formData: TLoginFrom) => {
    mutate(formData);
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
                      disabled={isPending}
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
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full bg-black gap-2 hover:bg-stone-900" disabled={hasErrors || isPending}>
            {isPending && <Loader className="w-4 h-4 animate-spin" />} Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
