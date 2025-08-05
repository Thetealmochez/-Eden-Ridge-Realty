import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminBootstrap = () => {
  const [email, setEmail] = useState('');
  const [bootstrapKey, setBootstrapKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleBootstrap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.rpc('bootstrap_admin', {
        _email: email,
        _bootstrap_key: bootstrapKey
      });

      if (error) {
        toast.error('Bootstrap failed: ' + error.message);
        return;
      }

      if (data) {
        toast.success('Admin user successfully bootstrapped!');
        setIsVisible(false);
        setEmail('');
        setBootstrapKey('');
      } else {
        toast.error('Bootstrap failed: Invalid key, user not found, or admin already exists');
      }
    } catch (error) {
      toast.error('Bootstrap failed: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show in development or when specifically enabled
  if (process.env.NODE_ENV === 'production' && !isVisible) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 opacity-20 hover:opacity-100"
      >
        Admin
      </Button>
    );
  }

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsVisible(true)}
        className="mb-4"
      >
        Bootstrap Admin User
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Bootstrap Admin User</CardTitle>
        <CardDescription>
          Create the first admin user for this application. This can only be done once.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertDescription>
            Contact your system administrator for the bootstrap key. This is a one-time setup process.
          </AlertDescription>
        </Alert>
        
        <form onSubmit={handleBootstrap} className="space-y-4">
          <div>
            <Label htmlFor="email">User Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the email of the user to make admin"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="bootstrapKey">Bootstrap Key</Label>
            <Input
              id="bootstrapKey"
              type="password"
              value={bootstrapKey}
              onChange={(e) => setBootstrapKey(e.target.value)}
              placeholder="Enter bootstrap key"
              required
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Bootstrapping...' : 'Bootstrap Admin'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsVisible(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminBootstrap;