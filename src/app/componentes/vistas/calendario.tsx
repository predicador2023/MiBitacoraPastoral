"use client";
import { useEffect, useState } from "react";
import styles from "./calendario.module.css";

const diasSemana = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁ"];

interface Registro {
  fecha: string;
  titulo: string;
  texto: string;
  tipo: string; 
}

export default function Calendario() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [seleccionado, setSeleccionado] = useState<Registro | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const resOraciones = await fetch(`/api/oraciones?year=${year}&month=${month+1}`);
      const oraciones = await resOraciones.json();
      const oracionesConTipo = oraciones.map((o: any) => ({ ...o, tipo: "oraciones" }));

      const resEventos = await fetch(`/api/eventos?year=${year}&month=${month+1}`);
      const eventos = await resEventos.json();
      const eventosConTipo = eventos.map((e: any) => ({ ...e, tipo: "eventos" }));

      // más adelante podés hacer lo mismo con notas:
      // const resNotas = await fetch(`/api/notas?year=${year}&month=${month+1}`);
      // const notas = await resNotas.json();
      // const notasConTipo = notas.map((n: any) => ({ ...n, tipo: "notas" }));

      setRegistros([...oracionesConTipo, ...eventosConTipo]);
    };
    fetchData();
  }, [year, month]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (year === 2026 && month === 0) return;
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handlePrevMonth} className={styles.navBtn}>◀</button>
        <h2 className={styles.titulo}>
          {new Date(year, month).toLocaleString("es-ES", { month: "long", year: "numeric" })}
        </h2>
        <button onClick={handleNextMonth} className={styles.navBtn}>▶</button>
      </div>

      <div className={styles.grid}>
        {diasSemana.map((dia, i) => (
          <div key={i} className={styles.diaSemana}>{dia}</div>
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const dia = i + 1;
          const fecha = new Date(year, month, dia);

          const registrosDia = registros.filter(
            (r) => new Date(r.fecha).toDateString() === fecha.toDateString()
          );

          return (
            <div key={dia} className={styles.celdaDia}>
              <span className={styles.numeroDia}>{dia}</span>
              {registrosDia.map((registro) => {
                const tipoNormalizado = String(registro.tipo || "").toLowerCase();

                const esEvento = tipoNormalizado === "eventos";
                const esOracion = tipoNormalizado === "oraciones";
                const esNota = tipoNormalizado === "notas";

                return (
                  <div
                    key={registro.titulo}
                    className={
                      esOracion ? styles.oracionDia :
                      esEvento ? styles.eventoDia :
                      esNota ? styles.notaDia :
                      styles.otroDia
                    }
                    onClick={() => setSeleccionado(registro)}
                  >
                    {esOracion && <span className={styles.iconoOracion}>🙏</span>}
                    {esEvento && <span className={styles.iconoEvento}>📅</span>}
                    {esNota && <span className={styles.iconoNota}>📝</span>}
                    <span className={
                      esOracion ? styles.textoOracion :
                      esEvento ? styles.textoEvento :
                      esNota ? styles.textoNota :
                      styles.textoOtro
                    }>
                      {registro.titulo}
                    </span>
                  </div>
                );
              })}
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