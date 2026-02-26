const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  // Memoria temporal de eventos
  let eventos = [];

  // Endpoints híbridos
  server.get("/api/eventos", (req, res) => {
    res.json(eventos);
  });

  server.post("/api/eventos", (req, res) => {
    const nuevo = { _id: Date.now().toString(), ...req.body };
    eventos.push(nuevo);
    res.json(nuevo);
  });

  server.put("/api/eventos/:id", (req, res) => {
    const id = req.params.id;
    eventos = eventos.map(e => e._id === id ? { ...e, ...req.body } : e);
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