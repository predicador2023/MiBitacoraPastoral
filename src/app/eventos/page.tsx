export default function EventosPage() {
  const eventos = [
    { titulo: "Encuentro de Jóvenes", descripcion: "Un espacio para compartir fe y amistad.", color: "#FFE0E0" },
    { titulo: "Retiro Espiritual", descripcion: "Tiempo de silencio, oración y renovación.", color: "#E0F7FA" },
    { titulo: "Misión Barrial", descripcion: "Salimos al encuentro de la comunidad.", color: "#FFF3E0" },
    { titulo: "Taller de Liturgia", descripcion: "Aprendemos a celebrar con sentido profundo.", color: "#E8F5E9" },
    { titulo: "Caminata Pastoral", descripcion: "Recorremos juntos los signos del barrio.", color: "#F3E5F5" },
    { titulo: "Cena Comunitaria", descripcion: "Compartimos la mesa como signo de unidad.", color: "#E0E0FF" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Eventos Pastorales</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {eventos.map((evento, i) => (
          <div
            key={i}
            style={{
              backgroundColor: evento.color,
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ marginBottom: "0.5rem" }}>{evento.titulo}</h4>
            <p>{evento.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}