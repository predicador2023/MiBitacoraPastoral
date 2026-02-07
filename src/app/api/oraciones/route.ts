
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Oracion from "@/models/oracion";

// GET → obtener todas las oraciones
export async function GET() {
  try {
    await dbConnect();

    const oraciones = await Oracion.find({}).lean();

    if (!oraciones) {
      return NextResponse.json([], { status: 200 });
    }

    const resultado = oraciones.map((o) => ({
      _id: o._id.toString(), // mantener _id porque tu frontend lo usa
      titulo: o.titulo,
      texto: o.texto,
      fecha: o.fecha,
      autor: o.autor,
    }));

    return NextResponse.json(resultado, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error en GET /api/oraciones:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST → crear una nueva oración
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    if (!body.titulo || !body.texto) {
      return NextResponse.json(
        { error: "Título y texto son obligatorios" },
        { status: 400 }
      );
    }

    const nuevaOracion = await Oracion.create({
      titulo: body.titulo,
      texto: body.texto,
      autor: body.autor || "Evangelista José Bedoya",
      fecha: body.fecha ? new Date(body.fecha) : new Date(),
    });

    return NextResponse.json(
      {
        _id: nuevaOracion._id.toString(), // mantener _id
        titulo: nuevaOracion.titulo,
        texto: nuevaOracion.texto,
        fecha: nuevaOracion.fecha,
        autor: nuevaOracion.autor,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error en POST /api/oraciones:", error);
    return NextResponse.json({ error: "Error al crear la oración" }, { status: 500 });
  }
}