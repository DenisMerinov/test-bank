import { LinkCard } from '../components/link-card';

import LockIcon from '../shared/assets/icons/lock.svg';
import ShieldIcon from '../shared/assets/icons/shield.svg';
import InfoIcon from '../shared/assets/icons/info.svg';
import PhotoImg from '../shared/assets/images/photo.png';
import EditIcon from '../shared/assets/icons/edit.svg';

export const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 items-center bg-bg-secondary p-5 rounded-2xl relative shadow-special">
        <img src={PhotoImg} alt="photo" className="size-[100px] rounded-full" />
        <div className="absolute right-6 top-4 size-6 flex items-center justify-center">
          <EditIcon />
        </div>
        <div className="flex flex-col gap-2">
          <h3>Anton Shchurov</h3>
          <p className="text-text-secondary">AntonSh@gmail.com</p>
          <p className="text-text-secondary">+7 (999) 668-16-06</p>
        </div>
      </div>
      <LinkCard title="Change Password" icon={<LockIcon />} />
      <LinkCard title="Change Pin" icon={<ShieldIcon />} />
      <LinkCard title="App Information" icon={<InfoIcon />} />
    </div>
  );
};
