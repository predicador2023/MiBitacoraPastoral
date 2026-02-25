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
        <div className="logo-container">
          <img
            src="/logo-dorado-biblia.png"
            alt="Logo pastoral"
            className="header-logo"
          />
        </div>

        <div className="actions-container">
          <div className="selector-container">
            <SelectorVista setVista={setVista} />
          </div>
          <div className="search-container">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-button lupa"
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

      {/* Buscador con transición lenta */}
      <div className={`searchBox ${searchOpen ? "open" : ""}`}>
        <SearchBox
          query={query}
          setQuery={setQuery}
          onClose={() => setSearchOpen(false)}
        />
      </div>

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
                {/* 🔹 Solo SVG, sin texto */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <img
                src="/logo-dorado-biblia.png"
                alt="Logo pastoral"
                style={{ width: "120px", height: "120px" }}
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
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .main-header {
          display: grid;
          grid-template-columns: 1fr 3fr;
          background-color: #110b38;
          border-bottom: 1px solid #333;
          padding: 0.1rem 0.3rem;
          align-items: center;
        }

        .logo-container { text-align: left; }
        .header-logo { height: 82px; }

        .actions-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          text-align: center;
        }

        .icon-button {
          background: none;
          border: none;
          font-size: 1.40rem;
          color: white;
          cursor: pointer;
        }

        .lupa {
          opacity: 0;
          animation: fadeInSlow 2s forwards;
          transition: transform 0.5s ease;
        }
        .lupa:hover { transform: scale(1.1); }

        .searchBox {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateY(-20px);
          transition: all 1.5s ease;
        }
        .searchBox.open {
          max-height: 300px;
          opacity: 1;
          transform: translateY(0);
        }

        .overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 999;
        }

        .side-panel {
          position: fixed;
          top: 0; left: 0;
          width: 250px; height: 100%;
          background-color: #2b2835;
          box-shadow: 2px 0 6px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s forwards;
          color: white;
        }

        /* 🔹 Botón de cierre solo con SVG */
        .close-button {
          background: none;
          border: none;
          cursor: pointer;
        }
        .close-button svg {
          stroke: #666;
          width: 14px;
          height: 14px;
          transition: stroke 0.3s ease;
        }
        .close-button:hover svg {
          stroke: #fff;
        }

        .night-mode {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: white;
        }

        @media (min-width: 768px) { .header-logo { height: 72px; } }
        @media (min-width: 1200px) { .header-logo { height: 64px; } }
      `}</style>
    </>
  );
}