import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RegisterSchema } from '@/schema/index';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardWrapper from './CardWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TRegisterFrom } from '@/types/registerForm';
import useUserStore from '@/store/UserStore';
import { useNavigate } from 'react-router-dom';

function RegisterFrom() {
  const registerUser = useUserStore((state) => state.registerUser);
  const isAuth = useUserStore((state) => state.isAuth);
  const navigate = useNavigate();
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
  const hasErrors = Object.keys(form.formState.errors).length !== 0;

  const handleSubmit = async (fromData: TRegisterFrom) => {
    const { userName, email, password } = fromData;
    console.log(fromData);
    await registerUser(userName, email, password);

    if (isAuth) {
      navigate('/todos');
    }
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
