import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Nota from "@/models/nota";

// ✅ GET: obtener todas las notas
export async function GET() {
  await dbConnect();
  try {
    const notas = await Nota.find({});
    return NextResponse.json(notas);
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
    return NextResponse.json(nuevaNota);
  } catch (error: any) {
    return NextResponse.json(
      { mensaje: "Error al crear nota", error: error.message },
      { status: 500 }
    );
  }
}