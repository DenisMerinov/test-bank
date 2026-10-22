import { useNavigate } from 'react-router-dom';
import { LinkCard } from '../components/link-card';
import { Avatar } from '../components/avatar';

import LockIcon from '../shared/assets/icons/lock.svg';
import ShieldIcon from '../shared/assets/icons/shield.svg';
import InfoIcon from '../shared/assets/icons/info.svg';
import EditIcon from '../shared/assets/icons/edit.svg';
import { useUser } from '../shared/context/user-context';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 items-center bg-bg-secondary p-5 rounded-2xl relative shadow-special">
        <Avatar user={user} />
        <div className="absolute right-6 top-4 size-6 flex items-center justify-center">
          <EditIcon />
        </div>
        <div className="flex flex-col gap-2 items-center text-center">
          <h3>{user.name}</h3>
          <p className="text-text-secondary">{user.email}</p>
          <p className="text-text-secondary">{user.phone}</p>
        </div>
      </div>
      <LinkCard title="Change Password" icon={<LockIcon />} />
      <LinkCard title="Change Pin" icon={<ShieldIcon />} />
      <LinkCard
        title="App Information"
        icon={<InfoIcon />}
        onClick={() => navigate('/app-info')}
      />
    </div>
  );
};
