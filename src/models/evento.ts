import mongoose, { Schema, Document } from "mongoose";

export interface IEvento extends Document {
  titulo: string;
  fecha: Date;
  descripcion?: string;
  ubicacion?: string;
  etiquetas?: string[];
  estado?: "vigente" | "caducado";
  tipo: {
    principal: "evento";
    subtipo?: string;
  };
}

const eventoSchema: Schema = new Schema({
  titulo: { type: String, required: true, trim: true },
  fecha: { type: Date, required: true },
  descripcion: { type: String, trim: true },
  ubicacion: { type: String, trim: true },
  etiquetas: { type: [String], default: [] },
  estado: { type: String, enum: ["vigente", "caducado"], default: "vigente" },
  tipo: {
    principal: { type: String, default: "evento" },
    subtipo: { type: String, trim: true }
  }
}, { timestamps: true });

export default mongoose.models.Evento || mongoose.model<IEvento>("Evento", eventoSchema);