"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";


export default function EvalDetailPage() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [evalData, setEvalData] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      // 1️⃣ Fetch user settings
      const { data: settingsData } = await supabase.from("settings").select("*").single();
      setSettings(settingsData);

      // 2️⃣ Fetch eval record
      const { data: evalRecord, error } = await supabase
        .from("evals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setEvalData(evalRecord);
    }
    fetchData();
  }, [id]);

  if (!evalData || !settings) return <div className="p-6">Loading...</div>;

  // Mask PII if obfuscate_pii is true
  const maybeMask = (text: string) =>
    settings.obfuscate_pii ? text.replace(/[a-zA-Z0-9]/g, "*") : text;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Evaluation Details</h1>
      <div className="space-y-3">
        <div>
          <strong>Interaction ID:</strong> {evalData.interaction_id}
        </div>
        <div>
          <strong>Score:</strong> {evalData.score?.toFixed(2)}
        </div>
        <div>
          <strong>Latency (ms):</strong> {evalData.latency_ms}
        </div>
        <div>
          <strong>Prompt:</strong>
          <p className="bg-gray-100 p-2 rounded mt-1">{maybeMask(evalData.prompt)}</p>
        </div>
        <div>
          <strong>Response:</strong>
          <p className="bg-gray-100 p-2 rounded mt-1">{maybeMask(evalData.response)}</p>
        </div>
        <div>
          <strong>Flags:</strong> {evalData.flags?.join(", ") || "None"}
        </div>
        <div>
          <strong>Created At:</strong> {new Date(evalData.created_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
