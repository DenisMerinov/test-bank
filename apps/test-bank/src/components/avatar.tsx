import { cn } from '../lib/utils';
import { UserProfile } from '../shared/consts/user.const';

export const Avatar = ({
  user,
  className,
}: {
  user: UserProfile;
  className?: string;
}) => {
  if (user.photo) {
    return (
      <img
        src={user.photo}
        alt={user.name}
        className={cn('size-[100px] rounded-full object-cover', className)}
      />
    );
  }

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <div
      className={cn(
        'size-[100px] rounded-full bg-brand text-bg-primary text-xl font-semibold flex items-center justify-center shrink-0',
        className
      )}
    >
      {initials}
    </div>
  );
};
