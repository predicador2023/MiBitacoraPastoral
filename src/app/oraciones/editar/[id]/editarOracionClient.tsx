"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Oracion = {
  _id: string;
  titulo: string;
  texto: string;
  autor?: string;
};

export default function EditarOracionClient({ id }: { id: string }) {
  const router = useRouter();

  const [oracion, setOracion] = useState<Oracion>({
    _id: "",
    titulo: "",
    texto: "",
    autor: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("🧩 ID recibido en cliente:", id);

    const fetchOracion = async () => {
      try {
        const res = await fetch(`/api/oraciones/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          console.error("❌ Error cargando oración:", errorData.error || "Error desconocido");
          setError(errorData.error || "No se pudo cargar la oración");
          return;
        }

        const data = await res.json();
        console.log("📩 Datos recibidos desde backend:", data);

        setOracion({
          _id: data._id,
          titulo: data.titulo || "",
          texto: data.texto || "",
          autor: data.autor || "",
        });
      } catch (err: any) {
        console.error("❌ Error cargando oración:", err.message);
        setError("Error cargando oración");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOracion();
  }, [id]);

  const actualizarOracion = async () => {
    try {
      const res = await fetch(`/api/oraciones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: oracion.titulo,
          texto: oracion.texto,
          autor: oracion.autor,
        }),
      });

      if (res.ok) {
        alert("✅ Oración actualizada correctamente");
        router.push("/oraciones/listado");
      } else {
        const errorData = await res.json();
        console.error("❌ Error al actualizar:", errorData);
        alert(errorData.error || "❌ Error al actualizar la oración");
      }
    } catch (error) {
      console.error("❌ Error en la petición:", error);
      alert("❌ Error en la petición");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#6b4226" }}>
        Editar Oración
      </h2>

      <input
        type="text"
        value={oracion.titulo}
        onChange={(e) => setOracion({ ...oracion, titulo: e.target.value })}
        placeholder="Título"
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />

      <textarea
        value={oracion.texto}
        onChange={(e) => setOracion({ ...oracion, texto: e.target.value })}
        placeholder="Texto"
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem", minHeight: "120px" }}
      />

      <input
        type="text"
        value={oracion.autor || ""}
        onChange={(e) => setOracion({ ...oracion, autor: e.target.value })}
        placeholder="Autor"
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />

      <button
        onClick={actualizarOracion}
        style={{
          background: "#8ecae6",
          color: "#fff",
          border: "none",
          padding: "0.6rem 1.2rem",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Guardar cambios
      </button>
    </div>
  );
}