import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-500">
        © {new Date().getFullYear()} La Potxola · Desarrollado por NeoDigital Crea
      </div>
    </footer>
  );
}
