import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isPinValid = sessionStorage.getItem('isPinValid') === 'true';
  // const isPinValid = localStorage.getItem('isPinValid') === 'true';
  // const pinTime = parseInt(localStorage.getItem('pinActivatedAt') || '0', 10);
  // const now = Date.now();
  // const fiveMinutes = 5 * 60 * 1000;

  // if (!isPinValid || now - pinTime > fiveMinutes) {
  //   localStorage.removeItem('isPinValid');
  //   localStorage.removeItem('pinActivatedAt');
  //   sessionStorage.setItem('isPinValid', 'true');
  //   return <Navigate to="/pin" replace />;
  // }
  if (!isPinValid) {
    return <Navigate to="/pin" replace />;
  }

  return children;
}
