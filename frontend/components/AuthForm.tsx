"use client";

import { useState } from "react";

interface AuthFormProps {
  onSuccess: (token: string, username: string, name: string, livingCity: string) => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [flipped, setFlipped] = useState(false);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupCity, setSignupCity] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setLoginError(data.error ?? "Something went wrong"); return; }
      onSuccess(data.token, data.username, data.name, data.livingCity);
    } catch {
      setLoginError("Couldn't reach the server");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setSignupError("");
    setSignupLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: signupName, username: signupUsername, password: signupPassword, livingCity: signupCity }),
      });
      const data = await res.json();
      if (!res.ok) { setSignupError(data.error ?? "Something went wrong"); return; }
      setFlipped(false);
      setLoginUsername(signupUsername);
      setLoginPassword("");
      setSignupName("");
      setSignupUsername("");
      setSignupPassword("");
      setSignupCity("");
    } catch {
      setSignupError("Couldn't reach the server");
    } finally {
      setSignupLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-3xl h-[460px]" style={{ perspective: "1600px" }}>
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRONT — Login */}
          <div className="absolute inset-0 flex rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ backfaceVisibility: "hidden" }}>
            <div className="w-1/2 p-10 flex flex-col justify-center text-white">
              <h2 className="text-4xl font-serif mb-2">Login</h2>
              <p className="text-xs opacity-60 mb-8">Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setFlipped(true)} className="underline">Sign up</button>
              </p>
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div>
                  <label className="text-[11px] tracking-widest opacity-60 block mb-1">USERNAME</label>
                  <input value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full bg-transparent border-b border-white/30 pb-1 text-sm outline-none focus:border-white/70" required />
                </div>
                <div>
                  <label className="text-[11px] tracking-widest opacity-60 block mb-1">PASSWORD</label>
                  <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full bg-transparent border-b border-white/30 pb-1 text-sm outline-none focus:border-white/70" required />
                </div>
                {loginError && <p className="text-xs text-red-300">{loginError}</p>}
                <button type="submit" disabled={loginLoading} className="mt-4 bg-emerald-500 hover:bg-emerald-400 transition rounded-full py-2.5 text-sm font-medium disabled:opacity-60">
                  {loginLoading ? "Logging in..." : "LOGIN"}
                </button>
              </form>
            </div>
            <div className="w-1/2 relative bg-neutral-900">
            <img src="/auth/login-side.jpg" className="w-full h-full object-cover" alt="" /> 
              <div className="absolute top-4 right-4 bg-emerald-500 text-xs px-4 py-1.5 rounded-full">SIGN IN</div>
            </div>
          </div>

          {/* BACK — Sign up */}
          <div className="absolute inset-0 flex rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <div className="w-1/2 relative bg-neutral-900">
             <img src="/auth/signup-side.jpg" className="w-full h-full object-cover" alt="" /> 
              <div className="absolute top-4 left-4 bg-emerald-500 text-xs px-4 py-1.5 rounded-full">SIGN UP</div>
            </div>
            <div className="w-1/2 p-10 flex flex-col justify-center text-white overflow-y-auto">
              <h2 className="text-4xl font-serif mb-2">Sign up</h2>
              <p className="text-xs opacity-60 mb-6">Already have an account?{" "}
                <button type="button" onClick={() => setFlipped(false)} className="underline">Log in</button>
              </p>
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <div>
                  <label className="text-[11px] tracking-widest opacity-60 block mb-1">NAME</label>
                  <input value={signupName} onChange={(e) => setSignupName(e.target.value)} className="w-full bg-transparent border-b border-white/30 pb-1 text-sm outline-none focus:border-white/70" required />
                </div>
                <div>
                  <label className="text-[11px] tracking-widest opacity-60 block mb-1">USERNAME</label>
                  <input value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} className="w-full bg-transparent border-b border-white/30 pb-1 text-sm outline-none focus:border-white/70" required />
                </div>
                <div>
                  <label className="text-[11px] tracking-widest opacity-60 block mb-1">PASSWORD</label>
                  <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="w-full bg-transparent border-b border-white/30 pb-1 text-sm outline-none focus:border-white/70" required minLength={6} />
                </div>
                <div>
                  <label className="text-[11px] tracking-widest opacity-60 block mb-1">LIVING CITY</label>
                  <input value={signupCity} onChange={(e) => setSignupCity(e.target.value)} placeholder="e.g. Galle" className="w-full bg-transparent border-b border-white/30 pb-1 text-sm outline-none focus:border-white/70" required />
                </div>
                {signupError && <p className="text-xs text-red-300">{signupError}</p>}
                <button type="submit" disabled={signupLoading} className="mt-2 bg-emerald-500 hover:bg-emerald-400 transition rounded-full py-2.5 text-sm font-medium disabled:opacity-60">
                  {signupLoading ? "Creating account..." : "CREATE ACCOUNT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}