import { OrderModel } from "./order.model";
import { Order, OrderStatus } from "./order.types";

export class OrderRepository {
    async create(data: Order) {
        return OrderModel.create(data);
    }

    async findByOrderId(orderId: string) {
        return OrderModel.findOne({ orderId });
    }

    async findByUserId(userId: string) {
        return OrderModel.find({ userId });
    }

    async findByStatus(status: OrderStatus) {
        return OrderModel.find({ status });
    }

    async update(orderId: string, data: Partial<Order>) {
        return OrderModel.findOneAndUpdate(
            { orderId },
            data,
            { new: true }
        );
    }

    async delete(orderId: string) {
        return OrderModel.findOneAndDelete({ orderId });
    }
}

export const orderRepository = new OrderRepository();