"use client";

import { useState } from "react";
import Calendario from "./componentes/vistas/calendario";
import Vertical from "./componentes/vistas/vertical";
import Horizontal from "./componentes/vistas/horizontal";
import Header from "./componentes/header";

export default function Page() {
  const [vista, setVista] = useState<"calendario" | "vertical" | "horizontal">("calendario");

  return (
    <>
      {/* 🔹 Header recibe setVista y muestra el selector arriba */}
      <Header setVista={setVista} />

      <div style={{ padding: "20px" }}>
        {vista === "calendario" && <Calendario />}
        {vista === "vertical" && <Vertical />}
        {vista === "horizontal" && <Horizontal />}
      </div>
    </>
  );
}