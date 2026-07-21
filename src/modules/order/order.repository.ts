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
        return OrderModel.find({ userId }).sort({
            createdAt: -1,
        });
    }

    async update(orderId: string, data: Partial<Order>) {
        return OrderModel.findOneAndUpdate(
            { orderId },
            data,
            {
                new: true,
            }
        );
    }

    async delete(orderId: string) {
        return OrderModel.findOneAndUpdate(
            { orderId },
            {
                status: OrderStatus.REFUNDED,
            },
            {
                new: true,
            }
        );
    }
}

export const orderRepository = new OrderRepository();