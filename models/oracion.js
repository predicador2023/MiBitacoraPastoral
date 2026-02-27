const mongoose = require("mongoose");

const oracionSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    texto: { type: String, required: true, trim: true },
    fecha: { type: Date, default: Date.now },
    autor: { type: String, default: "Evangelista José Bedoya", trim: true },
  },
  { collection: "oraciones", timestamps: true }
);

module.exports = mongoose.models.Oracion || mongoose.model("Oracion", oracionSchema);