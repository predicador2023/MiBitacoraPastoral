import React from "react";
import EventoCard from "./eventoCard";

type Evento = {
  fecha: string;
  hora?: string;
  titulo: string;
  tipo: "nota" | "oracion" | "reunion" | "visita" | "salida"; // 🔑 mismo tipado que EventoCard
  estado?: "vigente" | "caducado";
};

export default function VerticalView() {
  const eventos: Evento[] = [
    { fecha: "2026-02-07", hora: "14:00", titulo: "Oración comunitaria", tipo: "oracion" },
    { fecha: "2026-02-08", titulo: "Reunión pastoral", tipo: "reunion", estado: "vigente" },
    { fecha: "2026-02-09", titulo: "Visita a la comunidad", tipo: "visita", estado: "caducado" },
    { fecha: "2026-02-10", titulo: "Nota personal", tipo: "nota" },
  ];

  return (
    <div style={{ backgroundColor: "#000", padding: "1rem" }}>
      {eventos.map((evento, index) => (
        <EventoCard key={index} {...evento} />
      ))}
    </div>
  );
}