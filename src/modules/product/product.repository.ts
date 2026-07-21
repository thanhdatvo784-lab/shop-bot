import { ProductModel } from "./product.model";
import { Product } from "./product.types";

export class ProductRepository {
    async create(data: Product) {
        return ProductModel.create(data);
    }

    async findByProductId(productId: string) {
        return ProductModel.findOne({ productId });
    }

    async findAll() {
        return ProductModel.find();
    }

    async update(productId: string, data: Partial<Product>) {
        return ProductModel.findOneAndUpdate(
            { productId },
            data,
            { new: true }
        );
    }

    async delete(productId: string) {
        return ProductModel.findOneAndDelete({ productId });
    }
}

export const productRepository = new ProductRepository();