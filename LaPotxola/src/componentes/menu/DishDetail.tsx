// src/componentes/menu/DishDetail.tsx
import React from "react";
import type { Dish } from "./DishRow";

type Props = { item: Dish; lang: string; isOpen: boolean };

function getDesc(desc: Dish["desc"], lang: string): string {
  if (!desc) return "";
  return desc[lang] ?? desc["es"] ?? Object.values(desc)[0] ?? "";
}

export default function DishDetail({ item, lang, isOpen }: Props) {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = React.useState(0);

  const imgs = Array.isArray(item.images) ? item.images : [];
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) setMaxH(contentRef.current.scrollHeight);
  }, [isOpen, item, lang, active]);

  React.useEffect(() => {
    if (!isOpen || imgs.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % imgs.length), 3000);
    return () => clearInterval(id);
  }, [isOpen, imgs.length]);

  const description = getDesc(item.desc, lang);
  const hasDesc = Boolean(description);
  const hasImgs = imgs.length > 0;
  if (!hasDesc && !hasImgs) return null;

  return (
    <div
      className={`transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{ maxHeight: isOpen ? maxH : 0 }}
    >
      <div
        ref={contentRef}
        className="mt-4 flex flex-col md:flex-row md:items-stretch md:gap-6"
      >
        {/* Descripción: izquierda (2/3) en md+, arriba en móvil */}
        <div className="md:w-2/3 self-center text-primary-1">
          {hasDesc ? (
            <p className="parrafo text-center leading-relaxed mx-auto max-w-prose">
              {description}
            </p>
          ) : (
            <p className="text-sm parrafo text-center">—</p>
          )}
        </div>

        {/* Carrusel: derecha (1/3) en md+, abajo en móvil */}
        <div className="md:w-1/3 mt-4 md:mt-0">
          <div className="relative w-full aspect-square overflow-hidden rounded-md">
            {hasImgs ? (
              imgs.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt={`${item.name} ${i + 1}`}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-primary-1 parrafo">
                Sin imágenes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
