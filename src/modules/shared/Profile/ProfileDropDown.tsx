import { FC } from 'react';
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
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTS } from '@/constants/routs';

interface IProfileDropDown {
  user: User;
}

const ProfileDropDown: FC<IProfileDropDown> = ({ user }) => {
  const { logOut } = useLogOut();
  const { lastName, firstName } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center">
        <div className="flex gap-1 items-center md:gap-3">
          <h3 className="text-stone-900 font-semibold leading-none">{`${firstName} ${lastName}`}</h3>
          <div className=" flex justify-center items-center bg-blue-800 h-8 w-8 rounded-full">
            <span className="text-stone-100 font-bold text-base leading-[0px]">{`${firstName[0]}${lastName[0]}`}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <UserIcon className="w-[16px] h-[16px]" />
          <NavLink to={MAIN_ROUTS.PROFILE}>Profile</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={logOut}>
          <DoorOpen className="w-[16px] h-[16px] text-red-800" />
          <p className="text-red-800">Log Out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
