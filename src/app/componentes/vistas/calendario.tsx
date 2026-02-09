"use client";
import { useEffect, useState } from "react";
import styles from "./calendario.module.css";

const diasSemana = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁ"];

// 🔹 Definimos la estructura que devuelve la API
interface Registro {
  fecha: string;
  titulo: string;
  texto: string;
  tipo: "oraciones" | "eventos" | "notas";
}

export default function Calendario() {
  const [registros, setRegistros] = useState<Registro[]>([]); // tipado correcto
  const [seleccionado, setSeleccionado] = useState<Registro | null>(null);

  useEffect(() => {
    fetch("/api/oraciones")
      .then((res) => res.json())
      .then((data: Registro[]) => setRegistros(data)); // tipamos la respuesta
  }, []);

  const diasDelMes = Array.from({ length: 29 }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Febrero 2026</h2>
      <div className={styles.grid}>
        {diasSemana.map((dia, i) => (
          <div key={i} className={styles.diaSemana}>{dia}</div>
        ))}

        {diasDelMes.map((dia) => {
          const fecha = new Date(`2026-02-${String(dia).padStart(2, "0")}`);
          const registro = registros.find(
            (r) => new Date(r.fecha).toDateString() === fecha.toDateString()
          );

          return (
            <div
              key={dia}
              className={`${styles.celdaDia} ${registro ? styles.oracionDia : ""}`}
              onClick={() => registro && setSeleccionado(registro)}
            >
              <span className={styles.numeroDia}>{dia}</span>
              {registro && (
                <>
                  <span className={styles.iconoOracion}>🙏</span>
                  <span className={styles.textoOracion}>{registro.titulo}</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {seleccionado && (
        <div className={styles.tarjeta}>
          <h3>{seleccionado.titulo}</h3>
          <p>{seleccionado.texto}</p>
          <button onClick={() => setSeleccionado(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}