import { InventoryModel } from "./inventory.model";
import { Inventory, InventoryStatus } from "./inventory.types";

export class InventoryRepository {
    async create(data: Inventory) {
        return InventoryModel.create(data);
    }

    async findByInventoryId(inventoryId: string) {
        return InventoryModel.findOne({ inventoryId });
    }

    async findAllByProductId(productId: string) {
        return InventoryModel.find({ productId });
    }

    async findAvailableByProductId(productId: string) {
        return InventoryModel.findOne({
            productId,
            status: InventoryStatus.AVAILABLE,
        });
    }

    async markAsSold(inventoryId: string, orderId: string) {
        return InventoryModel.findOneAndUpdate(
            { inventoryId },
            {
                status: InventoryStatus.SOLD,
                orderId,
            },
            {
                new: true,
            }
        );
    }
}

export const inventoryRepository = new InventoryRepository();