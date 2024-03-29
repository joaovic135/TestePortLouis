import {z} from 'zod';

export class PendingItem{
  itemNumber: number;
  remainingQuantity: number;

  static schema = z.object({
    itemNumber: z.number().int().nonnegative(),
    remainingQuantity: z.number().int().nonnegative(),
  });

  constructor(itemNumber: number, remainingQuantity: number){
    this.itemNumber = itemNumber;
    this.remainingQuantity = remainingQuantity;
  }

}

export class PendingOrder{
  orderId: string;
  totalValue: number;
  remainingValue: number;
  pendingItems: PendingItem[];

  static schema = z.object({
    orderId: z.string(),
    totalValue: z.number().int().nonnegative().multipleOf(0.01),
    remainingValue: z.number().int().nonnegative(),
    pendingItems: z.array(PendingItem.schema),
  });

  constructor(orderId: string, totalValue: number, remainingValue: number, pendingItems: PendingItem[]){
    this.orderId = orderId;
    this.totalValue = totalValue;
    this.remainingValue = remainingValue;
    this.pendingItems = pendingItems;
  }


}


