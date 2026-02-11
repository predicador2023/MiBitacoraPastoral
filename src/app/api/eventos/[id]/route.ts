import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";     // tu conexión a MongoDB
import Evento from "@/models/evento";        // tu modelo de eventos

// 🔹 GET: obtener un evento por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;   // ✅ objeto plano, sin await
  try {
    const evento = await Evento.findById(id);
    if (!evento) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }
    return NextResponse.json(evento);
  } catch (error) {
    return NextResponse.json({ error: "Error al buscar evento" }, { status: 500 });
  }
}

// 🔹 PUT: actualizar un evento por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  try {
    const body = await req.json();
    const eventoActualizado = await Evento.findByIdAndUpdate(id, body, { new: true });
    if (!eventoActualizado) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }
    return NextResponse.json(eventoActualizado);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar evento" }, { status: 500 });
  }
}

// 🔹 DELETE: eliminar un evento por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(id);
    if (!eventoEliminado) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar evento" }, { status: 500 });
  }
}