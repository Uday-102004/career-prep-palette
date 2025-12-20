import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="gradient-hero p-2 rounded-lg">
            <span className="text-xl font-bold text-primary-foreground">PM</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">PrepMaster</h1>
            <p className="text-xs text-muted-foreground">
              {user.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
            {user.role === 'admin' ? (
              <Shield className="h-4 w-4 text-accent" />
            ) : (
              <User className="h-4 w-4 text-primary" />
            )}
            <span className="text-sm font-medium text-secondary-foreground">
              {user.role === 'admin' ? 'Admin' : user.email}
            </span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
