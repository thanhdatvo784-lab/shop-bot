import { voucherService } from "./voucher.service";
import { Voucher } from "./voucher.types";

export class VoucherController {
    async create(data: Omit<Voucher, "voucherId" | "usedCount">) {
        return voucherService.create(data);
    }

    async findByCode(code: string) {
        return voucherService.findByCode(code);
    }

    async validate(code: string, orderTotal: number) {
        return voucherService.validate(code, orderTotal);
    }

    async increaseUsage(voucherId: string) {
        return voucherService.increaseUsage(voucherId);
    }
}

export const voucherController = new VoucherController();