import IconoEvento from "./iconoEvento";

type Props = {
  fecha: string;
  hora?: string;
  titulo: string;
  tipo: "reunion" | "visita" | "oracion" | "salida" | "nota"; // 🔑 tipado seguro
  estado?: "vigente" | "caducado"; // opcional, solo para eventos
};

export default function EventoCard({ fecha, hora, titulo, tipo, estado }: Props) {
  const esEvento = tipo !== "nota" && tipo !== "oracion";

  const estiloEstado =
    esEvento && estado === "caducado"
      ? { color: "#9E9E9E", textDecoration: "line-through", opacity: 0.6 }
      : { color: getColor(tipo) };

  return (
    <div style={{ marginBottom: "1rem", color: "#fff" }}>
      <div style={{ fontWeight: "bold" }}>{fecha}</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconoEvento tipo={tipo} />
        <span style={{ marginLeft: "0.5rem", ...estiloEstado }}>
          {titulo}
        </span>
      </div>
      {hora && <div>{hora}</div>}
    </div>
  );
}

function getColor(tipo: Props["tipo"]) {
  switch (tipo) {
    case "reunion": return "#1E88E5";
    case "visita": return "#E53935";
    case "oracion": return "#43A047";
    case "salida": return "#FB8C00";
    case "nota": return "#9E9E9E";
    default: return "#fff";
  }
}