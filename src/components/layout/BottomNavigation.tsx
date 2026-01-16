import { Home, Search, MessageSquare, MapPin, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: MapPin, label: 'Nearby', path: '/nearby' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: MessageSquare, label: 'Messages', path: '/chat' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md md:hidden pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          // Check if the current path matches the item path
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full transition-all duration-300",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {/* Active Indicator Background */}
              {isActive && (
                <div className="absolute inset-x-4 inset-y-2 bg-primary/10 rounded-xl -z-10 animate-in fade-in zoom-in duration-300" />
              )}

              <Icon 
                className={cn(
                  "h-6 w-6 transition-transform duration-300",
                  isActive ? "scale-110" : "scale-100"
                )} 
              />
              
              <span className={cn(
                "text-[10px] mt-1 font-semibold transition-all duration-300",
                isActive ? "opacity-100 translate-y-0" : "opacity-70"
              )}>
                {item.label}
              </span>

              {/* Bottom Dot Indicator */}
              {isActive && (
                <div className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}