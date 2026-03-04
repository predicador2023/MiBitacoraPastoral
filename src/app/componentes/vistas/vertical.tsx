"use client";
import { useState, useEffect } from "react";
import styles from "./vertical.module.css"; // solo estructura, sin colores

interface Actividad {
  _id: string;
  titulo: string;
  fecha: string;
  descripcion?: string;
  ubicacion?: string;
  etiquetas?: string[];
  tipo: string; // "nota" | "oracion" | "evento"
}

export default function VistaVertical() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [resNotas, resOraciones, resEventos] = await Promise.all([
          fetch("/api/notas"),
          fetch("/api/oraciones"),
          fetch("/api/eventos"),
        ]);

        if (!resNotas.ok || !resOraciones.ok || !resEventos.ok) {
          setError("No se pudieron cargar todas las actividades");
          setLoading(false);
          return;
        }

        const notas = await resNotas.json();
        const oraciones = await resOraciones.json();
        const eventos = await resEventos.json();

        // Normalizar cada tipo
        const all: Actividad[] = [
          ...notas.map((n: any) => ({ ...n, tipo: "nota" })),
          ...oraciones.map((o: any) => ({ ...o, tipo: "oracion" })),
          ...eventos.map((e: any) => ({ ...e, tipo: "evento" })),
        ];

        // Ordenar por fecha descendente (más reciente primero)
        const ordenadas = all.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );

        setActividades(ordenadas);
        setLoading(false);
      } catch (err) {
        setError("Error al conectar con la API");
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <p>Cargando actividades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      {actividades.map((act) => {
        const fechaObj = new Date(act.fecha);
        const fechaStr = fechaObj.toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const horaStr = fechaObj.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Asignar clase global según tipo
        let tipoClase = "";
        if (act.tipo === "evento") tipoClase = "eventoDia";
        else if (act.tipo === "oracion") tipoClase = "oracionDia";
        else if (act.tipo === "nota") tipoClase = "notaDia";

        return (
          <div key={act._id} className={`diaBloque ${tipoClase}`}>
            <div className={styles.diaTitulo}>{act.titulo}</div>
            <div className={styles.detalle}>
              {fechaStr} – {horaStr}
            </div>
            {act.descripcion && (
              <div className={styles.descripcion}>{act.descripcion}</div>
            )}
            {act.ubicacion && (
              <div className={styles.ubicacion}>📍 {act.ubicacion}</div>
            )}
            {(act.etiquetas ?? []).length > 0 && (
              <div className={styles.etiquetas}>
                {(act.etiquetas ?? []).join(", ")}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}