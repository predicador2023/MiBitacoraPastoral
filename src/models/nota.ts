import mongoose, { Schema, Document } from "mongoose";

export interface INota extends Document {
  titulo: string;
  contenido: string;
  fecha: Date;        // 👈 siempre como Date
  autor?: string;
}

const NotaSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, required: true }, // 👈 fuerza ISODate en Mongo
  autor: { type: String, default: "Evangelista José Bedoya" },
});

export default mongoose.models.Nota || mongoose.model<INota>("Nota", NotaSchema);