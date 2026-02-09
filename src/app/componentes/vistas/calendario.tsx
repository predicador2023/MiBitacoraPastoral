"use client";
import { useEffect, useState } from "react";
import styles from "./calendario.module.css";

const diasSemana = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁ"];

export default function Calendario() {
  const [registros, setRegistros] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    fetch("/api/oraciones")
      .then((res) => res.json())
      .then((data) => setRegistros(data));
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
    <p>{seleccionado.texto}</p> {/* 🔹 ahora se muestra el texto completo */}
    <button onClick={() => setSeleccionado(null)}>Cerrar</button>
  </div>
)}
    </div>
  );
}