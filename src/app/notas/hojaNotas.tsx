"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./hojaNotas.module.css";
import Link from "next/link";

export default function HojaNotas() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());

  // ✅ Crear nota
  const guardarNota = async () => {
    await fetch("/api/notas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        contenido,
        autor: autor || "Evangelista José Bedoya",
        fecha: new Date().toISOString(),
      }),
    });
    setTitulo("");
    setContenido("");
    setAutor("");
    setFecha(new Date());
    // Se queda en el formulario, el usuario decide con el botón azul
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.encabezado}>📝 Nueva Nota</h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className={styles.input}
      />

      <textarea
        placeholder="Contenido"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        className={styles.textarea}
      />

      <div className={styles.info}>
        <span>
          📅 Fecha:{" "}
          {fecha.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
        <span>👤 Autor: {autor || "Evangelista José Bedoya"}</span>
      </div>

      <div className={styles.acciones}>
        <button
          onClick={guardarNota}
          className={`${styles.btn} ${styles.verde}`}
        >
          Guardar
        </button>

        {/* ✅ Botón azul corregido */}
        <Link href="/notas/listado" className={`${styles.btn} ${styles.azul}`}>
          Ver Notas
        </Link>
      </div>
    </div>
  );
}