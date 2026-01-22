export type InventoryItem = {
  warehouseId: string;
  supplierId: string;
  itemId: string;
  amount: number;
};

export const mockInventory: InventoryItem[] = [
  // wh 1 - 5
  // sp 1 - 3
  // item 1 - 3
  {
    warehouseId: "WH-001",
    supplierId: "SP-001",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-001",
    supplierId: "SP-001",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-001",
    supplierId: "SP-001",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-001",
    supplierId: "SP-002",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-001",
    supplierId: "SP-002",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-001",
    supplierId: "SP-002",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-001",
    supplierId: "SP-003",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-001",
    supplierId: "SP-003",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-001",
    supplierId: "SP-003",
    itemId: "Item-3",
    amount: 200,
  },

  {
    warehouseId: "WH-002",
    supplierId: "SP-001",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-002",
    supplierId: "SP-001",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-002",
    supplierId: "SP-001",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-002",
    supplierId: "SP-002",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-002",
    supplierId: "SP-002",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-002",
    supplierId: "SP-002",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-002",
    supplierId: "SP-003",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-002",
    supplierId: "SP-003",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-002",
    supplierId: "SP-003",
    itemId: "Item-3",
    amount: 200,
  },

  {
    warehouseId: "WH-003",
    supplierId: "SP-001",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-003",
    supplierId: "SP-001",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-003",
    supplierId: "SP-001",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-003",
    supplierId: "SP-002",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-003",
    supplierId: "SP-002",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-003",
    supplierId: "SP-002",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-003",
    supplierId: "SP-003",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-003",
    supplierId: "SP-003",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-003",
    supplierId: "SP-003",
    itemId: "Item-3",
    amount: 200,
  },

  {
    warehouseId: "WH-004",
    supplierId: "SP-001",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-004",
    supplierId: "SP-001",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-004",
    supplierId: "SP-001",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-004",
    supplierId: "SP-002",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-004",
    supplierId: "SP-002",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-004",
    supplierId: "SP-002",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-004",
    supplierId: "SP-003",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-004",
    supplierId: "SP-003",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-004",
    supplierId: "SP-003",
    itemId: "Item-3",
    amount: 200,
  },

  {
    warehouseId: "WH-005",
    supplierId: "SP-001",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-005",
    supplierId: "SP-001",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-005",
    supplierId: "SP-001",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-005",
    supplierId: "SP-002",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-005",
    supplierId: "SP-002",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-005",
    supplierId: "SP-002",
    itemId: "Item-3",
    amount: 200,
  },
  {
    warehouseId: "WH-005",
    supplierId: "SP-003",
    itemId: "Item-1",
    amount: 200,
  },
  {
    warehouseId: "WH-005",
    supplierId: "SP-003",
    itemId: "Item-2",
    amount: 200,
  },
  {
    warehouseId: "WH-005",
    supplierId: "SP-003",
    itemId: "Item-3",
    amount: 200,
  },
];
