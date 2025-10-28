interface BannerProps {
  title: string
}

import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase'
import Button from './Button';

const Banner = ({title} : BannerProps) => {
  const { user } = useAuthState();
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <h1 className="text-4xl">
        { title }
      </h1>
      {
        user
        ? <Button onClick={signOut} text="Sign Out" />
        : <Button onClick={signInWithGoogle} text="Sign In with Google" />
      }
    </div>
  );
};

export default Banner;