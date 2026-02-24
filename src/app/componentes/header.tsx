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
      <header className="main-header">
        {/* Columna del logo */}
        <div className="logo-container">
          <img
            src="/logo-dorado-biblia.png"
            alt="Logo pastoral"
            className="header-logo"
          />
        </div>

        {/* Columna agrupada con selector, buscador y menú */}
        <div className="actions-container">
          <div className="selector-container">
            <SelectorVista setVista={setVista} />
          </div>
          <div className="search-container">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-button"
              aria-label="Abrir buscador"
            >
              🔍
            </button>
          </div>
          <div className="menu-container">
            <button
              onClick={() => setMenuOpen(true)}
              className="icon-button"
              aria-label="Abrir menú"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <SearchBox
          query={query}
          setQuery={setQuery}
          onClose={() => setSearchOpen(false)}
        />
      )}

      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} className="overlay" />

          <div className="side-panel">
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => setMenuOpen(false)}
                className="close-button"
                aria-label="Cerrar menú"
              >
                ✖
              </button>
            </div>

            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
             <img
               src="/logo-dorado-biblia.png"
               alt="Logo pastoral"
               style={{ width: "120px", height: "120px" }} // 🔹 más grande en overlay
             />
            </div>

            <div className="night-mode">
              <span>Modo noche</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
            </div>

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

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .main-header {
        display: grid;
        grid-template-columns: 1fr 3fr;
        background-color: #110b38; /* 🔹 gris carbón */
         border-bottom: 1px solid #333;
         padding: 0.1rem 0.3rem;
         align-items: center;
         /* color: white;  🔹 asegura que el texto/íconos se vean en blanco */
        }
        .logo-container {
          text-align: left;
        }

        .header-logo {
          height: 82px; /* 🔹 más grande */
        }

        .actions-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr; /* 🔹 tres columnas internas */
          align-items: center;
          text-align: center;
        }

        .icon-button {
          background: none;
          border: none;
          font-size: 1.40rem;
          color: white; /* 🔹 íconos en blanco para contraste */
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .header-logo {
            height: 72px;
          }
        }

        @media (min-width: 1200px) {
          .header-logo {
            height: 64px;
          }
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 999;
        }

        .side-panel {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100%;
          background-color: #2b2835;
          box-shadow: 2px 0 6px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s forwards;
          color: white;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: white;
        }

        .night-mode {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: white;
        }
      `}</style>
    </>
  );
}