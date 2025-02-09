import { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import Sidebar from './SideBar';
import Header from './Header';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header Component */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {/* Render nested routes here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;