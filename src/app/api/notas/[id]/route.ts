import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";   // 👈 usar tu archivo real
import Nota from "@/models/nota";

// GET: obtener una nota por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const nota = await Nota.findById(params.id);
  return NextResponse.json(nota);
}

// PUT: actualizar una nota por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await req.json();

  const notaActualizada = await Nota.findByIdAndUpdate(
    params.id,
    {
      titulo: body.titulo,
      contenido: body.contenido,
      fecha: new Date(body.fecha),
      autor: body.autor,
    },
    { new: true }
  );

  return NextResponse.json(notaActualizada);
}

// DELETE: eliminar una nota por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  await Nota.findByIdAndDelete(params.id);
  return NextResponse.json({ mensaje: "Nota eliminada" });
}