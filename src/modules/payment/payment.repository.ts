import { PaymentModel } from "./payment.model";
import { Payment, PaymentStatus } from "./payment.types";

export class PaymentRepository {
    async create(data: Payment) {
        return PaymentModel.create(data);
    }

    async findByPaymentId(paymentId: string) {
        return PaymentModel.findOne({ paymentId });
    }

    async findByOrderId(orderId: string) {
        return PaymentModel.findOne({ orderId });
    }

    async findByStatus(status: PaymentStatus) {
        return PaymentModel.find({ status });
    }

    async update(paymentId: string, data: Partial<Payment>) {
        return PaymentModel.findOneAndUpdate(
            { paymentId },
            data,
            { new: true }
        );
    }

    async delete(paymentId: string) {
        return PaymentModel.findOneAndDelete({ paymentId });
    }
}

export const paymentRepository = new PaymentRepository();