import { useState } from 'react';
import { Tabs } from '../components/tabs';
import { cn } from '../lib/utils';
import PromoImg from '../shared/assets/images/promo.png';

const formatNumberWithSpaces = (number: number) => {
  return number
    .toString()
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const TransactionItem = ({
  type,
  sum,
  date,
}: {
  type: 'deposit' | 'withdrawal';
  sum: string;
  date: string;
}) => {
  return (
    <div className="flex gap-6 items-center">
      <div className="rounded-full bg-brand size-[46px] text-xl text-bg-primary flex items-center justify-center">
        {type === 'deposit' ? 'DE' : 'TR'}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium">
          {type === 'deposit' ? 'Depositing money' : 'Transfer money'}
        </p>
        <p className="text-xs text-text-secondary">{date}</p>
      </div>

      <div className="ml-auto flex flex-col gap-1">
        <p
          className={cn(
            'text-xs font-semibold',
            type === 'deposit' ? 'text-brand' : 'text-error'
          )}
        >
          {type === 'deposit' ? '+' : '-'} {sum} ₽
        </p>
        <p className="text-caption2 text-text-secondary ml-auto font-medium">
          {type === 'deposit' ? 'Income' : 'Expend'}
        </p>
      </div>
    </div>
  );
};

const Block = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-text-secondary font-medium">{title}</p>
      {children}
    </div>
  );
};

const Transaction = () => {
  return (
    <div className="flex flex-col gap-[25px]">
      <Block title="Today">
        <TransactionItem
          type="deposit"
          sum={formatNumberWithSpaces(368304)}
          date="5 Apr 2025"
        />
        <TransactionItem
          type="withdrawal"
          sum={formatNumberWithSpaces(30000)}
          date="5 Apr 2025"
        />
      </Block>
      <Block title="Yesterday">
        <TransactionItem
          type="withdrawal"
          sum={formatNumberWithSpaces(86000.45)}
          date="4 Apr 2025"
        />
        <TransactionItem
          type="deposit"
          sum={formatNumberWithSpaces(10000)}
          date="4 Apr 2025"
        />
        <TransactionItem
          type="withdrawal"
          sum={formatNumberWithSpaces(30000)}
          date="4 Apr 2025"
        />
      </Block>
      <Block title="30 March">
        <TransactionItem
          type="deposit"
          sum={formatNumberWithSpaces(356567)}
          date="30 Mar 2025"
        />
      </Block>
    </div>
  );
};

const Message = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className="font-medium">Today</p>
      <img src={PromoImg} alt="promo" />
      <div className="flex flex-col gap-3">
        <h3>Special Movie Ticket Offer!</h3>
        <p>Pay with Our App and Save Big!</p>
        <p className="text-xs">
          Use our app to purchase your movie tickets and get a 20% discount
          instantly. Fast, easy, and secure payments with just a few taps. Offer
          valid from July 1 to July 31.
        </p>
        <p className="text-xs">Terms and conditions apply.</p>
        <p className="text-brand font-bold">Buy Tickets</p>
      </div>
    </div>
  );
};

export const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('Transactions');

  const tabs = [
    {
      title: 'Transactions',
      content: <Transaction />,
    },
    {
      title: 'Messages',
      content: <Message />,
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
