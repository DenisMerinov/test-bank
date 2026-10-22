import { useMemo, useState } from 'react';
import { Tabs } from '../components/tabs';
import { Button } from '../components/button';
import { cn } from '../lib/utils';
import PromoImg from '../shared/assets/images/promo.png';
import { useUser } from '../shared/context/user-context';
import {
  generateTransactions,
  Transaction as TransactionData,
  TransactionDay,
} from '../shared/lib/transactions';

const DAYS_PER_PAGE = 14;

const formatDate = (date: Date, withYear = true) =>
  date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    ...(withYear && { year: 'numeric' }),
  });

const getInitials = (title: string) =>
  title
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const TransactionItem = ({
  transaction,
}: {
  transaction: TransactionData;
}) => {
  const { formatMoney } = useUser();
  const isDeposit = transaction.type === 'deposit';

  return (
    <div className="flex gap-6 items-center">
      <div
        className={cn(
          'rounded-full size-[46px] text-base font-semibold text-bg-primary flex items-center justify-center shrink-0',
          isDeposit ? 'bg-brand' : 'bg-text-secondary'
        )}
      >
        {getInitials(transaction.title)}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium">{transaction.title}</p>
        <p className="text-xs text-text-secondary">
          {formatDate(transaction.date)}
        </p>
      </div>

      <div className="ml-auto flex flex-col gap-1 shrink-0">
        <p
          className={cn(
            'text-xs font-semibold',
            isDeposit ? 'text-brand' : 'text-error'
          )}
        >
          {isDeposit ? '+' : '-'} {formatMoney(transaction.amount)}
        </p>
        <p className="text-caption2 text-text-secondary ml-auto font-medium">
          {isDeposit ? 'Income' : 'Expend'}
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

const monthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;

const MonthFilter = ({
  months,
  active,
  onChange,
}: {
  months: Date[];
  active: string | null;
  onChange: (key: string | null) => void;
}) => {
  const chip = (key: string | null, label: string) => (
    <button
      key={key ?? 'all'}
      onClick={() => onChange(key)}
      className={cn(
        'h-[36px] px-4 rounded-[50px] font-bold whitespace-nowrap shrink-0 bg-bg-secondary shadow-special',
        active === key && 'bg-brand text-bg-primary'
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-2 [scrollbar-width:none]">
      {chip(null, 'All')}
      {months.map((month) =>
        chip(
          monthKey(month),
          month.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
        )
      )}
    </div>
  );
};

const Summary = ({ days }: { days: TransactionDay[] }) => {
  const { formatMoney } = useUser();
  const totals = days
    .flatMap((day) => day.transactions)
    .reduce(
      (acc, t) => {
        acc[t.type] += t.amount;
        return acc;
      },
      { deposit: 0, withdrawal: 0 }
    );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-bg-secondary p-4 rounded-lg shadow-special flex flex-col gap-1">
        <p className="text-caption1 text-text-secondary">Income</p>
        <p className="font-semibold text-brand">
          + {formatMoney(totals.deposit)}
        </p>
      </div>
      <div className="bg-bg-secondary p-4 rounded-lg shadow-special flex flex-col gap-1">
        <p className="text-caption1 text-text-secondary">Expend</p>
        <p className="font-semibold text-error">
          - {formatMoney(totals.withdrawal)}
        </p>
      </div>
    </div>
  );
};

const Transaction = () => {
  const { user } = useUser();
  const [visibleDays, setVisibleDays] = useState(DAYS_PER_PAGE);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);

  // Recomputed on the fly from the profile and today's date
  const allDays = useMemo(
    () => generateTransactions(user.id, user.salary),
    [user.id, user.salary]
  );

  const months = useMemo(() => {
    const unique = new Map<string, Date>();
    allDays.forEach((day) =>
      unique.set(
        monthKey(day.date),
        new Date(day.date.getFullYear(), day.date.getMonth(), 1)
      )
    );
    return [...unique.values()];
  }, [allDays]);

  const days = activeMonth
    ? allDays.filter((day) => monthKey(day.date) === activeMonth)
    : allDays;

  if (!allDays.length) {
    return (
      <p className="text-text-secondary text-center">
        No transactions yet. Set your salary in App Information.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-[25px]">
      <MonthFilter
        months={months}
        active={activeMonth}
        onChange={(key) => {
          setActiveMonth(key);
          setVisibleDays(DAYS_PER_PAGE);
        }}
      />
      <Summary days={days} />
      {days.slice(0, visibleDays).map((day) => (
        <Block key={day.date.toISOString()} title={formatDate(day.date, false)}>
          {day.transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </Block>
      ))}
      {visibleDays < days.length && (
        <Button
          variant="outline"
          rounded="50"
          size="lg"
          onClick={() => setVisibleDays((count) => count + DAYS_PER_PAGE)}
        >
          Show more
        </Button>
      )}
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
