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

export default function OracionesContent() {
  const router = useRouter();
  const [oraciones, setOraciones] = useState<Oracion[]>([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");
  const [fecha, setFecha] = useState(new Date().toLocaleDateString());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refrescarOraciones();
  }, []);

  const refrescarOraciones = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/oraciones", { cache: "no-store" });
      const data = await res.json();

      if (Array.isArray(data)) {
        setOraciones(data);
        setError(null);
      } else {
        console.error("❌ Respuesta inesperada:", data);
        setError(data.error || "No se pudieron cargar las oraciones.");
        setOraciones([]);
      }
    } catch (error) {
      console.error("❌ Error al cargar oraciones:", error);
      setError("Error al conectar con el servidor.");
      setOraciones([]);
    } finally {
      setLoading(false);
    }
  };

  const guardarOracion = async () => {
    try {
      const res = await fetch("/api/oraciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          texto: contenido,
          autor: autor || "Evangelista José Bedoya",
          fecha: new Date(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ Error al guardar:", errorData);
        setError(errorData.error || "Error al guardar la oración.");
        return;
      }

      const nuevaOracion = await res.json();
      console.log("✅ Oración creada:", nuevaOracion);

      setTitulo("");
      setContenido("");
      setAutor("");
      setFecha(new Date().toLocaleDateString());
      setError(null);
      refrescarOraciones();
    } catch (error) {
      console.error("❌ Error en la petición:", error);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#fff8e7",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "#6b4226",
        }}
      >
        Mi Bitácora de Oraciones
      </h2>

      {/* Formulario */}
      <input
        type="text"
        placeholder="Título de la oración"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <textarea
        placeholder="Escribe tu oración aquí..."
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        style={{
          width: "100%",
          height: "220px",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span>Fecha: {fecha}</span>
        <span>Autor: {autor || "Evangelista José Bedoya"}</span>
      </div>

      {/* Botones */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={guardarOracion}
          style={{
            padding: "0.6rem 1.4rem",
            background: "#ffd966",
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
          onClick={() => router.push("/oraciones/listado")}
          style={{
            padding: "0.6rem 1.4rem",
            background: "#8ecae6",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Ver Oraciones
        </button>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* Estado de carga / error / listado */}
      {loading ? (
        <p style={{ textAlign: "center" }}>⏳ Cargando oraciones...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>⚠️ {error}</p>
      ) : oraciones.length > 0 ? (
        oraciones.map((oracion) => (
          <div
            key={oracion._id}
            style={{
              background: "#fff",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem", color: "#6b4226" }}>{oracion.titulo}</h3>
            <p style={{ marginBottom: "0.75rem" }}>{oracion.texto}</p>
            <p style={{ fontStyle: "italic", color: "#666" }}>
              Fecha:{" "}
              {oracion.fecha
                ? new Date(oracion.fecha).toLocaleDateString("es-AR")
                : "Sin fecha"}{" "}
              | Autor: {oracion.autor}
            </p>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#999" }}>⚠️ No hay oraciones para mostrar.</p>
      )}
    </div>
  );
}