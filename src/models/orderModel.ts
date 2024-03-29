import {z} from 'zod';


export class OrderItem {
  itemNumber: number;
  productCode: string;
  productQuantity: number;
  unitPrice: number;

  static schema = z.object({
    itemNumber: z.number().int().nonnegative(), 
    productCode: z.string(),
    productQuantity: z.number().int().nonnegative(),
    unitPrice: z.number().multipleOf(0.01),
  });

  constructor(
    itemNumber: number,
    productCode: string,
    productQuantity: number,
    unitPrice: number
  ) {
    this.itemNumber = itemNumber;
    this.productCode = productCode;
    this.productQuantity = productQuantity;
    this.unitPrice = unitPrice;
  }
}

export class Order {
  id: string;
  items: OrderItem[];

  constructor(id: string, items: OrderItem[]) {
    this.id = id;
    this.items = items;
  }
}
