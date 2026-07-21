import { Schema, model } from "mongoose";
import {
    VoucherDocument,
    VoucherStatus,
    VoucherType,
} from "./voucher.types";

const voucherSchema = new Schema<VoucherDocument>(
    {
        voucherId: {
            type: String,
            required: true,
            unique: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        type: {
            type: String,
            enum: Object.values(VoucherType),
            required: true,
        },
        value: {
            type: Number,
            required: true,
            min: 0,
        },
        maxDiscount: {
            type: Number,
            default: null,
        },
        minOrder: {
            type: Number,
            default: 0,
        },
        usageLimit: {
            type: Number,
            required: true,
            min: 1,
        },
        usedCount: {
            type: Number,
            default: 0,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(VoucherStatus),
            default: VoucherStatus.ACTIVE,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const VoucherModel = model<VoucherDocument>(
    "Voucher",
    voucherSchema
);