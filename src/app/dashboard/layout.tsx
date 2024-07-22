import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { NavigationBar } from '@/components/navigation-bar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr]">
      <NavigationBar />
      <div className="container grid grid-rows-[auto_1fr] gap-4 overflow-y-hidden py-4">
        <DashboardHeader />
        <div className="relative grid grid-cols-[auto_1fr] gap-5 overflow-y-auto">
          <DashboardSidebar />
          <main className="container pl-0 mtn-lg:pl-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
