import { describe, test, expect, it } from "vitest";
import { calculateAutoAssign, bankersRound } from "../utils/calculate";

// calculateAutoAssign reqAmt price remainInv cusRemainCred

describe("calculateAutoAssign function", () => {
  test("ควร Assign ครบตาม Request เมื่อเงินพอและของพอ", () => {
    // request 10, price 100, stock 50, credit 2000
    // เงินซื้อได้: 20 ชิ้น, สต็อกมี: 50 ชิ้น -> ควรได้ 10 ตามขอ
    const result = calculateAutoAssign(10, 100, 50, 2000);
    expect(result).toBe(10);
  });

  test("ควร Assign เท่ากับสต็อกที่มี เมื่อเงินพอแต่ของไม่พอ (Partial Stock)", () => {
    // request 100, price 10, stock 30, credit 5000
    // เงินซื้อได้: 500 ชิ้น, แต่สต็อกมีแค่: 30 ชิ้น -> ควรได้ 30
    const result = calculateAutoAssign(100, 10, 30, 5000);
    expect(result).toBe(30);
  });

  test("ควร Assign เท่ากับที่เงินซื้อไหว เมื่อของพอแต่เงินไม่พอ (Partial Credit)", () => {
    // request 50, price 100, stock 100, credit 450
    // เงิน 450 ซื้อราคา 100 ได้สูงสุด: 4 ชิ้น -> ควรได้ 4
    const result = calculateAutoAssign(50, 100, 100, 450);
    expect(result).toBe(4);
  });

  test("ควรได้ 0 เมื่อเงินไม่พอซื้อแม้แต่ชิ้นเดียว", () => {
    // request 10, price 100, stock 100, credit 50
    const result = calculateAutoAssign(10, 100, 100, 50);
    expect(result).toBe(0);
  });

  test("ควรได้ 0 เมื่อของในสต็อกหมด (Out of Stock)", () => {
    const result = calculateAutoAssign(10, 100, 0, 5000);
    expect(result).toBe(0);
  });

  test("ควรจัดการกรณี Credit ติดลบได้ (ต้องไม่คืนค่าติดลบ)", () => {
    // กรณีที่ Order ก่อนหน้าใช้เงินเกินไปแล้ว
    const result = calculateAutoAssign(10, 100, 100, -500);
    expect(result).toBe(0);
  });

  test("ควรจัดการกรณีราคาสินค้าเป็น 0 (ป้องกัน Infinity)", () => {
    // ถ้าคุณมีการเช็คราคาในฟังก์ชันตามที่คุยกันก่อนหน้า
    const result = calculateAutoAssign(10, 0, 100, 1000);
    // ขึ้นอยู่กับว่าคุณเขียน handle ไว้ยังไง ถ้าใช้ logic เดิมจะได้ NaN หรือ 0
    expect(result).toBeDefined();
  });
});

describe("bankersRound() - 2 Decimal Places", () => {
  it("ควรปัดทศนิยมทั่วไปตามปกติ (ปัดลง)", () => {
    expect(bankersRound(1.444)).toBe(1.44);
    expect(bankersRound(1.441)).toBe(1.44);
  });

  it("ควรปัดทศนิยมทั่วไปตามปกติ (ปัดขึ้น)", () => {
    expect(bankersRound(1.446)).toBe(1.45);
    expect(bankersRound(1.449)).toBe(1.45);
  });

  it("กรณีลงท้ายด้วย .005: ถ้าเลขข้างหน้าเป็นเลขคู่ ต้องปัดลง (Stay Even)", () => {
    // 4 เป็นเลขคู่ ดังนั้น 1.445 -> 1.44
    expect(bankersRound(1.445)).toBe(1.44);
    // 2 เป็นเลขคู่ ดังนั้น 2.225 -> 2.22
    expect(bankersRound(2.225)).toBe(2.22);
  });

  it("กรณีลงท้ายด้วย .005: ถ้าเลขข้างหน้าเป็นเลขคี่ ต้องปัดขึ้น (Go to Even)", () => {
    // 3 เป็นเลขคี่ ดังนั้น 1.435 -> 1.44
    expect(bankersRound(1.435)).toBe(1.44);
    // 1 เป็นเลขคี่ ดังนั้น 2.215 -> 2.22
    expect(bankersRound(2.215)).toBe(2.22);
  });
});
