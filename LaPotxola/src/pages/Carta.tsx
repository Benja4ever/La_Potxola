import React from "react";
import NavTab from "../componentes/Layout/NavTab";
import Footer from "../componentes/Layout/Footer";
import NavTab2 from "../componentes/Layout/NavTab2";

import Header from "./Section/Header";
import Mar from "./Section/Mar";
import Huerta from "./Section/Huerta";
import Campo from "./Section/Campo";
import Chacinas from "./Section/Chacinas";
import PintxosRaciones from "./Section/PintxosRaciones";
import Postres from "./Section/Postres";
import PiePagina from "./Section/PiePagina";


export default function Carta() {
  return (
    <div className="min-h-screen">
      {/* Scroll suave global (puedes moverlo a index.css si prefieres) */}
      <style>{`html{scroll-behavior:smooth}`}</style>
      <NavTab2/>
      <Header />
      <NavTab />

      {/* Cada sección define scroll-margin-top para compensar el nav sticky */}
      <main className="mx-auto max-w-[1000px] px-4">
        
        <PintxosRaciones />
        <Huerta />
        <Chacinas />
        <Campo />
        <Mar />
        <Postres />
        <PiePagina/>
      </main>

      <Footer />
    </div>
  );
}
