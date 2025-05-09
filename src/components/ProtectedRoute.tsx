
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait for auth status to be determined
    if (!isLoading) {
      setIsChecking(false);
    }
  }, [isLoading]);

  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-navy" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-luxury-navy mb-4">Access Denied</h1>
        <p className="text-luxury-slate text-center max-w-md">
          You do not have permission to view this page. This area is restricted to administrators only.
        </p>
        <a href="/" className="mt-6 text-luxury-navy hover:text-luxury-gold">
          Return to Home Page
        </a>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
