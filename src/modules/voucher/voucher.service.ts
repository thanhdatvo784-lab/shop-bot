import { IdGenerator } from "../../core/id/id-generator";
import { voucherRepository } from "./voucher.repository";
import {
    Voucher,
    VoucherStatus,
    VoucherType,
} from "./voucher.types";

export class VoucherService {
    async create(data: Omit<Voucher, "voucherId" | "usedCount">) {
        const voucher: Voucher = {
            ...data,
            voucherId: await IdGenerator.generate("VOU"),
            usedCount: 0,
        };

        return voucherRepository.create(voucher);
    }

    async findByCode(code: string) {
        return voucherRepository.findByCode(code);
    }

    async validate(code: string, orderTotal: number) {
        const voucher = await voucherRepository.findByCode(code);

        if (!voucher) {
            throw new Error("Voucher not found");
        }

        if (voucher.status !== VoucherStatus.ACTIVE) {
            throw new Error("Voucher is not active");
        }

        if (new Date() < voucher.startDate || new Date() > voucher.endDate) {
            throw new Error("Voucher has expired");
        }

        if (voucher.usedCount >= voucher.usageLimit) {
            throw new Error("Voucher usage limit reached");
        }

        if (orderTotal < voucher.minOrder) {
            throw new Error("Order does not meet minimum amount");
        }

        let discount = 0;

        if (voucher.type === VoucherType.PERCENT) {
            discount = (orderTotal * voucher.value) / 100;

            if (
                voucher.maxDiscount &&
                discount > voucher.maxDiscount
            ) {
                discount = voucher.maxDiscount;
            }
        } else {
            discount = voucher.value;
        }

        return {
            voucher,
            discount,
        };
    }

    async increaseUsage(voucherId: string) {
        const voucher = await voucherRepository.findByVoucherId(voucherId);

        if (!voucher) {
            throw new Error("Voucher not found");
        }

        return voucherRepository.update(voucherId, {
            usedCount: voucher.usedCount + 1,
        });
    }
}

export const voucherService = new VoucherService();