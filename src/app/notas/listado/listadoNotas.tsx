"use client";
import { useState, useEffect } from "react";
import styles from "../hojaNotas.module.css";

type Nota = {
  _id: string;
  titulo: string;
  contenido: string;
  fecha?: string;
  autor?: string;
};

export default function ListadoNotas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [expandido, setExpandido] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refrescarNotas();
  }, []);

  const refrescarNotas = async () => {
    try {
      const res = await fetch("/api/notas");
      if (!res.ok) throw new Error("Error al cargar notas");
      const data = await res.json();
      setNotas(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las notas.");
    }
  };

  const eliminarNota = async (id: string) => {
    await fetch(`/api/notas/${id}`, { method: "DELETE" });
    await refrescarNotas();
  };

  const notasMostradas = mostrarTodas ? notas : notas.slice(0, 10);

  return (
    <div className={styles.contenedor}>
      <h3 className={styles.encabezadoListado}>
        📋 Notas recientes {mostrarTodas ? "(todas)" : "(hasta 10)"}
      </h3>

      {error && <p className={styles.error}>{error}</p>}

      {notas.length === 0 && !error && (
        <p>No hay notas disponibles.</p>
      )}

      {notasMostradas.map((nota) => (
        <div key={nota._id} className={styles.notaCard}>
          <h4 className={styles.notaTitulo}>{nota.titulo}</h4>
          <p
            className={`${styles.notaContenido} ${
              expandido[nota._id] ? styles.expandido : ""
            }`}
          >
            {nota.contenido}
          </p>
          {!expandido[nota._id] && nota.contenido.length > 50 && (
            <button
              onClick={() =>
                setExpandido({ ...expandido, [nota._id]: true })
              }
              className={styles.leerMas}
            >
              Leer más
            </button>
          )}
          <p className={styles.notaMeta}>
            Fecha:{" "}
            {nota.fecha
              ? new Date(nota.fecha).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : ""}{" "}
            | Autor: {nota.autor}
          </p>
          <div className={styles.accionesCard}>
            <button
              onClick={() => eliminarNota(nota._id)}
              className={`${styles.btn} ${styles.rojo}`}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {notas.length > 0 && (
        <div className={styles.acciones}>
          <button
            onClick={() => setMostrarTodas(!mostrarTodas)}
            className={`${styles.btn} ${styles.azul}`}
          >
            {mostrarTodas ? "Ver solo recientes" : "Ver todas"}
          </button>
        </div>
      )}
    </div>
  );
}