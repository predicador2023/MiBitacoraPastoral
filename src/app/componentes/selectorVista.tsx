"use client";

import { useState } from "react";

type Props = {
  setVista: (vista: "calendario" | "vertical" | "horizontal") => void;
};

export default function SelectorVista({ setVista }: Props) {
  const [open, setOpen] = useState(false);

  const handleSelect = (vista: "calendario" | "vertical" | "horizontal") => {
    setOpen(false);
    setVista(vista);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "0.2rem 0.4rem",   // compacto
          borderRadius: "4px",
          border: "1px solid #0077B6",
          background: "#0077B6",
          color: "#fff",
          fontWeight: 500,
          fontSize: "0.7rem",         // más pequeño
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.2rem",
          whiteSpace: "nowrap",       // nunca se rompe en dos líneas
        }}
      >
        Vista {!open && "▼"}
      </button>

      <div
        style={{
          position: "absolute",
          top: "110%",
          right: 0,
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          borderRadius: "4px",
          zIndex: 1000,
          overflow: "hidden",
          maxHeight: open ? "200px" : "0",
          opacity: open ? 1 : 0,
          transition: "all 0.3s ease",
        }}
      >
        {["calendario", "vertical", "horizontal"].map((vista, i) => (
          <div
            key={vista}
            onClick={() =>
              handleSelect(vista as "calendario" | "vertical" | "horizontal")
            }
            style={{
              padding: "0.3rem 0.6rem",
              fontSize: "0.75rem",
              cursor: "pointer",
              borderBottom: i < 2 ? "1px solid #eee" : "none",
              background: "#fff",
            }}
          >
            {vista.charAt(0).toUpperCase() + vista.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}