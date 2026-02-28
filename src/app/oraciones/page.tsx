"use client";

import { Suspense } from "react";
import OracionesContent from "./oracionesContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando oraciones...</div>}>
      <OracionesContent />
    </Suspense>
  );
}