import { Outlet } from 'react-router-dom';
import HeaderAdmin from './HeaderaAdmin';
import SidebarAdmin from './SidebarAdmin';
import FooterAdmin from './FooterAdmin';

const MasterAdmin = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header>
        <HeaderAdmin />
      </header>
      <div className="flex flex-1">
        <aside className="w-[250px] bg-blue-900 text-white">
          <SidebarAdmin />
        </aside>
        <main className="flex-1 w-full bg-[#D8E0EE] flex flex-col">
          <div className="h-10 bg-[#B8BBC0] mb-4"></div>
          <div className="flex-1 max-w-full bg-white p-4 shadow rounded mx-4">
            <Outlet />
          </div>
          <footer className="mt-4">
            <FooterAdmin />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default MasterAdmin;