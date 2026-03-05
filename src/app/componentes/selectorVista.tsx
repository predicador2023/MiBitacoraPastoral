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
    <div className="selectorVista" style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        className="vista-button"
      >
        Vista {!open && "▼"}
      </button>

      <div className={`vista-menu ${open ? "open" : ""}`}>
        {["calendario", "vertical", "horizontal"].map((vista, i) => (
          <div
            key={vista}
            className="vista-option"
            onClick={() =>
              handleSelect(vista as "calendario" | "vertical" | "horizontal")
            }
          >
            {vista.charAt(0).toUpperCase() + vista.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}