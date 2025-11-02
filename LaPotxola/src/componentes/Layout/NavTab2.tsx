// src/componentes/Layout/NavTab2.tsx
import React from "react";

export default function NavTab2() {
  return (
    <header className="sticky top-0 z-50 hidden md:block bg-secondary-1 backdrop-blur">
      <div className="mx-auto w-[85%] py-2 flex justify-center">
        <img
          src="https://www.lapotxolataberna.com/wp-content/uploads/potxola-green.svg"
          alt="La Potxola"
          className="h-10 w-auto md:h-12 lg:h-14"
          draggable={false}
        />
      </div>
    </header>
  );
}
