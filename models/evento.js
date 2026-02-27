const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
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

module.exports = mongoose.models.Evento || mongoose.model("Evento", eventoSchema);