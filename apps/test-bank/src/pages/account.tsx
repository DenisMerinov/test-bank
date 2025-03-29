import CardIcon from '../shared/assets/icons/transfer-card.svg';
import ArrowBottomIcon from '../shared/assets/icons/arrow-bottom.svg';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { PersonalCard } from '../components/personal-card';
import { Button } from '../components/button';

export const AccountPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pb-[100px]">
        <h3>My Accounts</h3>
        <div className="bg-bg-secondary p-4 rounded-lg shadow-special z-50">
          <div className="flex rounded-2xl gap-6 items-center">
            <div className="size-[48px] flex items-center justify-center rounded-lg bg-brand-light shrink-0">
              <CardIcon />
            </div>
            <div className="flex flex-col justify-between gap-1">
              <h3 className="text-brand">3 345 030,78 ₽</h3>
              <p className="text-text-secondary">Personal</p>
            </div>
            <button
              className={cn(
                'ml-auto size-6 flex items-center justify-center',
                isOpen && 'rotate-180'
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <ArrowBottomIcon />
            </button>
          </div>
          {isOpen && (
            <div className="mt-8 px-3">
              <PersonalCard size="sm" />
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" rounded="50">
                  Switch Accounts
                </Button>
                <Button rounded="50">See Details</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Button
        fullWidth
        size="xl"
        rounded={'50'}
        className="absolute bottom-[130px] left-4 right-4"
      >
        Add Accounts
      </Button>
    </div>
  );
};
