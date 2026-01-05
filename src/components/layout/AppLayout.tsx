import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Stories } from '@/components/social/Stories';

interface AppLayoutProps {
  children: ReactNode;
  showSearch?: boolean;
  title?: string;
  showHeader?: boolean;
  showStories?: boolean;
}

export function AppLayout({ 
  children, 
  showSearch = false, 
  title, 
  showHeader = true, 
  showStories = false 
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {showHeader && <Header showSearch={showSearch} title={title} />}
        <main className="flex-1 animate-fade-in pb-20 md:pb-0">
          <div className="mx-auto max-w-md md:max-w-full md:px-6 md:py-6">
            {showStories && <Stories />}
            {children}
          </div>
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
}
