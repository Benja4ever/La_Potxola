// src/componentes/Layout/PiePagina.tsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function PiePagina() {
  const { t } = useTranslation();

  const lines =
    (t("pie.lines", {
      returnObjects: true,
      defaultValue: [],
    }) as string[]) || [];

  const safeLines =
    lines.length > 0
      ? lines
      : [
          "Descubre nuestros reconocidos guisos,",
          "Cocido romántico",
          "Marmitako (premio de Bizkaia)",
          "por encargo: sabores de alta tradición, elaborados con excelencia.",
        ];

  return (
    <section
      id="pie"
      className="scroll-mt-24 py-16 flex flex-col items-center text-center space-y-6"
    >
      <div className="text-3xl md:text-4xl text-neutral-500 select-none leading-none">
        ＊
      </div>

      <div className="space-y-2">
        {safeLines.map((text, i) => (
          <h2 key={i} className="titulo2 text-primary-1 md:text-5xl font-semibold">
            {text}
          </h2>
        ))}
      </div>
    </section>
  );
}
