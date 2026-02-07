import mongoose, { Schema, Document, Model } from "mongoose";

// Interfaz para TypeScript
export interface IOracion extends Document {
  titulo: string;
  texto: string;
  fecha?: Date;
  autor?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Esquema de la colección "oraciones"
const oracionSchema: Schema<IOracion> = new Schema(
  {
    titulo: { type: String, required: true, trim: true },
    texto: { type: String, required: true, trim: true },
    fecha: { type: Date, default: Date.now },
    autor: { type: String, default: "Evangelista José Bedoya", trim: true },
  },
  { collection: "oraciones", timestamps: true }
);

// Exportar modelo evitando recompilación
const Oracion: Model<IOracion> =
  mongoose.models.Oracion || mongoose.model<IOracion>("Oracion", oracionSchema);

export default Oracion;