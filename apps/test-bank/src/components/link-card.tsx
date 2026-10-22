import ArrowRightIcon from '../shared/assets/icons/arrow-right.svg';
import { cn } from '../lib/utils';

export const LinkCard = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        'bg-bg-secondary p-4 rounded-lg flex gap-4 items-center shadow-special',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <div className="size-8 bg-brand-light rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <p>{title}</p>
      <ArrowRightIcon className="ml-auto" />
    </div>
  );
};
