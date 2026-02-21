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
  const [mensaje, setMensaje] = useState<string>("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");

  useEffect(() => {
    refrescarNotas();
  }, []);

  const refrescarNotas = async () => {
    try {
      const res = await fetch("/api/notas");
      if (!res.ok) throw new Error("Error al cargar notas");
      const data = await res.json();
      setNotas(data);
    } catch (error) {
      console.error("Error cargando notas:", error);
      setTipoMensaje("error");
      setMensaje("❌ No se pudieron cargar las notas");
      setTimeout(() => setMensaje(""), 4000);
    }
  };

  const eliminarNota = async (id: string) => {
    try {
      const res = await fetch(`/api/notas/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar nota");
      setTipoMensaje("success");
      setMensaje("✅ Nota eliminada correctamente");
      setTimeout(() => setMensaje(""), 3000);
      refrescarNotas();
    } catch (error) {
      console.error("Error eliminando nota:", error);
      setTipoMensaje("error");
      setMensaje("❌ No se pudo eliminar la nota");
      setTimeout(() => setMensaje(""), 4000);
    }
  };

  const guardarCambios = async () => {
    if (!notaEditando) return;
    try {
      const res = await fetch(`/api/notas/${notaEditando._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: notaEditando.titulo,
          contenido: notaEditando.contenido,
          fecha: new Date(),
          autor: notaEditando.autor,
        }),
      });
      if (!res.ok) throw new Error("Error al guardar cambios");
      setNotaEditando(null);
      setTipoMensaje("success");
      setMensaje("✅ Cambios guardados correctamente");
      setTimeout(() => setMensaje(""), 3000);
      refrescarNotas();
    } catch (error) {
      console.error("Error guardando cambios:", error);
      setTipoMensaje("error");
      setMensaje("❌ No se pudieron guardar los cambios");
      setTimeout(() => setMensaje(""), 4000);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Listado de Notas
      </h2>

      {/* Mensaje de confirmación o error */}
      {mensaje && (
        <div
          style={{
            background: tipoMensaje === "success" ? "#e0ffe0" : "#ffe0e0",
            border: tipoMensaje === "success" ? "1px solid #8bc34a" : "1px solid #f44336",
            borderRadius: "8px",
            padding: "0.75rem",
            marginBottom: "1rem",
            textAlign: "center",
            color: tipoMensaje === "success" ? "#33691e" : "#b71c1c",
            fontWeight: "bold",
          }}
        >
          {mensaje}
        </div>
      )}

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