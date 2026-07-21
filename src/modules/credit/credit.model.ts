import { Schema, model } from "mongoose";
import {
    CreditDocument,
    CreditTransactionType,
} from "./credit.types";

const creditSchema = new Schema<CreditDocument>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        balance: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        history: [
            {
                type: {
                    type: String,
                    enum: Object.values(CreditTransactionType),
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
                note: {
                    type: String,
                    default: null,
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CreditModel = model<CreditDocument>(
    "Credit",
    creditSchema
);