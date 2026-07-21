// product.service.ts
import { productRepository } from "./product.repository";
import { Product, ProductStatus } from "./product.types";
import { IdGenerator } from "../../core/id/id-generator";

export class ProductService {
    async create(data: Omit<Product, "productId" | "status">) {
        const product: Product = {
            productId: await IdGenerator.generate("PRD"),
            status: ProductStatus.ACTIVE,
            ...data,
        };

        return productRepository.create(product);
    }

    async findByProductId(productId: string) {
        return productRepository.findByProductId(productId);
    }

    async findAll() {
        return productRepository.findAll();
    }

    async update(productId: string, data: Partial<Product>) {
        return productRepository.update(productId, data);
    }

    async delete(productId: string) {
        return productRepository.delete(productId);
    }
}

export const productService = new ProductService();