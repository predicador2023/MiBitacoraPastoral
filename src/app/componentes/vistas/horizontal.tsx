"use client";

import { useState } from "react";

type Evento = {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: "reunion" | "oracion" | "salida" | "visita";
  fecha: string;
  hora: string;
};

const eventos: Evento[] = [
  { id: 1, titulo: "Reunión de equipo", descripcion: "Planificación semanal", tipo: "reunion", fecha: "29 ENE", hora: "18:00" },
  { id: 2, titulo: "Oración comunitaria", descripcion: "Encuentro espiritual", tipo: "oracion", fecha: "30 ENE", hora: "20:00" },
  { id: 3, titulo: "Salida pastoral", descripcion: "Visita a familias", tipo: "salida", fecha: "31 ENE", hora: "10:00" },
  { id: 4, titulo: "Visita hospital", descripcion: "Acompañamiento", tipo: "visita", fecha: "01 FEB", hora: "15:00" },
];

export default function Horizontal() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="contenedor">
      {eventos.map((evento, index) => (
        <div
          key={evento.id}
          className={`tarjeta ${index === current ? "activa" : ""}`}
          style={{ background: getColor(evento.tipo) }}
        >
          {/* Franja superior con fecha y hora */}
          <div className="franja">
            <span className="fecha">{evento.fecha}</span>
            <span className="hora">{evento.hora}</span>
          </div>

          {/* Icono simbólico */}
          <div className="icono">{getIcon(evento.tipo)}</div>

          {/* Texto principal */}
          <h3>{evento.titulo}</h3>
          <p>{evento.descripcion}</p>
        </div>
      ))}

      <style jsx>{`
        .contenedor {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          overflow-x: auto;
          max-width: 100%;
          padding: 0.5rem;
        }

        .tarjeta {
          flex-shrink: 0;
          width: 220px;
          height: auto;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          color: #fff;
          transition: all 0.3s ease;
          position: relative;
        }

        .tarjeta.activa {
          transform: translateX(0);
          opacity: 1;
        }

        .tarjeta:not(.activa) {
          transform: translateX(10px);
          opacity: 0.9;
        }

        .franja {
          width: 100%;
          display: flex;
          justify-content: space-between;
          background: rgba(255,255,255,0.2);
          padding: 0.3rem 0.5rem;
          border-radius: 6px;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        }

        .fecha {
          font-weight: bold;
        }

        .hora {
          font-style: italic;
        }

        .icono {
          font-size: 2rem;
          margin: 0.5rem 0;
        }

        /* 🔹 Ajuste para celulares entre 330px y 430px */
        @media (min-width: 330px) and (max-width: 430px) {
          .tarjeta {
            width: calc(50% - 0.5rem);
            height: 75vh;
          }
        }
      `}</style>
    </div>
  );
}

function getColor(tipo: string) {
  switch (tipo) {
    case "reunion":
      return "#0077B6"; // azul
    case "oracion":
      return "#6A4C93"; // violeta
    case "salida":
      return "#FF6B6B"; // coral
    case "visita":
      return "#4CAF50"; // verde
    default:
      return "#333";
  }
}

function getIcon(tipo: string) {
  switch (tipo) {
    case "reunion":
      return "📅";
    case "oracion":
      return "🙏";
    case "salida":
      return "🚶";
    case "visita":
      return "🏥";
    default:
      return "⭐";
  }
}