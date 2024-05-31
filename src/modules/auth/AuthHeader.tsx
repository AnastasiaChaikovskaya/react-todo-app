import React, { FC } from 'react';

interface IAuthHeaderProps {
  title: string;
  label: string;
}

const AuthHeader: FC<IAuthHeaderProps> = ({ label, title }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-xl font-semibold md:text-3xl">{title}</h1>
      <p className="text-muted-foreground text-xs md:text-sm">{label}</p>
    </div>
  );
};

export default AuthHeader;
