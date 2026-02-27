const mongoose = require("mongoose");

const NotaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, required: true }, // fuerza ISODate en Mongo
  autor: { type: String, default: "Evangelista José Bedoya" },
});

module.exports = mongoose.models.Nota || mongoose.model("Nota", NotaSchema);