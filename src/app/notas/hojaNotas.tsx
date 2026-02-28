"use client";

import { Suspense } from "react";
import HojaNotasContent from "./hojaNotasContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando nota...</div>}>
      <HojaNotasContent />
    </Suspense>
  );
}