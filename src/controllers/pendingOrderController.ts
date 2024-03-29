import { Request, Response } from "express";
import * as pendingOrderService from "../services/pendingOrderService";
import * as orderService from "../services/orderService";
import * as notesService from "../services/notesService";

const index = (req: Request, res: Response) => {
  try {
    const orders = orderService.readOrders();
    
    orderService.validateOrders(orders);

    const notes = notesService.readNotes();
    
    notesService.validateNotes(notes, orders);
    
    const pedidosPendentes = pendingOrderService.findPendingItems(orders,notes);
    
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
