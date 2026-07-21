import { IdGenerator } from "../../core/id/id-generator";
import { orderRepository } from "./order.repository";
import { Order, OrderStatus } from "./order.types";

export class OrderService {
    async create(
        data: Omit<Order, "orderId" | "status">
    ) {
        const order: Order = {
            orderId: await IdGenerator.generate("ORD"),
            status: OrderStatus.PENDING,
            ...data,
        };

        return orderRepository.create(order);
    }

    async findByOrderId(orderId: string) {
        return orderRepository.findByOrderId(orderId);
    }

    async findByUserId(userId: string) {
        return orderRepository.findByUserId(userId);
    }

    async update(orderId: string, data: Partial<Order>) {
        return orderRepository.update(orderId, data);
    }

    async refund(orderId: string) {
        return orderRepository.delete(orderId);
    }
}

export const orderService = new OrderService();