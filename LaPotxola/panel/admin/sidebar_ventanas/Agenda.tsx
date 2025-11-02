import React, { useEffect, useState } from 'react';
import { useUser } from '../../../src/context/UserContext';
import { FaDownload, FaSearch, FaPlus } from 'react-icons/fa';

interface Reunion {
  _id: string;
  cliente: {
    nombre: string;
    apellido: string;
  };
  fechaReunion: string;
  estado: 'pendiente' | 'completada';
  notas: string;
}

const Agenda = () => {
  const { user } = useUser();
  const [reuniones, setReuniones] = useState<Reunion[]>([]);
  const [filtro, setFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const fetchReuniones = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/agenda');
      const data = await res.json();
      setReuniones(data);
    } catch (err) {
      console.error('Error al obtener reuniones:', err);
    }
  };

  useEffect(() => {
    fetchReuniones();
  }, []);

  const reunionesFiltradas = reuniones.filter((r) =>
    `${r.cliente.nombre} ${r.cliente.apellido}`
      .toLowerCase()
      .includes(filtro.toLowerCase()) &&
    (estadoFiltro === '' || r.estado === estadoFiltro)
  );

  if (user?.role !== 'admin') {
    return <p className="text-red-500 text-center mt-10 font-semibold">Acceso denegado. Solo administradores.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#0F172A]">Agenda de Reuniones</h1>

      {/* Controles */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por cliente"
          className="p-2 border rounded w-full sm:w-1/4 border-[#0F172A] text-[#0F172A]"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <select
          className="p-2 border rounded text-[#0F172A] border-[#0F172A]"
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
        <button className="bg-[#0F172A] text-white px-4 py-2 rounded">Buscar</button>
        <button className="bg-[#0F172A] text-white px-4 py-2 rounded">Mostrar Todo</button>
        <button className="p-2 border border-[#0F172A] rounded text-[#0F172A]"><FaDownload /></button>
        <button
          onClick={() => setMostrarModal(true)}
          className="flex items-center gap-2 bg-[#433BFF] text-white px-4 py-2 rounded hover:bg-[#2d2cb4]"
        >
          <FaPlus /> Agendar Reunión
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-100 text-[#0F172A] font-semibold">
            <tr>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Notas</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reunionesFiltradas.map((r) => (
              <tr key={r._id} className="odd:bg-gray-100 even:bg-white">
                <td className="px-4 py-2">{r.cliente.nombre} {r.cliente.apellido}</td>
                <td className="px-4 py-2">{new Date(r.fechaReunion).toLocaleDateString()}</td>
                <td className="px-4 py-2 capitalize">{r.estado}</td>
                <td className="px-4 py-2">{r.notas}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 underline">Ver brief</button>
                  <button className="text-yellow-600 underline">Reprogramar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal agendar reunión */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">Agendar Nueva Reunión</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = {
                  cliente: {
                    nombre: form.clienteNombre.value,
                    apellido: form.clienteApellido.value,
                  },
                  fechaReunion: form.fechaReunion.value,
                  estado: form.estado.value,
                  notas: form.notas.value,
                };

                try {
                  const res = await fetch("http://localhost:5000/api/agenda", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  if (res.ok) {
                    fetchReuniones();
                    setMostrarModal(false);
                  } else {
                    alert("Error al guardar la reunión");
                  }
                } catch (error) {
                  console.error("Error:", error);
                }
              }}
              className="space-y-3"
            >
              <input name="clienteNombre" required placeholder="Nombre del cliente" className="w-full border p-2 rounded" />
              <input name="clienteApellido" required placeholder="Apellido del cliente" className="w-full border p-2 rounded" />
              <input type="date" name="fechaReunion" required className="w-full border p-2 rounded" />
              <select name="estado" className="w-full border p-2 rounded">
                <option value="pendiente">Pendiente</option>
                <option value="completada">Completada</option>
              </select>
              <textarea name="notas" placeholder="Notas..." className="w-full border p-2 rounded resize-none" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setMostrarModal(false)} className="text-[#0F172A]">Cancelar</button>
                <button type="submit" className="bg-[#0F172A] text-white px-4 py-2 rounded">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;