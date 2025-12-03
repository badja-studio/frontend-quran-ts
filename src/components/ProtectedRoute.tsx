import { Navigate, useLocation } from 'react-router-dom';
import authService from '../services/auth.service';

type UserRole = 'admin' | 'assessor' | 'participant';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole() as UserRole | null;

  // Jika belum login, redirect ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Jika ada role yang diizinkan dan user role tidak termasuk di dalamnya
  if (allowedRoles && allowedRoles.length > 0 && userRole) {
    if (!allowedRoles.includes(userRole)) {
      // Redirect berdasarkan role user
      if (userRole === 'admin') {
        return <Navigate to="/dashboard/admin" replace />;
      } else if (userRole === 'assessor') {
        return <Navigate to="/dashboard/asesor/siap-asesmen" replace />;
      } else if (userRole === 'participant') {
        return <Navigate to="/peserta" replace />;
      }
    }
  }

  // Jika sudah login dan memiliki role yang sesuai, tampilkan halaman yang diminta
  return <>{children}</>;
}
