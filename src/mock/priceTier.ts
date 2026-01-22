export const orderTier: Record<string, object> = {
  emergency: { multiplier: 1.25, color: "error" },
  claim: { multiplier: 0, color: "warning" },
  overdue: { multiplier: 1, color: "info" },
  daily: { multiplier: 1, color: "default" },
};
