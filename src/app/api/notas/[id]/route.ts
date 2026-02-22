import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Nota from "@/models/nota";

// ✅ GET: obtener una nota por ID
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params; // 👈 corrección

  try {
    const nota = await Nota.findById(id);
    if (!nota) {
      return NextResponse.json({ mensaje: "Nota no encontrada" }, { status: 404 });
    }
    return NextResponse.json(nota);
  } catch (error: any) {
    return NextResponse.json(
      { mensaje: "Error al obtener nota", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ PUT: actualizar una nota por ID
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params; // 👈 corrección

  try {
    const body = await req.json();
    const notaActualizada = await Nota.findByIdAndUpdate(
      id,
      {
        titulo: body.titulo,
        contenido: body.contenido,
        fecha: body.fecha ? new Date(body.fecha) : new Date(),
        autor: body.autor,
      },
      { new: true }
    );

    if (!notaActualizada) {
      return NextResponse.json({ mensaje: "Nota no encontrada" }, { status: 404 });
    }

    return NextResponse.json(notaActualizada);
  } catch (error: any) {
    return NextResponse.json(
      { mensaje: "Error al actualizar nota", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE: eliminar una nota por ID
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params; // 👈 corrección

  try {
    const notaEliminada = await Nota.findByIdAndDelete(id);
    if (!notaEliminada) {
      return NextResponse.json({ mensaje: "Nota no encontrada" }, { status: 404 });
    }
    return NextResponse.json({ mensaje: "Nota eliminada correctamente" });
  } catch (error: any) {
    return NextResponse.json(
      { mensaje: "Error al eliminar nota", error: error.message },
      { status: 500 }
    );
  }
}