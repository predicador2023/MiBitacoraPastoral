"use client";

export default function Content() {
  return (
    <section className="content">
      <h1>Bienvenido a Mi Bitácora Pastoral</h1>
      <p>Un espacio para eventos, notas y oraciones.</p>

      <style jsx>{`
        .content {
          flex: 1;
          padding: 2rem;
          text-align: center;
        }
      `}</style>
    </section>
  );
}