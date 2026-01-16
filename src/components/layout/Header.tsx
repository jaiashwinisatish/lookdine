import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppMode } from '@/context/AppModeContext';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../theme';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { isTeenMode } = useAppMode();
  const navigate = useNavigate();

  return (
    /* md:hidden makes this header visible ONLY on mobile screens */
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Left: Logo & Dynamic Title */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded font-bold text-white",
              isTeenMode ? "bg-secorday" : "bg-primary"
            )}
            onClick={() => navigate('/')}
          >
            L
          </div>
          <h1 className="text-lg font-bold tracking-tight truncate max-w-[150px]">
            {title || "LookDine"}
          </h1>
        </div>

        {/* Right: Simple Icons */}
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
          <ThemeToggle/>
          {/* <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button> */}
        </div>
      </div>
    </header>
  );
}