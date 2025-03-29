import { cn } from '../lib/utils';

export const ActionIcon = ({
  icon,
  onClick,
  className,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        'size-[30px] bg-[#F7F7F7] rounded-sm shadow-special flex items-center justify-center cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
