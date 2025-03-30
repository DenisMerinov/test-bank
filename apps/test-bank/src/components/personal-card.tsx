import { cn } from '../lib/utils';
import CardChipIcon from '../shared/assets/icons/card-chip.svg';
import MasterCardIcon from '../shared/assets/icons/mastercard.svg';
import Card from '../shared/assets/images/card.png';

const DotsBlock = ({ size }: { size?: 'md' | 'sm' }) => {
  return (
    <div className="flex gap-1">
      <div
        className={cn(
          'size-[6px] rounded-full bg-text-primary',
          size === 'sm' && 'size-1'
        )}
      />
      <div
        className={cn(
          'size-[6px] rounded-full bg-text-primary',
          size === 'sm' && 'size-1'
        )}
      />
      <div
        className={cn(
          'size-[6px] rounded-full bg-text-primary',
          size === 'sm' && 'size-1'
        )}
      />
      <div
        className={cn(
          'size-[6px] rounded-full bg-text-primary',
          size === 'sm' && 'size-1'
        )}
      />
    </div>
  );
};

export const PersonalCard = ({ size = 'md' }: { size?: 'md' | 'sm' }) => {
  return (
    <div
      className={cn(
        'h-[220px] bg-brand rounded-xl px-[26px] py-8',
        size === 'sm' && 'h-[170px] p-4'
      )}
      style={{
        backgroundImage: `url(${Card})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex justify-between h-full">
        <div className="flex flex-col gap-2">
          <p className={cn(size === 'sm' && 'text-caption2')}>
            Available Balance
          </p>
          <p
            className={cn(
              'text-xl font-semibold',
              size === 'sm' && 'text-base'
            )}
          >
            3 345 030,78 ₽
          </p>
          <div className="flex gap-2 items-center">
            <DotsBlock size={size} />
            <DotsBlock size={size} />
            <DotsBlock size={size} />
            <DotsBlock size={size} />
            <p className={cn(size === 'sm' && 'text-caption2')}>6571</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-caption2">
              <span>Valid From </span>
              <span className="font-semibold">10/23</span>
            </p>
            <p className="text-caption2">
              <span>Valid Thru </span>
              <span className="font-semibold">10/28</span>
            </p>
          </div>
          <div className="mt-2">
            <p className="mb-[2px] text-caption2">Debit Card</p>
            <p className="font-semibold">Anton Shchurov</p>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <CardChipIcon />
          <MasterCardIcon />
        </div>
      </div>
    </div>
  );
};
