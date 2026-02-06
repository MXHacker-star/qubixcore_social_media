import ThemeToggle from "@/components/ThemeToggle";
import LogoutButton from "@/components/LogoutButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const client = await prisma.client.findFirst({
    include: {
      socialAccounts: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const content = await prisma.contentItem.findMany({
    orderBy: { date: "asc" },
    take: 6,
  });

  const ideas = await prisma.idea.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const kpis = [
    { label: "Active Clients", value: client ? "01" : "00", change: "+1 in pipeline" },
    { label: "Posts Scheduled", value: `${content.length}`, change: "+18 vs last month" },
    { label: "Approval Rate", value: "92%", change: "steady" },
    { label: "Avg. Turnaround", value: "1.6d", change: "-0.4d faster" },
  ];

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <aside
        className="relative z-10 flex h-full flex-col justify-between gap-8 rounded-[32px] border border-[color:var(--line)] bg-[color:var(--panel)] p-6 shadow-[var(--shadow)]"
        aria-label="Primary"
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
              QubixCore
            </p>
            <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[color:var(--ink)]">
              Social Media & Content Manager
            </h1>
            <p className="text-sm text-[color:var(--muted)]">
              Multi-client command center for planning, production, and
              performance.
            </p>
          </div>

          <div
            className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] p-4"
            aria-label="Active client"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Active Client
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-[color:var(--ink)]">
                  {client?.name ?? "No client yet"}
                </p>
                <p className="text-xs text-[color:var(--muted)]">
                  Brand color: {client?.brandColor ?? "—"}
                </p>
              </div>
              <button
                className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs font-semibold text-[color:var(--muted)]"
                aria-label="Switch client"
              >
                Switch
              </button>
            </div>
          </div>

          <nav
            className="space-y-3 text-sm font-medium text-[color:var(--muted)]"
            aria-label="Dashboard"
          >
            <ul className="space-y-3">
              {[
                "Overview",
                "Content Calendar",
                "Content Library",
                "Idea Bank",
                "Team Workflow",
                "Analytics",
                "Clients (Coming Soon)",
              ].map((item) => (
                <li key={item}>
                  <button
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                      item === "Overview"
                        ? "bg-[color:var(--ink)] text-[color:var(--paper)]"
                        : "hover:bg-[color:var(--paper)]"
                    }`}
                    aria-current={item === "Overview" ? "page" : undefined}
                  >
                    {item}
                    <span className="text-xs opacity-60" aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-sm text-[color:var(--muted)]">
          <p className="text-xs uppercase tracking-[0.3em]">Team Pulse</p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--ink)]">
            6 tasks in review
          </p>
          <p className="mt-1">2 approvals needed today.</p>
        </div>
      </aside>

      <main
        id="main-content"
        className="relative z-10 flex min-h-screen flex-col gap-8"
      >
        <header className="panel glass flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Welcome back
            </p>
            <h2 className="font-[var(--font-display)] text-3xl font-semibold text-[color:var(--ink)]">
              Content operations, re-imagined
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--paper)] px-4 py-2 text-sm text-[color:var(--muted)]">
              <span
                className="h-2 w-2 rounded-full bg-[color:var(--accent-2)]"
                aria-hidden="true"
              />
              Q1 launch sprint
            </div>
            <ThemeToggle />
            <LogoutButton />
            <button
              className="rounded-full bg-[color:var(--ink)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--paper)]"
              aria-label="Create a new post"
            >
              New Post
            </button>
          </div>
        </header>

        <section className="card-grid" aria-labelledby="kpi-title">
          <h2 id="kpi-title" className="sr-only">
            Key performance indicators
          </h2>
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="panel flex flex-col gap-3 p-5"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                {kpi.label}
              </p>
              <p className="text-3xl font-semibold text-[color:var(--ink)]">
                {kpi.value}
              </p>
              <p className="text-sm text-[color:var(--muted)]">{kpi.change}</p>
            </div>
          ))}
        </section>

        <section
          className="grid gap-6 lg:grid-cols-[1.4fr_1fr]"
          aria-labelledby="calendar-title"
        >
          <div className="panel p-6" role="region" aria-labelledby="calendar">
            <div className="flex items-start justify-between">
              <div>
                <p
                  id="calendar-title"
                  className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]"
                >
                  Content Calendar
                </p>
                <h2
                  id="calendar"
                  className="mt-2 text-2xl font-semibold text-[color:var(--ink)]"
                >
                  Weekly runway view
                </h2>
              </div>
              <div
                className="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs font-semibold text-[color:var(--muted)]"
                aria-label="Current view: Weekly"
              >
                Weekly
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {content.length === 0 ? (
                <p className="text-sm text-[color:var(--muted)]">
                  No scheduled posts yet.
                </p>
              ) : (
                content.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[color:var(--ink)]">
                        {item.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        · {item.platform}
                      </p>
                      <p className="text-xs text-[color:var(--muted)]">
                        {item.postType}
                      </p>
                    </div>
                    <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="panel p-6" role="region" aria-labelledby="analytics">
            <p
              id="analytics-title"
              className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]"
            >
              Analytics Snapshot
            </p>
            <h2
              id="analytics"
              className="mt-2 text-2xl font-semibold text-[color:var(--ink)]"
            >
              Momentum by platform
            </h2>
            <div className="mt-6 space-y-4">
              {[
                { name: "Instagram", value: "72%" },
                { name: "LinkedIn", value: "64%" },
                { name: "Facebook", value: "38%" },
                { name: "X", value: "54%" },
              ].map((row) => (
                <div key={row.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-[color:var(--muted)]">
                    <span>{row.name}</span>
                    <span className="text-[color:var(--ink)]">{row.value}</span>
                  </div>
                  <div
                    className="chart-bar"
                    role="progressbar"
                    aria-valuenow={parseInt(row.value, 10)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${row.name} performance`}
                  >
                    <span style={{ width: row.value }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] p-4">
              <p className="text-sm font-semibold text-[color:var(--ink)]">
                Monthly content completion
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div
                  className="progress-track flex-1"
                  role="progressbar"
                  aria-valuenow={78}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Monthly content completion"
                >
                  <div className="progress-fill" style={{ width: "78%" }} />
                </div>
                <span className="text-sm font-semibold text-[color:var(--ink)]">
                  78%
                </span>
              </div>
              <p className="mt-2 text-xs text-[color:var(--muted)]">
                48 of 62 planned posts are ready.
              </p>
            </div>
          </div>
        </section>

        <section
          className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"
          aria-labelledby="library-title"
        >
          <div className="panel p-6" role="region" aria-labelledby="library">
            <div className="flex items-center justify-between">
              <div>
                <p
                  id="library-title"
                  className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]"
                >
                  Content Library
                </p>
                <h2
                  id="library"
                  className="mt-2 text-2xl font-semibold text-[color:var(--ink)]"
                >
                  Ready-to-deploy assets
                </h2>
              </div>
              <button className="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs font-semibold text-[color:var(--muted)]">
                Upload
              </button>
            </div>
            <div className="mt-6 space-y-3">
              {content.slice(0, 3).map((row) => (
                <div
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--ink)]">
                      {row.caption}
                    </p>
                    <p className="text-xs text-[color:var(--muted)]">
                      {row.platform} · {row.postType}
                    </p>
                  </div>
                  <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6" role="region" aria-labelledby="idea-bank">
            <p
              id="idea-title"
              className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]"
            >
              Idea Bank
            </p>
            <h2
              id="idea-bank"
              className="mt-2 text-2xl font-semibold text-[color:var(--ink)]"
            >
              Pipeline energy
            </h2>
            <div className="mt-6 space-y-3">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[color:var(--ink)]">
                    {idea.title}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--muted)]">
                    {idea.suggestedPlatform} · Priority {idea.priority}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] p-4">
              <p className="text-sm font-semibold text-[color:var(--ink)]">
                Team workflow
              </p>
              <p className="mt-2 text-xs text-[color:var(--muted)]">
                3 posts assigned · 2 awaiting approval · 1 blocked
              </p>
            </div>
          </div>
        </section>

        <section className="panel p-6" aria-labelledby="platforms-title">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p
                id="platforms-title"
                className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]"
              >
                Social Media Manager
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[color:var(--ink)]">
                Connected platforms
              </h2>
            </div>
            <button className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_20px_var(--glow)]">
              Add Account
            </button>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {client?.socialAccounts?.map((platform) => (
              <div
                key={platform.id}
                className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] p-4"
              >
                <p className="text-sm font-semibold text-[color:var(--ink)]">
                  {platform.platformName}
                </p>
                <p className="text-xs text-[color:var(--muted)]">
                  {platform.pageName}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full border border-[color:var(--line)] px-2 py-1 text-xs font-semibold text-[color:var(--muted)]">
                    {platform.status}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    {platform.platformName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
