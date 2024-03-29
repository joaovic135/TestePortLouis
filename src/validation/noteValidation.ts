import exp from 'constants';
import {NoteItem, Note} from '../models/noteModel';
import {Order , OrderItem} from '../models/orderModel';

export function validateNoteItem(item: NoteItem): void {
  try {
    NoteItem.schema.parse(item);
  } catch (error) {
    throw new Error(`Invalid values for item ${item.itemNumber}`);
  }
}

export function checkExistingOrder(orderId: string, orders: Order[]): Order {
  const Order = orders.find(order => order.id === 'P' + orderId);
  if (!Order) {
    throw new Error(`Pedido correspondente não encontrado para o orderId ${orderId}`);
  }
  return Order;
}

export function checkExistingOrderItem(orderId: string, itemNumber: number, order: Order): OrderItem {
  const itemPedidoCorrespondente = order.items.find(orderItem => orderItem.itemNumber === itemNumber);
  if (!itemPedidoCorrespondente) {
    throw new Error(`Item de pedido correspondente não encontrado para o orderId ${orderId}, itemNumber ${itemNumber}`);
  }
  return itemPedidoCorrespondente;
}

export function checkNoteQuantity(note:Note, item: NoteItem, orderItem: OrderItem, order: Order): void {
  if (item.productQuantity > orderItem.productQuantity){
    throw new Error(`A quantidade informada para o item ${item.itemNumber} da nota ${note.id} ultrapassa a quantidade do produto no pedido ${order.id}`);
 } 
}