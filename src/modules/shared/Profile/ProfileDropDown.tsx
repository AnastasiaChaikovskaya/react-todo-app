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

interface IProfileDropDown {
  user: User;
}

const ProfileDropDown: FC<IProfileDropDown> = ({ user }) => {
  const { username } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center rounded-full bg-blue-900 h-[26px] w-[26px] hover:scale-125 duration-300">
        <span className="text-stone-100 font-bold text-base leading-none">{username[0]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <UserIcon className="w-[16px] h-[16px]" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <DoorOpen className="w-[16px] h-[16px] text-red-800" />
          <p className="text-red-800">Exit</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
