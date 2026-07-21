import { Document } from "mongoose";

export interface Stock {
    stockId: string;
    productId: string;
    quantity: number;
    reserved: number;
    sold: number;
}

export interface StockDocument extends Stock, Document {}