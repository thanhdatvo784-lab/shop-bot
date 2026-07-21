import { Schema, model } from "mongoose";
import { CounterDocument } from "./counter.types";

const counterSchema = new Schema<CounterDocument>(
    {
        key: {
            type: String,
            required: true,
            unique: true,
        },
        sequence: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        versionKey: false,
    }
);

export const CounterModel = model<CounterDocument>(
    "Counter",
    counterSchema
);