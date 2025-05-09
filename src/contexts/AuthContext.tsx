
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
          
          // Check if user is an admin based on email
          if (newSession.user) {
            setIsAdmin(newSession.user.email?.includes('admin') || false);
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check if user is an admin based on email
      if (currentSession?.user) {
        setIsAdmin(currentSession.user.email?.includes('admin') || false);
      }
      
      setIsLoading(false);
    }).catch((error) => {
      console.error("Error getting session:", error);
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
      console.error("Sign out error:", error);
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
