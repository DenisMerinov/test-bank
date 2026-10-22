import { useEffect, useState } from 'react';
import { Avatar } from '../components/avatar';
import { Button } from '../components/button';
import { cn } from '../lib/utils';
import { USD_RATE } from '../shared/consts/user.const';
import { useUser } from '../shared/context/user-context';
import { PinInput } from './pin';

const CurrencySwitch = ({
  isUsd,
  onToggle,
}: {
  isUsd: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      role="switch"
      aria-checked={isUsd}
      aria-label="Show balance in dollars"
      onClick={onToggle}
      className="relative w-[76px] h-[36px] p-1 rounded-[50px] bg-brand-light shrink-0"
    >
      <div
        className={cn(
          'absolute top-1 left-1 size-[28px] rounded-full bg-brand transition-transform duration-300',
          isUsd && 'translate-x-[40px]'
        )}
      />
      <div className="relative flex h-full items-center justify-around font-bold">
        <span className={cn(!isUsd && 'text-bg-primary')}>₽</span>
        <span className={cn(isUsd && 'text-bg-primary')}>$</span>
      </div>
    </button>
  );
};

const parseBalance = (value: string) => {
  const normalized = value.replace(/\s/g, '').replace(',', '.');
  if (!/^\d+(\.\d{0,2})?$/.test(normalized)) return null;
  return Number(normalized);
};

// The PIN is asked on every visit: state resets when the page unmounts
export const AppInfoPage = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="pt-10">
        <PinInput onSuccess={() => setIsUnlocked(true)} />
      </div>
    );
  }

  return <AppInfoSettings />;
};

const AppInfoSettings = () => {
  const {
    user,
    profiles,
    currency,
    setActiveProfile,
    setBalance,
    setSalary,
    setCurrency,
    formatMoney,
  } = useUser();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3>Profile</h3>
        {profiles.map((profile) => {
          const isActive = profile.id === user.id;
          return (
            <button
              key={profile.id}
              onClick={() => setActiveProfile(profile.id)}
              className={cn(
                'bg-bg-secondary p-4 rounded-lg flex gap-4 items-center shadow-special text-left border border-transparent',
                isActive && 'border-brand'
              )}
            >
              <Avatar user={profile} className="size-[48px] text-base" />
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{profile.name}</p>
                <p className="text-caption1 text-text-secondary">
                  {formatMoney(profile.balance)}
                </p>
              </div>
              <div
                className={cn(
                  'ml-auto size-5 rounded-full border-2 border-text-secondary flex items-center justify-center shrink-0',
                  isActive && 'border-brand'
                )}
              >
                {isActive && <div className="size-2.5 rounded-full bg-brand" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <h3>Currency</h3>
        <div className="bg-bg-secondary p-4 rounded-lg flex gap-4 items-center shadow-special">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">
              {currency === 'USD' ? 'US Dollar' : 'Russian Ruble'}
            </p>
            <p className="text-caption1 text-text-secondary">
              1 $ ={' '}
              {USD_RATE.toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB',
              })}
            </p>
          </div>
          <div className="ml-auto">
            <CurrencySwitch
              isUsd={currency === 'USD'}
              onToggle={() => setCurrency(currency === 'USD' ? 'RUB' : 'USD')}
            />
          </div>
        </div>
      </div>

      <AmountField
        key={`balance-${user.id}`}
        title="Balance"
        hint="Current balance"
        value={user.balance}
        onSave={setBalance}
      />
      <AmountField
        key={`salary-${user.id}`}
        title="Salary"
        hint="Paid on the 15th of every month"
        value={user.salary}
        onSave={setSalary}
      />
    </div>
  );
};

const AmountField = ({
  title,
  hint,
  value,
  onSave,
}: {
  title: string;
  hint: string;
  value: number;
  onSave: (value: number) => void;
}) => {
  const { user, formatMoney } = useUser();
  const [input, setInput] = useState(String(value));
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setInput(String(value));
  }, [value]);

  const parsed = parseBalance(input);
  const isChanged = parsed !== null && parsed !== value;

  return (
    <div className="flex flex-col gap-4">
      <h3>{title}</h3>
      <div
        className={cn(
          'h-[45px] flex items-center bg-bg-secondary rounded-lg px-4 shadow-special border border-transparent',
          parsed === null && 'border-error'
        )}
      >
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsSaved(false);
          }}
          inputMode="decimal"
          placeholder="0"
          aria-label={title}
          className="flex-1 bg-transparent outline-none"
        />
        <p className="text-text-secondary">₽</p>
      </div>
      <p
        className={`text-caption2 font-semibold ${
          parsed === null ? 'text-error' : 'text-text-secondary'
        }`}
      >
        {parsed === null
          ? 'Enter a valid amount'
          : isSaved
          ? `Saved for ${user.name}`
          : `${hint} : ${formatMoney(value)}`}
      </p>
      <Button
        fullWidth
        size="xl"
        rounded="50"
        disabled={!isChanged}
        onClick={() => {
          if (parsed === null) return;
          onSave(parsed);
          setIsSaved(true);
        }}
      >
        Save {title}
      </Button>
    </div>
  );
};
