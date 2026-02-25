import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Evento from "@/models/evento";

// Obtener un evento por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params; // ✅ correcto
    const evento = await Evento.findById(id);
    if (!evento) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }
    return NextResponse.json(evento);
  } catch (error: any) {
    console.error("❌ Error en GET /api/eventos/[id]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// Actualizar un evento por ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await request.json();
    const evento = await Evento.findByIdAndUpdate(id, body, { new: true });
    if (!evento) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }
    return NextResponse.json(evento);
  } catch (error: any) {
    console.error("❌ Error en PUT /api/eventos/[id]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// Eliminar un evento por ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;
    const evento = await Evento.findByIdAndDelete(id);
    if (!evento) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ mensaje: "Evento eliminado correctamente" });
  } catch (error: any) {
    console.error("❌ Error en DELETE /api/eventos/[id]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}