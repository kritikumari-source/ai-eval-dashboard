

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Dashboard from "./dashboard/page";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase when page loads
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("evals")
        .select("created_at, score")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        // Format for Recharts
        const formatted = data.map((item) => ({
          name: new Date(item.created_at).toLocaleDateString(),
          score: item.score,
        }));
        setData(formatted);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
console.log("Fetched data:", data);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <Dashboard data={data} />

      <div className="w-full max-w-3xl h-80 bg-white shadow-md rounded-2xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
