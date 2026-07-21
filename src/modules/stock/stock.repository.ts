import { StockModel } from "./stock.model";
import { Stock } from "./stock.types";

export class StockRepository {
    async create(data: Stock) {
        return StockModel.create(data);
    }

    async findByProductId(productId: string) {
        return StockModel.findOne({ productId });
    }

    async update(productId: string, data: Partial<Stock>) {
        return StockModel.findOneAndUpdate(
            { productId },
            data,
            { new: true }
        );
    }

    async delete(productId: string) {
        return StockModel.findOneAndDelete({ productId });
    }
}

export const stockRepository = new StockRepository();