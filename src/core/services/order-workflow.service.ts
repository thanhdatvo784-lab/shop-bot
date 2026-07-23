import { Client } from "discord.js";

import { orderController } from "../../modules/order/order.controller";
import { OrderStatus } from "../../modules/order/order.types";

import { productController } from "../../modules/product/product.controller";

import { orderMessageService } from "./order-message.service";


import { processingOrderService } from "./processing-order.service";

export class OrderWorkflowService {

   async accept(
    client: Client,
    orderId: string,
    staffId: string
) {

    const order = await orderController.findByOrderId(orderId);

    if (!order) {
        throw new Error("Không tìm thấy đơn hàng.");
    }

    if (order.status !== OrderStatus.PENDING) {
        throw new Error("Đơn hàng đã được xử lý.");

    }

    await orderController.update(order.orderId, {
        status: OrderStatus.PROCESSING,
        staffId,
    });

    const updatedOrder = await orderController.findByOrderId(order.orderId);

  if (!updatedOrder || !updatedOrder.queueMessageId) {
    throw new Error("Không tìm thấy tin nhắn hàng chờ.");
}

    const product = await productController.findByProductId(
        updatedOrder.productId
    );

    if (!product) {
        throw new Error("Không tìm thấy sản phẩm.");
    }

    const customer = await client.users.fetch(updatedOrder.userId);

    const staff = await client.users.fetch(staffId);

   await orderMessageService.deleteMessage(
    client,
    updatedOrder.queueMessageId!
);

const processingMessageId =
    await processingOrderService.send(
        client,
        updatedOrder.orderId,
        customer,
        staff,
        product.name,
        updatedOrder.price
    );

await orderController.update(
    updatedOrder.orderId,
    {
        processingMessageId,
    }
);
console.log(
    `✅ ${staff.username} accepted ${updatedOrder.orderId}`
);
    return updatedOrder;
}

    async complete(
        client: Client,
        orderId: string,
        staffId: string
    ) {

    }

    async cancel(
        client: Client,
        orderId: string,
        staffId: string,
        reason: string
    ) {

    }

}

export const orderWorkflowService = new OrderWorkflowService();