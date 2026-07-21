import { Document } from "mongoose";

export enum OrderStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}

export interface Order {
    orderId: string;
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    status: OrderStatus;
}

export interface OrderDocument extends Order, Document {}