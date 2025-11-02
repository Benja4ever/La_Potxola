// src/routes/ClientRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeIdiomas from '../pages/HomeIdiomas';
import Carta from '../pages/Carta';
// import PlatoDetalle from '../pages/PlatoDetalle'; // cuando lo tengas

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeIdiomas />} />
      <Route path="/carta" element={<Carta />} />
      {/* <Route path="/carta/:categoriaId/:platoId" element={<PlatoDetalle />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
