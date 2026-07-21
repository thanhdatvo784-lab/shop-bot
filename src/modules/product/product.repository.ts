//product.repository.ts
import { ProductModel } from "./product.model";
import { Product } from "./product.types";
import { ProductStatus } from "./product.types";
export class ProductRepository {
    async create(data: Product) {
        return ProductModel.create(data);
    }

    async findByProductId(productId: string) {
        return ProductModel.findOne({ productId });
    }

  async findAll() {
    return ProductModel.find({
        status: ProductStatus.ACTIVE,
    });
}

    async update(productId: string, data: Partial<Product>) {
        return ProductModel.findOneAndUpdate(
            { productId },
            data,
            { new: true }
        );
    }

 async delete(productId: string) {
    return ProductModel.findOneAndUpdate(
        { productId },
        {
            status: ProductStatus.DELETED,
        },
        {
            new: true,
        }
    );
}
}

export const productRepository = new ProductRepository();