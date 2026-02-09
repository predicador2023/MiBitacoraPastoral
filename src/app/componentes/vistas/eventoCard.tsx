import IconoEvento from "./iconoEvento";

type Props = {
  fecha: string;
  hora?: string;
  titulo: string;
  tipo: "oraciones" | "eventos" | "notas"; // 🔹 solo tres tipos
  estado?: "vigente" | "caducado";
};

export default function EventoCard({ fecha, hora, titulo, tipo, estado }: Props) {
  const esEvento = tipo === "eventos"; // 🔹 ahora solo eventos se consideran "evento"

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
    case "oraciones": return "#43A047"; // verde esperanza
    case "eventos": return "#1E88E5";   // azul para eventos
    case "notas": return "#9E9E9E";     // gris para notas
    default: return "#fff";
  }
}