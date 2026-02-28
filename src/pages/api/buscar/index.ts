import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Nota from "@/models/nota";
import Evento from "@/models/evento";
import Oracion from "@/models/oracion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    await dbConnect();

    const query = (req.query.q as string) || "";

    // 🚨 Solo cortar si está vacío
    if (!query.trim()) {
      return res.status(200).json([]);
    }

    const notas = await Nota.find({
      $or: [
        { titulo: { $regex: query, $options: "i" } },
        { contenido: { $regex: query, $options: "i" } },
      ],
    }).lean();

    const eventos = await Evento.find({
      $or: [
        { titulo: { $regex: query, $options: "i" } },
        { descripcion: { $regex: query, $options: "i" } },
      ],
    }).lean();

    const oraciones = await Oracion.find({
      $or: [
        { titulo: { $regex: query, $options: "i" } },
        { texto: { $regex: query, $options: "i" } },
      ],
    }).lean();

    const resultados = [
      ...notas.map((n) => ({
        label: n.titulo,
        snippet: n.contenido,
        path: `/notas?edit=${n._id}`,
      })),
      ...eventos.map((e) => ({
        label: e.titulo,
        snippet: e.descripcion,
        path: `/eventos?edit=${e._id}`,
      })),
      ...oraciones.map((o) => ({
        label: o.titulo,
        snippet: o.texto,
        // 🔹 Ajuste: ahora apunta a la ruta dinámica editar/[id]
        path: `/oraciones/editar/${o._id}`,
      })),
    ];

    return res.status(200).json(resultados);
  } catch (error: any) {
    console.error("❌ Error en GET /api/buscar:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}