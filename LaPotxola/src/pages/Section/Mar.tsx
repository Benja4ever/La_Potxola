// src/pages/seccion/Mar.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import menu from "../../data/menu.json";
import DishRow, { type Dish } from "../../componentes/menu/DishRow";
import DishDetail from "../../componentes/menu/DishDetails";

export default function Mar() {
  const { i18n, t } = useTranslation();
  const lang = (i18n.language || "es").split("-")[0];

  // Cargamos TODOS los items de "mar" (incluye la nota) para tratarlos igual que en PintxosRaciones
  const items = ((menu as any).mar || []) as Dish[];

  // Acordeón: id abierto
  const [openId, setOpenId] = React.useState<string | null>(null);
  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <section id="mar" className="w-full py-10">
      <div className="mx-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%]">
        <div className="py-6 text-center">
          <h2 className="titulo2 text-primary-1">
            {t("sections.mar.title")}
          </h2>
        </div>

        <div className="mt-2 space-y-6">
          {items.map((it: any) => {
            // Mismo tratamiento que en PintxosRaciones para "note"
            if (it.type === "note") {
              return (
                <div key={it.id || it.name} className="text-center">
                  <span className="titulo4 text-primary-1">{it.name}</span>
                </div>
              );
            }

            const isOpen = openId === it.id;

            return (
              <div key={it.id}>
                <DishRow
                  item={it}
                  lang={lang}
                  isOpen={isOpen}
                  onToggle={toggle}
                />
                <DishDetail item={it} lang={lang} isOpen={isOpen} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
