import { useEffect, useState, Fragment } from "react";
import { useUser } from "../../../src/context/UserContext";
import { FaEdit, FaTrash, FaDownload, FaPlus } from "react-icons/fa";

type Empleado = {
  _id: string;
  nombre: string;
  apellido: string;
  apellido2?: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  role?: string;
};

const Empleados = () => {
  const { user } = useUser();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/empleados");
        const json = await res.json();
        setEmpleados(json);
      } catch (err) {
        console.error("Error al obtener empleados:", err);
      }
    };

    fetchData();
  }, []);

  const empleadosFiltrados = empleados.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (user?.role !== "admin") {
    return (
      <p className="text-red-500 text-center mt-10 font-semibold">
        Acceso denegado. Solo administradores.
      </p>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
        Gestión de Empleados
      </h2>

      {/* Controles de acción */}
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
        <button className="flex items-center gap-2 bg-[#433BFF] text-white px-4 py-2 rounded hover:bg-[#2d2cb4]">
          <FaPlus /> Nuevo Empleado
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-100 text-[#0F172A] font-semibold">
            <tr>
              <th className="px-4 py-2">Icono</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido 1</th>
              <th className="px-4 py-2">Apellido 2</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleadosFiltrados.map((empleado) => (
              <tr key={empleado._id} className="odd:bg-gray-100 even:bg-white">
                <td className="px-4 py-2 text-center">🧑‍💼</td>
                <td className="px-4 py-2">{empleado._id.slice(-4)}</td>
                <td className="px-4 py-2">{empleado.nombre}</td>
                <td className="px-4 py-2">{empleado.apellido}</td>
                <td className="px-4 py-2">{empleado.apellido2 || "-"}</td>
                <td className="px-4 py-2">{empleado.correo}</td>
                <td className="px-4 py-2">{empleado.telefono || "-"}</td>
                <td className="px-4 py-2">{empleado.direccion || "-"}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Empleados;