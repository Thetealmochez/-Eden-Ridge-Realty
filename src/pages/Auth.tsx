
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useEffect } from 'react';

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Redirect to home if already logged in
        navigate('/');
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!registerEmail || !registerPassword || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // Check password strength
    if (registerPassword.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        toast({
          title: "Registration Successful",
          description: "Please check your email for verification.",
        });
        
        // Automatically sign in the user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: registerEmail,
          password: registerPassword,
        });
        
        if (!signInError) {
          navigate('/');
        }
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-luxury-navy">Evans Kenya Homes</h1>
          <p className="mt-2 text-sm text-luxury-slate">Secure access to your luxury real estate platform</p>
        </div>
        
        <div className="bg-white p-8 shadow-xl rounded-lg">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="data-[state=active]:bg-luxury-navy data-[state=active]:text-white">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-luxury-navy data-[state=active]:text-white">
                Register
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <a href="#" className="text-sm text-luxury-navy hover:text-luxury-gold">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input 
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4 text-luxury-slate" />
                      ) : (
                        <Eye className="h-4 w-4 text-luxury-slate" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-luxury-navy hover:bg-luxury-navy/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="register-password"
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="h-4 w-4 text-luxury-slate" />
                      ) : (
                        <Eye className="h-4 w-4 text-luxury-slate" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-luxury-slate">
                    Password must be at least 8 characters long.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-luxury-slate" />
                      ) : (
                        <Eye className="h-4 w-4 text-luxury-slate" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-luxury-navy hover:bg-luxury-navy/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-luxury-navy hover:text-luxury-gold text-sm">
              Back to Home
            </a>
          </div>
        </div>
        
        <div className="text-center text-sm text-luxury-slate">
          <p>
            Protected by industry-standard encryption and security protocols.
          </p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} Evans Kenya Homes. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
