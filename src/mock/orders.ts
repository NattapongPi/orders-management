export type OrderPriority = "EMERGENCY" | "CLAIM" | "OVERDUE" | "DAILY";

const typePriority: Record<string, number> = {
  EMERGENCY: 1,
  CLAIM: 2,
  OVERDUE: 3,
  DAILY: 4,
};

export type OrderType = {
  order: string;
  subOrder: string;
  itemId: string;
  warehouseId: string;
  supplierId: string;
  request: number;
  type: OrderPriority;
  createDate: string;
  customerId: string;
  remark: string;
  price?: number;
  customerCreditBefore?: number;
  customerCreditAfter?: number;
  assigned?: number | string;
  totalPrice?: number;
  initialCredit?: number | string;
};

// ขาด customer credit
// total price after assigned
export const orders: OrderType[] = [
  // Order 1: มี 2 Sub-orders (Date: 01-01)
  {
    order: "ORDER-0001",
    subOrder: "ORDER-0001-001",
    itemId: "Item-1",
    warehouseId: "WH-001",
    supplierId: "SP-001",
    request: 45,
    type: "DAILY",
    createDate: "2025-01-01",
    customerId: "CT-0001",
    remark: "",
  },
  {
    order: "ORDER-0001",
    subOrder: "ORDER-0001-002",
    itemId: "Item-2", // ต่าง Item ใน Order เดียวกัน
    warehouseId: "WH-001",
    supplierId: "SP-002",
    request: 12,
    type: "DAILY",
    createDate: "2025-01-01",
    customerId: "CT-0001",
    remark: "",
  },
  // Order 2: Emergency (Date: 01-02)
  {
    order: "ORDER-0002",
    subOrder: "ORDER-0002-001",
    itemId: "Item-3",
    warehouseId: "WH-002",
    supplierId: "SP-003",
    request: 88,
    type: "EMERGENCY",
    createDate: "2025-01-02",
    customerId: "CT-0002",
    remark: "Special for VIP",
  },
  // Order 3: มี 2 Sub-orders (Date: 01-03)
  {
    order: "ORDER-0003",
    subOrder: "ORDER-0003-001",
    itemId: "Item-1",
    warehouseId: "WH-003",
    supplierId: "SP-001",
    request: 30,
    type: "CLAIM",
    createDate: "2025-01-03",
    customerId: "CT-0003",
    remark: "",
  },
  {
    order: "ORDER-0003",
    subOrder: "ORDER-0003-002",
    itemId: "Item-3",
    warehouseId: "WH-003",
    supplierId: "SP-002",
    request: 15,
    type: "CLAIM",
    createDate: "2025-01-03",
    customerId: "CT-0003",
    remark: "",
  },
  // Order 4: Overdue (Date: 01-04)
  {
    order: "ORDER-0004",
    subOrder: "ORDER-0004-001",
    itemId: "Item-2",
    warehouseId: "WH-004",
    supplierId: "SP-003",
    request: 55,
    type: "OVERDUE",
    createDate: "2025-01-04",
    customerId: "CT-0004",
    remark: "",
  },
  // Order 5: มี 2 Sub-orders (Date: 01-05)
  {
    order: "ORDER-0005",
    subOrder: "ORDER-0005-001",
    itemId: "Item-1",
    warehouseId: "WH-005",
    supplierId: "SP-001",
    request: 92,
    type: "DAILY",
    createDate: "2025-01-05",
    customerId: "CT-0005",
    remark: "",
  },
  {
    order: "ORDER-0005",
    subOrder: "ORDER-0005-002",
    itemId: "Item-2",
    warehouseId: "WH-005",
    supplierId: "SP-003",
    request: 40,
    type: "DAILY",
    createDate: "2025-01-05",
    customerId: "CT-0005",
    remark: "",
  },
  // Order 6: (Date: 01-06)
  {
    order: "ORDER-0006",
    subOrder: "ORDER-0006-001",
    itemId: "Item-3",
    warehouseId: "WH-001",
    supplierId: "SP-002",
    request: 25,
    type: "OVERDUE",
    createDate: "2025-01-06",
    customerId: "CT-0006",
    remark: "",
  },
  // Order 7: มี 2 Sub-orders (Date: 01-07)
  {
    order: "ORDER-0007",
    subOrder: "ORDER-0007-001",
    itemId: "Item-1",
    warehouseId: "WH-002",
    supplierId: "SP-001",
    request: 67,
    type: "CLAIM",
    createDate: "2025-01-07",
    customerId: "CT-0007",
    remark: "",
  },
  {
    order: "ORDER-0007",
    subOrder: "ORDER-0007-002",
    itemId: "Item-3",
    warehouseId: "WH-002",
    supplierId: "SP-002",
    request: 33,
    type: "CLAIM",
    createDate: "2025-01-07",
    customerId: "CT-0007",
    remark: "",
  },
  // Order 8: (Date: 01-08)
  {
    order: "ORDER-0008",
    subOrder: "ORDER-0008-001",
    itemId: "Item-2",
    warehouseId: "WH-003",
    supplierId: "SP-003",
    request: 50,
    type: "DAILY",
    createDate: "2025-01-08",
    customerId: "CT-0008",
    remark: "",
  },
  // Order 9: มี 2 Sub-orders (Date: 01-09)
  {
    order: "ORDER-0009",
    subOrder: "ORDER-0009-001",
    itemId: "Item-1",
    warehouseId: "WH-004",
    supplierId: "SP-001",
    request: 72,
    type: "OVERDUE",
    createDate: "2025-01-09",
    customerId: "CT-0009",
    remark: "",
  },
  {
    order: "ORDER-0009",
    subOrder: "ORDER-0009-002",
    itemId: "Item-2",
    warehouseId: "WH-004",
    supplierId: "SP-002",
    request: 18,
    type: "OVERDUE",
    createDate: "2025-01-09",
    customerId: "CT-0009",
    remark: "",
  },
  // Order 10: (Date: 01-10)
  {
    order: "ORDER-0010",
    subOrder: "ORDER-0010-001",
    itemId: "Item-3",
    warehouseId: "WH-005",
    supplierId: "SP-003",
    request: 95,
    type: "DAILY",
    createDate: "2025-01-10",
    customerId: "CT-0010",
    remark: "",
  },
  {
    order: "ORDER-0011",
    subOrder: "ORDER-0011-001",
    itemId: "Item-3",
    warehouseId: "WH-005",
    supplierId: "SP-003",
    request: 1,
    type: "DAILY",
    createDate: "2025-01-11",
    customerId: "CT-0010",
    remark: "",
  },
  {
    order: "ORDER-0012",
    subOrder: "ORDER-0012-001",
    itemId: "Item-3",
    warehouseId: "WH-005",
    supplierId: "SP-003",
    request: 120,
    type: "DAILY",
    createDate: "2025-01-12",
    customerId: "CT-0010",
    remark: "",
  },
  {
    order: "ORDER-0013",
    subOrder: "ORDER-0013-001",
    itemId: "Item-3",
    warehouseId: "WH-005",
    supplierId: "SP-003",
    request: 120,
    type: "DAILY",
    createDate: "2025-01-13",
    customerId: "CT-0010",
    remark: "",
  },
];

export function sortOrder() {
  return [...orders].sort((a, b) => {
    // เงื่อนไขที่ 1: เรียงตาม Type (ลำดับ 1-4)
    if (typePriority[a.type] !== typePriority[b.type]) {
      return typePriority[a.type] - typePriority[b.type];
    }

    // เงื่อนไขที่ 2: ถ้า Type เหมือนกัน ให้เรียงตาม createDate (เก่าไปใหม่)
    // ใช้การเปรียบเทียบ string ได้เลยเพราะ format yyyy-mm-dd เรียงจากน้อยไปมากได้ตรงตัว
    return a.createDate.localeCompare(b.createDate);
  });
}
