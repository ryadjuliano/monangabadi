"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

type OrderRow = { id: string; tracking_code: string; status: string };
type LogRow = { title: string; description: string | null; created_at: string };

function TrackingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCode = searchParams.get("code") ?? "";
  const [input, setInput] = useState(urlCode);
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByCode = useCallback(async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) {
      setOrder(null);
      setLogs([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: orderRow, error: orderErr } = await supabase
        .from("orders")
        .select("id, tracking_code, status")
        .eq("tracking_code", trimmed)
        .maybeSingle();

      if (orderErr) {
        setError(orderErr.message);
        setOrder(null);
        setLogs([]);
        return;
      }
      if (!orderRow) {
        setError("No application found for this code.");
        setOrder(null);
        setLogs([]);
        return;
      }

      const { data: logRows, error: logErr } = await supabase
        .from("tracking_logs")
        .select("title, description, created_at")
        .eq("order_id", orderRow.id)
        .order("created_at", { ascending: true });

      if (logErr) {
        setError(logErr.message);
        setOrder(orderRow);
        setLogs([]);
        return;
      }

      setOrder(orderRow);
      setLogs(logRows ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setInput(urlCode);
    if (urlCode) void fetchByCode(urlCode);
  }, [urlCode, fetchByCode]);

  return (
    <div className="section space-y-6">
      <h1 className="font-serif text-3xl">Track Your Application</h1>
      <form
        className="card flex flex-col gap-2 sm:flex-row sm:items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const q = input.trim();
          if (q) {
            router.push(`/tracking?code=${encodeURIComponent(q)}`);
          } else {
            router.push("/tracking");
          }
          void fetchByCode(q);
        }}
      >
        <input
          name="code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tracking code"
          className="flex-1 rounded border border-slate-300 px-3 py-2"
        />
        <button type="submit" className="rounded bg-blue-700 px-4 py-2 text-white sm:shrink-0">
          {loading ? "Searching…" : "Track"}
        </button>
      </form>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {order && !error ? (
        <div className="card space-y-3">
          <p className="font-semibold">{order.tracking_code}</p>
          <p className="text-slate-600">Current: {order.status}</p>
          {logs.map((log) => (
            <div key={`${log.title}-${log.created_at}`} className="border-l-2 border-blue-700 pl-3">
              <p className="font-semibold">{log.title}</p>
              <p className="text-sm text-slate-600">{log.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function TrackingContent() {
  return (
    <Suspense fallback={<div className="section text-slate-600">Loading…</div>}>
      <TrackingInner />
    </Suspense>
  );
}
