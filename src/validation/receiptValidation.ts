import exp from 'constants';
import {ReceiptItem, Receipt} from '../models/receiptModel';
import {Order , OrderItem} from '../models/orderModel';

export function validateReceiptItem(item: ReceiptItem): void {
  try {
    ReceiptItem.schema.parse(item);
  } catch (error) {
    throw new Error(`Invalid values for item ${item.itemNumber}`);
  }
}

export function getOrderForReceiptOrderId(orderId: string, orders: Order[]): Order {
  const Order = orders.find(order => order.id === 'P' + orderId);
  if (!Order) {
    throw new Error(`Pedido correspondente não encontrado para o orderId ${orderId}`);
  }
  return Order;
}

export function getOrderItemForReceiptItemNumber(orderId: string, itemNumber: number, order: Order): OrderItem {
  const itemPedidoCorrespondente = order.items.find(orderItem => orderItem.itemNumber === itemNumber);
  if (!itemPedidoCorrespondente) {
    throw new Error(`Item de pedido correspondente não encontrado para o orderId ${orderId}, itemNumber ${itemNumber}`);
  }
  return itemPedidoCorrespondente;
}

export function checkReceiptQuantity(receipt:Receipt, item: ReceiptItem, orderItem: OrderItem, order: Order): void {
  if (item.productQuantity > orderItem.productQuantity){
    throw new Error(`A quantidade informada para o item ${item.itemNumber} da nota ${receipt.id} ultrapassa a quantidade do produto no pedido ${order.id}`);
 } 
}