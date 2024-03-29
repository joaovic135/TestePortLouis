import { OrderItem, Order } from '../models/orderModel';
import { validateOrderItem ,checkSequencialNumbers, checkHighestItemNumber } from '../validation/orderValidation'; 
import fs from 'fs';

export function readOrders(): Order[] {
  const ordersDir = "./Pedidos";
  const ordersFiles = fs.readdirSync(ordersDir);

  const orders: Order[] = [];

  for (const file of ordersFiles) {
    const orderContent = fs.readFileSync(`${ordersDir}/${file}`, 'utf-8');
    const orderData = orderContent.trim().split('\n').map((line: string) => {
      const replacedLine = line
        .replace(/"número_item"/g, '"itemNumber"')
        .replace(/"código_produto"/g, '"productCode"')
        .replace(/"quantidade_produto"/g, '"productQuantity"')
        .replace(/"valor_unitário_produto"/g, '"unitPrice"');

      const parsedLine = JSON.parse(replacedLine);
      parsedLine.unitPrice = parseFloat(parsedLine.unitPrice.replace(',', '.'));

      return new OrderItem(
        parsedLine.itemNumber,
        parsedLine.productCode,
        parsedLine.productQuantity,
        parsedLine.unitPrice
      );
    });
    orderData.sort((a, b) => a.itemNumber - b.itemNumber);
    const order: Order = new Order(file.split('.')[0], orderData);

    orders.push(order);
  }

  return orders;
}

export function validateOrders(orders: Order[]): void {

  orders.forEach((order) => {
    const itemNumbers = new Set<number>();
    let highestItemNumber = 0;

    order.items.forEach((item: OrderItem) => {

      try{

        validateOrderItem(item);
        
        checkSequencialNumbers(item, itemNumbers);
        itemNumbers.add(item.itemNumber);

        if (item.itemNumber > highestItemNumber) {
          highestItemNumber = item.itemNumber;
        }
        checkHighestItemNumber(item, itemNumbers, highestItemNumber);
        
      }catch(error){
        if (error instanceof Error) {
          throw new Error(`Error in order ${order.id}: ${error.message}`);
        }
      }

    });

  })

  console.log('Updating pending order...');
}
