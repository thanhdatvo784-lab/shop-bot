import { IdGenerator } from "../../core/id/id-generator";
import { orderService } from "../order/order.service";
import { paymentRepository } from "./payment.repository";
import {
    Payment,
    PaymentMethod,
    PaymentStatus,
} from "./payment.types";

export class PaymentService {
    async create(
        orderId: string,
        amount: number,
        method: PaymentMethod
    ) {
        const payment: Payment = {
            paymentId: await IdGenerator.generate("PAY"),
            orderId,
            amount,
            method,
            status: PaymentStatus.PENDING,
        };

        return paymentRepository.create(payment);
    }

    async findByPaymentId(paymentId: string) {
        return paymentRepository.findByPaymentId(paymentId);
    }

    async complete(
        paymentId: string,
        transactionId?: string
    ) {
        const payment = await paymentRepository.findByPaymentId(paymentId);

        if (!payment) {
            throw new Error("Payment not found");
        }

        await orderService.complete(payment.orderId);

        return paymentRepository.update(paymentId, {
            status: PaymentStatus.SUCCESS,
            transactionId,
        });
    }

    async cancel(paymentId: string) {
        const payment = await paymentRepository.findByPaymentId(paymentId);

        if (!payment) {
            throw new Error("Payment not found");
        }

        await orderService.cancel(payment.orderId);

        return paymentRepository.update(paymentId, {
            status: PaymentStatus.CANCELLED,
        });
    }
}

export const paymentService = new PaymentService();