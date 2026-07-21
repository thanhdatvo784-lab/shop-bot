import { Document } from "mongoose";

export enum VoucherType {
    PERCENT = "PERCENT",
    FIXED = "FIXED",
}

export enum VoucherStatus {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
    EXPIRED = "EXPIRED",
}

export interface Voucher {
    voucherId: string;
    code: string;
    type: VoucherType;
    value: number;
    maxDiscount?: number;
    minOrder: number;
    usageLimit: number;
    usedCount: number;
    startDate: Date;
    endDate: Date;
    status: VoucherStatus;
}

export interface VoucherDocument extends Voucher, Document {}