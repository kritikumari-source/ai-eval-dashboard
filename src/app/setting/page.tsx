"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Settings() {
  const [settings, setSettings] = useState({
    run_policy: "always",
    sample_rate_pct: 100,
    obfuscate_pii: false,
    max_eval_per_day: 1000,
  });

  useEffect(() => {
    supabase.from("settings").select("*").single().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  const handleSave = async () => {
    await supabase.from("settings").upsert(settings);
    alert("Saved!");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Evaluation Settings</h1>
      <div className="space-y-4">
        <label>Run Policy:
          <select
            value={settings.run_policy}
            onChange={(e) => setSettings({ ...settings, run_policy: e.target.value })}
          >
            <option value="always">Always</option>
            <option value="sampled">Sampled</option>
          </select>
        </label>

        <label>Sample Rate (%):
          <input
            type="number"
            value={settings.sample_rate_pct}
            onChange={(e) => setSettings({ ...settings, sample_rate_pct: +e.target.value })}
          />
        </label>

        <label>
          Obfuscate PII:
          <input
            type="checkbox"
            checked={settings.obfuscate_pii}
            onChange={(e) => setSettings({ ...settings, obfuscate_pii: e.target.checked })}
          />
        </label>

        <label>Max Evaluations per Day:
          <input
            type="number"
            value={settings.max_eval_per_day}
            onChange={(e) => setSettings({ ...settings, max_eval_per_day: +e.target.value })}
          />
        </label>

        <button className="bg-green-500 text-white p-2 rounded" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}
