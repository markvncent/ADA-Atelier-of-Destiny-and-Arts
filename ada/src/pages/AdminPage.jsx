import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/adminApi.js";

export default function AdminPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setError("Please enter the access code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 🔐 Calls Edge Function (validates ADMIN_ACCESS_CODE in backend)
      await adminLogin(trimmedCode);

      // optional UI state (keeps your existing logic)
      sessionStorage.setItem("isAdmin", "true");

      // redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err?.message === "Invalid access code"
          ? "Invalid access code."
          : err.message || "Unable to verify access code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--bg-surface)" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--bg-overlay), var(--bg-primary))",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center flex flex-col items-center">
          <div className="mb-6">
            <svg viewBox="0 0 40 40" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <radialGradient id="headerGlow" cx="50%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#E0C48C"/>
                  <stop offset="55%" stopColor="#DDA785"/>
                  <stop offset="100%" stopColor="#7C6072"/>
                </radialGradient>
              </defs>
              <path d="M8,34 L8,18 C8,9 14,4 20,4 C26,4 32,9 32,18 L32,34 Z" fill="url(#headerGlow)" stroke="#C7A05C" strokeWidth="1.4"/>
              <line x1="20" y1="18" x2="20" y2="34" stroke="#C7A05C" strokeWidth="1"/>
              <circle cx="20" cy="18" r="2" fill="#C7A05C"/>
            </svg>
          </div>

          <h1
            className="mb-2 text-4xl font-bold sm:text-5xl font-heading"
            style={{ color: "var(--text-primary)" }}
          >
            Atelier of Destiny &amp; Arts
          </h1>

          <p
            className="mx-auto max-w-xl text-lg font-medium"
            style={{ color: "var(--mauve-deep)" }}
          >
            Admin Access Portal
          </p>
        </div>
      </section>

      {/* Login */}
      <section className="py-16">
        <div className="mx-auto max-w-md px-6">
          <div
            className="rounded-2xl border p-8"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-surface)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="mb-6 text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--accent-gold)",
                }}
              >
                <span className="text-2xl">🔒</span>
              </div>

              <h2
                className="text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Enter Access Code
              </h2>

              <p
                className="mt-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                This area is restricted to authorized administrators.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="off"
                  className="w-full rounded-xl border px-4 py-3.5 text-center text-sm tracking-[0.3em] outline-none transition-all duration-300 focus:border-[var(--mauve)] focus:ring-1 focus:ring-[var(--mauve)]/30"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                />

                {error && (
                  <div className="rounded-xl border px-4 py-3 text-center text-sm font-semibold"
                       style={{
                         backgroundColor: '#FEF2F2',
                         borderColor: '#FCA5A5',
                         color: '#B91C1C'
                       }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl px-8 py-3.5 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 border"
                  style={{
                    background: "linear-gradient(135deg, var(--mauve), var(--mauve-deep))",
                    borderColor: "var(--mauve-deep)",
                    color: "var(--cream)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {loading ? "Verifying..." : "Unlock Admin Mode"}
                </button>
              </div>
            </form>

            <p
              className="mt-6 text-center text-xs italic"
              style={{ color: "var(--text-muted)" }}
            >
              Your access code is securely verified before admin access is granted.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}