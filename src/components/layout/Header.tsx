import { Search, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppMode } from '@/context/AppModeContext';
import { cn } from '@/lib/utils';
import { Stories } from '@/components/social/Stories';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showSearch?: boolean;
  title?: string;
}

export function Header({ showSearch = false, title }: HeaderProps) {
  const { isTeenMode } = useAppMode();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-card/95 backdrop-blur-lg safe-top">
      <div className="mx-auto flex w-full max-w-md md:max-w-full items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl font-bold text-primary-foreground",
              isTeenMode ? "gradient-teen" : "gradient-primary"
            )}
            onClick={() => navigate('/')}
          >
            L
          </div>
          {title ? (
            <h1 className="text-lg font-semibold">{title}</h1>
          ) : (
            <span className="text-lg font-bold">LookDine</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="iconSm" className="relative" onClick={() => navigate('/notifications')}>
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>
          <Button variant="ghost" size="iconSm" onClick={() => navigate('/settings')}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {showSearch && (
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cafés, restaurants, or people..."
              className="h-11 rounded-xl border-0 bg-muted pl-10 pr-4"
            />
          </div>
        </div>
      )}

      <Stories />
    </header>
  );
}
