import { Document } from "mongoose";

export enum OrderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
}

export interface Order {
    orderId: string;
    userId: string;
    productId: string;

    price: number;

    status: OrderStatus;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrderDocument extends Order, Document {}