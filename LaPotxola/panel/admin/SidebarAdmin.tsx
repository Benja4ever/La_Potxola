import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  const activeClass =
    "bg-[#DEDCFF] text-[#0F172A]";
    const baseClass =
  "block px-4 py-2 rounded hover:bg-[#DEDCFF] hover:text-[#0F172A] transition-colors duration-200";

  return (
    <aside className="w-64 bg-[#0F172A] text-white p-4 space-y-6">
      <nav className="space-y-4">
        <div>
          <h3 className="text-gray-400 text-xs uppercase mb-2">Navegación</h3>
          <ul className="space-y-1">
            <li>
              <NavLink to="/admin/informes" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Informes
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/brief-inicial" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Brief Inicial
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/clientes" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Clientes
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/empleados" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Empleados
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/figma" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Diseños Figma
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/agenda" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Agenda
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/planes-contratados" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Planes Contratados
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/cobros-pagos" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Cobros / Pagos
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-400 text-xs uppercase mb-2">Ventas</h3>
          <ul className="space-y-1">
            <li>
              <NavLink to="/admin/facturas-emitidas" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Facturas Emitidas
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/albaranes-emitidos" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Albaranes Emitidos
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/presupuestos-emitidos" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Presupuestos Emitidos
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-400 text-xs uppercase mb-2">Compras y Pagos</h3>
          <ul className="space-y-1">
            <li>
              <NavLink to="/admin/facturas-recibidas" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Facturas Recibidas
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/albaranes-recibidos" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Albaranes Recibidos
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/presupuestos-recibidos" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Presupuestos Recibidos
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/nominas" className={({ isActive }) => isActive ? `${baseClass} ${activeClass}` : baseClass}>
                Nóminas
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;