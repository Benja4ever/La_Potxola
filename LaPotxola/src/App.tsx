
// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import ClientRoutes from './routes/clientRoutes'  // rutas públicas (incluye Nav + Footer)

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/*" element={<ClientRoutes />} />

      {/* 404 opcional si no lo manejas en ClientRoutes */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
