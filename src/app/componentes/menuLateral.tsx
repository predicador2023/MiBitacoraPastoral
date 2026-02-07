"use client";

import Link from "next/link";

export default function MenuLateral() {
  return (
    <section className="lateral">
      <ul>
        <li><Link href="/eventos">📅 Eventos</Link></li>
        <li><Link href="/notas">📝 Notas</Link></li>
        <li><Link href="/oraciones">🙏 Oraciones</Link></li>
      </ul>

      <style jsx>{`
        .lateral {
          display: none;
          width: 220px;
          background-color: #f9f9f9;
          padding: 1rem;
          border-right: 1px solid #ddd;
        }
        .lateral ul {
          list-style: none;
          padding: 0;
        }
        @media (min-width: 768px) {
          .lateral {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}