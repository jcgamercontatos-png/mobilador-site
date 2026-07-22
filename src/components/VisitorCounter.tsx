"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export function VisitorCounter() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visits", { method: "POST", cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setTotal(typeof data.total === "number" ? data.total : 0))
      .catch(() => setTotal(0));
  }, []);

  let display = "...";
  if (total !== null) {
    if (total >= 1000) {
      display = (total / 1000).toFixed(1) + "k";
    } else {
      display = String(total);
    }
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0d0d0d] border border-[#222] text-xs">
      <span className="relative flex h-2 w-2 mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <Users className="w-3 h-3 text-[#e50914]" />
      <span className="text-[#CCCCCC]">Visitantes</span>
      <span className="text-white font-bold tabular-nums">{display}</span>
    </div>
  );
}
