import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Evento from "@/models/evento";

// ✅ GET: obtener un evento por ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;

  const evento = await Evento.findById(id);
  if (!evento) {
    return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
  }

  return NextResponse.json(evento);
}

// ✅ PUT: actualizar un evento por ID
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;
  const body = await request.json();

  const evento = await Evento.findByIdAndUpdate(id, body, { new: true });
  if (!evento) {
    return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
  }

  return NextResponse.json(evento);
}

// ✅ DELETE: eliminar un evento por ID
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;

  const evento = await Evento.findByIdAndDelete(id);
  if (!evento) {
    return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ message: "Evento eliminado" });
}