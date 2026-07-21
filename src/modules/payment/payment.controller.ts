import { paymentService } from "./payment.service";
import { PaymentMethod } from "./payment.types";

export class PaymentController {
    async create(
        orderId: string,
        amount: number,
        method: PaymentMethod
    ) {
        return paymentService.create(orderId, amount, method);
    }

    async findByPaymentId(paymentId: string) {
        return paymentService.findByPaymentId(paymentId);
    }

    async complete(
        paymentId: string,
        transactionId?: string
    ) {
        return paymentService.complete(paymentId, transactionId);
    }

    async cancel(paymentId: string) {
        return paymentService.cancel(paymentId);
    }
}

export const paymentController = new PaymentController();