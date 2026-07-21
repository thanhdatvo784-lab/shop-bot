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
    content: "...",
    ephemeral: true,
});

return;
        }

        const credit = await creditController.findByUserId(
            interaction.user.id
        );

        if (credit.balance < product.price) {
          await interaction.reply({
    content: "...",
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

        await orderController.update(order.orderId, {
            status: OrderStatus.COMPLETED,
        });

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
                    name: "✅ Trạng thái",
                    value: "COMPLETED",
                }
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};

export default command;