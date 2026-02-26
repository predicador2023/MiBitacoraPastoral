import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Oracion from "@/models/oracion";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const oracion = await Oracion.findById(new mongoose.Types.ObjectId(id as string));
      if (!oracion) return res.status(404).json({ mensaje: "Oración no encontrada" });
      return res.json(oracion);
    }

    if (req.method === "PUT") {
      const body = req.body;
      const oracionActualizada = await Oracion.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id as string),
        body,
        { new: true }
      );
      if (!oracionActualizada) return res.status(404).json({ mensaje: "Oración no encontrada" });
      return res.json(oracionActualizada);
    }

    if (req.method === "DELETE") {
      const oracionEliminada = await Oracion.findByIdAndDelete(new mongoose.Types.ObjectId(id as string));
      if (!oracionEliminada) return res.status(404).json({ mensaje: "Oración no encontrada" });
      return res.json({ mensaje: "Oración eliminada correctamente" });
    }

    return res.status(405).json({ mensaje: "Método no permitido" });
  } catch (error: any) {
    return res.status(500).json({ mensaje: "Error en servidor", error: error.message });
  }
}