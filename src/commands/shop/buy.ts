import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../core/structures/command";

import { productController } from "../../modules/product/product.controller";
import { creditController } from "../../modules/credit/credit.controller";
import { orderController } from "../../modules/order/order.controller";
import { OrderStatus } from "../../modules/order/order.types";

import {
    DeliveryType,
} from "../../modules/product/product.types";

import { inventoryController } from "../../modules/inventory/inventory.controller";
import { manualOrderService } from "../../core/services/manual-order.service";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("buy")
        .setDescription("Mua sản phẩm")
        .addStringOption(option =>
            option
                .setName("id")
                .setDescription("Product ID")
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {

        const productId = interaction.options.getString("id", true);

        const product = await productController.findByProductId(productId);

        if (!product) {
            await interaction.reply({
                content: "❌ Không tìm thấy sản phẩm.",
                ephemeral: true,
            });
            return;
        }

        // Kiểm tra tồn kho nếu là AUTO
        let inventory = null;

        if (product.deliveryType === DeliveryType.AUTO) {

            inventory =
                await inventoryController.findAvailableByProductId(
                    product.productId
                );

            if (!inventory) {
                await interaction.reply({
                    content: "❌ Sản phẩm hiện đã hết hàng.",
                    ephemeral: true,
                });
                return;
            }
        }

        const credit = await creditController.findByUserId(
            interaction.user.id
        );

        if (credit.balance < product.price) {
            await interaction.reply({
                content: "❌ Bạn không đủ Credit.",
                ephemeral: true,
            });
            return;
        }

        const order = await orderController.create({
            userId: interaction.user.id,
            productId: product.productId,
            price: product.price,
        });

        await creditController.withdraw(
            interaction.user.id,
            product.price
        );

        // AUTO
        if (product.deliveryType === DeliveryType.AUTO) {

            await inventoryController.markAsSold(
                inventory!.inventoryId,
                order.orderId
            );

            await orderController.update(order.orderId, {
                status: OrderStatus.COMPLETED,
            });

        } else {

            // MANUAL

            const messageId = await manualOrderService.send(
                interaction.client,
                order.orderId,
                interaction.user.id,
                product.name,
                product.price
            );
         await orderController.update(order.orderId, {
    queueMessageId: messageId,
});
        }

        const embed = new EmbedBuilder()
            .setTitle("🧾 HÓA ĐƠN")
            .addFields(
                {
                    name: "🆔 Order",
                    value: order.orderId,
                },
                {
                    name: "📦 Sản phẩm",
                    value: product.name,
                },
                {
                    name: "💰 Thanh toán",
                    value: `${product.price.toLocaleString()} Credit`,
                },
                {
                    name: "🚚 Giao hàng",
                    value:
                        product.deliveryType === DeliveryType.AUTO
                            ? "🤖 Tự động"
                            : "👤 Thủ công",
                },
                {
                    name: "📌 Trạng thái",
                    value:
                        product.deliveryType === DeliveryType.AUTO
                            ? "✅ Đã giao tự động"
                            : "🟡 Đang chờ nhân viên xử lý",
                }
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};

export default command;