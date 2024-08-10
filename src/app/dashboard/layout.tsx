import { NavigationBar } from '@/components/navigation-bar';

import { DashboardHeader } from './_components/dashboard-header';
import { DashboardSidebar } from './_components/dashboard-sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr]">
      <NavigationBar />
      <div className="container grid grid-cols-[auto_1fr] gap-4 overflow-y-hidden py-4">
        <DashboardSidebar />
        <div className="relative grid grid-rows-[auto_1fr] gap-5 overflow-y-auto">
          <DashboardHeader />
          <div className="no-scrollbar overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
