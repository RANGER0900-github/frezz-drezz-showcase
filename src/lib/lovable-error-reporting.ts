// Error reporting — no external telemetry.
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[AppError]", error, context);
}
