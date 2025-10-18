"use client";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <button onClick={handleLogin} className="bg-blue-500 text-white p-3 rounded">
        Sign in with GitHub
      </button>
    </div>
  );
}
