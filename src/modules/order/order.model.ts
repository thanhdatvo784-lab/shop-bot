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
        },

        productId: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.PENDING,
        },
        messageId: {
            type: String,
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