import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-500 text-center">
        © {new Date().getFullYear()} La Potxola · Desarrollado por{" "}
        <a
          href="#"
          className="font-semibold text-neutral-700 cursor-pointer hover:text-primary-1 transition-colors"
          aria-label="Portfolio de Brian Guerra C."
        >
          Brian Guerra C.
        </a>
      </div>
    </footer>
  );
}
