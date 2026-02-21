import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";   // 👈 usar tu archivo real
import Nota from "@/models/nota";

// GET: listar todas las notas
export async function GET() {
  await dbConnect();
  const notas = await Nota.find({});
  return NextResponse.json(notas);
}

// POST: crear una nueva nota
export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const nuevaNota = await Nota.create({
    titulo: body.titulo,
    contenido: body.contenido,
    fecha: new Date(body.fecha), // 👈 fuerza Date
    autor: body.autor,
  });

  return NextResponse.json(nuevaNota);
}