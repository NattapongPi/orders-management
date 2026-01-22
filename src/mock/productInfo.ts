export type ProductInfoType = {
  itemId: string;
  supplierId: string;
  price: number;
};

export const mockSupplierItems: ProductInfoType[] = [
  // Supplier SP-001
  { itemId: "Item-1", supplierId: "SP-001", price: 123.49 },
  { itemId: "Item-2", supplierId: "SP-001", price: 450.0 },
  { itemId: "Item-3", supplierId: "SP-001", price: 89.25 },

  // Supplier SP-002
  { itemId: "Item-1", supplierId: "SP-002", price: 99.75 },
  { itemId: "Item-2", supplierId: "SP-002", price: 435.5 },
  { itemId: "Item-3", supplierId: "SP-002", price: 92.0 },

  // Supplier SP-003
  { itemId: "Item-1", supplierId: "SP-003", price: 115.0 },
  { itemId: "Item-2", supplierId: "SP-003", price: 460.25 },
  { itemId: "Item-3", supplierId: "SP-003", price: 85.5 },
];
