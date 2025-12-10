// src/componentes/menu/DishRow.tsx
import React from "react";

/** Estructura mínima esperada desde menu.json */
export type Dish = {
  id: string;
  name: string;
  price?: number;            // precio numérico (EUR)
  marketPrice?: boolean;     // si es precio de mercado (S/M)
  priceText?: string;        // texto alternativo al precio, p.ej. "S/M"
  desc?: Record<string, string>; // descripciones por idioma (es, en, fr...)
  images?: string[];         // rutas de imágenes (3)
};

const localeMap: Record<string, string> = {
  es: "es-ES",
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
  zh: "zh-CN",
  ja: "ja-JP",
};

function formatPrice(value: number, lang: string) {
  const locale = localeMap[lang] || "es-ES";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

type Props = {
  item: Dish;
  /** Código corto de idioma actual ('es', 'en', ...) */
  lang: string;
  /** Control externo del despliegue del detalle */
  isOpen?: boolean;
  /** Toggle que manejará la sección (abrir/cerrar detalle) */
  onToggle: (id: string) => void;
  /** Clases extra opcionales */
  className?: string;
};

/**
 * Fila clicable de un plato (nombre + precio).
 * - Usa <button> accesible sin heredar estilos nativos (fondo/borde).
 * - El espaciado se aplica al contenedor interno para no traer UA styles.
 */
export default function DishRow({
  item,
  lang,
  isOpen = false,
  onToggle,
  className = "",
}: Props) {
  const price = item.marketPrice
    ? item.priceText || "S/M"
    : typeof item.price === "number"
    ? formatPrice(item.price, lang)
    : "";

  return (
    <div className={`w-full ${className}`}>
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
        className="
          w-full
          bg-transparent border-0 shadow-none rounded-none appearance-none p-0
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-1/50
          cursor-pointer
        "
      >
        {/* Layout de la fila: en md+ forzamos 70/30 y centramos verticalmente */}
        <div className="grid md:grid-cols-[70%_30%] items-center py-3">
          {/* Nombre */}
          <h3 className="titulo4 text-primary-1 leading-tight text-left m-0">
            {item.name}
          </h3>

          {/* Precio */}
          <div className="md:mt-0 text-right justify-self-end self-center">
            <span className="titulo4 text-primary-1 tabular-nums whitespace-nowrap">
              {price}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}