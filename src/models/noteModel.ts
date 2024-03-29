import { z } from 'zod';

export class NoteItem {
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

export class Note {
  id: string;
  items: NoteItem[];

  constructor(id: string, items: NoteItem[]) {
    this.id = id;
    this.items = items;
  }
}