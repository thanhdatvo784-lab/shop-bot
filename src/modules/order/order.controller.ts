import { orderService } from "./order.service";
import { Order } from "./order.types";

export class OrderController {
    async create(
        data: Omit<Order, "orderId" | "status">
    ) {
        return orderService.create(data);
    }

    async findByOrderId(orderId: string) {
        return orderService.findByOrderId(orderId);
    }

    async findByUserId(userId: string) {
        return orderService.findByUserId(userId);
    }

    async update(orderId: string, data: Partial<Order>) {
        return orderService.update(orderId, data);
    }

    async refund(orderId: string) {
        return orderService.refund(orderId);
    }
}

export const orderController = new OrderController();