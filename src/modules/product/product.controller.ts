//product.controller.ts
import { productService } from "./product.service";
import { Product } from "./product.types";

export class ProductController {
    async create(data: Omit<Product, "productId" | "status">) {
        return productService.create(data);
    }

    async findByProductId(productId: string) {
        return productService.findByProductId(productId);
    }

    async findAll() {
        return productService.findAll();
    }

    async update(productId: string, data: Partial<Product>) {
        return productService.update(productId, data);
    }

    async delete(productId: string) {
        return productService.delete(productId);
    }
}

export const productController = new ProductController();