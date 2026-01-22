interface IOrderTier {
  multiplier: number;
  color: string;
}

export const orderTier: Record<string, IOrderTier> = {
  emergency: { multiplier: 1.25, color: "error" },
  claim: { multiplier: 0, color: "warning" },
  overdue: { multiplier: 1, color: "info" },
  daily: { multiplier: 1, color: "default" },
};
