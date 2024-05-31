import React, { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AuthHeader from './AuthHeader';
import BackButton from './BackButton';

interface IWrapperProps {
  title: string;
  label: string;
  backButtonHref: string;
  backButtonLabel: string;
  children?: React.ReactNode;
}

const CardWrapper: FC<IWrapperProps> = ({ title, label, backButtonHref, backButtonLabel, children }) => {
  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader className="flex flex-col items-center gap-1">
        <h1 className="text-2xl font-bold md:text-3xl">Welcome to Todo app!</h1>
        <AuthHeader title={title} label={label} />
      </CardHeader>
      <CardContent className="w-full">{children}</CardContent>
      <CardFooter className="flex justify-center">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
