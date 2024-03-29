import { Request, Response } from "express";
import * as pendingOrderService from "../services/pendingOrderService";
import * as orderService from "../services/orderService";
import * as receiptsService from "../services/receiptsService";

const index = (req: Request, res: Response) => {
  try {
    const orders = orderService.readOrders();
    
    orderService.validateOrders(orders);

    const receipts = receiptsService.readReceipts();
    
    receiptsService.validateReceipts(receipts, orders);
    
    const pedidosPendentes = pendingOrderService.findPendingItems(orders,receipts);
    
    res.send(pedidosPendentes);
    // const pendingOrders = pendingOrderService.calculatePendingOrders();
    // res.json(pendingOrders);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export default { index };
