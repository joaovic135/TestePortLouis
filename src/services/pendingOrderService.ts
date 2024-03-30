import { Order } from '../models/orderModel';
import { ReceiptItem, Receipt } from "../models/receiptModel";
import { PendingOrder, PendingItem } from '../models/pendingOrderModel';
import { getOrderForReceiptOrderId, getOrderItemForReceiptItemNumber } from '../validation/receiptValidation';
import { calculateOrderTotalValue, calculateRemainingQuantity, calculateRemainingValue } from '../validation/pendingOrderValidation';

export function findPendingItems(orders: Order[], receipts: Receipt[]): PendingOrder[] {

  const pendingOrders: PendingOrder[] = [];

  receipts.forEach((receipt) => {
    receipt.items.forEach(({orderId,itemNumber,productQuantity}: ReceiptItem) => {
      
      const orderForReceiptOrderId = getOrderForReceiptOrderId(orderId, orders);
      const orderItemForReceiptItemNumber = getOrderItemForReceiptItemNumber(orderId, itemNumber, orderForReceiptOrderId);
      const remainingQuantity = calculateRemainingQuantity(orderItemForReceiptItemNumber.productQuantity ,productQuantity );

      if (remainingQuantity > 0) {
        handlePendingOrder(pendingOrders, orderId, itemNumber, productQuantity, orderForReceiptOrderId, remainingQuantity);  
      }
    })
  })


  pendingOrders.forEach((pendingOrder) => {
    pendingOrder.remainingValue = calculateRemainingValue(pendingOrder, orders);
  });

  return pendingOrders.filter(order => {
    order.pendingItems = order.pendingItems.filter(item => item.remainingQuantity !== 0);
    return order.pendingItems.length > 0;
  });
}


function handlePendingOrder(pendingOrders: PendingOrder[], orderId: string, itemNumber: number, productQuantity: number, orderForReceiptOrderId: Order, remainingQuantity: number){
  let pendingOrder = pendingOrders.find((pendingOrder) => pendingOrder.orderId === 'P' + orderId);
  if (!pendingOrder) {
    pendingOrder = new PendingOrder(
      'P' + orderId,
      calculateOrderTotalValue(orderForReceiptOrderId),
      0,
      []
    );
    pendingOrders.push(pendingOrder);
  }

  handlPendingOrderItem(pendingOrder, itemNumber, productQuantity, remainingQuantity);
  
 
}



function handlPendingOrderItem(pendingOrder: PendingOrder, itemNumber: number, productQuantity: number, remainingQuantity: number){
  const existingPendingItem = pendingOrder.pendingItems.find((pendingItem) => pendingItem.itemNumber === itemNumber);
  if (existingPendingItem) {
    let remainingPendingQuantity = calculateRemainingQuantity(existingPendingItem.remainingQuantity, productQuantity);
    existingPendingItem.remainingQuantity = remainingPendingQuantity >= 0 ? remainingPendingQuantity : 0;
  } else {
    pendingOrder.pendingItems.push(new PendingItem(itemNumber, remainingQuantity));
  }
}