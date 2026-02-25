import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Nota from "@/models/nota";
import Evento from "@/models/evento";
import Oracion from "@/models/oracion";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    // Buscar coincidencias en notas
    const notas = await Nota.find({
      $or: [
        { titulo: { $regex: query, $options: "i" } },
        { contenido: { $regex: query, $options: "i" } },
      ],
    }).lean();

    // Buscar coincidencias en eventos
    const eventos = await Evento.find({
      $or: [
        { titulo: { $regex: query, $options: "i" } },
        { descripcion: { $regex: query, $options: "i" } },
      ],
    }).lean();

    // Buscar coincidencias en oraciones
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
        path: `/notas?edit=${n._id}`, // ✅ apunta al formulario de notas
      })),
      ...eventos.map((e) => ({
        label: e.titulo,
        snippet: e.descripcion,
        path: `/eventos?edit=${e._id}`, // ✅ apunta al formulario de eventos
      })),
      ...oraciones.map((o) => ({
        label: o.titulo,
        snippet: o.texto,
        path: `/oraciones?edit=${o._id}`, // ✅ apunta al formulario de oraciones
      })),
    ];

    return NextResponse.json(resultados);
  } catch (error: any) {
    console.error("❌ Error en GET /api/buscar:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}