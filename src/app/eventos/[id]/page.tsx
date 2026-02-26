"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";  // ✅ importar router
import "../formEvento.css";

export default function EditarEventoPage() {
  // ✅ tipado limpio: le decimos a TS que existe "id" y es string
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [formData, setFormData] = useState({
    titulo: "",
    fecha: "",
    descripcion: "",
    ubicacion: "",
    etiquetas: "",
    subtipo: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await fetch(`/api/eventos/${id}`);
        if (!res.ok) {
          setError("No se encontró el evento");
          setLoading(false);
          return;
        }
        const evento = await res.json();
        setFormData({
          titulo: evento.titulo,
          fecha: new Date(evento.fecha).toISOString().split("T")[0],
          descripcion: evento.descripcion || "",
          ubicacion: evento.ubicacion || "",
          etiquetas: evento.etiquetas?.join(", ") || "",
          subtipo: evento.tipo?.subtipo || ""
        });
        setLoading(false);
      } catch (err) {
        setError("Error al cargar el evento");
        setLoading(false);
      }
    };
    if (id) fetchEvento();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      titulo: formData.titulo,
      fecha: new Date(formData.fecha),
      descripcion: formData.descripcion,
      ubicacion: formData.ubicacion,
      etiquetas: formData.etiquetas.split(",").map(tag => tag.trim()),
      tipo: { subtipo: formData.subtipo }
    };

    const res = await fetch(`/api/eventos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Evento actualizado correctamente ✅");
      router.push("/eventos/listado");   // ✅ redirige al listado
    } else {
      alert("Error al actualizar evento ❌");
    }
  };

  if (loading) return <p>Cargando evento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Evento ✏️</h1>
      <form onSubmit={handleSubmit} className="formEvento">
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
        <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
        <input type="text" name="etiquetas" value={formData.etiquetas} onChange={handleChange} />
        <input type="text" name="subtipo" value={formData.subtipo} onChange={handleChange} />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}