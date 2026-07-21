import { VoucherModel } from "./voucher.model";
import { Voucher, VoucherStatus } from "./voucher.types";

export class VoucherRepository {
    async create(data: Voucher) {
        return VoucherModel.create(data);
    }

    async findByVoucherId(voucherId: string) {
        return VoucherModel.findOne({ voucherId });
    }

    async findByCode(code: string) {
        return VoucherModel.findOne({
            code: code.toUpperCase(),
        });
    }

    async findByStatus(status: VoucherStatus) {
        return VoucherModel.find({ status });
    }

    async update(voucherId: string, data: Partial<Voucher>) {
        return VoucherModel.findOneAndUpdate(
            { voucherId },
            data,
            { new: true }
        );
    }

    async delete(voucherId: string) {
        return VoucherModel.findOneAndDelete({ voucherId });
    }
}

export const voucherRepository = new VoucherRepository();