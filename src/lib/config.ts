

// src/lib/config.ts

export const config = {
  /**
   * Public environment (browser + server)
   */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
  env: process.env.NEXT_PUBLIC_ENV || "development",


  /**
   * Server-only variables (only accessible in Node/SSR)
   */
  dbUrl: process.env.DATABASE_URL || "",
};

// Optional: quick sanity check
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.warn("⚠️  NEXT_PUBLIC_API_BASE_URL is not defined in your environment.");
}

