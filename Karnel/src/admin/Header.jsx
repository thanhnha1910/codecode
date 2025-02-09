import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserProvider';
import { 
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineChartBar,
  HiOutlineCube,
  HiOutlineViewGrid,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup
} from 'react-icons/hi';

const DashboardStats = () => (
  <div className="hidden lg:flex items-center space-x-6 ml-8">
    
   
  </div>
);

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Mock notifications
  useEffect(() => {
    setNotifications([
      { id: 1, message: "New tour booking received", time: "5 mins ago", icon: <HiOutlineCube className="text-blue-500" /> },
      { id: 2, message: "System update completed", time: "1 hour ago", icon: <HiOutlineChartBar className="text-green-500" /> },
      { id: 3, message: "New user registration", time: "2 hours ago", icon: <HiOutlineUser className="text-purple-500" /> },
    ]);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 2xl:px-11">
        {/* Left Side - Logo and Stats */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sidebarOpen ? (
              <HiOutlineX className="h-6 w-6 text-gray-600" />
            ) : (
              <HiOutlineMenu className="h-6 w-6 text-gray-600" />
            )}
          </button>
          
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="hidden lg:flex items-center space-x-3 px-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
                <HiOutlineViewGrid className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Management Dashboard</p>
              </div>
            </div>
            
            {/* Dashboard Stats */}
            <DashboardStats />
          </div>
        </div>

        {/* Right Side - Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <HiOutlineBell className="h-6 w-6 text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-white">
                  {notifications.length}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex-shrink-0 p-2 rounded-full bg-gray-50">
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center ring-2 ring-white">
                <span className="text-lg font-medium text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <HiOutlineUser className="h-5 w-5 text-gray-500" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => navigate('/settings')}
                    className="flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <HiOutlineCog className="h-5 w-5 text-gray-500" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <HiOutlineLogout className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;