"use client";
import { useState, useEffect } from "react";

type Nota = {
  _id: string;
  titulo: string;
  contenido: string;
  fecha?: string;
  autor?: string;
};

export default function ListadoNotas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [notaEditando, setNotaEditando] = useState<Nota | null>(null);

  useEffect(() => {
    refrescarNotas();
  }, []);

  const refrescarNotas = async () => {
    try {
      const res = await fetch("/api/notas");
      const data = await res.json();
      setNotas(data);
    } catch (error) {
      console.error("Error cargando notas:", error);
    }
  };

  const eliminarNota = async (id: string) => {
    await fetch("/api/notas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refrescarNotas();
  };

  const guardarCambios = async () => {
    if (!notaEditando) return;
    await fetch("/api/notas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: notaEditando._id,
        titulo: notaEditando.titulo,
        contenido: notaEditando.contenido,
      }),
    });
    setNotaEditando(null);
    refrescarNotas();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Listado de Notas
      </h2>

      {/* Bloque fijo de referencia */}
      <div
        style={{
          background: "#f0f4f8",
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#444" }}>
          Ejemplo de Nota / Espacio reservado
        </h3>
        <p style={{ marginBottom: "0.75rem", color: "#666" }}>
          Aquí se mostrará el contenido cuando lleguen los datos del backend.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            style={{
              background: "#d9534f",
              color: "#fff",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            disabled
          >
            Eliminar
          </button>
          <button
            style={{
              background: "#a8d5ba",
              color: "#333",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            disabled
          >
            Editar
          </button>
        </div>
      </div>

      {/* Notas reales */}
      {notas.map((nota) => (
        <div
          key={nota._id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          {notaEditando?._id === nota._id ? (
            <>
              <input
                type="text"
                value={notaEditando.titulo}
                onChange={(e) =>
                  setNotaEditando({ ...notaEditando, titulo: e.target.value })
                }
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />
              <textarea
                value={notaEditando.contenido}
                onChange={(e) =>
                  setNotaEditando({ ...notaEditando, contenido: e.target.value })
                }
                style={{ width: "100%", height: "100px", marginBottom: "0.5rem" }}
              />
              <button onClick={guardarCambios} style={{ marginRight: "0.5rem" }}>
                Guardar
              </button>
              <button onClick={() => setNotaEditando(null)}>Cancelar</button>
            </>
          ) : (
            <>
              <h3>{nota.titulo}</h3>
              <p>{nota.contenido}</p>
              <p style={{ fontStyle: "italic", color: "#666" }}>
                Fecha: {nota.fecha} | Autor: {nota.autor}
              </p>
              <button
                onClick={() => eliminarNota(nota._id)}
                style={{
                  marginRight: "0.5rem",
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
              <button
                onClick={() => setNotaEditando(nota)}
                style={{
                  background: "#a8d5ba",
                  color: "#333",
                  border: "none",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}