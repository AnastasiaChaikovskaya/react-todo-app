import { User } from '@/types/User';
import React, { FC } from 'react';
import ProfileDropDown from './ProfileDropDown';

interface IProfile {
  user: User;
}

const Profile: FC<IProfile> = ({ user }) => {
  const { username } = user;
  return (
    <div className="flex items-center gap-3">
      <div>
        <h3 className="text-stone-900 font-semibold leading-none">{username}</h3>
      </div>
      <ProfileDropDown user={user} />
    </div>
  );
};

export default Profile;
