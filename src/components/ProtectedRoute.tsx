import { Navigate, useLocation } from 'react-router-dom';
import authService from '../services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  // Jika belum login, redirect ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Jika sudah login, tampilkan halaman yang diminta
  return <>{children}</>;
}
