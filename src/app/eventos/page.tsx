"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Suspense } from "react";
import EventosContent from "./eventosContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando eventos...</div>}>
      <EventosContent />
    </Suspense>
  );
}