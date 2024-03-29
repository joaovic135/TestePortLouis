import { Order, OrderItem } from '../models/orderModel';
import { NoteItem, Note } from "../models/noteModel";
import { PendingOrder, PendingItem } from '../models/pendingOrderModel';
import fs from 'fs';
import { checkExistingOrder, checkExistingOrderItem } from '../validation/noteValidation';
import { calculateOrderTotalValue, calculateRemainingQuantity, calculateRemainingValue } from '../validation/pendingOrderValidation';
import { it } from 'node:test';

export function calculatePendingOrders(orders: Order[], notes: Note[]): any[] {
  const pendingItensPerOrder: any[] = [];

  orders.forEach((order) => {

    const totalValue = order.items.reduce((acc, item) => acc + (item.productQuantity * item.unitPrice), 0);

    let balanceValue = 0;

    const pendingItems: any[] = [];

    order.items.forEach((item) => {
      const note = notes.find((note) => note.id === order.id);

      //order => order.id === 'P' + orderId

    })

  })
  console.log('Processing pending orders...');
  return [];
}


export function findPendingItems(orders: Order[], notes: Note[]): PendingOrder[] {

  const pendingOrders: PendingOrder[] = [];

  notes.forEach((note) => {
    note.items.forEach((item: NoteItem) => {

      const order = checkExistingOrder(item.orderId, orders);
      const correspondingOrderItem = checkExistingOrderItem(item.orderId, item.itemNumber, order);

      const remainingQuantity = calculateRemainingQuantity(correspondingOrderItem.productQuantity ,item.productQuantity );


      if (remainingQuantity > 0) {
        var pendingOrder = pendingOrders.find((pendingOrder) => pendingOrder.orderId === 'P' + item.orderId);
        if (!pendingOrder) {
          pendingOrder = new PendingOrder(
            'P' + item.orderId,
            calculateOrderTotalValue(order),
            0,
            []
          );
          pendingOrders.push(pendingOrder);
        }

        const existingPendingItem = pendingOrder.pendingItems.find((pendingItem) => pendingItem.itemNumber === item.itemNumber);
        if (existingPendingItem) {
          var orderRemainingQuantity = item.productQuantity;
          var productQuantity = existingPendingItem.remainingQuantity;
          var a = productQuantity - orderRemainingQuantity;
          if (pendingOrder.orderId === "P3") {

            console.log(`orderRemainingQuantity:${orderRemainingQuantity} totalPending: ${a} quantidadependente: ${productQuantity} `)
          }
          if (a >= 0) {
            if (pendingOrder.orderId === "P3") {
              console.log(item.productQuantity)
              console.log(existingPendingItem.remainingQuantity)
              console.log(a)
            }
            existingPendingItem.remainingQuantity -= item.productQuantity;
          }
        } else {
          pendingOrder.pendingItems.push(new PendingItem(item.itemNumber, remainingQuantity));
        }


        pendingOrders.forEach((pendingOrder) => {
          if (pendingOrder.orderId === "P3") {
            console.log("Pedido pendente 3: ", pendingOrder)
          }
        })
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


