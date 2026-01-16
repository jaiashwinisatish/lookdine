import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
}

export function AppLayout({ 
  children, 
  title, 
  showHeader = true, 
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* 1. Sidebar: Desktop only (Hidden on mobile) */}
      <Sidebar title={title} />

      {/* 2. Main Content Wrapper */}
      <div className="flex flex-1 flex-col min-w-0 relative">
        
        {/* 3. Header: Mobile only (md:hidden is inside Header) */}
        {showHeader && <Header title={title} />}

        {/* 4. Scrollable Content Area */}
        <main className={cn(
          "flex-1 w-full mx-auto transition-all duration-300",
          /* Mobile: Add padding-bottom so content isn't hidden by BottomNav */
          "pb-20 md:pb-0",
          /* Desktop: Add standard spacing */
          "md:p-6 lg:p-8"
        )}>
          {/* Inner Container: Constrains width for better readability on large screens */}
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>

        {/* 5. Bottom Navigation: Mobile only (md:hidden is inside BottomNav) */}
        <BottomNavigation />
      </div>
    </div>
  );
}

