"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Nota = {
  _id: string;
  titulo: string;
  contenido: string;
  fecha?: string;
  autor?: string;
};

export default function HojaNotas() {
  const router = useRouter();
  const [notas, setNotas] = useState<Nota[]>([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());

  useEffect(() => {
    refrescarNotas();
  }, []);

  const refrescarNotas = async () => {
    const res = await fetch("/api/notas");
    const data = await res.json();
    setNotas(data);
  };

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
    refrescarNotas();
    // ✅ Redirigir al listado después de guardar
    router.push("/notas/listado");
  };

  // ✅ Actualizar nota
  const actualizarNota = async (id: string) => {
    const res = await fetch(`/api/notas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        contenido,
        autor: autor || "Evangelista José Bedoya",
        fecha: fecha.toISOString(),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Error al actualizar:", data);
    } else {
      refrescarNotas();
      // ✅ Redirigir al listado después de actualizar
      router.push("/notas/listado");
    }
  };

  // ✅ Eliminar nota
  const eliminarNota = async (id: string) => {
    await fetch(`/api/notas/${id}`, {
      method: "DELETE",
    });
    refrescarNotas();
  };

  return (
    <div
      style={{
        maxWidth: "340px",
        margin: "1rem auto",
        padding: "1rem",
        background: "#fdf6ec",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "1rem",
          marginBottom: "1rem",
          color: "#444",
        }}
      >
        Mi Bitácora de Notas
      </h2>

      {/* Formulario */}
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          fontSize: "1.1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <textarea
        placeholder="Contenido"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        style={{
          width: "100%",
          height: "70vh",
          padding: "1rem",
          marginBottom: "1rem",
          fontSize: "1.2rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
          fontStyle: "italic",
          color: "#555",
        }}
      >
        <span>
          Fecha:{" "}
          {fecha.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
        <span>Autor: {autor}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={guardarNota}
          style={{
            padding: "0.6rem 1.4rem",
            background: "#a8d5ba",
            color: "#333",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Guardar
        </button>

        <button
          onClick={() => router.push("/notas/listado")}
          style={{
            padding: "0.6rem 1.4rem",
            background: "#7d7bff",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Ver Notas
        </button>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* Listado */}
      {notas.map((nota) => (
        <div
          key={nota._id}
          style={{
            background: "#fff",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>{nota.titulo}</h3>
          <p style={{ marginBottom: "0.75rem" }}>{nota.contenido}</p>
          <p
            style={{
              fontStyle: "italic",
              color: "#666",
              marginBottom: "0.75rem",
            }}
          >
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
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => actualizarNota(nota._id)}
              style={{
                background: "#f0ad4e",
                color: "#fff",
                border: "none",
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Actualizar
            </button>
            <button
              onClick={() => eliminarNota(nota._id)}
              style={{
                background: "#d9534f",
                color: "#fff",
                border: "none",
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}