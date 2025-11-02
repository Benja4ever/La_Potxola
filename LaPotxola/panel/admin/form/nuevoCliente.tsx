import { useState } from "react";

interface NuevoClienteProps {
  onClose: () => void;
}

const NuevoCliente = ({ onClose }: NuevoClienteProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    correo: "",
    birthDate: "",
    telefono: "",
    pass: "",
    consentimiento: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formattedFormData = {
        ...formData,
        apellido: formData.apellido1, // 👈 necesario para Mongoose
        birthDate: new Date(formData.birthDate).toISOString(),
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("⚠️ Error del backend:", data);
        throw new Error(data.message || "Error al crear usuario");
      }

      setSuccess("Cliente registrado correctamente");
      setFormData({
        nombre: "",
        apellido1: "",
        apellido2: "",
        correo: "",
        birthDate: "",
        telefono: "",
        pass: "",
        consentimiento: false,
      });
      setTimeout(() => onClose(), 1500);
    } catch (error: any) {
      setError(error.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#B8BBC0]/80 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-3xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#0F172A]">Nuevo Cliente</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#0F172A] mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#0F172A] mb-1">Apellido 1</label>
              <input
                type="text"
                name="apellido1"
                value={formData.apellido1}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#0F172A] mb-1">Apellido 2</label>
              <input
                type="text"
                name="apellido2"
                value={formData.apellido2}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#0F172A] mb-1">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#0F172A] mb-1">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#0F172A] mb-1">Fecha de nacimiento</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#0F172A] mb-1">Contraseña</label>
              <input
                type="password"
                name="pass"
                value={formData.pass}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border focus:outline-none"
              />
            </div>

            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                name="consentimiento"
                checked={formData.consentimiento}
                onChange={handleChange}
                required
              />
              <label className="text-[#0F172A]">Acepto la política de privacidad</label>
            </div>
          </div>

          {/* Mensajes */}
          {error && <div className="bg-red-100 text-red-700 p-2 mt-4 rounded">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-2 mt-4 rounded">{success}</div>}

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0F172A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a2235] transition"
            >
              {loading ? "Guardando..." : "Guardar Cliente"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#0F172A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoCliente;