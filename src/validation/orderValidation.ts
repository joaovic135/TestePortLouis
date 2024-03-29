import { OrderItem, Order } from '../models/orderModel';

export function validateOrderItem(item: OrderItem) {
  try {
    OrderItem.schema.parse(item);
  } catch (error) {
    throw new Error(`Invalid values for item ${item.itemNumber}`);
  }

}

export function checkSequencialNumbers(item: OrderItem , itemNumbers: Set<number>, ) {

  if (itemNumbers.has(item.itemNumber)) {
    throw new Error(`Duplicate item number ${item.itemNumber}`);
  }
  itemNumbers.add(item.itemNumber);

}

export function checkHighestItemNumber(itemNumbers: Set<number> ,highestItemNumber: number) {
  
  for (let i: number = 1; i <= highestItemNumber; i++) {
    if (!itemNumbers.has(i)) {
      throw new Error(`Missing item number ${i}`);
    }
  }
 
}