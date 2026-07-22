"use client";

import { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";

export function VisitorCounter() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visits", { method: "POST", cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setTotal(data.total ?? 0))
      .catch(() => setTotal(0));
  }, []);

  const display =
    total === null
      ? "..."
      : total >= 1000
        ? `${(total / 1000).toFixed(1)}k`
        : String(total);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#0d0d0d] border border-[#222] text-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
     </span>
      <Users className="w-3 h-3 text-[#e50914]" />
      <span className="text-[#CCCCCC]">Visitantes</span>
      <span className="text-white font-bold tabular-nums">{display</span>
      <Eye className="w-3 h-3 text-[#777]" />
   </div>
  );
}
