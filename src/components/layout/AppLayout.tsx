import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { Header } from './Header';

interface AppLayoutProps {
  children: ReactNode;
  showSearch?: boolean;
  title?: string;
  showHeader?: boolean;
}

export function AppLayout({ children, showSearch = false, title, showHeader = true }: AppLayoutProps) {
  return (
    <div className="app-container min-h-screen bg-background">
      {showHeader && <Header showSearch={showSearch} title={title} />}
      <main className="page-content animate-fade-in">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
