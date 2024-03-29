import { ReceiptItem } from "../models/receiptModel";
import { Order } from "../models/orderModel";
import { PendingOrder } from "../models/pendingOrderModel";
import { getOrderForReceiptOrderId } from "./receiptValidation";




export function calculateRemainingQuantity(existingQuantity: number, deductedQuantity: number): number {
  return existingQuantity - deductedQuantity;
}


export function calculateOrderTotalValue(order: Order): number {
  let totalValue = 0;
  for (const item of order.items) {
    const quantity = item.productQuantity;
    const price = item.unitPrice;
    totalValue += quantity * price;
  }

  return Number(totalValue.toFixed(2));

}

export function calculateRemainingValue(pendingOrder: PendingOrder, orders: Order[]): number {
  let remainingValue = 0;
  const order = orders.find((order) => order.id === pendingOrder.orderId);
  if (order) {
    pendingOrder.pendingItems.forEach((pendingItem) => {
      const correspondingOrderItem = order.items.find((item) => item.itemNumber === pendingItem.itemNumber);
      if (correspondingOrderItem) {
        remainingValue += correspondingOrderItem.unitPrice * pendingItem.remainingQuantity;
      }
    })
  }
  return remainingValue;
}
