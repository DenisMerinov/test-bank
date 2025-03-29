import CardlessIcon from '../shared/assets/icons/cardless.svg';
import EMoneyIcon from '../shared/assets/icons/e-money.svg';
import SavingsIcon from '../shared/assets/icons/saving.svg';
import WifiIcon from '../shared/assets/icons/wifi.svg';
import BillIcon from '../shared/assets/icons/bills.svg';
import OthersIcon from '../shared/assets/icons/other.svg';
import { PersonalCard } from '../components/personal-card';

const Action = ({ title, icon }: { title: string; icon: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-bg-secondary rounded-2xl w-full py-4 shadow-special">
      <div className="size-8 rounded-lg bg-brand-light flex items-center justify-center">
        {icon}
      </div>
      <p className="text-center">{title}</p>
    </div>
  );
};

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <PersonalCard />
      <div>
        <h3 className="mb-6">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-8">
          <Action title="Cardless" icon={<CardlessIcon />} />
          <Action title="Pay Bills" icon={<BillIcon />} />
          <Action title="E - Money" icon={<EMoneyIcon />} />
          <Action title="Internet" icon={<WifiIcon />} />
          <Action title="Savings" icon={<SavingsIcon />} />
          <Action title="Others" icon={<OthersIcon />} />
        </div>
      </div>
    </div>
  );
};
