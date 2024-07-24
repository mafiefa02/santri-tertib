import { NavigationBar } from '@/components/navigation-bar';

import { DashboardSidebar } from './_components/dashboard-sidebar';

export const revalidate = 180; // default to revalidate every 3 minutes;

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
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
