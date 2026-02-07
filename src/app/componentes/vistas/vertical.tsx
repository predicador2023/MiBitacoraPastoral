import EventoCard from "./eventoCard";
import IconoEvento from "./iconoEvento";

export default function Vertical() {
  const eventos = [
    { fecha: "10 ago", hora: "10:00", titulo: "Reunión comunitaria", tipo: "reunion" },
    { fecha: "10 ago", hora: "11:30", titulo: "Visita a hogar", tipo: "visita" },
    { fecha: "10 ago", hora: "19:00", titulo: "Reunión de oración", tipo: "oracion" },
    { fecha: "10 ago", hora: "20:00", titulo: "Salida al encuentro", tipo: "salida" },
    { fecha: "10 ago", titulo: "Nota sobre comunidad", tipo: "nota" }
  ];

  return (
    <div style={{ backgroundColor: "#000", padding: "1rem" }}>
      {eventos.map((evento, index) => (
        <EventoCard key={index} {...evento} />
      ))}
    </div>
  );
}