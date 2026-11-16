// src/lib/config.ts


//  To detect whether this code runs in the browser or on the Next.js server
const isServer = typeof window === "undefined";

export const config = {
  /**
   * Public environment (browser + server)
   */
  apiBaseUrl: isServer
    ? //  server-side calls use the internal container address on EC2.
      // On Render, INTERNAL_API_URL isn't set, so it uses the baked-in public URL as before.
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:8080"
    : //  browser uses the env value when present (Render),
      // otherwise the same host the page was loaded from, on port 8080 (EC2).
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      `http://${window.location.hostname}:8080`,
  env: process.env.NEXT_PUBLIC_ENV || "development",


  dbUrl: process.env.DATABASE_URL || "",
};


