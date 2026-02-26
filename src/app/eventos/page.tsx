"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // ✅ para leer query params
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

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
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
  const editId = searchParams?.get("edit"); // ✅ optional chaining

  // 🔹 Consumir API (GET)
  const fetchEventos = async () => {
    const res = await fetch("/api/eventos");
    if (res.ok) {
      const data = await res.json();
      setEventos(data);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  // 🔹 Detectar query param y cargar evento automáticamente
  useEffect(() => {
    if (editId && eventos.length > 0) {
      const evento = eventos.find((e) => e._id === editId);
      if (evento) {
        startEdit(evento);
      }
    }
  }, [editId, eventos]);

  // 🔹 Manejo de formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      titulo: formData.titulo,
      fecha: new Date(formData.fecha),
      descripcion: formData.descripcion,
      ubicacion: formData.ubicacion,
      etiquetas: formData.etiquetas.split(",").map((tag) => tag.trim()),
      tipo: { subtipo: formData.subtipo }
    };

    if (editingId) {
      // 🔹 PUT (editar)
      const res = await fetch(`/api/eventos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEditingId(null);
        setFormData({
          titulo: "",
          fecha: "",
          descripcion: "",
          ubicacion: "",
          etiquetas: "",
          subtipo: ""
        });
        fetchEventos();
      } else {
        alert("Error al editar evento");
      }
    } else {
      // 🔹 POST (crear)
      const res = await fetch("/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFormData({
          titulo: "",
          fecha: "",
          descripcion: "",
          ubicacion: "",
          etiquetas: "",
          subtipo: ""
        });
        fetchEventos();
      } else {
        alert("Error al crear evento");
      }
    }
  };

  // 🔹 Cargar datos en el formulario para editar
  const startEdit = (evento: Evento) => {
    setEditingId(evento._id);
    setFormData({
      titulo: evento.titulo,
      fecha: new Date(evento.fecha).toISOString().split("T")[0],
      descripcion: evento.descripcion || "",
      ubicacion: evento.ubicacion || "",
      etiquetas: evento.etiquetas?.join(", ") || "",
      subtipo: evento.tipo?.subtipo || ""
    });
  };

  return (
    <div className="p-6">
      <h1 className="calendarioTitulo">
        <i className="iconoCalendario"></i> Eventos
      </h1>

      <Link href="/eventos/listado">
        <button className="btnVerEventos">Ver listado</button>
      </Link>

      {/* Formulario */}
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
        <textarea
          name="descripcion"
          placeholder="Descripción"
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
        <button type="submit">
          {editingId ? "Guardar cambios" : "Crear Evento"}
        </button>
      </form>

      {/* Lista de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventos.map((evento) => (
          <div key={evento._id} className="border rounded p-4 bg-blue-50">
            <h2 className="text-lg font-semibold text-blue-700">
              {evento.titulo || "-"}
            </h2>
            <p className="text-sm text-gray-600">
              {new Date(evento.fecha).toLocaleDateString()}
            </p>
            <p>{evento.descripcion || "-"}</p>
            <p>
              <strong>Ubicación:</strong> {evento.ubicacion || "-"}
            </p>
            {Array.isArray(evento.etiquetas) && evento.etiquetas.length > 0 ? (
              <p>
                <strong>Etiquetas:</strong> {evento.etiquetas.join(", ")}
              </p>
            ) : (
              <p>
                <strong>Etiquetas:</strong> -
              </p>
            )}
            {evento.tipo?.subtipo && (
              <p>
                <strong>Subtipo:</strong> {evento.tipo.subtipo}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Estado: {evento.estado || "-"}
            </p>

            {/* Botón editar directo */}
            <button
              onClick={() => startEdit(evento)}
              className="btnEditar"
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}