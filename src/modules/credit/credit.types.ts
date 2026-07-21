import { Document } from "mongoose";

export enum CreditTransactionType {
    DEPOSIT = "DEPOSIT",
    PURCHASE = "PURCHASE",
    REFUND = "REFUND",
    ADMIN_ADJUST = "ADMIN_ADJUST",
}

export interface CreditHistory {
    type: CreditTransactionType;
    amount: number;
    createdAt: Date;
    note?: string;
}

export interface Credit {
    userId: string;
    balance: number;
    history: CreditHistory[];
}

export interface CreditDocument extends Credit, Document {}