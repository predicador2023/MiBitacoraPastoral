// pages/api/notas/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Nota from "@/models/nota";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const nota = await Nota.findById(new mongoose.Types.ObjectId(id as string));
      if (!nota) return res.status(404).json({ mensaje: "Nota no encontrada" });
      return res.json(nota);
    }

    if (req.method === "PUT") {
      const body = req.body;
      const notaActualizada = await Nota.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id as string),
        {
          titulo: body.titulo,
          contenido: body.contenido,
          fecha: body.fecha ? new Date(body.fecha) : new Date(),
          autor: body.autor,
        },
        { new: true }
      );
      if (!notaActualizada) return res.status(404).json({ mensaje: "Nota no encontrada" });
      return res.json(notaActualizada);
    }

    if (req.method === "DELETE") {
      const notaEliminada = await Nota.findByIdAndDelete(new mongoose.Types.ObjectId(id as string));
      if (!notaEliminada) return res.status(404).json({ mensaje: "Nota no encontrada" });
      return res.json({ mensaje: "Nota eliminada correctamente" });
    }

    return res.status(405).json({ mensaje: "Método no permitido" });
  } catch (error: any) {
    return res.status(500).json({ mensaje: "Error en servidor", error: error.message });
  }
}