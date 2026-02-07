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

  return (
    <>
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          alignItems: "center",
          padding: "0.5rem", // 🔹 menos padding general
          background: "#E3F2FD",
          borderBottom: "1px solid #ddd",
          gap: "0.5rem",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "left" }}>
          <h2 style={{ margin: 0, fontSize: "1rem" }}>Bitácora</h2>
        </div>

        {/* Selector compacto */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.8rem",      // 🔹 más pequeño
              padding: "0.2rem 0.5rem", // 🔹 menos relleno
              height: "1.8rem",         // 🔹 más bajo
            }}
          >
            <SelectorVista setVista={setVista} />
          </div>
        </div>

        {/* Buscador más grande */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: "none",
              border: "none",
             fontSize: "1.45rem", // 🔹 20% más chico
              cursor: "pointer",
            }}
            aria-label="Abrir buscador"
          >
            🔍
          </button>
        </div>

        {/* Menú */}
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.3rem", // 🔹 un poco más compacto
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

      {menuOpen && (
        <nav
          style={{
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            padding: "0.8rem",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><Link href="/eventos">📅 Eventos</Link></li>
            <li><Link href="/notas">📝 Notas</Link></li>
            <li><Link href="/oraciones">🙏 Oraciones</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
}