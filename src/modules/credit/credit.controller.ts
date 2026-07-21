import { creditService } from "./credit.service";

export class CreditController {
    async create(userId: string) {
        return creditService.create(userId);
    }

    async findByUserId(userId: string) {
        return creditService.findByUserId(userId);
    }

    async deposit(userId: string, amount: number) {
        return creditService.deposit(userId, amount);
    }

    async withdraw(userId: string, amount: number) {
        return creditService.withdraw(userId, amount);
    }

    async refund(userId: string, amount: number) {
        return creditService.refund(userId, amount);
    }
}

export const creditController = new CreditController();