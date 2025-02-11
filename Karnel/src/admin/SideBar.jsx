import { Link, useLocation } from 'react-router-dom';
import { 
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineTruck,
  HiOutlineGlobe,
  HiOutlinePhotograph,
  HiOutlineTicket,
  HiOutlineChartBar
} from 'react-icons/hi';
import { RiRestaurant2Line } from 'react-icons/ri';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  // Menu items configuration
  const menuItems = [
    {
      path: '/admin/revenue',
      name: 'Revenue Dashboard',
      icon: <HiOutlineChartBar className="w-6 h-6" />
    },
    {
      path: '/admin/user',
      name: 'User',
      icon: <HiOutlineGlobe className="w-6 h-6" />
    },
    {
      path: '/admin/cities',
      name: 'Cities',
      icon: <HiOutlineLocationMarker className="w-6 h-6" />
    },
    {
      path: '/admin/hotels',
      name: 'Hotels',
      icon: <HiOutlineOfficeBuilding className="w-6 h-6" />
    },
    {
      path: '/admin/restaurants',
      name: 'Restaurants',
      icon: <RiRestaurant2Line className="w-6 h-6" />
    },
    {
      path: '/admin/attractions',
      name: 'Attractions',
      icon: <HiOutlineCube className="w-6 h-6" />
    },
    {
      path: '/admin/transportations',
      name: 'Transportation',
      icon: <HiOutlineTruck className="w-6 h-6" />
    },
    {
      path: '/admin/tours',
      name: 'Tours',
      icon: <HiOutlineGlobe className="w-6 h-6" />
    }
  
  ];

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-gradient-to-b from-gray-900 to-gray-800 duration-300 ease-linear lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link to="/admin" className="flex items-center space-x-3">
          <HiOutlineHome className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold text-white">Admin Dashboard</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-700 my-3" />

      {/* Sidebar Links */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-2.5 rounded-lg py-3 px-4 font-medium transition-colors duration-200 ease-in-out hover:bg-gray-700 ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 py-4 bg-gray-900">
        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span>© 2024 Admin Panel</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;