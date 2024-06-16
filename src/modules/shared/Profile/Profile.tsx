import { User } from '@/types/User';
import { FC } from 'react';
import ProfileDropDown from './ProfileDropDown';

interface IProfile {
  user: User;
}

const Profile: FC<IProfile> = ({ user }) => {
  return <ProfileDropDown user={user} />;
};

export default Profile;
