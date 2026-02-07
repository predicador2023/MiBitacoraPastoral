import { FaUsers, FaHome, FaPrayingHands, FaArrowRight, FaStickyNote } from "react-icons/fa";

type Props = {
  tipo: "reunion" | "visita" | "oracion" | "salida" | "nota";
  estado?: "vigente" | "caducado"; // opcional, solo para eventos
};

export default function IconoEvento({ tipo, estado }: Props) {
  const esEvento = tipo !== "nota" && tipo !== "oracion";
  const color = esEvento && estado === "caducado" ? "#9E9E9E" : getColor(tipo);

  switch (tipo) {
    case "reunion":
      return <FaUsers color={color} />;
    case "visita":
      return <FaHome color={color} />;
    case "oracion":
      return <FaPrayingHands color={color} />;
    case "salida":
      return <FaArrowRight color={color} />;
    case "nota":
      return <FaStickyNote color={color} />;
    default:
      return null;
  }
}

function getColor(tipo: Props["tipo"]) {
  switch (tipo) {
    case "reunion": return "#1E88E5"; // azul
    case "visita": return "#E53935"; // rojo
    case "oracion": return "#43A047"; // verde
    case "salida": return "#FB8C00"; // naranja
    case "nota": return "#9E9E9E"; // gris
    default: return "#fff";
  }
}