import HomeIcon from '../shared/assets/icons/home.svg';
import SettingIcon from '../shared/assets/icons/setting.svg';
import AccountIcon from '../shared/assets/icons/account.svg';
import TransferIcon from '../shared/assets/icons/transfer.svg';
import ScanIcon from '../shared/assets/icons/scan.svg';
import FooterBg from '../shared/assets/images/footer-bg.png';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const AppLink = ({
  to,
  text,
  Icon,
  isActive,
}: {
  to: string;
  text: string;
  Icon?: React.ReactNode;
  isActive?: boolean;
}) => {
  return (
    <Link
      to={to}
      className={cn(
        'flex flex-col items-center gap-1',
        isActive && 'text-brand'
      )}
    >
      {Icon}
      <p className="text-caption2">{text}</p>
    </Link>
  );
};

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-around gap-2 w-full">
      {children}
    </div>
  );
};

const ScanButton = () => {
  return (
    <div className="bg-[#2CB43C] rounded-full size-[55px] shrink-0 flex items-center justify-center absolute top-[-30px] left-1/2 -translate-x-1/2">
      <ScanIcon />
    </div>
  );
};

export const Footer = () => {
  const pathname = useLocation().pathname;

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className="h-[83px] flex items-center justify-between relative"
      style={{
        backgroundImage: `url(${FooterBg})`,
        backgroundPosition: 'center bottom',
      }}
    >
      <Section>
        <AppLink
          to="/"
          text="Home"
          Icon={<HomeIcon className="size-6" />}
          isActive={isActive('/')}
        />

        <AppLink
          to="/transfer"
          text="Transfer"
          Icon={<TransferIcon className="size-6" />}
          isActive={isActive('/transfer')}
        />
      </Section>
      <div className="w-[90px]">
        <ScanButton />
      </div>
      <Section>
        <AppLink
          to="/account"
          text="Account"
          Icon={<AccountIcon className="size-6" />}
          isActive={isActive('/account')}
        />
        <AppLink
          to="/settings"
          text="Settings"
          Icon={<SettingIcon className="size-6" />}
          isActive={isActive('/settings')}
        />
      </Section>
    </div>
  );
};
