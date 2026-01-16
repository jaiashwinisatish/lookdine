import { useState } from 'react';
import { Home, MapPin, Calendar, MessageCircle, User, LogOut, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '../theme';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  title?: string;
}

export function Sidebar({ title }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: MapPin, label: 'Nearby', path: '/nearby' },
    { icon: Calendar, label: 'Book', path: '/book' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <aside 
      className={cn(
        "hidden md:flex h-screen flex-col border-r bg-card sticky top-0 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header & Dynamic Title */}
      <div className="p-4 flex items-center justify-between min-h-[73px]">
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div 
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary font-bold text-white cursor-pointer"
              onClick={() => navigate('/')}
            >
              L
            </div>
            <span className="text-lg font-bold truncate">
              {title || "LookDine"}
            </span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(isCollapsed && "mx-auto")}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 border-t flex items-center justify-between">
  {!isCollapsed && <span className="text-sm font-medium">Appearance</span>}
  <ThemeToggle />
</div>

      {/* Profile Section */}
      <div className="p-3 border-t">
        {isAuthenticated && user && (
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold truncate">{user.name}</span>
              <span className="text-xs text-muted-foreground truncate">{user.email}</span>
            </div>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          className={cn(
            "w-full mt-2 text-muted-foreground justify-start gap-3", 
            isCollapsed && "px-0 justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Log Out</span>}
        </Button>
      </div>
    </aside>
  );
}
