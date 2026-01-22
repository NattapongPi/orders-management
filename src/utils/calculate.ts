export function bankersRound(num: number, decimalPlaces: number = 2): number {
  const m = Math.pow(10, decimalPlaces);
  const n = +(num * m).toFixed(8); // ใช้ toFixed แก้อาการเลขเพี้ยนของ Floating Point (เช่น 1.005)
  const i = Math.floor(n),
    f = n - i;
  const e = 1e-8; // ค่าความคลาดเคลื่อนขนาดเล็ก (epsilon)

  const r =
    f > 0.5 - e && f < 0.5 + e ? (i % 2 === 0 ? i : i + 1) : Math.round(n);

  return r / m;
}

export function calculateAutoAssign(
  requestAmount: number,
  price: number,
  remainingInv: number,
  customerRemainingCredit: number,
) {
  const maxCanBuyWithCredit = Math.floor(customerRemainingCredit / price);
  const maxCanBuyWithStock = remainingInv;

  const assigned = Math.min(
    requestAmount,
    maxCanBuyWithCredit,
    maxCanBuyWithStock,
  );

  return Math.max(0, assigned);
}
