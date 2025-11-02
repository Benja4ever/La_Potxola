import React, { useEffect, useState } from 'react';
import { useUser } from '../../../src/context/UserContext';
import { FaDownload, FaUser } from 'react-icons/fa';

interface Contacto {
  _id: string;
  nombre: string;
  empresa?: string;
  telefono: string;
  correo: string;
  mensaje: string;
  origen: string;
  createdAt: string;
}

const Informes = () => {
  const { user } = useUser();
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/contacto');
        const data = await res.json();
        setContactos(data);
      } catch (err) {
        console.error('Error al obtener contactos:', err);
      }
    };

    fetchContactos();
  }, []);

  const contactosFiltrados = contactos.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (user?.role !== 'admin') {
    return <p className="text-red-500 text-center mt-10 font-semibold">Acceso denegado. Solo administradores.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-4">Mensajes de Contacto</h1>

      {/* Filtros */}
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
        <button className="p-2 border border-[#0F172A] rounded text-[#0F172A]">
          <FaDownload />
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-100 text-[#0F172A] font-semibold">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Empresa</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Origen</th>
              <th className="px-4 py-2">Mensaje</th>
              <th className="px-4 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {contactosFiltrados.length > 0 ? (
              contactosFiltrados.map(contacto => (
                <tr key={contacto._id} className="odd:bg-gray-100 even:bg-white">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <FaUser className="text-purple-700" /> {contacto.nombre}
                  </td>
                  <td className="px-4 py-2">{contacto.empresa || '-'}</td>
                  <td className="px-4 py-2">{contacto.telefono}</td>
                  <td className="px-4 py-2">{contacto.correo}</td>
                  <td className="px-4 py-2">{contacto.origen}</td>
                  <td className="px-4 py-2">{contacto.mensaje}</td>
                  <td className="px-4 py-2">{new Date(contacto.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center px-4 py-2 text-gray-500">No se encontraron resultados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Informes;