import { Document } from "mongoose";

export enum ProductStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED",
}
export enum DeliveryType {
    AUTO = "AUTO",
    MANUAL = "MANUAL",
}
export interface Product {
    productId: string;
    name: string;
    description: string;
    category: string;
    price: number;
    status: ProductStatus;
    deliveryType: DeliveryType;
}

export interface ProductDocument extends Product, Document {}