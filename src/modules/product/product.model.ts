// product.model.ts
import { Schema, model } from "mongoose";
import { ProductDocument, ProductStatus, DeliveryType } from "./product.types";

const productSchema = new Schema<ProductDocument>(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
        },
        
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
       
        status: {
            type: String,
            enum: Object.values(ProductStatus),
            default: ProductStatus.ACTIVE,
        },
        deliveryType: {
    type: String,
    enum: Object.values(DeliveryType),
    default: DeliveryType.AUTO,
},
    },
         {
        timestamps: true,
        versionKey: false,
        }
    
    
);

export const ProductModel = model<ProductDocument>(
    "Product",
    productSchema
);