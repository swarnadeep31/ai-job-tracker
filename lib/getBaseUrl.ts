export function getBaseUrl() {
  // In production (Vercel), use NEXTAUTH_URL or VERCEL_URL
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  // Vercel provides VERCEL_URL automatically
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Local development fallback
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  
  // Last resort - should not happen in production
  return "http://localhost:3000";
}
