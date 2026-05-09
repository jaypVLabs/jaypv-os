export function createAuditEvent({ payload, result }) {
  const safeId =
    "audit_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).slice(2);

  return {
    id: safeId,
    eventType: "entitlement.check",
    subjectId: payload?.subjectId ?? null,
    requestedAccess: payload?.requestedAccess ?? null,
    decision: result?.decision ?? "deny",
    reason: result?.reason ?? "runtime_guarded_failure",
    createdAt: new Date().toISOString(),
    reversible: true,
    humanReviewSupported: true
  };
}
