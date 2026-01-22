import type { ChipProps } from "@mui/material/Chip";
interface IOrderTier {
  multiplier: number;
  color: ChipProps["color"];
}

export const orderTier: Record<string, IOrderTier> = {
  emergency: { multiplier: 1.25, color: "error" },
  claim: { multiplier: 0, color: "warning" },
  overdue: { multiplier: 1, color: "info" },
  daily: { multiplier: 1, color: "default" },
};
