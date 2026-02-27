"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import styles from "./hojaNotas.module.css";
import Link from "next/link";

export default function HojaNotas() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams?.get("edit");

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());

  // ✅ Si hay ?edit=ID, traer la nota y rellenar el formulario
  useEffect(() => {
    const fetchNota = async () => {
      if (editId) {
        const res = await fetch(`/api/notas/${editId}`, { cache: "no-store" }); // 👈 fuerza SSR
        if (res.ok) {
          const nota = await res.json();
          setTitulo(nota.titulo);
          setContenido(nota.contenido);
          setAutor(nota.autor || "Evangelista José Bedoya");
          setFecha(new Date(nota.fecha));
        }
      }
    };
    fetchNota();
  }, [editId]);

  // ✅ Guardar (crear o editar según corresponda)
  const guardarNota = async () => {
    if (editId) {
      // 🔹 EDITAR nota existente
      await fetch(`/api/notas/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          contenido,
          autor: autor || "Evangelista José Bedoya",
          fecha: fecha.toISOString(),
        }),
      });
    } else {
      // 🔹 CREAR nueva nota
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
    }

    // Resetear formulario
    setTitulo("");
    setContenido("");
    setAutor("");
    setFecha(new Date());
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.encabezado}>
        {editId ? "✏️ Editar Nota" : "📝 Nueva Nota"}
      </h2>

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
          {editId ? "Guardar cambios" : "Guardar"}
        </button>

        <Link href="/notas/listado" className={`${styles.btn} ${styles.azul}`}>
          Ver Notas
        </Link>
      </div>
    </div>
  );
}