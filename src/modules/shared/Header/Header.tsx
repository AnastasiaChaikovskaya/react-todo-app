import React from 'react';
import { NotebookIcon } from 'lucide-react';
import Profile from '@/modules/shared/Profile/Profile';
import useUserStore from '@/store/UserStore';

const Header = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <>
      <div className="flex justify-center items-center px-4 lg:max-w-[1024px] lg:mx-auto">
        <div className="flex justify-between items-center w-full h-16">
          <div className="flex gap-2 items-center">
            <NotebookIcon className="h-[26px] w-[26px] text-stone-900" />
            <h1 className="text-xl font-bold leading-none text-stone-900 ">TodoApp</h1>
          </div>
          <Profile user={user} />
        </div>
      </div>
      <div className="h-[1px] w-full bg-stone-300"></div>
    </>
  );
};

export default Header;
