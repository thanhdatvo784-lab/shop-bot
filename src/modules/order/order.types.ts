import { Document } from "mongoose";

export enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export interface Order {
    orderId: string;
    userId: string;
    productId: string;

    price: number;

    status: OrderStatus;

    createdAt?: Date;
    updatedAt?: Date;
    staffId?: string;

    cancelReason?: string;

    completedAt?: Date;

    cancelledAt?: Date;
    queueMessageId?: string;

processingMessageId?: string;

historyMessageId?: string;
}

export interface OrderDocument extends Order, Document {}