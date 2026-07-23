import { Schema, model } from "mongoose";
import {
    InventoryDocument,
    InventoryStatus,
} from "./inventory.types";

const inventorySchema = new Schema<InventoryDocument>(
    {
        inventoryId: {
            type: String,
            required: true,
            unique: true,
        },

        productId: {
            type: String,
            required: true,
        },

        data: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(InventoryStatus),
            default: InventoryStatus.AVAILABLE,
        },

        orderId: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const InventoryModel = model<InventoryDocument>(
    "Inventory",
    inventorySchema
);