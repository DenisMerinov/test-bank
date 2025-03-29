import { cn } from '../lib/utils';

export const Tabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: { title: string; content: React.ReactNode }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <div>
      <div className="flex h-[45px] p-1 rounded-lg bg-bg-secondary shadow-special">
        <button
          className={cn(
            'flex-1 rounded-lg font-bold',
            activeTab === 'Transactions' && 'bg-brand text-bg-primary'
          )}
          onClick={() => setActiveTab('Transactions')}
        >
          <p>{tabs[0].title}</p>
        </button>
        <button
          className={cn(
            'flex-1 rounded-lg font-bold',
            activeTab === 'Messages' && 'bg-brand text-bg-primary'
          )}
          onClick={() => setActiveTab('Messages')}
        >
          <p>{tabs[1].title}</p>
        </button>
      </div>
      <div className="mt-7">
        {tabs.find((tab) => tab.title === activeTab)?.content}
      </div>
    </div>
  );
};
