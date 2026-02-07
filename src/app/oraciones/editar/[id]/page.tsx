"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarOracion() {
  const { id } = useParams();
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [autor, setAutor] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔑 Traer la oración al cargar la página
  useEffect(() => {
    const fetchOracion = async () => {
      try {
        const res = await fetch(`/api/oraciones/${String(id)}`);
        if (!res.ok) throw new Error("No se pudo cargar la oración");
        const data = await res.json();

        setTitulo(data.titulo || "");
        setTexto(data.texto || "");
        setAutor(data.autor || "");
      } catch (error) {
        console.error("❌ Error cargando oración:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOracion();
  }, [id]);

  const guardarCambios = async () => {
    try {
      const res = await fetch(`/api/oraciones/${String(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, texto, autor }),
      });

      if (res.ok) {
        router.push("/oraciones/listado");
      } else {
        console.error("❌ Error al guardar cambios");
      }
    } catch (error) {
      console.error("❌ Error conectando al backend:", error);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>⏳ Cargando oración...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#6b4226" }}>
        Editar Oración
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Texto"
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minHeight: "120px",
          }}
        />
        <input
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Autor"
          style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <button
          onClick={guardarCambios}
          style={{
            padding: "0.6rem 1.4rem",
            background: "#8ecae6",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}