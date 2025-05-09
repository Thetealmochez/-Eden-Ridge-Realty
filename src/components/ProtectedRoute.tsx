
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isAdmin, isLoading, session } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Wait for auth status to be determined
    if (!isLoading) {
      // Add short delay to ensure auth state is fully processed
      const timer = setTimeout(() => {
        setIsChecking(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Add an extra validation of the session
  useEffect(() => {
    const validateSession = async () => {
      if (!isLoading && user) {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          // Force reload the page to clear auth state
          window.location.href = '/auth';
        }
      }
    };
    
    validateSession();
  }, [isLoading, user]);

  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-navy" />
      </div>
    );
  }

  if (!user || !session) {
    // Redirect to auth page but remember where they were trying to go
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
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
