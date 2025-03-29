import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './footer';
import { Header } from './header';
import { cn } from '../lib/utils';
export const BaseLayout: React.FC = () => {
  const pathname = useLocation().pathname;

  const isHome = pathname === '/';
  const isPin = pathname === '/pin';

  return (
    <div className="mx-auto pt-[100px] flex h-screen max-w-[900px] flex-col">
      {!isPin && <Header />}
      <main
        className={cn(
          'flex-1 pb-10 px-4 overflow-y-auto',
          isHome ? 'pt-8' : 'pt-10'
        )}
      >
        <Outlet />
      </main>
      {!isPin && <Footer />}
    </div>
  );
};
