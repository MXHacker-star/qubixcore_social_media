import LoginForm from "@/components/LoginForm";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  return (
    <div className="app-shell">
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-start justify-center gap-8 rounded-[32px] border border-[color:var(--line)] bg-[color:var(--panel)] p-10 shadow-[var(--shadow)]">
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
              QubixCore
            </p>
            <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[color:var(--ink)]">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Sign in to manage your multi-client content operations.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-xs text-[color:var(--muted)]">
          Demo access: `admin@qubixcore.com` / `Qubixcore2026!`
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
