const query =
  process.env.VERCEL_SKEW_PROTECTION_ENABLED === "1"
    ? `?dpl=${process.env.VERCEL_DEPLOYMENT_ID}`
    : "";

const res = await fetch(`/get${query}`);
if (!res.ok) {
  throw new Error(`Failed to fetch: ${res.statusText}`);
}

export {};
