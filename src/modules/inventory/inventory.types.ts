import { Document } from "mongoose";

export enum InventoryStatus {
    AVAILABLE = "AVAILABLE",
    SOLD = "SOLD",
}

export interface Inventory {
    inventoryId: string;

    productId: string;

    data: string;

    status: InventoryStatus;

    orderId?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface InventoryDocument extends Inventory, Document {}