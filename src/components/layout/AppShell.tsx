import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { MobileNav } from './MobileNav';
import { AppFooter } from './AppFooter';
import { WhatsAppFab } from './WhatsAppFab';
import { PageTransition } from './PageTransition';
import { ScrollProgressBar } from './ScrollProgressBar';

export function AppShell() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <ScrollProgressBar />
      <AppHeader />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <AppFooter />
      <div className="lg:hidden" style={{ height: 'calc(68px + env(safe-area-inset-bottom))' }} />
      <MobileNav />
      <WhatsAppFab />
    </div>
  );
}
