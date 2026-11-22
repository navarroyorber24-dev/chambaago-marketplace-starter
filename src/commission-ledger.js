export const OWNER_RATE_BPS = 1000;
export function splitConfirmedPayment({ paymentId, amountCents, currency = "PEN", status }) {
  if (typeof paymentId !== "string" || !paymentId.trim()) throw new TypeError("paymentId is required");
  if (!Number.isSafeInteger(amountCents) || amountCents <= 0) throw new RangeError("amountCents must be a positive safe integer");
  if (currency !== "PEN") throw new RangeError("Only PEN is enabled in this proof-of-concept");
  if (status !== "confirmed") return null;
  const ownerShareCents = Math.round(amountCents * OWNER_RATE_BPS / 10000);
  return Object.freeze({ paymentId: paymentId.trim(), currency, grossReceivedCents: amountCents, ownerShareCents, professionalShareCents: amountCents - ownerShareCents, status: "confirmed" });
}
export function buildCommissionLedger(payments = []) {
  const seen = new Set(); const entries = []; let pendingPayments = 0;
  for (const payment of payments) {
    if (!payment || typeof payment !== "object") throw new TypeError("Each payment must be an object");
    if (payment.status === "pending" || payment.status === "submitted") { pendingPayments += 1; continue; }
    if (payment.status !== "confirmed") continue;
    const entry = splitConfirmedPayment(payment);
    if (seen.has(entry.paymentId)) throw new Error(`Duplicate paymentId: ${entry.paymentId}`);
    seen.add(entry.paymentId); entries.push(entry);
  }
  const totals = entries.reduce((sum, e) => ({ grossReceivedCents: sum.grossReceivedCents + e.grossReceivedCents, ownerEarningsCents: sum.ownerEarningsCents + e.ownerShareCents, professionalShareCents: sum.professionalShareCents + e.professionalShareCents }), { grossReceivedCents: 0, ownerEarningsCents: 0, professionalShareCents: 0 });
  return Object.freeze({ currency: "PEN", confirmedPayments: entries.length, pendingPayments, ...totals, entries: Object.freeze(entries) });
}
