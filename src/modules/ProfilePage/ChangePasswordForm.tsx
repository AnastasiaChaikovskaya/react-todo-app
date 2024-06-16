import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdatePassword } from '@/quaries/update-password';
import { UpdatePassWordSchema } from '@/schema';
import { TUpdatePasswordForm } from '@/types/updatePasswordForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

const ChangePasswordForm = () => {
  const { isPending, mutate } = useUpdatePassword();
  const form = useForm<TUpdatePasswordForm>({
    mode: 'onBlur',
    resolver: zodResolver(UpdatePassWordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });
  const hasErrors = Object.keys(form.formState.errors).length !== 0;

  const handleSubmit = (formData: TUpdatePasswordForm) => {
    mutate(formData, {
      onSuccess: () => {
        form.reset({
          password: '',
          newPassword: '',
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="Write you current password"
                  isErrored={!!form.formState.errors.password}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="Write your new password"
                  isErrored={!!form.formState.errors.newPassword}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={hasErrors || isPending} className="md:max-w-fit">
          {isPending && <Loader className="h-4 w-4" />}
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
