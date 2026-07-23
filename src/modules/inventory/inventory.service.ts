import { IdGenerator } from "../../core/id/id-generator";
import { inventoryRepository } from "./inventory.repository";
import { Inventory, InventoryStatus } from "./inventory.types";

export class InventoryService {
    async create(
        data: Omit<Inventory, "inventoryId" | "status">
    ) {
        const inventory: Inventory = {
            inventoryId: await IdGenerator.generate("INV"),
            status: InventoryStatus.AVAILABLE,
            ...data,
        };

        return inventoryRepository.create(inventory);
    }

    async findByInventoryId(inventoryId: string) {
        return inventoryRepository.findByInventoryId(inventoryId);
    }

    async findAllByProductId(productId: string) {
        return inventoryRepository.findAllByProductId(productId);
    }

    async findAvailableByProductId(productId: string) {
        return inventoryRepository.findAvailableByProductId(productId);
    }

    async markAsSold(inventoryId: string, orderId: string) {
        return inventoryRepository.markAsSold(
            inventoryId,
            orderId
        );
    }
}

export const inventoryService = new InventoryService();