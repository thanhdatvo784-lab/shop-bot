import { CreditModel } from "./credit.model";
import { Credit } from "./credit.types";

export class CreditRepository {
    async create(data: Credit) {
        return CreditModel.create(data);
    }

    async findByUserId(userId: string) {
        return CreditModel.findOne({ userId });
    }

    async update(userId: string, data: Partial<Credit>) {
        return CreditModel.findOneAndUpdate(
            { userId },
            data,
            { new: true }
        );
    }

    async delete(userId: string) {
        return CreditModel.findOneAndDelete({ userId });
    }
}

export const creditRepository = new CreditRepository();