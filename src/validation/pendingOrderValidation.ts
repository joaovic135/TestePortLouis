import { NoteItem } from "../models/noteModel";
import { Order, OrderItem } from "../models/orderModel";
import { PendingOrder } from "../models/pendingOrderModel";
import { checkExistingOrder } from "./noteValidation";




export function calculateRemainingQuantity(existingQuantity: number, deductedQuantity: number): number {
  return existingQuantity - deductedQuantity;
}

export function addOrUpdatePendingOrder(note: NoteItem, orders: Order[], pendingOrders: PendingOrder[]) {
  const pendingOrderId = 'P' + note.orderId;
  var pendingOrder = pendingOrders.find(pendingOrder => pendingOrder.orderId === pendingOrderId);

  if (!pendingOrder) {
    const order = checkExistingOrder(note.orderId, orders);
    pendingOrder = new PendingOrder(
      pendingOrderId,
      calculateOrderTotalValue(order),
      0,
      []
    );
    pendingOrders.push(pendingOrder);
  }

  const existingPendingItem = pendingOrder.pendingItems.find((pendingItem) => pendingItem.itemNumber === note.itemNumber); if (existingPendingItem) {
    if (existingPendingItem) {
      const remainingQuantity = calculateRemainingQuantity(existingPendingItem.remainingQuantity, note.productQuantity);
      existingPendingItem.remainingQuantity = remainingQuantity >= 0 ? remainingQuantity : 0;
    } else {
      pendingOrder.pendingItems.push({
        itemNumber: note.itemNumber,
        remainingQuantity: note.productQuantity
      });
    }
    console.log(pendingOrder);
  }
}








export function calculateOrderTotalValue(order: Order): number {
  var totalValue = 0;
  for (const item of order.items) {
    const quantity = item.productQuantity;
    const price = item.unitPrice;
    totalValue += quantity * price;
  }

  return Number(totalValue.toFixed(2));

}

export function calculateRemainingValue(pendingOrder: PendingOrder, orders: Order[]): number {
  var remainingValue = 0;
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
