import { RouterProvider } from 'react-router-dom';
import { router } from '../router';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';
import { UserProvider } from '../shared/context/user-context';

export function App() {
  useEffect(() => {
    if (WebApp && typeof WebApp.disableVerticalSwipes === 'function') {
      try {
        WebApp.disableVerticalSwipes();
      } catch (e) {
        console.warn('disableVerticalSwipes error:', e);
      }
    }

    if (WebApp && typeof WebApp.requestFullscreen === 'function') {
      try {
        WebApp.requestFullscreen();
      } catch (e) {
        console.warn('requestFullscreen error:', e);
      }
    }
  }, []);
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
