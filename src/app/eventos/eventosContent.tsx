"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./formEvento.css";

interface Evento {
  _id: string;
  titulo: string;
  fecha: string;
  descripcion?: string;
  ubicacion?: string;
  etiquetas?: string[];
  estado?: "vigente" | "caducado";
  tipo: {
    principal: "evento";
    subtipo?: string;
  };
}

export default function EventosContent() {
  const [formData, setFormData] = useState({
    titulo: "",
    fecha: "",
    descripcion: "",
    ubicacion: "",
    etiquetas: "",
    subtipo: ""
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const editId = searchParams?.get("edit");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      titulo: "",
      fecha: "",
      descripcion: "",
      ubicacion: "",
      etiquetas: "",
      subtipo: ""
    });
    setEditingId(null);
  };

  // 🔹 Nuevo: cargar datos del evento al editar
  useEffect(() => {
    const cargarEvento = async () => {
      if (editId) {
        try {
          const res = await fetch(`/api/eventos/${editId}`);
          if (res.ok) {
            const evento = await res.json();
            setFormData({
              titulo: evento.titulo || "",
              fecha: evento.fecha ? evento.fecha.split("T")[0] : "",
              descripcion: evento.descripcion || "",
              ubicacion: evento.ubicacion || "",
              etiquetas: evento.etiquetas ? evento.etiquetas.join(", ") : "",
              subtipo: evento.tipo?.subtipo || ""
            });
            setEditingId(evento._id);
          }
        } catch (err) {
          console.error("Error cargando evento:", err);
        }
      }
    };

    cargarEvento();
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 Normalizamos la fecha para que no se corra un día por la zona horaria
    const fechaNormalizada = new Date(formData.fecha + "T12:00:00");

    const payload = {
      titulo: formData.titulo,
      fecha: fechaNormalizada,
      descripcion: formData.descripcion,
      ubicacion: formData.ubicacion,
      etiquetas: formData.etiquetas.split(",").map((tag) => tag.trim()),
      tipo: { subtipo: formData.subtipo }
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/eventos/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Error al editar evento");
      } else {
        const res = await fetch("/api/eventos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Error al crear evento");
      }
      resetForm();
    } catch (err) {
      console.error("Error guardando evento:", err);
      alert("Ocurrió un error al guardar");
    }
  };

  return (
    <div className="contenedorEventos">
      {/* 🔹 Título centrado */}
      <h1 className="tituloPrincipal">Mi Bitácora de Eventos</h1>

      <form onSubmit={handleSubmit} className="formEvento">
        <h2>{editingId ? "Editar evento" : "Crear nuevo evento"}</h2>

        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />

        {/* 🔹 Textarea más grande */}
        <textarea
          name="descripcion"
          placeholder="Descripción"
          rows={5}
          value={formData.descripcion}
          onChange={handleChange}
        />

        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="etiquetas"
          placeholder="Etiquetas (coma separada)"
          value={formData.etiquetas}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subtipo"
          placeholder="Subtipo (ej. Santa Cena)"
          value={formData.subtipo}
          onChange={handleChange}
        />

        {/* 🔹 Botones juntos abajo */}
        <div className="acciones">
          <button type="submit" className="btnGuardar">
            {editingId ? "Guardar cambios" : "Crear Evento"}
          </button>
          <Link href="/eventos/listado">
            <button type="button" className="btnListado">
              Ver listado
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}