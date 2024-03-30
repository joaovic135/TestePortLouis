import { findPendingItems } from "../src/services/pendingOrderService";
import { Order } from "../src/models/orderModel";
import { Receipt } from "../src/models/receiptModel";
import exp from "constants";

describe('findPendingItems', () => {
  test('should return an array of pending orders', () => {

    const orders: Order[] = [
      {
        "id": "P1",
        "items": [
          {
            "itemNumber": 1,
            "productCode": "A22",
            "productQuantity": 9,
            "unitPrice": 10
          },
          {
            "itemNumber": 2,
            "productCode": "K13",
            "productQuantity": 5,
            "unitPrice": 15
          },
          {
            "itemNumber": 3,
            "productCode": "MR2",
            "productQuantity": 10,
            "unitPrice": 17.3
          },
          {
            "itemNumber": 4,
            "productCode": "SD9",
            "productQuantity": 12,
            "unitPrice": 5
          }
        ]
      }
    ];


    const receipts: Receipt[] = [
      {
        "id": "N1",
        "items": [
          {
            "orderId": "1",
            "itemNumber": 1,
            "productQuantity": 9
          },
          {
            "orderId": "1",
            "itemNumber": 2,
            "productQuantity": 5
          },
          {
            "orderId": "1",
            "itemNumber": 3,
            "productQuantity": 9
          }
        ]
      }
    ];

    const pendingOrders = findPendingItems(orders, receipts);

    expect(pendingOrders).toHaveLength(1);
    expect(pendingOrders[0].orderId).toBe('P1');
    expect(pendingOrders[0].totalValue).toBe(398);
    expect(pendingOrders[0].remainingValue).toBe(17.3);
    expect(pendingOrders[0].pendingItems).toHaveLength(1);
    expect(pendingOrders[0].pendingItems[0].itemNumber).toBe(3);
    expect(pendingOrders[0].pendingItems[0].remainingQuantity).toBe(1);
    expect(pendingOrders).toEqual([
      {
        "orderId": "P1",
        "totalValue": 398,
        "remainingValue": 17.3,
        "pendingItems": [
          {
            "itemNumber": 3,
            "remainingQuantity": 1
          }
        ]
      }
    ])

  })
})