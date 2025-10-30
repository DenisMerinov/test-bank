import ArrowBottomIcon from '../shared/assets/icons/arrow-bottom.svg';

import BankIcon from '../shared/assets/icons/transfer-bank.svg';
import CardIcon from '../shared/assets/icons/transfer-card.svg';
import EMoneyIcon from '../shared/assets/icons/transfer-emoney.svg';

import { LinkCard } from '../components/link-card';
import { USER_DATA } from '../shared/consts/user.const';
export const TransferPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 mb-10">
        <h3>Choose Card</h3>
        <div className="h-[45px] flex justify-between items-center bg-bg-secondary rounded-lg px-4 shadow-special">
          <p>Debit</p>
          <p>**** **** **** 7305</p>
          <ArrowBottomIcon />
        </div>
        <p className="text-caption2 text-text-secondary font-semibold">
          Available balance :{' '}
          {USER_DATA.balance.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
          })}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h3>Choose Transfer</h3>
        <LinkCard title="Transfer Bank to Bank" icon={<BankIcon />} />
        <LinkCard title="Transfer Card to Card" icon={<CardIcon />} />
        <LinkCard title="Transfer E-Money" icon={<EMoneyIcon />} />
      </div>
    </div>
  );
};
