import { Document } from "mongoose";

export enum ProductStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export interface Product {
    productId: string;
    name: string;
    description: string;
    category: string;
    price: number;
    status: ProductStatus;
}

export interface ProductDocument extends Product, Document {}