import { ReceiptItem, Receipt } from "../models/receiptModel";
import { getOrderForReceiptOrderId, getOrderItemForReceiptItemNumber, checkReceiptQuantity, validateReceiptItem } from "../validation/receiptValidation";
import { Order } from "../models/orderModel";
import fs from 'fs';

export function readReceipts(): Receipt[] {
  const receiptsDir = './Notas'
  const receiptFiles = fs.readdirSync(receiptsDir);
  const receipts: Receipt[] = [];

  for (const file of receiptFiles) {
    const receiptContent = fs.readFileSync(`${receiptsDir}/${file}`, 'utf-8');
    const receiptData = receiptContent.trim().split('\n').map((line: string) => {
      const replacedLine = line
        .replace(/"id_pedido"/g, '"orderId"')
        .replace(/"número_item"/g, '"itemNumber"')
        .replace(/"quantidade_produto"/g, '"productQuantity"');

      const parsedLine = JSON.parse(replacedLine);
      return new ReceiptItem(
        parsedLine.orderId.toString(),
        parsedLine.itemNumber,
        parsedLine.productQuantity
      );
    });
    receiptData.sort((a, b) => a.itemNumber - b.itemNumber);
    const receipt: Receipt = new Receipt(file.split('.')[0], receiptData);
    receipts.push(receipt);
  }

  return receipts;
}

export function validateReceipts(receipts: Receipt[], orders: Order[]): void {

  receipts.forEach((receipt) => {
    try {
   
      receipt.items.forEach((item: ReceiptItem) => {
        const {orderId, itemNumber} = item;
        validateReceiptItem(item);

        const order  = getOrderForReceiptOrderId(orderId, orders)
        
        const correspondingOrder = getOrderItemForReceiptItemNumber(orderId, itemNumber, order);

        checkReceiptQuantity(receipt, item, correspondingOrder, order);
     
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in receipt ${receipt.id}: ${error.message}`);
      }
    }
  })

}
