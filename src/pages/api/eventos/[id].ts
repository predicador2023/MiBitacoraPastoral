import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Evento from "../../../../models/evento";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const evento = await Evento.findById(new mongoose.Types.ObjectId(id as string));
      if (!evento) return res.status(404).json({ mensaje: "Evento no encontrado" });
      return res.json(evento);
    }

    if (req.method === "PUT") {
      const body = req.body;

      // 🔹 convertir fecha explícitamente
      if (body.fecha) {
        body.fecha = new Date(body.fecha);
      }

      const eventoActualizado = await Evento.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id as string),
        { $set: body }, // 🔹 usamos $set para asegurar actualización
        { new: true }
      );

      if (!eventoActualizado) return res.status(404).json({ mensaje: "Evento no encontrado" });
      return res.json(eventoActualizado);
    }

    if (req.method === "DELETE") {
      const eventoEliminado = await Evento.findByIdAndDelete(new mongoose.Types.ObjectId(id as string));
      if (!eventoEliminado) return res.status(404).json({ mensaje: "Evento no encontrado" });
      return res.json({ mensaje: "Evento eliminado correctamente" });
    }

    return res.status(405).json({ mensaje: "Método no permitido" });
  } catch (error: any) {
    return res.status(500).json({ mensaje: "Error en servidor", error: error.message });
  }
}