import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";   // 👈 usar tu archivo real
import Evento from "@/models/evento";

// 🔹 Crear evento (POST)
export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { titulo, fecha, descripcion, ubicacion, etiquetas, estado, tipo } = body;

    if (!titulo || !fecha) {
      return NextResponse.json({ error: "Título y fecha son obligatorios" }, { status: 400 });
    }

    const nuevoEvento = new Evento({
      titulo,
      fecha,
      descripcion,
      ubicacion,
      etiquetas,
      estado,
      tipo: {
        principal: "evento",
        subtipo: tipo?.subtipo || ""
      }
    });

    const eventoGuardado = await nuevoEvento.save();
    return NextResponse.json(eventoGuardado, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear evento", detalle: error }, { status: 500 });
  }
}

// 🔹 Listar eventos (GET)
export async function GET() {
  await dbConnect();
  try {
    const eventos = await Evento.find().sort({ fecha: 1 });

    // ✅ Convertir _id a string para el frontend
    const eventosSerializados = eventos.map((e) => ({
      ...e.toObject(),
      _id: e._id.toString(),
    }));

    return NextResponse.json(eventosSerializados, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener eventos", detalle: error }, { status: 500 });
  }
}

// 🔹 Actualizar evento (PUT)
export async function PUT(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID del evento requerido" }, { status: 400 });
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(eventoActualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar evento", detalle: error }, { status: 500 });
  }
}

// 🔹 Eliminar evento (DELETE)
export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID del evento requerido" }, { status: 400 });
    }

    await Evento.findByIdAndDelete(id);
    return NextResponse.json({ mensaje: "Evento eliminado correctamente" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar evento", detalle: error }, { status: 500 });
  }
}