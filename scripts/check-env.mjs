const required = ["DATABASE_URL", "AUTH_SECRET"];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(
    `Missing required environment variables: ${missing.join(", ")}`
  );
  console.error(
    "Set them in Vercel Project Settings → Environment Variables and redeploy."
  );
  process.exit(1);
}

console.log("Environment check passed.");
