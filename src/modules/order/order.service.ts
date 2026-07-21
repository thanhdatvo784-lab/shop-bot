import { IdGenerator } from "../../core/id/id-generator";
import { productService } from "../product/product.service";
import { stockService } from "../stock/stock.service";
import { orderRepository } from "./order.repository";
import { Order, OrderStatus } from "./order.types";

export class OrderService {
    async create(
        userId: string,
        productId: string,
        quantity: number
    ) {
        const product = await productService.findByProductId(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        await stockService.reserve(productId, quantity);

        const order: Order = {
            orderId: await IdGenerator.generate("ORD"),
            userId,
            productId,
            quantity,
            totalPrice: product.price * quantity,
            status: OrderStatus.PENDING,
        };

        return orderRepository.create(order);
    }

    async findByOrderId(orderId: string) {
        return orderRepository.findByOrderId(orderId);
    }

    async findByUserId(userId: string) {
        return orderRepository.findByUserId(userId);
    }

    async complete(orderId: string) {
        const order = await orderRepository.findByOrderId(orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        await stockService.complete(order.productId, order.quantity);

        return orderRepository.update(orderId, {
            status: OrderStatus.COMPLETED,
        });
    }

    async cancel(orderId: string) {
        const order = await orderRepository.findByOrderId(orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        await stockService.cancel(order.productId, order.quantity);

        return orderRepository.update(orderId, {
            status: OrderStatus.CANCELLED,
        });
    }
}

export const orderService = new OrderService();