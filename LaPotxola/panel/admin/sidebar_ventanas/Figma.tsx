import React, { useEffect, useState } from 'react';
import { useUser } from '../../../src/context/UserContext';
import { FaDownload, FaPlus } from 'react-icons/fa';

interface FigmaDiseno {
  _id: string;
  urlFigma: string;
  modificaciones: number;
  estado: string;
  fechaEntrega: string;
  cliente: {
    nombre: string;
    apellido: string;
  };
}

const Figma = () => {
  const { user } = useUser();
  const [diseños, setDiseños] = useState<FigmaDiseno[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/figma');
        const data = await res.json();
        setDiseños(data);
      } catch (err) {
        console.error('Error al obtener diseños Figma:', err);
      }
    };

    fetchData();
  }, []);

  const diseñosFiltrados = diseños.filter(d =>
    `${d.cliente?.nombre} ${d.cliente?.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (user?.role !== 'admin') {
    return <p className="text-red-500 text-center mt-10 font-semibold">Acceso denegado. Solo administradores.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#0F172A]">Diseños Figma</h1>

      {/* Filtros y botones */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por cliente"
          className="p-2 border rounded w-full sm:w-1/3 border-[#0F172A] text-[#0F172A]"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="bg-[#0F172A] text-white px-4 py-2 rounded">Buscar</button>
        <button className="bg-[#0F172A] text-white px-4 py-2 rounded">Mostrar Todo</button>
        <button className="p-2 border border-[#0F172A] rounded text-[#0F172A]">
          <FaDownload />
        </button>
        <button
          onClick={() => setMostrarModal(true)}
          className="flex items-center gap-2 bg-[#433BFF] text-white px-4 py-2 rounded hover:bg-[#2d2cb4]"
        >
          <FaPlus /> Nuevo Diseño Figma
        </button>
      </div>

      {/* Tabla de diseños */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-100 text-[#0F172A] font-semibold">
            <tr>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">URL Figma</th>
              <th className="px-4 py-2">Modificaciones</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Fecha de Entrega</th>
            </tr>
          </thead>
          <tbody>
            {diseñosFiltrados.map((d) => (
              <tr key={d._id || `${d.cliente?.nombre}-${d.urlFigma}`} className="odd:bg-gray-100 even:bg-white">
                <td className="px-4 py-2">{d.cliente?.nombre} {d.cliente?.apellido}</td>
                <td className="px-4 py-2">
                  <a href={d.urlFigma} target="_blank" rel="noreferrer" className="text-blue-600 underline">Ver diseño</a>
                </td>
                <td className="px-4 py-2 text-center">{d.modificaciones}</td>
                <td className="px-4 py-2 capitalize">{d.estado}</td>
                <td className="px-4 py-2">{new Date(d.fechaEntrega).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">Nuevo Diseño Figma</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const nuevo = {
                  cliente: {
                    nombre: form.clienteNombre.value,
                    apellido: form.clienteApellido.value
                  },
                  urlFigma: form.urlFigma.value,
                  modificaciones: Number(form.modificaciones.value || 0),
                  estado: form.estado.value,
                  fechaEntrega: form.fechaEntrega.value,
                };

                try {
                  const res = await fetch("http://localhost:5000/api/figma", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(nuevo),
                  });

                  if (res.ok) {
                    const data = await res.json();
                    setDiseños(prev => [data, ...prev]);
                    setMostrarModal(false);
                  } else {
                    const errMsg = await res.text();
                    alert("❌ Error al guardar: " + errMsg);
                  }
                } catch (error) {
                  console.error("Error:", error);
                }
              }}
              className="space-y-3"
            >
              <input name="clienteNombre" required placeholder="Nombre del cliente" className="w-full border p-2 rounded" />
              <input name="clienteApellido" required placeholder="Apellido del cliente" className="w-full border p-2 rounded" />
              <input name="urlFigma" required placeholder="URL de Figma" className="w-full border p-2 rounded" />
              <input name="modificaciones" type="number" min="0" defaultValue={0} required placeholder="N° de modificaciones" className="w-full border p-2 rounded" />
              <select name="estado" className="w-full border p-2 rounded">
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
                <option value="entregado">Entregado</option>
              </select>
              <input type="date" name="fechaEntrega" required className="w-full border p-2 rounded" />
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

export default Figma;