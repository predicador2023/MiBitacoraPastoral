import { FaUsers, FaPrayingHands, FaStickyNote } from "react-icons/fa";

type Props = {
  tipo: "oraciones" | "eventos" | "notas"; // 🔹 solo tres tipos
  estado?: "vigente" | "caducado"; // opcional, solo para eventos
};

export default function IconoEvento({ tipo, estado }: Props) {
  const esEvento = tipo === "eventos"; // 🔹 ahora solo eventos se consideran "evento"
  const color = esEvento && estado === "caducado" ? "#9E9E9E" : getColor(tipo);

  switch (tipo) {
    case "oraciones":
      return <FaPrayingHands color={color} />;
    case "eventos":
      return <FaUsers color={color} />;
    case "notas":
      return <FaStickyNote color={color} />;
    default:
      return null;
  }
}

function getColor(tipo: Props["tipo"]) {
  switch (tipo) {
    case "oraciones": return "#43A047"; // verde esperanza
    case "eventos": return "#1E88E5";   // azul para eventos
    case "notas": return "#9E9E9E";     // gris para notas
    default: return "#fff";
  }
}