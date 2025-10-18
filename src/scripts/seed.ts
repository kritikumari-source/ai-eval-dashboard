
import { supabase } from "../lib/supabaseClient";



async function seed() {
  for (let i = 0; i < 500; i++) {
    await supabase.from("evals").insert({
      interaction_id: `int-${i}`,
      prompt: "What is AI?",
      response: "AI is artificial intelligence.",
      score: Math.random(),
      latency_ms: Math.floor(Math.random() * 2000),
      flags: [],
      pii_tokens_redacted: Math.floor(Math.random() * 5),
    });
  }
  console.log("Seed complete!");
}

seed();
