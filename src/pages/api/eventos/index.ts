import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Evento from "@/models/evento";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const eventos = await Evento.find().lean();
      return res.status(200).json(eventos);
    } catch (error) {
      console.error("❌ Error al obtener eventos:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}