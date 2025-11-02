// src/componentes/Layout/Header.tsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <section
      id="header"
      className="scroll-mt-24 py-10 hidden md:block"
    >
      <h1 className="titulo1 text-primary-1 md:text-5xl font-semibold text-center">
        {t("header.title")}
      </h1>
    </section>
  );
}
