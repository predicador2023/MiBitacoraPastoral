"use client";
import React from "react";

interface Registro {
  fecha: string;
  hora: string;
  titulo: string;
  tipo: "oraciones" | "eventos" | "notas"; // 🔹 solo tres tipos permitidos
}

const registros: Registro[] = [
  {
    fecha: "2026-02-01",
    hora: "10:00",
    titulo: "Oración por la Iglesia",
    tipo: "oraciones",
  },
  {
    fecha: "2026-02-05",
    hora: "19:00",
    titulo: "Reunión de líderes",
    tipo: "eventos",
  },
  {
    fecha: "2026-02-07",
    hora: "09:00",
    titulo: "Nota pastoral",
    tipo: "notas",
  },
];

export default function Vertical() {
  return (
    <div style={{ padding: "16px" }}>
      <h2>Vista Vertical</h2>
      <ul>
        {registros.map((registro, index) => (
          <li key={index}>
            <strong>{registro.titulo}</strong> <br />
            {registro.fecha} – {registro.hora} <br />
            <em>{registro.tipo}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}