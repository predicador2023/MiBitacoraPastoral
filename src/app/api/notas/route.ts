import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Nota from "@/models/nota";

// ✅ GET: obtener todas las notas ordenadas por fecha descendente
export async function GET() {
  await dbConnect();
  try {
    const notas = await Nota.find({}).sort({ fecha: -1 });
    // 👇 serializar _id como string y devolver solo campos necesarios
    const notasSerializadas = notas.map((n) => ({
      _id: n._id.toString(),
      titulo: n.titulo,
      contenido: n.contenido,
      fecha: n.fecha,
      autor: n.autor,
    }));
    return NextResponse.json(notasSerializadas);
  } catch (error: any) {
    return NextResponse.json(
      { mensaje: "Error al obtener notas", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST: crear una nueva nota
export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const nuevaNota = await Nota.create({
      titulo: body.titulo,
      contenido: body.contenido,
      fecha: body.fecha ? new Date(body.fecha) : new Date(),
      autor: body.autor,
    });
    // 👇 devolver _id como string
    return NextResponse.json({
      _id: nuevaNota._id.toString(),
      titulo: nuevaNota.titulo,
      contenido: nuevaNota.contenido,
      fecha: nuevaNota.fecha,
      autor: nuevaNota.autor,
    });
  } catch (error: any) {
    return NextResponse.json(
      { mensaje: "Error al crear nota", error: error.message },
      { status: 500 }
    );
  }
}