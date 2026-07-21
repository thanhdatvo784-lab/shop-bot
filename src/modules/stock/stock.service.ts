import { IdGenerator } from "../../core/id/id-generator";
import { stockRepository } from "./stock.repository";
import { Stock } from "./stock.types";

export class StockService {
    async create(productId: string) {
        const stock: Stock = {
            stockId: await IdGenerator.generate("STK"),
            productId,
            quantity: 0,
            reserved: 0,
            sold: 0,
        };

        return stockRepository.create(stock);
    }

    async findByProductId(productId: string) {
        return stockRepository.findByProductId(productId);
    }

    async addStock(productId: string, quantity: number) {
        const stock = await stockRepository.findByProductId(productId);

        if (!stock) {
            throw new Error("Stock not found");
        }

        return stockRepository.update(productId, {
            quantity: stock.quantity + quantity,
        });
    }

    async reserve(productId: string, quantity: number) {
        const stock = await stockRepository.findByProductId(productId);

        if (!stock) {
            throw new Error("Stock not found");
        }

        if (stock.quantity < quantity) {
            throw new Error("Insufficient stock");
        }

        return stockRepository.update(productId, {
            quantity: stock.quantity - quantity,
            reserved: stock.reserved + quantity,
        });
    }

    async complete(productId: string, quantity: number) {
        const stock = await stockRepository.findByProductId(productId);

        if (!stock) {
            throw new Error("Stock not found");
        }

        return stockRepository.update(productId, {
            reserved: stock.reserved - quantity,
            sold: stock.sold + quantity,
        });
    }

    async cancel(productId: string, quantity: number) {
        const stock = await stockRepository.findByProductId(productId);

        if (!stock) {
            throw new Error("Stock not found");
        }

        return stockRepository.update(productId, {
            quantity: stock.quantity + quantity,
            reserved: stock.reserved - quantity,
        });
    }
}

export const stockService = new StockService();