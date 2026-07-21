import { Schema, model } from "mongoose";
import { OrderDocument, OrderStatus } from "./order.types";

const orderSchema = new Schema<OrderDocument>(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: String,
            required: true,
            index: true,
        },
        productId: {
            type: String,
            required: true,
            index: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.PENDING,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const OrderModel = model<OrderDocument>(
    "Order",
    orderSchema
);