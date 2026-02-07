import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Oracion from "@/models/oracion";
import mongoose from "mongoose";

// GET → obtener una oración por ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params; // 🔑 desestructurar con await

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const oracion = await Oracion.findById(id).lean();

    if (!oracion) {
      return NextResponse.json({ error: "Oración no encontrada" }, { status: 404 });
    }

    return NextResponse.json({
      _id: oracion._id.toString(),
      titulo: oracion.titulo,
      texto: oracion.texto,
      fecha: oracion.fecha,
      autor: oracion.autor,
    });
  } catch (error: any) {
    console.error("❌ Error en GET /api/oraciones/[id]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PUT → actualizar una oración por ID
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params; // 🔑 desestructurar con await
    const body = await request.json();

    const oracionActualizada = await Oracion.findByIdAndUpdate(
      id,
      {
        titulo: body.titulo,
        texto: body.texto,
        autor: body.autor,
        fecha: body.fecha ? new Date(body.fecha) : new Date(),
      },
      { new: true }
    ).lean();

    if (!oracionActualizada) {
      return NextResponse.json({ error: "Oración no encontrada" }, { status: 404 });
    }

    return NextResponse.json({
      _id: oracionActualizada._id.toString(),
      titulo: oracionActualizada.titulo,
      texto: oracionActualizada.texto,
      fecha: oracionActualizada.fecha,
      autor: oracionActualizada.autor,
    });
  } catch (error: any) {
    console.error("❌ Error en PUT /api/oraciones/[id]:", error);
    return NextResponse.json({ error: "Error al actualizar la oración" }, { status: 500 });
  }
}

// DELETE → eliminar una oración por ID
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params; // 🔑 desestructurar con await

    const oracionEliminada = await Oracion.findByIdAndDelete(id).lean();

    if (!oracionEliminada) {
      return NextResponse.json({ error: "Oración no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ mensaje: "Oración eliminada correctamente" });
  } catch (error: any) {
    console.error("❌ Error en DELETE /api/oraciones/[id]:", error);
    return NextResponse.json({ error: "Error al eliminar la oración" }, { status: 500 });
  }
}