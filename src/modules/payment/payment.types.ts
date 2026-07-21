import { Document } from "mongoose";

export enum PaymentMethod {
    CREDIT = "CREDIT",
    MOMO = "MOMO",
    BANK = "BANK",
    QR = "QR",
}

export enum PaymentStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
}

export interface Payment {
    paymentId: string;
    orderId: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
}

export interface PaymentDocument extends Payment, Document {}