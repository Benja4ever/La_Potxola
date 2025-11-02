import React, { useEffect, useState } from 'react';
import { useUser } from '../../../src/context/UserContext';
import { FaUser, FaPlus, FaDownload } from 'react-icons/fa';

interface BriefInicial {
  _id: string;
  nombre: string;
  empresa?: string;
  telefono: string;
  correo: string;
  origen: string;
  necesidad: string;
  mensaje: string;
  consentimiento: boolean;
  fecha: string;
}

const BriefIniciales = () => {
  const { user } = useUser();
  const [briefs, setBriefs] = useState<BriefInicial[]>([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchBriefs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/briefs/brief-iniciales');
        const data = await res.json();
        setBriefs(data);
      } catch (err) {
        console.error('Error al obtener briefs iniciales:', err);
      }
    };

    fetchBriefs();
  }, []);

  const briefsFiltrados = briefs.filter(b =>
    b.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  if (user?.role !== 'admin') {
    return <p className="text-red-500 text-center mt-10 font-semibold">Acceso denegado. Solo administradores.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Briefs Iniciales</h1>

      {/* Filtros y acciones */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por cliente"
          className="p-2 border rounded w-full sm:w-1/3"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Buscar
        </button>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Mostrar Todo
        </button>
        <button className="flex items-center gap-2 bg-[#433BFF] text-white px-4 py-2 rounded hover:bg-[#2d2cb4]">
          <FaPlus /> Agregar Brief Inicial o Detallado
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-100 text-black font-semibold">
            <tr>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Empresa</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Origen</th>
              <th className="px-4 py-2">Necesidad</th>
              <th className="px-4 py-2">Mensaje</th>
              <th className="px-4 py-2">Consentimiento</th>
              <th className="px-4 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {briefsFiltrados.length > 0 ? (
              briefsFiltrados.map(brief => (
                <tr key={brief._id} className="odd:bg-gray-100 even:bg-white">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <FaUser className="text-purple-700" /> {brief.nombre}
                  </td>
                  <td className="px-4 py-2">{brief.empresa || '-'}</td>
                  <td className="px-4 py-2">{brief.telefono}</td>
                  <td className="px-4 py-2">{brief.correo}</td>
                  <td className="px-4 py-2">{brief.origen}</td>
                  <td className="px-4 py-2">{brief.necesidad}</td>
                  <td className="px-4 py-2">{brief.mensaje}</td>
                  <td className="px-4 py-2">{brief.consentimiento ? 'Sí' : 'No'}</td>
                  <td className="px-4 py-2">{new Date(brief.fecha).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={9}>No se encontraron resultados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BriefIniciales;