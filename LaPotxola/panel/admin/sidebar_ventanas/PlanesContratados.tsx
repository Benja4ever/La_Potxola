import React, { useEffect, useState } from 'react';
import { useUser } from '../../../src/context/UserContext';
import { FaDownload } from 'react-icons/fa';

type Plan = {
  _id: string;
  nombrePlan: string;
  imagen?: string;
  fechaContratacion?: string;
  usuario?: {
    nombre: string;
    apellido: string;
  };
};

const PlanesContratados = () => {
  const { user } = useUser();
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/planes');
        const json = await res.json();
        setPlanes(json);
      } catch (err) {
        console.error('Error al obtener planes contratados:', err);
      }
    };
    fetchData();
  }, []);

  const planesFiltrados = planes.filter(p =>
    `${p.usuario?.nombre} ${p.usuario?.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (user?.role !== 'admin') {
    return <p className="text-red-500 text-center mt-10 font-semibold">Acceso denegado. Solo administradores.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#0F172A]">Planes Contratados</h1>

      {/* Controles */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por usuario"
          className="p-2 border rounded w-full sm:w-1/3 border-[#0F172A] text-[#0F172A]"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="bg-[#0F172A] text-white px-4 py-2 rounded">Buscar</button>
        <button className="bg-[#0F172A] text-white px-4 py-2 rounded">Mostrar Todo</button>
        <button className="p-2 border border-[#0F172A] rounded text-[#0F172A]">
          <FaDownload />
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-100 text-[#0F172A] font-semibold">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Nombre del Plan</th>
              <th className="px-4 py-2">Fecha Contratación</th>
              <th className="px-4 py-2">Imagen</th>
            </tr>
          </thead>
          <tbody>
            {planesFiltrados.map((plan) => (
              <tr key={plan._id} className="odd:bg-gray-100 even:bg-white">
                <td className="px-4 py-2">{plan._id.slice(-4)}</td>
                <td className="px-4 py-2">{plan.usuario?.nombre} {plan.usuario?.apellido}</td>
                <td className="px-4 py-2">{plan.nombrePlan}</td>
                <td className="px-4 py-2">{new Date(plan.fechaContratacion || '').toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <img src={plan.imagen || '/img_webp/default_plan.png'} alt="plan" className="w-12 h-12 object-cover" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanesContratados;