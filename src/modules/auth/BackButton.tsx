import { Button } from '@/components/ui/button';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface IBackButtonProps {
  label: string;
  href: string;
}

const BackButton: FC<IBackButtonProps> = ({ label, href }) => {
  return (
    <Button variant="link" className="font-normal" size="default" asChild>
      <NavLink to={href} className="text-xs font-semibold md:text-sm">
        {label}
      </NavLink>
    </Button>
  );
};

export default BackButton;
