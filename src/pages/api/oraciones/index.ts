import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Oracion from "@/models/oracion";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { year, month } = req.query;
      let filter: any = {};

      if (year && month) {
        const start = new Date(Number(year), Number(month) - 1, 1);
        const end = new Date(Number(year), Number(month), 0);
        filter.fecha = { $gte: start, $lte: end };
      }

      const oraciones = await Oracion.find(filter).lean();
      return res.status(200).json(oraciones);
    } catch (error) {
      console.error("❌ Error al obtener oraciones:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}