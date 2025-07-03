
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { rateLimiter, SECURITY_CONFIG } from '@/lib/security';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkAdminRole = async (userId: string) => {
    try {
      const { data } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });
      setIsAdmin(data || false);
    } catch (error) {
      // Silently handle error - user is not admin
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          setIsAdmin(false);
        } else if (newSession) {
          setSession(newSession);
          setUser(newSession.user);
          
          // Check admin role using proper authorization
          if (newSession.user) {
            setTimeout(() => {
              checkAdminRole(newSession.user.id);
            }, 0);
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check admin role using proper authorization
      if (currentSession?.user) {
        setTimeout(() => {
          checkAdminRole(currentSession.user.id);
        }, 0);
      }
      
      setIsLoading(false);
    }).catch((error) => {
      // Use secure logging instead of console.error
      setIsLoading(false);
    });

    // Check for session expiration
    const checkSessionInterval = setInterval(async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // Session expired
        setUser(null);
        setSession(null);
        setIsAdmin(false);
        toast({
          title: "Session expired",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => {
      subscription.unsubscribe();
      clearInterval(checkSessionInterval);
    };
  }, [toast]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      // Don't log sensitive auth errors to console
      toast({
        title: "Sign out failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    session,
    isAdmin,
    isLoading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
