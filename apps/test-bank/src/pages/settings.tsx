import { LinkCard } from '../components/link-card';

import LockIcon from '../shared/assets/icons/lock.svg';
import ShieldIcon from '../shared/assets/icons/shield.svg';
import InfoIcon from '../shared/assets/icons/info.svg';
import EditIcon from '../shared/assets/icons/edit.svg';
import { USER_DATA } from '../shared/consts/user.const';

export const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 items-center bg-bg-secondary p-5 rounded-2xl relative shadow-special">
        <img
          src={USER_DATA.photo}
          alt="photo"
          className="size-[100px] rounded-full"
        />
        <div className="absolute right-6 top-4 size-6 flex items-center justify-center">
          <EditIcon />
        </div>
        <div className="flex flex-col gap-2">
          <h3>{USER_DATA.name}</h3>
          <p className="text-text-secondary">{USER_DATA.email}</p>
          <p className="text-text-secondary">{USER_DATA.phone}</p>
        </div>
      </div>
      <LinkCard title="Change Password" icon={<LockIcon />} />
      <LinkCard title="Change Pin" icon={<ShieldIcon />} />
      <LinkCard title="App Information" icon={<InfoIcon />} />
    </div>
  );
};
