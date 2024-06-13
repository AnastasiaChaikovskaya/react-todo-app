import React, { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types/User';
import { DoorOpen, UserIcon } from 'lucide-react';
import { useLogOut } from '@/hooks/useLogOut';

interface IProfileDropDown {
  user: User;
}

const ProfileDropDown: FC<IProfileDropDown> = ({ user }) => {
  const { logOut } = useLogOut();
  const { lastName, firstName } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center">
        <div className="flex gap-3 items-center">
          <h3 className="text-stone-900 font-semibold leading-none">{`${firstName} ${lastName}`}</h3>
          <div className=" flex justify-center items-center bg-blue-800 h-8 w-8 rounded-full">
            <span className="text-stone-100 font-bold text-base leading-none">{`${firstName[0]}${lastName[0]}`}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <UserIcon className="w-[16px] h-[16px]" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" onClick={logOut}>
          <DoorOpen className="w-[16px] h-[16px] text-red-800" />
          <p className="text-red-800">Log Out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
