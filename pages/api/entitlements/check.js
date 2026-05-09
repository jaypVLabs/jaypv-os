import crypto from "node:crypto";

function createSignature(body, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
}

function safeCompare(a, b) {
  if (!a || !b) return false;

  const left = Buffer.from(String(a), "hex");
  const right = Buffer.from(String(b), "hex");

  if (left.length !== right.length) return false;

  return crypto.timingSafeEqual(left, right);
}

function evaluateEntitlement(payload) {
  const now = new Date().toISOString();

  if (!payload || typeof payload !== "object") {
    return {
      decision: "deny",
      reason: "invalid_payload",
      checkedAt: now
    };
  }

  if (!payload.subjectId) {
    return {
      decision: "deny",
      reason: "missing_subject_id",
      checkedAt: now
    };
  }

  if (!payload.requestedAccess) {
    return {
      decision: "deny",
      reason: "missing_requested_access",
      checkedAt: now
    };
  }

  return {
    decision: "deny",
    reason: "no_active_entitlement_record",
    checkedAt: now,
    subjectId: payload.subjectId,
    requestedAccess: payload.requestedAccess
  };
}

function createAuditEvent(payload, result) {
  return {
    id:
      "audit_" +
      Date.now().toString(36) +
      "_" +
      Math.random().toString(36).slice(2),
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      decision: "deny",
      reason: "method_not_allowed"
    });
  }

  try {
    const secret = process.env.JPV_INTERNAL_SIGNING_SECRET;
    const signature = req.headers["x-jpv-signature"];

    const payload = req.body;
    const canonicalBody = JSON.stringify(payload);

    const expected = createSignature(canonicalBody, secret);
    const valid = safeCompare(signature, expected);

    if (!valid) {
      return res.status(401).json({
        status: "denied",
        decision: "deny",
        reason: "invalid_signature",
        auditRequired: true
      });
    }

    const result = evaluateEntitlement(payload);
    const audit = createAuditEvent(payload, result);

    return res.status(200).json({
      status: "ok",
      system: "JPV-OS",
      service: "runtime-entitlement-api",
      version: "0.2.1",
      ...result,
      audit
    });
  } catch (error) {
    return res.status(200).json({
      status: "guarded",
      decision: "deny",
      reason: "runtime_exception_guarded",
      message: error?.message ?? "unknown_error",
      auditRequired: true
    });
  }
}
