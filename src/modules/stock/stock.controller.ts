import { stockService } from "./stock.service";

export class StockController {
    async create(productId: string) {
        return stockService.create(productId);
    }

    async findByProductId(productId: string) {
        return stockService.findByProductId(productId);
    }

    async addStock(productId: string, quantity: number) {
        return stockService.addStock(productId, quantity);
    }

    async reserve(productId: string, quantity: number) {
        return stockService.reserve(productId, quantity);
    }

    async complete(productId: string, quantity: number) {
        return stockService.complete(productId, quantity);
    }

    async cancel(productId: string, quantity: number) {
        return stockService.cancel(productId, quantity);
    }
}

export const stockController = new StockController();