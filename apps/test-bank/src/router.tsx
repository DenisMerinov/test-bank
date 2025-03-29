import { createBrowserRouter, Navigate } from 'react-router-dom';
import { BaseLayout } from './layout/base-layout';
import { HomePage } from './pages/home';
import { SettingsPage } from './pages/settings';
import { AccountPage } from './pages/account';
import { TransferPage } from './pages/transfer';
import { NotificationPage } from './pages/notification';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/transfer', element: <TransferPage /> },
      { path: '/account', element: <AccountPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/notification', element: <NotificationPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);
