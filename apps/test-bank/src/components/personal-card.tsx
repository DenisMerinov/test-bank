import { cn } from '../lib/utils';
import CardChipIcon from '../shared/assets/icons/card-chip.svg';
import MasterCardIcon from '../shared/assets/icons/mastercard.svg';
import Card from '../shared/assets/images/card.png';
import { useUser } from '../shared/context/user-context';

const DotsBlock = ({
  size,
  includeNumbers,
}: {
  size?: 'md' | 'sm';
  includeNumbers?: string;
}) => {
  return (
    <div className="flex gap-1 items-center">
      {includeNumbers ? (
        <p className={cn(size === 'sm' && 'text-caption2')}>{includeNumbers}</p>
      ) : (
        <>
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
        </>
      )}
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
  const { user, formatMoney } = useUser();

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
            {formatMoney(user.balance)}
          </p>
          <div className="flex gap-2 items-center">
            <p className={cn(size === 'sm' && 'text-caption2')}>5536</p>
            <DotsBlock size={size} includeNumbers="91" />
            <DotsBlock size={size} />
            <p className={cn(size === 'sm' && 'text-caption2')}>7305</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-caption2 mr-2">
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
            <p className="font-semibold">{user.name}</p>
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
