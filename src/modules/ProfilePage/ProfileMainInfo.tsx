import useUserStore from '@/store/UserStore';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { ArrowLeft, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTS } from '@/constants/routs';

const ProfileMainInfo = () => {
  const user = useUserStore((store) => store.user);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 items-center">
        <User className="h-7 w-7 text-stone-950 font-bold md:h-10 md:w-10" />
        <h1 className="text-3xl font-bold text-stone-950 md:text-5xl">Profile info</h1>
      </div>
      <NavLink
        to={MAIN_ROUTS.TODOS}
        className="flex gap-1 items-center text-[16px] text-stone-950 font-medium md:text-[18px]"
      >
        <ArrowLeft className="text-stone-950 h-4 w-4" />
        Back
      </NavLink>
      <div className="flex flex-col gap-2 md:flex-row md:gap-6">
        <div className="flex justify-center items-center bg-blue-800 rounded-lg w-[80px] h-[80px] md:w-[200px] md:h-[200px]">
          <span className="text-[40px] text-stone-100 md:text-[100px]">{`${user.firstName[0]}${user.lastName[0]}`}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-stone-950 md:text-[18px]">{user.firstName}</p>
          <p className="text-base font-semibold text-stone-950 md:text-[18px]">{user.lastName}</p>
          <p className="text-base font-semibold text-stone-950 md:text-[18px]">{user.email}</p>
        </div>
      </div>
      <Separator className="h-[1px] bg-gray-400" />
    </div>
  );
};

export default ProfileMainInfo;
