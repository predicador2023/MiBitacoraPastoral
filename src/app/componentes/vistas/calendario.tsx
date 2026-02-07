"use client";

import React from "react";
import styles from "./calendario.module.css";

interface RegistroPastoral {
  titulo: string;
  tipo: "nota" | "evento" | "oracion";
  fecha: string; // formato YYYY-MM-DD
}

const registros: RegistroPastoral[] = [
  { titulo: "Reunión con catequistas", tipo: "evento", fecha: "2026-01-15" },
  { titulo: "Reflexión sobre Mateo 5", tipo: "nota", fecha: "2026-01-20" },
  { titulo: "Oración comunitaria", tipo: "oracion", fecha: "2026-01-25" },
  { titulo: "Visita pastoral", tipo: "evento", fecha: "2026-01-28" }
];

export default function Calendario() {
  const hoy = new Date();
  const mes = hoy.getMonth();
  const año = hoy.getFullYear();

  const diasEnMes = new Date(año, mes + 1, 0).getDate();
  const dias = Array.from({ length: diasEnMes }, (_, i) => i + 1);

  const registrosPorDia = (dia: number) => {
    const fechaStr = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    return registros.filter(r => r.fecha === fechaStr).slice(0, 3);
  };

  return (
    <div>
      
      {/* 🔹 Calendario dinámico */}
      <div className={styles.calendario}>
        {dias.map((dia) => (
          <div key={dia} className={styles.celda}>
            <span className={styles.numeroDia}>{dia}</span>
            <div className={styles.tarjetitas}>
              {registrosPorDia(dia).map((r, idx) => (
                <div
                  key={idx}
                  className={`${styles.tarjetita} ${styles[r.tipo]}`}
                  onClick={() => window.location.href = `/${r.tipo}s`}
                >
                  {r.titulo}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}