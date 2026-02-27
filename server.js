require("dotenv").config({ path: ".env.local" });
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");

// Importamos los modelos
const Evento = require("./models/evento");
const Oracion = require("./models/oracion");
const Nota = require("./models/nota");
// Cuando migres los otros, los agregás igual:
// const Oracion = require("./models/oracion");
// const Nota = require("./models/nota");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// 🔹 URI de conexión (se define en variables de entorno)
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bitacora";

app.prepare().then(async () => {
  const server = express();
  server.use(express.json());

  // Conexión a MongoDB (sin opciones obsoletas)
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err);
  }

  // Endpoints usando MongoDB
  server.get("/api/eventos", async (req, res) => {
    const eventos = await Evento.find();
    res.json(eventos);
  });

  server.post("/api/eventos", async (req, res) => {
    const nuevo = new Evento(req.body);
    await nuevo.save();
    res.json(nuevo);
  });

  server.put("/api/eventos/:id", async (req, res) => {
    const id = req.params.id;
    await Evento.findByIdAndUpdate(id, req.body);
    res.json({ ok: true });
  });

  // Todas las demás rutas las maneja Next
  server.all(/.*/, (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});