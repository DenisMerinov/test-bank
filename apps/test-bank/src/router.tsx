import { createBrowserRouter, Navigate } from 'react-router-dom';
import { BaseLayout } from './layout/base-layout';
import { HomePage } from './pages/home';
import { SettingsPage } from './pages/settings';
import { AccountPage } from './pages/account';
import { TransferPage } from './pages/transfer';
import { NotificationPage } from './pages/notification';
import { PinPage } from './pages/pin';
import { ProtectedRoute } from './components/protected-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <BaseLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/transfer', element: <TransferPage /> },
      { path: '/account', element: <AccountPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/notification', element: <NotificationPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
  {
    path: '/pin',
    element: <PinPage />,
  },
]);
