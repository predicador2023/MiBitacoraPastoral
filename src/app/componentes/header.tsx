"use client";

import { useState } from "react";
import Link from "next/link";
import SelectorVista from "./selectorVista";
import SearchBox from "./searchBox";

type Props = {
  setVista: (vista: "calendario" | "vertical" | "horizontal") => void;
};

export default function Header({ setVista }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          alignItems: "center",
          padding: "0.5rem",
          background: "#E3F2FD",
          borderBottom: "1px solid #ddd",
          gap: "0.5rem",
        }}
      >
       {/* Logo en el Header */}
   <div style={{ textAlign: "left" }}>
    <img
    src="/logo-dorado-biblia.png"
    alt="Logo pastoral"
    className="header-logo"
    />
   </div>

  

        {/* Selector compacto */}
        <div style={{ textAlign: "center" }}>
          <SelectorVista setVista={setVista} />
        </div>

        {/* Buscador */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.45rem",
              cursor: "pointer",
            }}
            aria-label="Abrir buscador"
          >
            🔍
          </button>
        </div>

        {/* Menú hamburguesa */}
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.3rem",
              cursor: "pointer",
            }}
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      </header>

      {searchOpen && (
        <SearchBox
          query={query}
          setQuery={setQuery}
          onClose={() => setSearchOpen(false)}
        />
      )}

      {/* Overlay + menú lateral */}
      {menuOpen && (
        <>
          {/* Overlay oscuro con blur */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 999,
            }}
          />

          {/* Panel lateral */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "250px",
              height: "100%",
              backgroundColor: "#2b2835",
              boxShadow: "2px 0 6px rgba(0,0,0,0.2)",
              zIndex: 1000,
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              animation: "slideIn 0.3s forwards",
              color: "white", // 🔹 todo el texto en blanco
            }}
          >
            {/* Botón de cierre discreto en blanco */}
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "white", // 🔹 texto blanco
                }}
                aria-label="Cerrar menú"
              >
                ✖
              </button>
            </div>

            {/* Logo arriba */}
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <img
                src="/logo-dorado-biblia.png"
                alt="Logo pastoral"
                style={{ width: "64px", height: "64px" }}
              />
            </div>

            {/* Botón de modo noche */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              <span>Modo noche</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
            </div>

            {/* Secciones con más espacio y texto blanco */}
            <nav>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "1rem" }}>
                  <Link href="/eventos" style={{ color: "white", textDecoration: "none" }}>
                    📅 Eventos
                  </Link>
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  <Link href="/notas" style={{ color: "white", textDecoration: "none" }}>
                    📝 Notas
                  </Link>
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  <Link href="/oraciones" style={{ color: "white", textDecoration: "none" }}>
                    🙏 Oraciones
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}

      {/* Animación CSS */}
      {/* Animación CSS */}
  <style jsx>{`
     @keyframes slideIn {
     from {
      transform: translateX(-100%);
       }
       to {
          transform: translateX(0);
       }
     }

     .header-logo {
       height: 64px; /* 🔹 tamaño grande por defecto */
     }

     @media (max-width: 600px) {
        .header-logo {
         height: 60px; /* 🔹 más pequeño en móviles */
        }
      }
    `}</style>
    </>
  );
}