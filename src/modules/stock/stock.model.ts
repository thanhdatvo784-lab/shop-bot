import { Schema, model } from "mongoose";
import { StockDocument } from "./stock.types";

const stockSchema = new Schema<StockDocument>(
    {
        stockId: {
            type: String,
            required: true,
            unique: true,
        },
        productId: {
            type: String,
            required: true,
            unique: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        reserved: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        sold: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const StockModel = model<StockDocument>(
    "Stock",
    stockSchema
);