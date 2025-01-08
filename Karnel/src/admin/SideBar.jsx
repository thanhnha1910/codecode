import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`fixed left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link to="/admin">
          <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2">MENU</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link to="/admin/hotels" className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/admin/restaurants" className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/admin/attractions" className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark">
                  Attractions
                </Link>
              </li>
              <li>
                <Link to="/admin/tours" className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark">
                  Tours
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;