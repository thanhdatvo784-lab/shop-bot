import { orderService } from "./order.service";

export class OrderController {
    async create(
        userId: string,
        productId: string,
        quantity: number
    ) {
        return orderService.create(userId, productId, quantity);
    }

    async findByOrderId(orderId: string) {
        return orderService.findByOrderId(orderId);
    }

    async findByUserId(userId: string) {
        return orderService.findByUserId(userId);
    }

    async complete(orderId: string) {
        return orderService.complete(orderId);
    }

    async cancel(orderId: string) {
        return orderService.cancel(orderId);
    }
}

export const orderController = new OrderController();