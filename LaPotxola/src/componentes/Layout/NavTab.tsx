// src/componentes/Layout/NavTab.tsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Item = { id: string; key: string };

const SECCIONES: Item[] = [
  { id: "pintxos",  key: "nav.pintxos" },
  { id: "huerta",   key: "nav.huerta" },
  { id: "chacinas", key: "nav.chacinas" },
  { id: "campo",    key: "nav.campo" },
  { id: "mar",      key: "nav.mar" },
  { id: "postres",  key: "nav.postres" },
];

export default function NavTab() {
  const { t } = useTranslation();
  const [active, setActive] = useState<string>("pintxos");
  const [openMobile, setOpenMobile] = useState(false);

  // Detectar sección visible y marcar activa
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    SECCIONES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenMobile(false);
  };

  return (
    <header className="sticky top-0 md:top-16 z-40 border-y border-neutral-300/40 bg-secondary-1 backdrop-blur">
      {/* ====== Mobile Topbar (visible < md) ====== */}
      <div className="mx-auto w-full px-4 py-2 md:hidden relative">
        {/* Logo centrado */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
          <img
            src="https://www.lapotxolataberna.com/wp-content/uploads/potxola-green.svg"
            alt="La Potxola"
            className="h-8 w-auto"
            draggable={false}
          />
        </div>

        {/* Hamburger a la derecha */}
        <div className="flex justify-end">
          <button
            aria-label={openMobile ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpenMobile((v) => !v)}
            className="inline-flex items-center justify-center rounded-full p-2 hover:bg-black/10 transition"
          >
            {/* Ícono hamburguesa / cerrar (svg simple) */}
            {openMobile ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Panel desplegable */}
        {openMobile && (
          <div className="mt-3 rounded-xl border border-neutral-300/60 bg-secondary-1 shadow-lg">
            <ul className="py-2">
              {SECCIONES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    className={`w-full text-left px-4 py-3 transition ${
                      active === s.id
                        ? "bg-primary-1 text-white"
                        : "hover:bg-black/10 text-neutral-800"
                    }`}
                  >
                    {t(s.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ====== Desktop Nav (visible >= md) ====== */}
      <nav className="mx-auto w-[85%] hidden md:flex justify-center">
        <ul className="flex flex-wrap justify-center items-center gap-x-10 py-3 text-neutral-700">
          {SECCIONES.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                  active === s.id
                    ? "bg-primary-1 text-white"
                    : "hover:bg-black/10 text-neutral-800"
                }`}
                aria-current={active === s.id ? "page" : undefined}
              >
                {t(s.key)}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
