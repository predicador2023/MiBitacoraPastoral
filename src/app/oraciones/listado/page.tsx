"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Oracion = {
  _id: string;
  titulo: string;
  texto: string;
  fecha?: string;
  autor?: string;
};

export default function ListadoOraciones() {
  const router = useRouter();
  const [oraciones, setOraciones] = useState<Oracion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const eliminarOracion = async (id: string) => {
    try {
      const res = await fetch(`/api/oraciones/${id}`, { method: "DELETE" });
      if (res.ok) {
        setOraciones(oraciones.filter((o) => o._id !== id));
      } else {
        const errorData = await res.json();
        console.error("❌ Error eliminando oración:", errorData);
        setError(errorData.error || "Error al eliminar la oración.");
      }
    } catch (error) {
      console.error("❌ Error eliminando oración:", error);
      setError("Error al conectar con el servidor.");
    }
  };

  useEffect(() => {
    refrescarOraciones();
  }, []);

  const refrescarOraciones = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/oraciones");
      const data = await res.json();
      console.log("📦 Datos recibidos:", data);

      if (Array.isArray(data)) {
        setOraciones(data);
        setError(null);
      } else {
        console.error("❌ El backend no devolvió un array:", data);
        setError(data.error || "No se pudieron cargar las oraciones.");
        setOraciones([]);
      }
    } catch (error) {
      console.error("❌ Error cargando oraciones:", error);
      setError("Error al conectar con el servidor.");
      setOraciones([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>⏳ Cargando oraciones...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#6b4226" }}>
        Listado de Oraciones
      </h2>

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <button
          onClick={() => router.push("/oraciones")}
          style={{
            padding: "0.6rem 1.4rem",
            background: "#ffd966",
            color: "#333",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Nueva Oración
        </button>
      </div>

      {error ? (
        <p style={{ textAlign: "center", color: "red", marginBottom: "2rem" }}>
          ⚠️ {error}
        </p>
      ) : oraciones.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No hay oraciones registradas.
        </p>
      ) : (
        oraciones.map((oracion) => (
          <div
            key={oracion._id}
            style={{
              background: "#fff",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem", color: "#6b4226" }}>
              {oracion.titulo}
            </h3>
            <p style={{ marginBottom: "0.75rem" }}>{oracion.texto}</p>
            <p style={{ fontStyle: "italic", color: "#666" }}>
              Fecha:{" "}
              {oracion.fecha
                ? new Date(oracion.fecha).toLocaleDateString("es-AR")
                : "Sin fecha"}{" "}
              | Autor: {oracion.autor || "Anónimo"}
            </p>

            <div style={{ marginTop: "0.5rem", display: "flex", gap: "1rem" }}>
              <button
                onClick={() => eliminarOracion(oracion._id)}
                style={{
                  background: "#ffd966",
                  color: "#333",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  console.log("🧪 Editando oración con ID:", oracion._id);
                  router.push(`/oraciones/editar/${String(oracion._id)}`); // ✅ Cambio clave
                }}
                style={{
                  background: "#8ecae6",
                  color: "#fff",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}