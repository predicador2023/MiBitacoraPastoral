"use client";

import { useState, useEffect } from "react";
import styles from "./horizontal.module.css";

type Item = {
  id?: string;
  titulo: string;
  descripcion?: string;
  tipo: "evento" | "nota" | "oracion";
  fecha?: string;
  hora?: string;
  fechaReferencia: string;
};

export default function Horizontal() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resEventos, resNotas, resOraciones] = await Promise.all([
          fetch("/api/eventos"),
          fetch("/api/notas"),
          fetch("/api/oraciones"),
        ]);

        const [dataEventos, dataNotas, dataOraciones] = await Promise.all([
          resEventos.json(),
          resNotas.json(),
          resOraciones.json(),
        ]);

        const eventos = dataEventos.map((e: any) => ({
          id: e._id || e.id,
          titulo: e.titulo,
          descripcion: e.descripcion,
          tipo: "evento",
          fecha: e.fecha,
          hora: e.hora,
          fechaReferencia: e.fecha,
        }));

        const notas = dataNotas.map((n: any) => ({
          id: n._id || n.id,
          titulo: n.titulo,
          descripcion: n.contenido,
          tipo: "nota",
          fecha: n.createdAt,
          fechaReferencia: n.createdAt,
        }));

        const oraciones = dataOraciones.map((o: any) => ({
          id: o._id || o.id,
          titulo: o.titulo,
          descripcion: o.contenido,
          tipo: "oracion",
          fecha: o.createdAt,
          fechaReferencia: o.createdAt,
        }));

        const todos = [...eventos, ...notas, ...oraciones];

        const ordenados = todos.sort(
          (a, b) =>
            new Date(b.fechaReferencia).getTime() -
            new Date(a.fechaReferencia).getTime()
        );

        setItems(ordenados.slice(0, 20));
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.contenedor}>
      {items.map((item, index) => (
        <Tarjeta key={item.id ?? index} item={item} />
      ))}
    </div>
  );
}

function Tarjeta({ item }: { item: Item }) {
  return (
    <div className={styles.tarjeta} style={{ background: getColor(item.tipo) }}>
      <div className={styles.franja}>
        <span>{formatFecha(item.fecha)}</span>
        <span>{formatHora(item.fecha, item.hora)}</span>
      </div>
      <div className={styles.icono}>{getIcon(item.tipo)}</div>
      <h3 className={styles.titulo}>{item.titulo}</h3>
      <p className={styles.subtitulo}>{getSubtitulo(item.descripcion)}</p>
    </div>
  );
}

function getIcon(tipo: string) {
  switch (tipo) {
    case "evento": return "📅";
    case "nota": return "✍️";
    case "oracion": return "🙏";
    default: return "⭐";
  }
}

function getColor(tipo: string) {
  switch (tipo) {
    case "evento": return "#0077B6";
    case "nota": return "#6A4C93";
    case "oracion": return "#4CAF50";
    default: return "#333";
  }
}

function parseFechaHora(fecha?: string, hora?: string) {
  if (!fecha) return null;
  if (fecha.includes("/")) {
    const [dia, mes, año] = fecha.split("/");
    const horaFinal = hora ? hora : "00:00";
    return new Date(`${año}-${mes}-${dia}T${horaFinal}:00`);
  }
  return new Date(fecha);
}

function formatFecha(fecha?: string) {
  const d = parseFechaHora(fecha);
  if (!d || isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short" }).toUpperCase();
}

function formatHora(fecha?: string, hora?: string) {
  if (!hora) return ""; // 🔹 si no hay hora, queda vacío
  const d = parseFechaHora(fecha, hora);
  if (!d || isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

function getSubtitulo(texto?: string) {
  if (!texto) return "";
  return texto.length > 20 ? texto.slice(0, 20) + "..." : texto;
}