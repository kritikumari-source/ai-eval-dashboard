"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";


export default function EvalsPage() {
  const [evals, setEvals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvals() {
      const { data, error } = await supabase
        .from("evals")
        .select("id, interaction_id, score, latency_ms, created_at")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) console.error(error);
      else setEvals(data);
      setLoading(false);
    }

    fetchEvals();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Evaluation Results</h1>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Interaction ID</th>
            <th className="border px-3 py-2 text-left">Score</th>
            <th className="border px-3 py-2 text-left">Latency (ms)</th>
            <th className="border px-3 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {evals.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 text-blue-600 underline">
                <Link href={`/evals/${row.id}`}>{row.interaction_id}</Link>
              </td>
              <td className="border px-3 py-2">{row.score?.toFixed(2)}</td>
              <td className="border px-3 py-2">{row.latency_ms}</td>
              <td className="border px-3 py-2">
                {new Date(row.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
