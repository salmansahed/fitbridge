import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-neutral-900/40">
      <DashboardSidebar />

      <div className="w-full flex flex-col min-w-0">
        <DashboardNavbar />
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
