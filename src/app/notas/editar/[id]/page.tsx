"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../../hojaNotas.module.css";

export default function EditarNota() {
  // ✅ tipado limpio: le decimos a TS que existe "id" y es string
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [nota, setNota] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNota = async () => {
      try {
        const res = await fetch(`/api/notas/${id}`);
        if (!res.ok) throw new Error("Error al cargar nota");
        const data = await res.json();
        setNota(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la nota.");
      }
    };
    if (id) fetchNota();
  }, [id]);

  const actualizarNota = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/notas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nota),
      });
      if (res.ok) {
        router.push("/notas/listado");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar la nota.");
    }
  };

  if (!nota) return <p>Cargando nota...</p>;

  return (
    <div className={styles.contenedor}>
      <h3 className={styles.encabezado}>✏️ Editar Nota</h3>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={actualizarNota}>
        <input
          type="text"
          value={nota.titulo}
          onChange={(e) => setNota({ ...nota, titulo: e.target.value })}
          className={styles.input}
          placeholder="Título"
        />
        <textarea
          value={nota.contenido}
          onChange={(e) => setNota({ ...nota, contenido: e.target.value })}
          className={styles.textarea}
          placeholder="Contenido"
        />
        <div className={styles.acciones}>
          <button type="submit" className={`${styles.btn} ${styles.verde}`}>
            Guardar cambios
          </button>
          <button
            type="button"
            onClick={() => router.push("/notas/listado")}
            className={`${styles.btn} ${styles.azul}`}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}