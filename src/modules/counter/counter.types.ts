import { Document } from "mongoose";

export interface Counter {
    key: string;
    sequence: number;
}

export interface CounterDocument extends Counter, Document {}