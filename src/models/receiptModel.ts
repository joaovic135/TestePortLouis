import { z } from 'zod';

export class ReceiptItem {
  orderId: string;
  itemNumber: number;
  productQuantity: number;

  static schema = z.object({
    orderId: z.string(),
    itemNumber: z.number().int().nonnegative(),
    productQuantity: z.number().int().nonnegative(),
  })
  constructor(
    orderId: string, 
    itemNumber: number, 
    productQuantity: number
    ) {
    this.orderId = orderId;
    this.itemNumber = itemNumber;
    this.productQuantity = productQuantity;
  }
}

export class Receipt {
  id: string;
  items: ReceiptItem[];

  constructor(id: string, items: ReceiptItem[]) {
    this.id = id;
    this.items = items;
  }
}