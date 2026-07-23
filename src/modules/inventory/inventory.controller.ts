import { inventoryService } from "./inventory.service";
import { Inventory } from "./inventory.types";

export class InventoryController {
    async create(
        data: Omit<Inventory, "inventoryId" | "status">
    ) {
        return inventoryService.create(data);
    }

    async findByInventoryId(inventoryId: string) {
        return inventoryService.findByInventoryId(inventoryId);
    }

    async findAllByProductId(productId: string) {
        return inventoryService.findAllByProductId(productId);
    }

    async findAvailableByProductId(productId: string) {
        return inventoryService.findAvailableByProductId(productId);
    }

    async markAsSold(inventoryId: string, orderId: string) {
        return inventoryService.markAsSold(
            inventoryId,
            orderId
        );
    }
}

export const inventoryController = new InventoryController();