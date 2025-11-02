// src/pages/HomeIdiomas.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../componentes/Layout/Button";
import Footer2 from "../componentes/Layout/Footer2";

const idiomas = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
];

export default function HomeIdiomas() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const elegir = (code: string) => {
    // sincroniza i18next + persistencia
    i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code); // i18next la usa por defecto
    localStorage.setItem("lang", code);       // si en otro sitio lees esta clave
    document.documentElement.lang = code;

    navigate("/carta");
  };

  return (
    // Contenedor raíz 100% (aplica el color de fondo)
    <div className="w-screen h-screen bg-secondary-1 flex items-center justify-center">
      {/* Wrapper 80% x 80%, vertical en dos bloques */}
      <div className="w-[80%] h-[80%] flex flex-col">
        {/* Bloque superior (logo + subtítulo) */}
        <div className="basis-[20%] flex items-center justify-center">
          {/* Contenedor exclusivo del logo: ancho y alto limitados + centrado */}
          <div className="w-full max-w-[520px] px-4 text-center">
            <div className="mx-auto w-full flex items-center justify-center">
              <img
                src="https://www.lapotxolataberna.com/wp-content/uploads/potxola-green.svg"
                alt="La Potxola"
                className="
                  block mx-auto
                  h-auto w-full
                  max-h-[56px] sm:max-h-[64px] md:max-h-[80px] lg:max-h-[88px]
                  object-contain
                "
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>

            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              {t("home.choose")}
            </p>
          </div>
        </div>

        <div className="basis-[80%]">
          {/* 6 contenedores iguales, uno sobre otro */}
          <div className="grid grid-rows-6 gap-3 h-full">
            {idiomas.map((i) => (
              <div
                key={i.code}
                className="flex items-center justify-center"
                aria-label={`language-${i.code}`}
              >
                {/* Botón reutilizable (ancho fluido y táctil) */}
                <Button
                  onClick={() => elegir(i.code)}
                  className="py-3"
                  aria-label={i.label}
                >
                  {i.label}
                </Button>
              </div>
            ))}
          </div>
          <div>
            <Footer2 />
          </div>
        </div>
      </div>
    </div>
  );
}
