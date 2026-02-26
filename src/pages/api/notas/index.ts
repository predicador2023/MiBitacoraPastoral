import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Nota from "@/models/nota";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const notas = await Nota.find().lean();
      return res.status(200).json(notas);
    } catch (error) {
      console.error("❌ Error al obtener notas:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}