"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./listadoEventos.css";

interface Evento {
  _id: string;
  titulo: string;
  fecha: string;
  descripcion?: string;
  ubicacion?: string;
  etiquetas?: string[];
  estado?: "vigente" | "caducado";
  tipo?: { subtipo?: string };
}

export default function ListadoEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);

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

  // 🔹 DELETE (eliminar evento)
  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este evento?")) return;

    const res = await fetch(`/api/eventos/${id}`, { method: "DELETE" });

    if (res.ok) {
      fetchEventos();
    } else {
      alert("Error al eliminar evento");
    }
  };

  return (
    <div className="listadoEventos">
      {/* Título más discreto */}
      <h1 className="listadoTitulo">
        <i className="iconoCalendario"></i> Listado de Eventos
      </h1>

      {/* Botón volver al calendario más pequeño y secundario */}
      <Link href="/eventos">
        <button className="btnVolver">Volver al calendario</button>
      </Link>

      {/* Contenedor de tarjetas */}
      <div className="contenedorCards">
        {eventos.map((evento) => (
          <div key={evento._id} className="eventoCard">
            <h2 className="eventoTitulo">{evento.titulo || "-"}</h2>
            <p className="eventoFecha">📅 {new Date(evento.fecha).toLocaleDateString()}</p>
            <p className="eventoDescripcion">{evento.descripcion || "-"}</p>
            <p className="eventoUbicacion">📍 {evento.ubicacion || "-"}</p>
            {Array.isArray(evento.etiquetas) && evento.etiquetas.length > 0 ? (
              <p className="eventoEtiquetas">🏷️ {evento.etiquetas.join(", ")}</p>
            ) : (
              <p className="eventoEtiquetas">🏷️ -</p>
            )}
            {evento.tipo?.subtipo && (
              <p className="eventoSubtipo">Subtipo: {evento.tipo.subtipo}</p>
            )}

            {/* Estado como badge */}
            <span className={`estadoBadge ${evento.estado}`}>
              Estado: {evento.estado || "-"}
            </span>

            {/* Botones de acción armonizados */}
            <div className="accionesListado">
              <Link href={`/eventos/${evento._id}`}>
                <button className="btnAccion btnEditar">Editar</button>
              </Link>
              <button
                onClick={() => handleDelete(evento._id)}
                className="btnAccion btnEliminar"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}