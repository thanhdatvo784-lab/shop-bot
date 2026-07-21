import { Schema, model } from "mongoose";
import {
    PaymentDocument,
    PaymentMethod,
    PaymentStatus,
} from "./payment.types";

const paymentSchema = new Schema<PaymentDocument>(
    {
        paymentId: {
            type: String,
            required: true,
            unique: true,
        },
        orderId: {
            type: String,
            required: true,
            index: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        method: {
            type: String,
            enum: Object.values(PaymentMethod),
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING,
        },
        transactionId: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const PaymentModel = model<PaymentDocument>(
    "Payment",
    paymentSchema
);