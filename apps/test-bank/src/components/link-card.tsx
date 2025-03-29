import ArrowRightIcon from '../shared/assets/icons/arrow-right.svg';

export const LinkCard = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-bg-secondary p-4 rounded-lg flex gap-4 items-center shadow-special">
      <div className="size-8 bg-brand-light rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <p>{title}</p>
      <ArrowRightIcon className="ml-auto" />
    </div>
  );
};
