import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import ArrowLeftIcon from '../shared/assets/icons/arrow-left.svg';
import { ActionIcon } from '../components/action-icon';
import BellIcon from '../shared/assets/icons/bell.svg';
import SoundIcon from '../shared/assets/icons/sound.svg';

export const Header = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const titles: Record<string, string> = {
    '/transfer': 'Transfer',
    '/account': 'Accounts',
    '/settings': 'Settings',
    '/notification': 'Notification',
  };

  const isHome = pathname === '/';
  const isNotification = pathname === '/notification';
  return (
    <div
      className={cn(
        'h-[31px] w-full relative flex items-center px-4',
        isHome && 'h-[48px] flex'
      )}
    >
      {!isHome && (
        <ActionIcon
          icon={<ArrowLeftIcon />}
          onClick={() => {
            navigate(-1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
      )}
      <div className={cn('flex-1 text-center', isHome && 'text-left')}>
        {isHome ? (
          <div>
            <p className="text-text-secondary">Hi,</p>
            <h2>Anton Shchurov</h2>
          </div>
        ) : (
          <h2>{titles[pathname] || ''}</h2>
        )}
      </div>
      {!isNotification && (
        <div className="absolute right-4 flex gap-4">
          <ActionIcon
            icon={<BellIcon />}
            onClick={() => {
              navigate('/notification');
            }}
          />
          <ActionIcon icon={<SoundIcon />} onClick={() => {}} />
        </div>
      )}
    </div>
  );
};
