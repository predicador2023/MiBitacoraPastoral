import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Evento from "../../../../models/evento";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const eventos = await Evento.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json(eventos);
    }

    if (req.method === "POST") {
      const body = req.body;

      if (!body.fecha) {
        return res.status(400).json({ error: "La fecha es obligatoria" });
      }

      body.fecha = new Date(body.fecha); // 🔹 conversión explícita

      const nuevoEvento = new Evento(body);
      await nuevoEvento.save();
      return res.status(201).json(nuevoEvento);
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (error: any) {
    console.error("❌ Error en eventos:", error);
    return res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
}