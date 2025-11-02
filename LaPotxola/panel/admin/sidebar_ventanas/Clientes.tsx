import { useEffect, useState } from "react";
import { useUser } from "../../../src/context/UserContext";
import { FaEdit, FaTrash, FaUser, FaDownload, FaPlus } from "react-icons/fa";
import NuevoCliente from "../form/nuevoCliente";

type Cliente = {
  _id: string;
  nombre: string;
  apellido: string;
  apellido2?: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  role?: string;
};

const Clientes = () => {
  const { user } = useUser();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const abrirFormulario = () => setMostrarFormulario(true);
  const cerrarFormulario = () => setMostrarFormulario(false);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        const soloClientes = data.filter((c: Cliente) => c.role === "user");
        setClientes(soloClientes);
      } catch (err) {
        console.error("Error al obtener clientes:", err);
      }
    };
    obtenerClientes();
  }, []);

  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (user?.role !== "admin") {
    return (
      <p className="text-red-500 text-center mt-10 font-semibold">Acceso denegado. Solo administradores.</p>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
        Gestión de Clientes
      </h2>

      <div className="flex flex-wrap gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="p-2 border rounded w-full sm:w-1/3 border-[#0F172A] text-[#0F172A]"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="bg-[#0F172A] text-white px-4 py-2 rounded">Buscar</button>
        <button className="bg-[#0F172A] text-white px-4 py-2 rounded">Mostrar Todo</button>
        <button className="p-2 border border-[#0F172A] rounded text-[#0F172A]"><FaDownload /></button>
        <button
          onClick={abrirFormulario}
          className="flex items-center gap-2 bg-[#433BFF] text-white px-4 py-2 rounded hover:bg-[#2d2cb4]"
        >
          <FaPlus /> Nuevo Cliente
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-100 text-[#0F172A] font-semibold">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido 1</th>
              <th className="px-4 py-2">Apellido 2</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente._id} className="odd:bg-gray-100 even:bg-white">
                <td className="px-4 py-2">{cliente._id.slice(-4)}</td>
                <td className="px-4 py-2 flex items-center gap-2"><FaUser className="text-purple-700" />{cliente.nombre}</td>
                <td className="px-4 py-2">{cliente.apellido}</td>
                <td className="px-4 py-2">{cliente.apellido2 || '-'}</td>
                <td className="px-4 py-2">{cliente.correo}</td>
                <td className="px-4 py-2">{cliente.telefono || '-'}</td>
                <td className="px-4 py-2">{cliente.role || '-'}</td>
                <td className="px-4 py-2">{cliente.direccion || '-'}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <NuevoCliente onClose={cerrarFormulario} />
        </div>
      )}
    </>
  );
};

export default Clientes;