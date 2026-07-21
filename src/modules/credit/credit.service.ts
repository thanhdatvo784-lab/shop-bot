import { creditRepository } from "./credit.repository";
import {
    Credit,
    CreditTransactionType,
} from "./credit.types";

export class CreditService {
    async create(userId: string) {
        const credit: Credit = {
            userId,
            balance: 0,
            history: [],
        };

        return creditRepository.create(credit);
    }

    async findByUserId(userId: string) {
        return creditRepository.findByUserId(userId);
    }

    async deposit(userId: string, amount: number) {
        const credit = await creditRepository.findByUserId(userId);

        if (!credit) {
            throw new Error("Credit account not found");
        }

        return creditRepository.update(userId, {
            balance: credit.balance + amount,
            history: [
                ...credit.history,
                {
                    type: CreditTransactionType.DEPOSIT,
                    amount,
                    createdAt: new Date(),
                },
            ],
        });
    }

    async withdraw(userId: string, amount: number) {
        const credit = await creditRepository.findByUserId(userId);

        if (!credit) {
            throw new Error("Credit account not found");
        }

        if (credit.balance < amount) {
            throw new Error("Insufficient balance");
        }

        return creditRepository.update(userId, {
            balance: credit.balance - amount,
            history: [
                ...credit.history,
                {
                    type: CreditTransactionType.PURCHASE,
                    amount,
                    createdAt: new Date(),
                },
            ],
        });
    }

    async refund(userId: string, amount: number) {
        const credit = await creditRepository.findByUserId(userId);

        if (!credit) {
            throw new Error("Credit account not found");
        }

        return creditRepository.update(userId, {
            balance: credit.balance + amount,
            history: [
                ...credit.history,
                {
                    type: CreditTransactionType.REFUND,
                    amount,
                    createdAt: new Date(),
                },
            ],
        });
    }
}

export const creditService = new CreditService();