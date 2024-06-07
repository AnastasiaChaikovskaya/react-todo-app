import { NotebookIcon } from 'lucide-react';
import React from 'react';
import Profile from '@/modules/shared/Profile/Profile';
import { User } from '@/types/User';

const user1: User = {
  id: 4,
  username: 'Knton Gig',
  email: 'dadad@gamil.com',
};

const Header = () => {
  return (
    <>
      <div className="flex justify-center items-center px-4 lg:max-w-[1024px] lg:mx-auto">
        <div className="flex justify-between items-center w-full h-16">
          <div className="flex gap-2 items-center">
            <NotebookIcon className="h-[26px] w-[26px] text-stone-900" />
            <h1 className="text-xl font-bold leading-none text-stone-900 ">TodoApp</h1>
          </div>
          <Profile user={user1} />
        </div>
      </div>
      <div className="h-[1px] w-full bg-stone-300"></div>
    </>
  );
};

export default Header;
